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

export const determineSolarPanelStatus = (solarPanel, roof, newBox) =>
  IsExceededRoofArea(solarPanel, roof)
    ? SOLAR_PANEL_STATUS.WARNING
    : IsPossibleToAddSolarPanel(solarPanel, newBox)
      ? SOLAR_PANEL_STATUS.POSSIBLE
      : SOLAR_PANEL_STATUS.NORMAL;

const determineDrawDirection = (oldBox, newBox) => {
  if (!oldBox.x || !oldBox.y) return { x: 0, y: 0 };

  const direction = {
    x: newBox.x - oldBox.x,
    y: newBox.y - oldBox.y,
  };

  return direction;
};

const getStartAndEndCoords = (newBox, direction) => {
  if (direction.x === 0 && direction.y === 0)
    return {
      startCoords: {
        x: newBox.x,
        y: newBox.y,
      },
      endCoords: {
        x: newBox.x + newBox.width,
        y: newBox.y + newBox.height,
      },
    };

  const startCoords = {
    x: direction.x > 0 ? newBox.x : newBox.x + newBox.width,
    y: direction.y > 0 ? newBox.y : newBox.y + newBox.height,
  };

  const endCoords = {
    x: direction.x > 0 ? newBox.x + newBox.width : newBox.x,
    y: direction.y > 0 ? newBox.y + newBox.height : newBox.y,
  };

  return { startCoords, endCoords };
};

export const getSolarPanels = (
  oldBox,
  newBox,
  roof,
  solarPanelSpecifications,
) => {
  const { solarPanelWidth, solarPanelHeight, solarPanelsSpacing } =
    solarPanelSpecifications;

  const newSolarPanels = [];
  const solarPanelWidthWithSpacing = solarPanelWidth + solarPanelsSpacing;
  const solarPanelHeightWithSpacing = solarPanelHeight + solarPanelsSpacing;

  // const drawDirection = determineDrawDirection(oldBox, newBox);
  const drawDirection = { x: 0, y: 0 };
  const { startCoords, endCoords } = getStartAndEndCoords(
    newBox,
    drawDirection,
  );

  const startX = startCoords.x;
  const startY = startCoords.y;
  const endX = endCoords.x;
  const endY = endCoords.y;

  const isXLoopEnd = (x) => (startX < endX ? x < endX : x > endX);
  const isYLoopEnd = (y) => (startY < endY ? y < endY : y > endY);

  const incrementX =
    startX < endX ? solarPanelWidthWithSpacing : -solarPanelWidthWithSpacing;
  const incrementY =
    startY < endY ? solarPanelHeightWithSpacing : -solarPanelHeightWithSpacing;

  for (let newX = startX; isXLoopEnd(newX); newX += incrementX) {
    for (let newY = startY; isYLoopEnd(newY); newY += incrementY) {
      if (
        newX !== startX &&
        newY !== startY &&
        IsExceededRoofArea(
          {
            x: newX - solarPanelWidth,
            y: newY - solarPanelHeight,
            width: solarPanelWidth,
            height: solarPanelHeight,
          },
          roof,
        )
      )
        continue;

      const solarPanel = {
        x: newX,
        y: newY,
        width: solarPanelWidth,
        height: solarPanelHeight,
      };

      const newStatus = determineSolarPanelStatus(solarPanel, roof, newBox);

      newSolarPanels.push({
        x: newX,
        y: newY,
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
  };
};
