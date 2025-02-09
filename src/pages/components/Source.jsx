import React, { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

const Source = ({ LinktoSource }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <a
        href={LinktoSource}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <BsInfoCircle size={20} />
      </a>
      
      <div
        className={`
          absolute left-full ml-2 top-1/2 -translate-y-1/2
          whitespace-nowrap px-3 py-1 rounded-md
          bg-gray-800 text-white text-sm
          transition-opacity duration-200
          ${isTooltipVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        Learn more on how this data was processed
        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
      </div>
    </div>
  );
};

export default Source;