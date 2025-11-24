import React from "react";
import { PRIZE_STYLE_MAP } from "./wheel-config";

const getCoordinates = (
  angleInDegrees: number,
  radius: number,
  center: number
) => {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
  return {
    x: center + radius * Math.cos(angleInRadians),
    y: center + radius * Math.sin(angleInRadians),
  };
};

interface WheelCanvasProps {
  segments: any[];
  themeColors: string[];
}

export const WheelCanvas = ({ segments, themeColors }: WheelCanvasProps) => {
  const size = 400;
  const center = size / 2;
  const radius = size / 2 - 10;
  const sliceAngle = 360 / segments.length;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
      {segments.map((segment, index) => {
        const startAngle = index * sliceAngle;
        const endAngle = (index + 1) * sliceAngle;

        const start = getCoordinates(startAngle, radius, center);
        const end = getCoordinates(endAngle, radius, center);
        const largeArcFlag = sliceAngle > 180 ? 1 : 0;

        const pathData = [
          `M ${center} ${center}`,
          `L ${start.x} ${start.y}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
          `Z`,
        ].join(" ");

        const styleDef =
          PRIZE_STYLE_MAP[segment.prize_type] || PRIZE_STYLE_MAP.THANKS;
        const fillColor = themeColors[index % themeColors.length];

        const midAngle = startAngle + sliceAngle / 2;
        const textPos = getCoordinates(midAngle, radius * 0.65, center);
        const Icon = styleDef.icon;

        return (
          <g key={index}>
            <path
              d={pathData}
              fill={fillColor}
              stroke="white"
              strokeWidth="2"
            />

            <g
              transform={`translate(${textPos.x}, ${textPos.y}) rotate(${
                midAngle + 90
              })`}
            >
              <foreignObject x="-30" y="-30" width="60" height="60">
                <div className="flex flex-col items-center justify-center w-full h-full text-white drop-shadow-md">
                  <Icon size={24} strokeWidth={2.5} className="mb-1" />
                  <span className="text-[10px] font-bold uppercase text-center leading-none">
                    {segment.amount
                      ? `x${segment.amount}`
                      : segment.name.split(" ")[0]}
                  </span>
                </div>
              </foreignObject>
            </g>
          </g>
        );
      })}
    </svg>
  );
};
