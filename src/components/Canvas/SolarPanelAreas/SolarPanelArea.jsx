import { memo, useEffect, useRef, useState } from "react";
import { Group, Rect, Transformer } from "react-konva";
import {
  SOLAR_PANEL_STATUS,
  SOLAR_PANEL_STATUS_COLOR,
  IsExceededRoofArea,
  getSolarPanels,
} from "../../../utils/SolarPanel";

const solarPanelWidth = 30;
const solarPanelHeight = 60;
const solarPanelsSpacing = 5;

export default memo(function SolarPanelArea({ rect, roof }) {
  const [solarPanels, setSolarPanels] = useState([]);
  const rectRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    const newSolarPanels = getSolarPanels({}, rect, roof, {
      solarPanelWidth,
      solarPanelHeight,
      solarPanelsSpacing,
    });

    setSolarPanels(newSolarPanels);
  }, [rect, roof]);

  const handleRectClick = () => {
    trRef.current.nodes([rectRef.current]);
    trRef.current.getLayer().batchDraw();
  };

  const handleResizeLimit = (oldBox, newBox) => {
    if (IsExceededRoofArea(newBox, roof)) return oldBox;

    const newSolarPanels = getSolarPanels(oldBox, newBox, roof, {
      solarPanelWidth,
      solarPanelHeight,
      solarPanelsSpacing,
    });

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

  // const handleTransformEnd = () => {
  //   const filteredSolarPanels = solarPanels.filter(
  //     (solarPanel) => solarPanel.status === SOLAR_PANEL_STATUS.NORMAL,
  //   );
  //   const lastSolarPanel = filteredSolarPanels.at(-1);
  //   const rectAttrs = rectRef.current.attrs;
  //   console.log("lastSolarPanel", lastSolarPanel);
  //   console.log("rectAttrs", rectAttrs);

  //   // rectAttrs.width =
  //   //   Math.abs(lastSolarPanel.x - rectAttrs.x) + solarPanelWidth;
  //   // rectAttrs.height =
  //   //   Math.abs(lastSolarPanel.y - rectAttrs.y) + solarPanelHeight;

  //   setSolarPanels(filteredSolarPanels);

  //   // trRef.current.nodes([rectRef.current]);
  //   // trRef.current.getLayer().batchDraw();
  // };

  // const handleDragMove = () => {
  //   // console.log("solarPanels", solarPanels[0]);
  //   // console.log("roof", roof);
  //   setSolarPanels((prevSolarPanels) =>
  //     prevSolarPanels.map((solarPanel) => ({
  //       ...solarPanel,
  //       status: IsExceededRoofArea(solarPanel, roof)
  //         ? SOLAR_PANEL_STATUS.WARNING
  //         : SOLAR_PANEL_STATUS.NORMAL,
  //     })),
  //   );
  // };

  return (
    <Group
      draggable
      onClick={handleRectClick}
      // onDragMove={handleDragMove}
      // dragBoundFunc={(pos) => {
      //   const group = rectRef.current.getStage();
      //   const size = group.getSize();
      //   console.log("pos", pos);
      //   console.log("roof", roof);

      //   // Get the mainRectCoords from the parent component via props
      //   const {
      //     x: mainRectX,
      //     y: mainRectY,
      //     width: mainRectWidth,
      //     height: mainRectHeight,
      //   } = roof;

      //   return {
      //     x: Math.min(
      //       Math.max(pos.x, mainRectX),
      //       mainRectX + mainRectWidth - rect.width,
      //     ),
      //     y: Math.min(
      //       Math.max(pos.y, mainRectY),
      //       mainRectY + mainRectHeight - rect.height,
      //     ),
      //   };
      // }}
    >
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
        // onTransformEnd={handleTransformEnd}
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
