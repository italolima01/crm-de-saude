"use client";

import { useState } from "react";

interface ToothChartProps {
  selectedTeeth?: string[];
  onToothSelect?: (tooth: string) => void;
  readonly?: boolean;
}

export function ToothChart({ selectedTeeth = [], onToothSelect, readonly = false }: ToothChartProps) {
  const [hoveredTooth, setHoveredTooth] = useState<string | null>(null);

  // Numeração FDI (Fédération Dentaire Internationale)
  const upperTeeth = [
    [18, 17, 16, 15, 14, 13, 12, 11], // Superior direito
    [21, 22, 23, 24, 25, 26, 27, 28]  // Superior esquerdo
  ];
  
  const lowerTeeth = [
    [48, 47, 46, 45, 44, 43, 42, 41], // Inferior direito
    [31, 32, 33, 34, 35, 36, 37, 38]  // Inferior esquerdo
  ];

  const handleToothClick = (tooth: number) => {
    if (readonly || !onToothSelect) return;
    onToothSelect(tooth.toString());
  };

  const isToothSelected = (tooth: number) => {
    return selectedTeeth.includes(tooth.toString());
  };

  const getToothColor = (tooth: number) => {
    if (isToothSelected(tooth)) {
      return "fill-red-500 stroke-red-700";
    }
    if (hoveredTooth === tooth.toString()) {
      return "fill-blue-200 stroke-blue-500";
    }
    return "fill-white stroke-gray-400 hover:fill-blue-100";
  };

  const ToothSVG = ({ tooth, x, y }: { tooth: number; x: number; y: number }) => (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={() => handleToothClick(tooth)}
      onMouseEnter={() => setHoveredTooth(tooth.toString())}
      onMouseLeave={() => setHoveredTooth(null)}
      className={readonly ? "" : "cursor-pointer"}
    >
      {/* Dente */}
      <rect
        width="24"
        height="32"
        rx="4"
        ry="4"
        className={`${getToothColor(tooth)} stroke-2 transition-colors`}
      />
      {/* Número do dente */}
      <text
        x="12"
        y="20"
        textAnchor="middle"
        className="text-xs font-medium fill-gray-700"
      >
        {tooth}
      </text>
    </g>
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-4 text-center">
        🦷 Odontograma
      </h4>
      
      <svg width="500" height="200" viewBox="0 0 500 200" className="mx-auto">
        {/* Arcada Superior */}
        <g>
          <text x="250" y="20" textAnchor="middle" className="text-xs fill-gray-600">
            Arcada Superior
          </text>
          
          {/* Superior Direito */}
          {upperTeeth[0].map((tooth, index) => (
            <ToothSVG
              key={tooth}
              tooth={tooth}
              x={220 - (index * 28)}
              y={30}
            />
          ))}
          
          {/* Superior Esquerdo */}
          {upperTeeth[1].map((tooth, index) => (
            <ToothSVG
              key={tooth}
              tooth={tooth}
              x={260 + (index * 28)}
              y={30}
            />
          ))}
        </g>

        {/* Linha divisória */}
        <line
          x1="50"
          y1="100"
          x2="450"
          y2="100"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Arcada Inferior */}
        <g>
          <text x="250" y="180" textAnchor="middle" className="text-xs fill-gray-600">
            Arcada Inferior
          </text>
          
          {/* Inferior Direito */}
          {lowerTeeth[0].map((tooth, index) => (
            <ToothSVG
              key={tooth}
              tooth={tooth}
              x={220 - (index * 28)}
              y={130}
            />
          ))}
          
          {/* Inferior Esquerdo */}
          {lowerTeeth[1].map((tooth, index) => (
            <ToothSVG
              key={tooth}
              tooth={tooth}
              x={260 + (index * 28)}
              y={130}
            />
          ))}
        </g>
      </svg>

      {/* Legenda */}
      <div className="mt-4 flex justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white border-2 border-gray-400 rounded"></div>
          <span>Normal</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 border-2 border-red-700 rounded"></div>
          <span>Selecionado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 border-2 border-blue-500 rounded"></div>
          <span>Hover</span>
        </div>
      </div>

      {selectedTeeth.length > 0 && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600">
            Dentes selecionados: <span className="font-medium">{selectedTeeth.join(", ")}</span>
          </p>
        </div>
      )}
    </div>
  );
}