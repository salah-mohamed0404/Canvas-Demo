import { Group, Rect } from "react-konva";

export default function StrokedRect({ x, y, width, height, title }) {
  return (
    <Group>
      <Rect x={x} y={y} width={width} height={height} stroke="#B8860B" />

      {title}
    </Group>
  );
}
