import { determineSolarPanelStatus, SOLAR_PANEL_STATUS } from "./index";

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
      // if (
      //   newX !== startX &&
      //   newY !== startY &&
      //   IsExceededRoofArea(
      //     {
      //       x: newX - solarPanelWidth,
      //       y: newY - solarPanelHeight,
      //       width: solarPanelWidth,
      //       height: solarPanelHeight,
      //     },
      //     roof,
      //   )
      // )
      //   continue;

      const solarPanel = {
        x: newX,
        y: newY,
        width: solarPanelWidth,
        height: solarPanelHeight,
      };

      const newStatus = determineSolarPanelStatus(solarPanel, roof, newBox);

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
