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
  const zoomRef = useRef(null);
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

        // Transform CSV data into a more usable format with normalization for LGA names
        const processedData = periodData.reduce((acc, row) => {
          // Normalize LGA name to handle different formats
          const normalizedLGA = row.LGA.toLowerCase().trim();
          
          acc[normalizedLGA] = {
            productAccess: +row.productAccess,
            education: +row.mhEducation,
            sanitation: +row.sanitationFacilities,
            alleviationEfforts: +row.ngoCoverage,
            displayName: row.LGA // Keep original name for display
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

  // Initialize map and zoom behavior
  useEffect(() => {
    if (!data || !lgaData || !stateData || !svgRef.current) return;

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

    // Create a group for zoomable content
    const zoomGroup = svg.append('g');

    // Initialize zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 8])
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    // Store zoom behavior in a ref for use in zoom control functions
    zoomRef.current = { zoom, svg };
    
    // Apply zoom to svg
    svg.call(zoom);

    // Configure projection
    const projection = d3.geoMercator()
      .fitSize([1500, 800], lgaData)
      .scale(20000 / 2)
      .center([4, 5]);

    const pathGenerator = d3.geoPath().projection(projection);

    // Color scale for visualization
    const colorScale = d3.scaleSequential(d3.interpolateReds)
      .domain([0, 100]);

    // Draw LGAs
    zoomGroup.selectAll('.lga')
      .data(lgaData.features)
      .enter()
      .append('path')
      .attr('class', 'lga')
      .attr('d', pathGenerator)
      .attr('fill', d => {
        // Normalize GeoJSON LGA name to match with our data
        const lgaName = d.properties.admin2Name.toLowerCase().trim();
        const lgaData = data[lgaName];
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
        // Normalize GeoJSON LGA name
        const lgaName = d.properties.admin2Name.toLowerCase().trim();
        const lgaData = data[lgaName];
        
        if (lgaData) {
          setTooltipData({
            name: lgaData.displayName || d.properties.admin2Name,
            ...lgaData
          });
          setTooltipPosition({
            x: event.pageX,
            y: event.pageY
          });
        }
      });

    // Draw state boundaries
    zoomGroup.selectAll('.state')
      .data(stateData.features)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', pathGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#9F1D00')
      .attr('stroke-width', 0.7);

    // Cleanup function
    return () => {
      if (svg) {
        svg.on('.zoom', null); // Remove zoom behavior
      }
    };

  }, [data, activeLayer, lgaData, stateData]);

  // Handle layer change and redraw map
  useEffect(() => {
    if (!data || !lgaData || !svgRef.current) return;
    
    const colorScale = d3.scaleSequential(d3.interpolateReds)
      .domain([0, 100]);
    
    d3.select(svgRef.current)
      .selectAll('.lga')
      .attr('fill', d => {
        const lgaName = d.properties.admin2Name.toLowerCase().trim();
        const lgaData = data[lgaName];
        return lgaData 
          ? colorScale(lgaData[activeLayer]) 
          : '#E7E3E0';
      });
  }, [activeLayer, data, lgaData]);

  // Zoom controls
  const handleZoomIn = () => {
    if (zoomRef.current) {
      const { zoom, svg } = zoomRef.current;
      svg.transition().duration(300).call(zoom.scaleBy, 1.5);
    }
  };

  const handleZoomOut = () => {
    if (zoomRef.current) {
      const { zoom, svg } = zoomRef.current;
      svg.transition().duration(300).call(zoom.scaleBy, 0.75);
    }
  };

  const handleResetZoom = () => {
    if (zoomRef.current) {
      const { zoom, svg } = zoomRef.current;
      svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
      setZoomLevel(1);
    }
  };

  const Tooltip = () => {
    if (!tooltipData) return null;
    
    return (
      <div 
        className="absolute bg-custom-white p-4 rounded-md shadow-sm border border-custom-red z-10 max-w-xs"
        style={{
          left: tooltipPosition.x - 35,
          top: tooltipPosition.y - 140,
        }}
      >
        <h3 className="font-bold mb-2 text-rose-900">{tooltipData.name}</h3>
        <div className="space-y-2 text-sm">
          <p>{tooltipData.productAccess}% of females do not have access to sanitary menstrual products</p>
          <p>{tooltipData.education}% of females have a poor knowledge on menstrual health</p>
          <p>{tooltipData.sanitation}% of females do not have access to good water and sanitation facilities</p>
          <p>Alleviation Efforts: {tooltipData.alleviationEfforts}%</p>
        </div>
      </div>
    );
  };

  const LayerControl = () => (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 z-10 rounded-lg border border-custom-red">
        <h2 className="font-bold mb-2 text-2xl">Map Layers</h2>
        {layers.map(layer => (
          <label key={layer.id} className="block mb-2 text-sm">
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

      <div className="p-4 z-10 rounded-lg border border-custom-red">
        <h2 className="font-bold mb-2 text-2xl">Tips</h2>
        <ul className="text-sm list-disc pl-5">
          <li className="mb-2">Zoom in for detail</li>
          <li>Tap on a LGA to see more information on it</li>
        </ul>
      </div>
    </div>
  );

  const ZoomControls = () => (
    <div className="absolute left-4 top-4 bg-white rounded-lg shadow-lg p-2 flex space-x-2 z-10">
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
    <div className="relative w-full">
      <h2 className="text-xl font-bold mb-4">
        Interactive Map: Period Poverty Across Nigeria
      </h2>
      <div ref={containerRef} className="relative w-full">
        <svg ref={svgRef} className="w-full border border-custom-red"></svg>
        <Tooltip />
        <ZoomControls />
      </div>
      
      {/* Layer controls moved below the map */}
      <LayerControl />
    </div>
  );
};

export default Map;