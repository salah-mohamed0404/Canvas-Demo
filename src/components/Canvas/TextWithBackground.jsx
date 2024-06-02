import { Group, Rect, Text } from "react-konva";

export default function TextWithBackground({ stageWidth, stageHeight }) {
  return (
    <Group>
      <Rect
        x={stageWidth / 2 - 40} // Half of the stage width minus half of the Rect width to center it horizontally
        y={stageHeight / 2 - 150 + 285} // Adjusted y coordinate to center the text in the bottom line of the stroked rect
        width={80}
        height={30}
        fill="#B8860B"
      />
      <Text
        x={stageWidth / 2 - 22} // Half of the stage width minus half of the Rect width to center it horizontally
        y={stageHeight / 2 - 150 + 295} // Adjusted y coordinate to center the text in the bottom line of the stroked rect
        text="Randzon"
        fill="white"
      />
    </Group>
  );
}
