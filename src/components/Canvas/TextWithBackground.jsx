import { Group, Rect, Text } from "react-konva";

export default function TextWithBackground({
  strokedRectWidth,
  strokedRectHeight,
  strokedRectCoords,
  scale,
}) {
  return (
    <Group>
      <Rect
        x={strokedRectCoords.x + strokedRectWidth / 2 - 40 * scale}
        y={strokedRectCoords.y + strokedRectHeight - 15 * scale}
        width={80}
        height={30}
        fill="#B8860B"
        scale={{ x: scale, y: scale }}
      />
      <Text
        x={strokedRectCoords.x + strokedRectWidth / 2 - 22 * scale}
        y={strokedRectCoords.y + strokedRectHeight - 5 * scale}
        text="Randzon"
        fill="white"
        fontSize={12 * scale}
      />
    </Group>
  );
}
