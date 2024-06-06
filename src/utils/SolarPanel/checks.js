import { SOLAR_PANEL_STATUS } from "./index";

export const IsExceededRoofArea = (area, roof) => {
  const areaStartX = area.x;
  const areaEndX = area.x + area.width;
  const areaStartY = area.y;
  const areaEndY = area.y + area.height;

  const roofStartX = roof.x;
  const roofEndX = roof.x + roof.width;
  const roofStartY = roof.y;
  const roofEndY = roof.y + roof.height;

  return (
    areaStartX < roofStartX ||
    areaEndX > roofEndX ||
    areaStartY < roofStartY ||
    areaEndY > roofEndY
  );
};

export const IsPossibleToAddSolarPanel = (solarPanel, rect) => {
  const solarPanelStartX = solarPanel.x;
  const solarPanelEndX = solarPanel.x + solarPanel.width;
  const solarPanelStartY = solarPanel.y;
  const solarPanelEndY = solarPanel.y + solarPanel.height;

  const rectStartX = rect.x;
  const rectEndX = rect.x + rect.width;
  const rectStartY = rect.y;
  const rectEndY = rect.y + rect.height;

  return (
    solarPanelStartX < rectStartX ||
    solarPanelEndX > rectEndX ||
    solarPanelStartY < rectStartY ||
    solarPanelEndY > rectEndY
  );
};

export const determineSolarPanelStatus = (solarPanel, roof, newBox) =>
  IsExceededRoofArea(solarPanel, roof)
    ? SOLAR_PANEL_STATUS.WARNING
    : IsPossibleToAddSolarPanel(solarPanel, newBox)
      ? SOLAR_PANEL_STATUS.POSSIBLE
      : SOLAR_PANEL_STATUS.NORMAL;

// const determineDrawDirection = (oldBox, newBox) => {
//   if (!oldBox.x || !oldBox.y) return { x: 0, y: 0 };

//   const direction = {
//     x: newBox.x - oldBox.x,
//     y: newBox.y - oldBox.y,
//   };

//   return direction;
// };
