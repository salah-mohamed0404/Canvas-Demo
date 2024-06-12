import { memo, useEffect, useRef, useState } from "react";
import { Group, Rect, Transformer } from "react-konva";
import {
  SOLAR_PANEL_STATUS,
  SOLAR_PANEL_STATUS_COLOR,
  getSolarPanels,
  updateSolarPanels,
} from "../../../utils/SolarPanel";

const solarPanelWidth = 50;
const solarPanelHeight = 100;
const solarPanelsSpacing = 2;

export default memo(function SolarPanelArea({
  rect,
  roof,
  selectRect,
  isSelected,
  onChange,
  scale,
}) {
  const [solarPanels, setSolarPanels] = useState([]);
  const rectRef = useRef();
  const trRef = useRef();

  if (rect.isNew && rectRef.current && solarPanels.length !== 0) {
    const node = rectRef.current;
    const newX = node.attrs.x;
    const newY = node.attrs.y;
    const width = node.attrs.width;
    const height = node.attrs.height;

    const lastSolarPanel = solarPanels
      .filter((solarPanel) => solarPanel.status === SOLAR_PANEL_STATUS.NORMAL)
      .at(-1);

    if (lastSolarPanel) {
      const spaceToClipX =
        width - (lastSolarPanel.x + lastSolarPanel.width - newX);
      const spaceToClipY =
        height - (lastSolarPanel.y + lastSolarPanel.height - newY);

      const newRect = {
        x: newX,
        y: newY,
        // set minimal value
        width: width - spaceToClipX + solarPanelsSpacing,
        height: height - spaceToClipY + solarPanelsSpacing,
        isNew: false,
      };

      onChange(newRect);
    } else
      onChange({
        x: newX,
        y: newY,
        width,
        height,
        isNew: false,
      });
  }

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer().batchDraw();
      trRef.current.moveToTop();
    }
  }, [isSelected, onChange]);

  useEffect(() => {
    const newSolarPanels = getSolarPanels(rect, roof, {
      solarPanelWidth,
      solarPanelHeight,
      solarPanelsSpacing,
    });

    setSolarPanels((prevSolarPanels) =>
      updateSolarPanels(prevSolarPanels, newSolarPanels),
    );
  }, [rect, roof]);

  const handleRectClick = () => {
    selectRect();
  };

  const handleResizeLimit = (oldBox, newBox) => {
    const newRect = {
      x: rectRef.current.x(),
      y: rectRef.current.y(),
      width: newBox.width / scale,
      height: newBox.height / scale,
    };

    const newSolarPanels = getSolarPanels(newRect, roof, {
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

  const handleTransformEnd = () => {
    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = rectRef.current;
    const newX = node.x();
    const newY = node.y();
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const width = node.width();
    const height = node.height();
    const newWidth = width * scaleX;
    const newHeight = height * scaleY;

    // reset it back
    node.scaleX(1);
    node.scaleY(1);
    const lastSolarPanel = solarPanels
      .filter((solarPanel) => solarPanel.status === SOLAR_PANEL_STATUS.NORMAL)
      .at(-1);

    if (solarPanels.length === 0 || !lastSolarPanel)
      return onChange({ x: newX, y: newY, width: newWidth, height: newHeight });

    const spaceToClipX =
      newWidth - (lastSolarPanel.x + lastSolarPanel.width - newX);
    const spaceToClipY =
      newHeight - (lastSolarPanel.y + lastSolarPanel.height - newY);

    const newRect = {
      x: newX,
      y: newY,
      width: newWidth - spaceToClipX + solarPanelsSpacing,
      height: newHeight - spaceToClipY + solarPanelsSpacing,
    };

    onChange(newRect);
  };

  const handleDragEnd = (e) => {
    const newCoords = {
      x: e.target.x() + rect.x,
      y: e.target.y() + rect.y,
    };

    onChange(newCoords);
  };

  return (
    <Group
      draggable
      onClick={handleRectClick}
      onTap={handleRectClick}
      onDragEnd={handleDragEnd}
    >
      <Rect
        ref={rectRef}
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        stroke="#111"
      />
      {isSelected && (
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
          onTransformEnd={handleTransformEnd}
        />
      )}
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
