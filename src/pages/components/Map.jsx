import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { GoZoomIn, GoZoomOut, GoSync } from "react-icons/go";

const Map = ({ 
  periodData, 
  lgaData, 
  stateData 
}) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [data, setData] = useState(null);
  const [activeLayer, setActiveLayer] = useState('productAccess');
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  // Layers for map visualization
  const layers = [
    { id: 'productAccess', name: 'Access to Period Products' },
    { id: 'education', name: 'Menstrual Health Education' },
    { id: 'sanitation', name: 'Sanitation Facilities' },
    { id: 'alleviationEfforts', name: 'Alleviation Efforts' }
  ];

  // Load CSV data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Validate input data
        if (!periodData) {
          throw new Error('Period data is required');
        }

        // Transform CSV data into a more usable format
        const processedData = periodData.reduce((acc, row) => {
          acc[row.LGA] = {
            productAccess: +row.productAccess,
            education: +row.mhEducation,
            sanitation: +row.sanitationFacilities,
            alleviationEfforts: +row.ngoCoverage,
          };
          return acc;
        }, {});

        setData(processedData);
      } catch (error) {
        console.error('Error processing data:', error);
      }
    };

    loadData();
  }, [periodData]);

  // Render map when data is loaded
  useEffect(() => {
    if (!data || !lgaData || !stateData) return;

    const svg = d3.select(svgRef.current);
    const container = d3.select(containerRef.current);

    // Validate GeoJSON data
    if (!lgaData.features || !stateData.features) {
      console.error('Invalid GeoJSON data');
      return;
    }

    // Responsive sizing
    const width = container.node().clientWidth;
    const height = width * 0.6; // Maintain aspect ratio

    svg.attr('width', width)
       .attr('height', height);

    // Clear previous content
    svg.selectAll('*').remove();

    const projection = d3.geoMercator()
      .fitSize([1500, 800], lgaData)
      .scale(20000 / 2)
      .center([4, 5]);

    const pathGenerator = d3.geoPath().projection(projection);

    // Color scale for visualization
    const colorScale = d3.scaleSequential(d3.interpolateReds)
      .domain([0, 100]);

    // Zoom behavior
    const zoomBehavior = d3.zoom()
      .scaleExtent([0.5, 8])
      .on('zoom', (event) => {
        svg.selectAll('path')
           .attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoomBehavior);

    // Draw LGAs
    svg.selectAll('.lga')
      .data(lgaData.features)
      .enter()
      .append('path')
      .attr('class', 'lga')
      .attr('d', pathGenerator)
      .attr('fill', d => {
        const lga = d.properties.admin2Name;
        const lgaData = data[lga];
        return lgaData 
          ? colorScale(lgaData[activeLayer]) 
          : '#E7E3E0';
      })
      .attr('stroke', '#543439')
      .attr('stroke-width', 0.4)
      .on('mouseover', function() {
        d3.select(this)
          .attr('stroke', 'black')
          .attr('stroke-width', 1.5);
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('stroke', '#782835')
          .attr('stroke-width', 0.4);
      })
      .on('click', (event, d) => {
        const lga = d.properties.admin2Name;
        const lgaData = data[lga];
        
        if (lgaData) {
          setTooltipData({
            name: lga,
            ...lgaData
          });
          setTooltipPosition({
            x: event.pageX,
            y: event.pageY
          });
        }
      });

    // Draw state boundaries
    svg.selectAll('.state')
      .data(stateData.features)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', pathGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#9F1D00')
      .attr('stroke-width', 0.7);

  }, [data, activeLayer, lgaData, stateData]);

  // Zoom controls
  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(d3.zoom().scaleBy, 1.5);
  };

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(d3.zoom().scaleBy, 0.5);
  };

  const handleResetZoom = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(d3.zoom().transform, d3.zoomIdentity);
    setZoomLevel(1);
  };

  const Tooltip = () => {
    if (!tooltipData) return null;
    
    return (
      <div 
        className="absolute bg-white p-4 rounded-md shadow-lg border border-gray-300 z-10 max-w-xs"
        style={{
          left: tooltipPosition.x - 100,
          top: tooltipPosition.y - 250,
        }}
      >
        <h3 className="font-bold mb-2 text-red-600">{tooltipData.name}</h3>
        <div className="space-y-2 text-sm">
          <p>Product Access: {tooltipData.productAccess}%</p>
          <p>Education Level: {tooltipData.education}%</p>
          <p>Sanitation Access: {tooltipData.sanitation}%</p>
          <p>Alleviation Efforts: {tooltipData.alleviationEfforts}%</p>
        </div>
      </div>
    );
  };

  const LayerControl = () => (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-10">
      <h3 className="font-bold mb-2">Map Layers</h3>
      {layers.map(layer => (
        <label key={layer.id} className="block mb-2">
          <input
            type="radio"
            name="layer"
            value={layer.id}
            checked={activeLayer === layer.id}
            onChange={() => setActiveLayer(layer.id)}
            className="mr-2"
          />
          {layer.name}
        </label>
      ))}
    </div>
  );

  const ZoomControls = () => (
    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-2 flex space-x-2 z-10">
      <button 
        onClick={handleZoomIn} 
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        aria-label="Zoom In"
      >
        <GoZoomIn size={20} />
      </button>
      <button 
        onClick={handleZoomOut} 
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        aria-label="Zoom Out"
      >
        <GoZoomOut size={20} />
      </button>
      <button 
        onClick={handleResetZoom} 
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        aria-label="Reset Zoom"
      >
        <GoSync size={20} />
      </button>
      <span className="self-center text-sm">Zoom: {zoomLevel.toFixed(2)}x</span>
    </div>
  );

  // Render loading or error state if data is not ready
  if (!data || !lgaData || !stateData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600">Loading map data...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <h2 className="text-xl font-bold mb-4">
        Interactive Map: Period Poverty Across Nigeria
      </h2>
      <div ref={containerRef} className="relative w-full">
        <svg ref={svgRef} className="w-full"></svg>
        <LayerControl />
        <ZoomControls />
        <Tooltip />
      </div>
    </div>
  );
};

export default Map;