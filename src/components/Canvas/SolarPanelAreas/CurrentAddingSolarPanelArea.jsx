import SolarPanelArea from "./SolarPanelArea";

export default function CurrentAddingSolarPanelArea({
  startPos,
  currentPos,
  roof,
}) {
  return (
    startPos &&
    currentPos && (
      <SolarPanelArea
        rect={{
          x: Math.min(startPos.x, currentPos.x),
          y: Math.min(startPos.y, currentPos.y),
          width: Math.abs(startPos.x - currentPos.x),
          height: Math.abs(startPos.y - currentPos.y),
        }}
        roof={roof}
      />
    )
  );
}
