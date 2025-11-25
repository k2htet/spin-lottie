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
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      // This helps Safari antialiasing
      style={{ WebkitFontSmoothing: "antialiased" }}
    >
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
        // Adjusted radius slightly for SVG text positioning
        const textPos = getCoordinates(midAngle, radius * 0.65, center);
        const Icon = styleDef.icon;

        // Calculate rotation for text so it points towards center
        const rotateText = midAngle + 90;

        return (
          <g key={index}>
            <path
              d={pathData}
              fill={fillColor}
              stroke="white"
              strokeWidth="2"
            />

            {/* REPLACED foreignObject WITH NATIVE SVG ELEMENTS 
               This removes the "HTML inside SVG" complexity that kills Safari.
            */}
            <g
              transform={`translate(${textPos.x}, ${textPos.y}) rotate(${rotateText})`}
            >
              {/* 1. The Icon (Rendered inside a foreignObject is still okay if no shadow, 
                  but strictly strictly speaking, SVG icons are better. 
                  Keeping foreignObject just for the Icon is "okay" if text is native, 
                  but ensure NO SHADOWS here) */}
              <foreignObject x="-12" y="-25" width="24" height="24">
                <Icon size={24} color="white" strokeWidth={2.5} />
              </foreignObject>

              {/* 2. The Text (Native SVG Text - Much faster) */}
              <text
                x="0"
                y="15" // detailed positioning
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
                style={{ textTransform: "uppercase" }}
              >
                {segment.amount
                  ? `x${segment.amount}`
                  : segment.name.split(" ")[0]}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};
