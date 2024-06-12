import { determineSolarPanelStatus, SOLAR_PANEL_STATUS } from "./index";

export const getSolarPanels = (
  solarPanelArea,
  roof,
  solarPanelSpecifications,
) => {
  const { solarPanelWidth, solarPanelHeight, solarPanelsSpacing } =
    solarPanelSpecifications;

  const newSolarPanels = [];
  const solarPanelWidthWithSpacing = solarPanelWidth + solarPanelsSpacing;
  const solarPanelHeightWithSpacing = solarPanelHeight + solarPanelsSpacing;

  const startCoords = {
    x: solarPanelArea.x,
    y: solarPanelArea.y,
  };
  const endCoords = {
    x: solarPanelArea.x + solarPanelArea.width,
    y: solarPanelArea.y + solarPanelArea.height,
  };

  const startX = startCoords.x;
  const startY = startCoords.y;
  const endX = endCoords.x;
  const endY = endCoords.y;

  for (let newX = startX; newX < endX; newX += solarPanelWidthWithSpacing) {
    for (let newY = startY; newY < endY; newY += solarPanelHeightWithSpacing) {
      const solarPanel = {
        x: newX,
        y: newY,
        width: solarPanelWidth,
        height: solarPanelHeight,
      };

      const newStatus = determineSolarPanelStatus(
        solarPanel,
        roof,
        solarPanelArea,
      );

      newSolarPanels.push({
        ...solarPanel,
        status: newStatus,
        isRemoved: false,
      });
    }
  }

  return newSolarPanels;
};

export const createSolarPanel = (startPos, currentPos) => {
  return {
    x: Math.min(startPos.x, currentPos.x),
    y: Math.min(startPos.y, currentPos.y),
    width: Math.abs(startPos.x - currentPos.x),
    height: Math.abs(startPos.y - currentPos.y),
    status: SOLAR_PANEL_STATUS.NORMAL,
    isRemoved: false,
    isNew: true,
  };
};

export const updateSolarPanels = (prevSolarPanels, newSolarPanels) => {
  const removedSolarPanelsIndexes = prevSolarPanels
    .map((solarPanel, i) => (solarPanel.isRemoved ? i : null))
    .filter((index) => index !== null);

  return newSolarPanels.map((solarPanel, i) => {
    const removedIndex = removedSolarPanelsIndexes.indexOf(i);

    if (removedIndex === -1 || solarPanel.status !== SOLAR_PANEL_STATUS.NORMAL)
      return solarPanel;

    return {
      ...solarPanel,
      isRemoved: true,
    };
  });
};
