import React, { useRef, useEffect, useState } from 'react';
import { select, geoPath, geoMercator, scaleSequential, interpolateReds, zoom } from 'd3';

// Sample data structure (in real application, this would be loaded from CSV)
const sampleData = {
  Abaji: {
    productAccess: 75,
    education: 65,
    sanitation: 70,
    alleviationEfforts: 80,
    details: {
      population: "20M",
      initiatives: "Free pad distribution in schools",
      sanitationFacilities: "60% coverage",
      educationPrograms: "Monthly workshops in schools"
    }
  },
  Abakaliki: {
    productAccess: 45,
    education: 40,
    sanitation: 35,
    alleviationEfforts: 30,
    details: {
      population: "15M",
      initiatives: "NGO support programs",
      sanitationFacilities: "40% coverage",
      educationPrograms: "Quarterly awareness campaigns"
    }
  }
  // Add more states...
};

const Tooltip = ({ data, position }) => {
  if (!data) return null;
  
  const isMobile = window.innerWidth <= 768;

  return (
    <div 
      className="absolute bg-white p-4 rounded-md shadow-lg border border-custom-black"
      style={{
        left: isMobile ? position.x - 40 : position.x - 80,
        top: isMobile ? position.y - 220 : position.y - 420,
        maxWidth: '300px',
      }}
    >
      <h3 className="font-bold mb-2 text-custom-red">{data.name}</h3>
      <div className="space-y-2 text-sm">
        <p>Population: {data.details.population}</p>
        <p>Product Access: {data.productAccess}%</p>
        <p>Education Level: {data.education}%</p>
        <p>Sanitation Access: {data.sanitation}%</p>
        <p>Alleviation Efforts: {data.alleviationEfforts}%</p>
        <p className="mt-2 text-sm">Initiatives: {data.details.initiatives}</p>
      </div>
    </div>
  );
};

const LayerControl = ({ layers, activeLayer, onLayerChange }) => (
  <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
    <h3 className="font-bold mb-2">Map Layers</h3>
    {layers.map(layer => (
      <label key={layer.id} className="block mb-2">
        <input
          type="radio"
          name="layer"
          value={layer.id}
          checked={activeLayer === layer.id}
          onChange={() => onLayerChange(layer.id)}
          className="mr-2"
        />
        {layer.name}
      </label>
    ))}
  </div>
);

function Map({ lgaData, stateData }) {
  const svgRef = useRef();
  const [activeLayer, setActiveLayer] = useState('productAccess');
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const layers = [
    { id: 'productAccess', name: 'Access to Period Products' },
    { id: 'education', name: 'Menstrual Health Education' },
    { id: 'sanitation', name: 'Sanitation Facilities' },
    { id: 'alleviationEfforts', name: 'Alleviation Efforts' }
  ];

  const getColor = (value) => {
    const colorScale = scaleSequential(interpolateReds)
      .domain([0, 100]);
    return colorScale(value);
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.attr('width', 1500)
       .attr('height', 800);

    const projection = geoMercator()
      .fitSize([1500, 800], lgaData)
      .scale(10000)
      .center([4, 5]);

    const pathGenerator = geoPath().projection(projection);

    // Setup zoom behavior
    const zoomBehavior = zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        svg.selectAll('path')
           .attr('transform', event.transform);
      });

    svg.call(zoomBehavior);

    // Draw LGAs
    const lgaPaths = svg
      .selectAll('.lga')
      .data(lgaData.features)
      .join('path')
      .attr('class', 'lga')
      .attr('d', pathGenerator)
      .attr('fill', d => {
        const data = sampleData[d.properties.admin2Name];
        return data ? getColor(data[activeLayer]) : '#E7E3E0';
      })
      .attr('stroke', '#543439')
      .attr('stroke-width', 0.4);

    // Add interactivity
    lgaPaths
      .on('mouseover', (event, d) => {
        select(event.target)
          .attr('stroke', 'black')
          .attr('stroke-width', 1.5);
      })
      .on('mouseout', (event, d) => {
        select(event.target)
          .attr('stroke', '#782835')
          .attr('stroke-width', 0.4);
      })
      .on('click', (event, d) => {
        const data = sampleData[d.properties.admin2Name];
        if (data) {
          setTooltipData({
            name: d.properties.admin2Name,
            ...data
          });
          setTooltipPosition({
            x: event.pageX,
            y: event.pageY
          });
        }
      });

    // Draw state boundaries
    svg
      .selectAll('.state')
      .data(stateData.features)
      .join('path')
      .attr('class', 'state')
      .attr('d', pathGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#9F1D00')
      .attr('stroke-width', 0.7);

  }, [lgaData, stateData, activeLayer]);

  return (
    <div className="relative w-full">
      <div>
        <h2>This is an interactive map showing the proportion of females across Nigeria in Period Poverty.</h2>
      </div>
      <div>
        <div className="relative">
          <svg ref={svgRef}></svg>
          <LayerControl 
            layers={layers}
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
          />
          {tooltipData && (
            <Tooltip 
              data={tooltipData}
              position={tooltipPosition}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;