import SolarPanelArea from "./SolarPanelArea";

export default function SolarPanelAreas({
  rectangles,
  roof,
  selectRect,
  selectedRect,
  onChange,
  onDelete,
  scale,
}) {
  return rectangles.map((rect, i) => (
    <SolarPanelArea
      key={`panels-area-${i}-${rect.x}-${rect.y}`}
      rect={rect}
      roof={roof}
      selectRect={() => selectRect(i)}
      isSelected={i === selectedRect}
      onChange={onChange(i)}
      onDelete={onDelete(i)}
      scale={scale}
    />
  ));
}
