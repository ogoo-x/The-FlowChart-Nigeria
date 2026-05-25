import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { ZoomIn, ZoomOut, RotateCcw, X, MapPin, Users, TrendingUp, BookOpen, Lightbulb, Building2, Calendar, Filter, BarChart3, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Map = ({ periodData, lgaData, stateData }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const zoomRef = useRef(null);
  const [data, setData] = useState(null);
  const [activeLayer, setActiveLayer] = useState('productAccess');
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [selectedLGA, setSelectedLGA] = useState(null);
  const clickTimeoutRef = useRef(null);

  // Geopolitical zones mapping for simultaneous staggering
  const geopoliticalZones = useMemo(() => ({
    'North Central': ['Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau', 'FCT', 'Federal Capital Territory'],
    'North East': ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
    'North West': ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
    'South East': ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
    'South South': ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'],
    'South West': ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
  }), []);

  // Get zone index for a state
  const getZoneIndex = useCallback((stateName) => {
    const zones = Object.values(geopoliticalZones);
    for (let i = 0; i < zones.length; i++) {
      if (zones[i].includes(stateName)) return i;
    }
    return 0;
  }, [geopoliticalZones]);

  // Layers for map visualization
  const layers = useMemo(() => [
    { id: 'productAccess', name: 'Access to Period Products', key: 'productAccess' },
    { id: 'education', name: 'Menstrual Health Education', key: 'education' },
    { id: 'sanitation', name: 'Sanitation Facilities', key: 'sanitation' },
    { id: 'alleviationEfforts', name: 'Alleviation Efforts', key: 'alleviationEfforts' }
  ], []);

  // Normalize LGA names - memoized for performance
  const normalizeLGAName = useCallback((name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\blga\b/gi, '')
      .replace(/\blocal government area\b/gi, '')
      .replace(/'/g, '')
      .replace(/-/g, ' ')
      .trim();
  }, []);

  // Load and process CSV data
  useEffect(() => {
    if (!periodData) return;

    const processedData = periodData.reduce((acc, row) => {
      const normalizedLGA = normalizeLGAName(row.LGA);
      
      acc[normalizedLGA] = {
        productAccess: +row.productAccess || null,
        education: +row.mhEducation || null,
        sanitation: +row.sanitationFacilities || null,
        alleviationEfforts: +row.ngoCoverage || null,
        displayName: row.LGA,
        state: row.State || 'Unknown State'
      };
      return acc;
    }, {});

    setData(processedData);
  }, [periodData, normalizeLGAName]);

  // Handle single click - show tooltip
  const handleLGAClick = useCallback((event, feature) => {
    if (!animationComplete || !data) return;
    
    event.stopPropagation();
    
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      const lgaName = normalizeLGAName(feature.properties.admin2Name);
      const stateName = feature.properties.admin1Name || 'Unknown State';
      const lgaDataItem = data[lgaName];
      
      if (lgaDataItem) {
        setTooltipData({
          name: lgaDataItem.displayName || feature.properties.admin2Name,
          state: stateName,
          normalizedName: lgaName,
          productAccess: lgaDataItem.productAccess,
          education: lgaDataItem.education,
          sanitation: lgaDataItem.sanitation,
          alleviationEfforts: lgaDataItem.alleviationEfforts,
          displayName: lgaDataItem.displayName
        });
        setTooltipPosition({
          x: event.pageX,
          y: event.pageY
        });
      }
    }, 200);
  }, [animationComplete, data, normalizeLGAName]);

  // Handle double click - open detail modal
  const handleLGADoubleClick = useCallback((event, feature) => {
    if (!animationComplete || !data) return;
    
    event.stopPropagation();
    
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    const lgaName = normalizeLGAName(feature.properties.admin2Name);
    const stateName = feature.properties.admin1Name || 'Unknown State';
    const lgaDataItem = data[lgaName];
    
    if (lgaDataItem) {
      setTooltipData(null);
      setSelectedLGA({
        name: lgaDataItem.displayName || feature.properties.admin2Name,
        normalizedName: lgaName,
        state: stateName,
        productAccess: lgaDataItem.productAccess,
        education: lgaDataItem.education,
        sanitation: lgaDataItem.sanitation,
        alleviationEfforts: lgaDataItem.alleviationEfforts,
        displayName: lgaDataItem.displayName
      });
    }
  }, [animationComplete, data, normalizeLGAName]);

  // Initialize map with optimized staggered animation
  useEffect(() => {
    if (!data || !lgaData || !stateData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const container = d3.select(containerRef.current);

    if (!lgaData.features || !stateData.features) {
      console.error('Invalid GeoJSON data');
      return;
    }

    const width = container.node().clientWidth;
    const height = width * 0.6;

    svg.attr('width', width).attr('height', height);
    svg.selectAll('*').remove();

    const zoomGroup = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([0.5, 8])
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    zoomRef.current = { zoom, svg };
    svg.call(zoom);

    const projection = d3.geoMercator()
      .fitSize([1500, 800], lgaData)
      .scale(20000 / 2)
      .center([4, 5]);

    const pathGenerator = d3.geoPath().projection(projection);

    const colorScale = d3.scaleSequential(d3.interpolateReds)
      .domain([0, 100]);

    const noDataColor = '#ebe6e2ff';

    // Group LGAs by zone for simultaneous animation
    const lgasByZone = {};
    lgaData.features.forEach((feature) => {
      const stateName = feature.properties.admin1Name || '';
      const zoneIndex = getZoneIndex(stateName);
      
      if (!lgasByZone[zoneIndex]) {
        lgasByZone[zoneIndex] = [];
      }
      lgasByZone[zoneIndex].push({ feature });
    });

    // Draw LGAs FIRST (fills and visible borders)
    const lgaPaths = zoomGroup.selectAll('.lga')
      .data(lgaData.features)
      .enter()
      .append('path')
      .attr('class', 'lga')
      .attr('d', pathGenerator)
      .attr('fill', d => {
        const lgaName = normalizeLGAName(d.properties.admin2Name);
        const lgaDataItem = data[lgaName];
        return (lgaDataItem && lgaDataItem[activeLayer] !== null)
          ? colorScale(lgaDataItem[activeLayer]) 
          : noDataColor;
      })
      .attr('stroke', '#782835')
      .attr('stroke-width', 0.5)
      .style('opacity', 0)
      .style('cursor', 'pointer')
      .on('mouseover', function() {
        if (animationComplete) {
          d3.select(this)
            .attr('stroke', 'black')
            .attr('stroke-width', 2);
        }
      })
      .on('mouseout', function() {
        if (animationComplete) {
          d3.select(this)
            .attr('stroke', '#782835')
            .attr('stroke-width', 0.5);
        }
      })
      .on('click', function(event, d) {
        handleLGAClick(event, d);
      })
      .on('dblclick', function(event, d) {
        handleLGADoubleClick(event, d);
      });

    // Draw state boundaries LAST (on top, thicker, clearly visible)
    zoomGroup.selectAll('.state')
      .data(stateData.features)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', pathGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#9F1D00')
      .attr('stroke-width', 1.5)
      .style('pointer-events', 'none');

    // Set opacity immediately without stagger animation
    lgaPaths.style('opacity', 1);
    setAnimationComplete(true);

    return () => {
      if (svg) {
        svg.on('.zoom', null);
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };

  }, [data, activeLayer, lgaData, stateData, animationComplete, getZoneIndex, normalizeLGAName, handleLGAClick, handleLGADoubleClick]);

  // Handle layer change - optimized to only update colors
  useEffect(() => {
    if (!data || !lgaData || !svgRef.current || !animationComplete) return;
    
    const colorScale = d3.scaleSequential(d3.interpolateReds)
      .domain([0, 100]);
    
    const noDataColor = '#ebe6e2ff';
    
    d3.select(svgRef.current)
      .selectAll('.lga')
      .transition()
      .duration(150)
      .attr('fill', d => {
        const lgaName = normalizeLGAName(d.properties.admin2Name);
        const lgaDataItem = data[lgaName];
        return (lgaDataItem && lgaDataItem[activeLayer] !== null)
          ? colorScale(lgaDataItem[activeLayer]) 
          : noDataColor;
      });
  }, [activeLayer, data, lgaData, animationComplete, normalizeLGAName]);

  // Zoom controls - memoized
  const handleZoomIn = useCallback(() => {
    if (zoomRef.current) {
      const { zoom, svg } = zoomRef.current;
      svg.transition().duration(250).call(zoom.scaleBy, 1.5);
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (zoomRef.current) {
      const { zoom, svg } = zoomRef.current;
      svg.transition().duration(250).call(zoom.scaleBy, 0.75);
    }
  }, []);

  const handleResetZoom = useCallback(() => {
    if (zoomRef.current) {
      const { zoom, svg } = zoomRef.current;
      svg.transition().duration(250).call(zoom.transform, d3.zoomIdentity);
      setZoomLevel(1);
    }
  }, []);

  // Tooltip Component
  const Tooltip = React.memo(() => {
    if (!tooltipData) return null;
    
    const formatValue = (value) => {
      return value !== null && value !== undefined ? `${value}%` : '-%';
    };
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        className="absolute bg-white p-4 rounded-lg shadow-xl border-2 border-rose-900 z-50 max-w-xs"
        style={{
          left: tooltipPosition.x - 65,
          top: tooltipPosition.y - 240,
          pointerEvents: 'auto'
        }}
      >
        <h3 
          className="font-bold mb-2 text-rose-900 text-lg cursor-pointer hover:underline"
          onClick={() => { 
            setSelectedLGA({
              name: tooltipData.name,
              normalizedName: tooltipData.normalizedName,
              state: tooltipData.state,
              productAccess: tooltipData.productAccess,
              education: tooltipData.education,
              sanitation: tooltipData.sanitation,
              alleviationEfforts: tooltipData.alleviationEfforts,
              displayName: tooltipData.displayName
            }); 
            setTooltipData(null); 
          }}
        >
          {tooltipData.name}
        </h3>
        <p className="text-xs text-gray-600 mb-3">{tooltipData.state}</p>
        <div className="space-y-2 text-sm">
          {activeLayer === 'productAccess' && (
            <p><strong>Product Access:</strong> {formatValue(tooltipData.productAccess)} lack access</p>
          )}
          {activeLayer === 'education' && (
            <p><strong>MH Education:</strong> {formatValue(tooltipData.education)} have poor knowledge</p>
          )}
          {activeLayer === 'sanitation' && (
            <p><strong>Sanitation:</strong> {formatValue(tooltipData.sanitation)} lack facilities</p>
          )}
          {activeLayer === 'alleviationEfforts' && (
            <p><strong>NGO Coverage:</strong> {formatValue(tooltipData.alleviationEfforts)}</p>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-3 italic">Click name or double-click map for details</p>
      </motion.div>
    );
  });

  // LGA Detail Modal Component
  const LGADetailModal = ({ lga, onClose }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedMapLayer, setSelectedMapLayer] = useState('productAccess');

    const sampleData = {
      name: lga?.name || "Unknown LGA",
      state: lga?.state || "Unknown State",
      population: 250000,
      numberOfTowns: 3,
      senatorialZone: "Central",
      towns: ["Town 1", "Town 2", "Town 3"],
      metrics: {
        productAccess: lga?.productAccess || 0,
        education: lga?.education || 0,
        sanitation: lga?.sanitation || 0,
        alleviationEfforts: lga?.alleviationEfforts || 0
      },
      ngoTimeline: [
        { year: 2020, count: 2 },
        { year: 2021, count: 3 },
        { year: 2022, count: 5 },
        { year: 2023, count: 8 },
        { year: 2024, count: 12 }
      ],
      research: [
        {
          id: 1,
          title: "Menstrual Health Challenges in " + (lga?.name || "this area"),
          authors: "Research Team",
          year: 2024,
          source: "Journal of Public Health",
          summary: "Comprehensive study examining period poverty indicators and intervention opportunities in this local government area.",
          link: "#research-1"
        }
      ],
      insights: [
        {
          icon: "📦",
          category: "Product Distribution",
          recommendations: [
            "Focus on public secondary schools with enrollment >500 students",
            "Establish school-based product distribution systems",
            "Partner with local markets for sustainable supply chains"
          ]
        },
        {
          icon: "📚",
          category: "Education Programs",
          recommendations: [
            "Integrate MH education into existing health curriculum",
            "Train teachers as MH champions in each school",
            "Include male students in awareness programs to reduce stigma"
          ]
        },
        {
          icon: "🚰",
          category: "Infrastructure",
          recommendations: [
            "Priority: Install private changing facilities in schools",
            "Ensure water availability during school hours",
            "Provide disposal bins in girls' restrooms"
          ]
        }
      ],
      ngoActivities: [
        {
          id: 1,
          name: "Local NGO Initiative",
          date: "March 2024",
          beneficiaries: 500,
          activity: "Distributed menstrual products to 10 schools",
          observations: "Students reported increased confidence and reduced absenteeism. Need for ongoing supply emphasized.",
          photos: [{}, {}]
        }
      ],
      similarLGAs: [
        { name: "Similar LGA 1", state: lga?.state || "Unknown", similarity: 94, reason: "Similar urban density and school infrastructure" },
        { name: "Similar LGA 2", state: lga?.state || "Unknown", similarity: 89, reason: "Comparable population and WASH challenges" },
        { name: "Similar LGA 3", state: lga?.state || "Unknown", similarity: 85, reason: "Similar socioeconomic profile" }
      ]
    };

    const TimelineGraph = ({ data }) => {
      const maxCount = Math.max(...data.map(d => d.count));
      
      return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <BarChart3 size={20} className="mr-2 text-rose-600" />
            NGO Activity Over Time
          </h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {data.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.count / maxCount) * 100}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="w-full bg-gradient-to-t from-rose-400 to-rose-600 rounded-t-lg relative group"
                >
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 font-bold text-rose-600 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {item.count}
                  </span>
                </motion.div>
                <span className="text-xs text-gray-600 mt-2">{item.year}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Number of NGOs conducting interventions per year
          </p>
        </div>
      );
    };

    const FilterPanel = () => {
      const filters = [
        { id: 'all', label: 'All Data', icon: '📊' },
        { id: 'age-10-14', label: 'Ages 10-14', icon: '👧' },
        { id: 'age-15-19', label: 'Ages 15-19', icon: '👩' },
        { id: 'public-schools', label: 'Public Schools', icon: '🏫' },
        { id: 'private-schools', label: 'Private Schools', icon: '🏛️' },
        { id: 'markets', label: 'Market Women', icon: '🛍️' },
      ];

      return (
        <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
          <h3 className="font-bold text-sm mb-3 flex items-center">
            <Filter size={16} className="mr-2" />
            Filter Data View
          </h3>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  activeFilter === filter.id
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-rose-100'
                }`}
              >
                <span className="mr-1">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      );
    };

    const MapLayerSelector = () => {
      const mapLayers = [
        { id: 'productAccess', label: 'Product Access', color: 'bg-red-100' },
        { id: 'education', label: 'MH Education', color: 'bg-orange-100' },
        { id: 'sanitation', label: 'Sanitation', color: 'bg-blue-100' },
        { id: 'alleviationEfforts', label: 'NGO Coverage', color: 'bg-green-100' },
      ];

      return (
        <div className="space-y-2">
          {mapLayers.map(layer => (
            <label key={layer.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="detailMapLayer"
                checked={selectedMapLayer === layer.id}
                onChange={() => setSelectedMapLayer(layer.id)}
                className="mr-2"
              />
              <span className={`px-3 py-1 rounded ${layer.color} text-sm font-medium`}>
                {layer.label}
              </span>
            </label>
          ))}
        </div>
      );
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="min-h-screen py-8 px-4"
        >
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-rose-600 to-pink-600 text-white p-8 rounded-t-2xl z-10">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
              >
                <X size={24} />
              </button>
              <h1 className="text-4xl font-bold mb-2">{sampleData.name}</h1>
              <p className="text-lg opacity-90">{sampleData.senatorialZone}, {sampleData.state}</p>
            </div>

            <div className="p-8 space-y-12">
              {/* Overview Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin size={24} className="mr-2 text-rose-600" />
                  Overview
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Population</p>
                      <p className="text-2xl font-bold text-gray-800">{sampleData.population.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Number of Towns</p>
                      <p className="text-2xl font-bold text-gray-800">{sampleData.numberOfTowns}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Senatorial Zone</p>
                      <p className="text-lg font-bold text-gray-800">{sampleData.senatorialZone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">State</p>
                      <p className="text-lg font-bold text-gray-800">{sampleData.state}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Major Towns/Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {sampleData.towns.map((town, idx) => (
                        <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                          {town}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Detailed Data Visualization */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin size={24} className="mr-2 text-rose-600" />
                  Detailed Data Visualization
                </h2>
                
                <FilterPanel />
                
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-3 bg-gray-100 rounded-lg p-6 flex items-center justify-center h-64">
                    <p className="text-gray-500 italic text-center">
                      Interactive mini-map of {sampleData.name} would appear here
                      <br />
                      <span className="text-sm">Showing: {selectedMapLayer} data | Filter: {activeFilter}</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">Map Layers</h3>
                    <MapLayerSelector />
                  </div>
                </div>
              </section>

              {/* Current Metrics */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp size={24} className="mr-2 text-rose-600" />
                  Current Period Poverty Indicators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-red-50 to-rose-100 p-6 rounded-xl shadow-md"
                  >
                    <h3 className="font-semibold text-gray-700 mb-2">Product Access</h3>
                    <p className="text-4xl font-bold text-rose-700">{sampleData.metrics.productAccess}%</p>
                    <p className="text-sm text-gray-600 mt-2">lack access to products</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-md"
                  >
                    <h3 className="font-semibold text-gray-700 mb-2">MH Education</h3>
                    <p className="text-4xl font-bold text-orange-700">{sampleData.metrics.education}%</p>
                    <p className="text-sm text-gray-600 mt-2">have poor MH knowledge</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md"
                  >
                    <h3 className="font-semibold text-gray-700 mb-2">Sanitation</h3>
                    <p className="text-4xl font-bold text-blue-700">{sampleData.metrics.sanitation}%</p>
                    <p className="text-sm text-gray-600 mt-2">lack WASH facilities</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md"
                  >
                    <h3 className="font-semibold text-gray-700 mb-2">NGO Coverage</h3>
                    <p className="text-4xl font-bold text-green-700">{sampleData.metrics.alleviationEfforts}%</p>
                    <p className="text-sm text-gray-600 mt-2">current coverage</p>
                  </motion.div>
                </div>
              </section>

              {/* Research Links */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <BookOpen size={24} className="mr-2 text-rose-600" />
                  Research & Data Sources
                </h2>
                <div className="space-y-4">
                  {sampleData.research.map(study => (
                    <div key={study.id} className="bg-white border-l-4 border-rose-500 p-5 rounded-lg shadow-sm hover:shadow-md transition">
                      <h3 className="font-bold text-gray-800 mb-1">{study.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {study.authors} • {study.year} • {study.source}
                      </p>
                      <p className="text-gray-700 mb-3">{study.summary}</p>
                      <a href={study.link} className="text-rose-600 hover:text-rose-700 font-medium text-sm">
                        Read Full Study →
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              {/* Actionable Insights */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Lightbulb size={24} className="mr-2 text-rose-600" />
                  Actionable Insights for NGOs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sampleData.insights.map((insight, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                      <div className="text-4xl mb-3">{insight.icon}</div>
                      <h3 className="font-bold text-lg text-gray-800 mb-3">{insight.category}</h3>
                      <ul className="space-y-2">
                        {insight.recommendations.map((rec, ridx) => (
                          <li key={ridx} className="text-sm text-gray-700 flex items-start">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* NGO Timeline */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar size={24} className="mr-2 text-rose-600" />
                  Alleviation Efforts Over Time
                </h2>
                <TimelineGraph data={sampleData.ngoTimeline} />
              </section>

              {/* NGO Activities & Photos */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Building2 size={24} className="mr-2 text-rose-600" />
                  Recent NGO Activities
                </h2>
                <div className="space-y-6">
                  {sampleData.ngoActivities.map(activity => (
                    <div key={activity.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{activity.name}</h3>
                            <p className="text-sm text-gray-600">{activity.date}</p>
                          </div>
                          <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {activity.beneficiaries} beneficiaries
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{activity.activity}</p>
                        
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                          <p className="font-semibold text-sm text-yellow-900 mb-1">Field Observations:</p>
                          <p className="text-sm text-yellow-800">{activity.observations}</p>
                        </div>

                        <div className="flex gap-3">
                          {activity.photos.map((photo, pidx) => (
                            <div key={pidx} className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Image size={32} className="text-gray-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Similar LGAs */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Users size={24} className="mr-2 text-rose-600" />
                  Similar Local Government Areas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sampleData.similarLGAs.map((lga, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white border-2 border-gray-200 hover:border-rose-400 p-5 rounded-xl cursor-pointer transition shadow-sm hover:shadow-md"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-800">{lga.name}</h3>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                          {lga.similarity}% match
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{lga.state}</p>
                      <p className="text-xs text-gray-500 italic">{lga.reason}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  if (!data || !lgaData || !stateData) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <h2 className="text-xl font-bold mb-4">Interactive Map: Period Poverty Across Nigeria</h2>
      <div ref={containerRef} className="relative w-full">
        <svg ref={svgRef} className="w-full border border-rose-900"></svg>
        <AnimatePresence>{tooltipData && <Tooltip />}</AnimatePresence>
        <div className="absolute left-4 top-4 bg-white rounded-lg shadow-lg p-2 flex space-x-2 z-10">
          <button onClick={handleZoomIn} className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition"><ZoomIn size={20} /></button>
          <button onClick={handleZoomOut} className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition"><ZoomOut size={20} /></button>
          <button onClick={handleResetZoom} className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition"><RotateCcw size={20} /></button>
          <span className="self-center text-sm text-gray-600">{zoomLevel.toFixed(1)}x</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 z-10 rounded-lg border border-rose-900">
          <h2 className="font-bold mb-2 text-2xl">Map Layers</h2>
          {layers.map(layer => <label key={layer.id} className="block mb-2 text-sm cursor-pointer hover:text-rose-900"><input type="radio" name="layer" value={layer.id} checked={activeLayer === layer.id} onChange={() => setActiveLayer(layer.id)} className="mr-2" />{layer.name}</label>)}
        </div>
        <div className="p-4 z-10 rounded-lg border border-rose-900">
          <h2 className="font-bold mb-2 text-2xl">Tips</h2>
          <ul className="text-sm list-disc pl-5">
            <li className="mb-2">Zoom in for detail</li>
            <li className="mb-2">Single-click to see tooltip</li>
            <li className="mb-2">Double-click or click LGA name for full details</li>
          </ul>
        </div>
      </div>
      <AnimatePresence>{selectedLGA && <LGADetailModal lga={selectedLGA} onClose={() => setSelectedLGA(null)} />}</AnimatePresence>
    </div>
  );
};

export default Map;