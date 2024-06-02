import { Rect } from "react-konva";

export default function MainRect({ x, y, width, height }) {
  return (
    <Rect
      x={x} // Half of the stage width minus half of the Rect width to center it horizontally
      y={y} // Half of the stage height minus half of the Rect height to center it vertically
      width={width}
      height={height}
      fill="white"
    />
  );
}
