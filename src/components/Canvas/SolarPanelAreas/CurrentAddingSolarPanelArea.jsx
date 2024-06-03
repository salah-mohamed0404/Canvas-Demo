import { Rect } from "react-konva";

export default function CurrentAddingSolarPanelArea({ startPos, currentPos }) {
  return (
    startPos &&
    currentPos && (
      <Rect
        x={Math.min(startPos.x, currentPos.x)}
        y={Math.min(startPos.y, currentPos.y)}
        width={Math.abs(startPos.x - currentPos.x)}
        height={Math.abs(startPos.y - currentPos.y)}
        stroke="rgba(0,0,0,0.5)"
      />
    )
  );
}
