import { memo, useRef, useState } from "react";
import { Group, Rect, Transformer } from "react-konva";
import {
  IsExceededRoofArea,
  IsPossibleToAddSolarPanel,
  SOLAR_PANEL_STATUS,
  SOLAR_PANEL_STATUS_COLOR,
} from "../../../utils/SolarPanel";

const solarPanelWidth = 30;
const solarPanelHeight = 60;
const solarPanelsSpacing = 5;

const determineSolarPanelStatus = (solarPanel, roof, newBox) =>
  IsExceededRoofArea(solarPanel, roof)
    ? SOLAR_PANEL_STATUS.WARNING
    : IsPossibleToAddSolarPanel(solarPanel, newBox)
      ? SOLAR_PANEL_STATUS.POSSIBLE
      : SOLAR_PANEL_STATUS.NORMAL;

export default memo(function SolarPanelArea({ rect, roof }) {
  const [solarPanels, setSolarPanels] = useState([]);
  const rectRef = useRef();
  const trRef = useRef();

  const handleRectClick = () => {
    trRef.current.nodes([rectRef.current]);
    trRef.current.getLayer().batchDraw();
  };

  const handleResizeLimit = (oldBox, newBox) => {
    if (IsExceededRoofArea(newBox, roof)) return oldBox;

    const newSolarPanels = [];
    const startX = newBox.x;
    const startY = newBox.y;
    const endX = newBox.x + newBox.width;
    const endY = newBox.y + newBox.height;

    for (
      let newX = startX;
      newX < endX;
      newX += solarPanelWidth + solarPanelsSpacing
    ) {
      for (
        let newY = startY;
        newY < endY;
        newY += solarPanelHeight + solarPanelsSpacing
      ) {
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

    setSolarPanels(newSolarPanels);

    return newBox;
  };

  const handleRemoveSolarPanel = (index) => () => {
    setSolarPanels((prevSolarPanels) =>
      prevSolarPanels.map((solarPanel, i) =>
        i === index
          ? { ...solarPanel, isRemoved: !solarPanel.isRemoved }
          : solarPanel,
      ),
    );
  };

  return (
    <Group draggable onClick={handleRectClick}>
      <Rect
        ref={rectRef}
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        stroke="#111"
      />
      <Transformer
        ref={trRef}
        anchorFill="#111"
        anchorStroke="#111"
        anchorCornerRadius={1000}
        borderStroke="#111"
        rotateEnabled={false}
        keepRatio={false}
        enabledAnchors={[
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
        ]}
        boundBoxFunc={handleResizeLimit}
      />
      <Group>
        {solarPanels.map((solarPanel, i) => (
          <Rect
            key={`solar-panel-${i}`}
            x={solarPanel.x}
            y={solarPanel.y}
            width={solarPanelWidth}
            height={solarPanelHeight}
            fill={
              solarPanel.isRemoved
                ? SOLAR_PANEL_STATUS_COLOR.removed
                : SOLAR_PANEL_STATUS_COLOR[solarPanel.status]
            }
            opacity={solarPanel.status === SOLAR_PANEL_STATUS.NORMAL ? 1 : 0.5}
            onClick={
              solarPanel.status === SOLAR_PANEL_STATUS.NORMAL
                ? handleRemoveSolarPanel(i)
                : null
            }
          />
        ))}
      </Group>
    </Group>
  );
});
