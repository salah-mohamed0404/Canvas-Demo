import SolarPanelArea from "./SolarPanelArea";

export default function SolarPanelAreas({ rectangles, roof }) {
  return rectangles.map((rect, i) => (
    <SolarPanelArea
      key={`panels-area-${i}-${rect.x}-${rect.y}`}
      rect={rect}
      roof={roof}
    />
  ));
}
