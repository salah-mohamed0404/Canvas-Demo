import { Html } from "react-konva-utils";
import DimensionRect from "./SolarPanelAreas/DimensionRect";

const MARGIN = 70;

export default function Axises({
  position = { x: 100, y: 100 },
  roof = { x: 0, y: 0 },
}) {
  const height = position.x - roof.x;
  const width = position.y - roof.y;

  return (
    <>
      <Html
        divProps={{
          className:
            "absolute inset-y-0 w-1 border-l-2 border-dashed border-neutral-500",
          style: { left: `${position.x}px` },
        }}
      />
      <DimensionRect x={position.x} y={MARGIN} height={height} />
      <Html
        divProps={{
          className:
            "absolute inset-x-0 h-1 border-t-2 border-dashed border-neutral-500",
          style: { top: `${position.y}px` },
        }}
      />
      <DimensionRect x={MARGIN} y={position.y} width={width} />
    </>
  );
}
