export const SOLAR_PANEL_STATUS = {
  NORMAL: "normal",
  WARNING: "warning",
  POSSIBLE: "possible",
};

export const SOLAR_PANEL_STATUS_COLOR = {
  normal: "#444",
  warning: "#7a3333",
  possible: "#444",
  removed: "#fff",
};

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
