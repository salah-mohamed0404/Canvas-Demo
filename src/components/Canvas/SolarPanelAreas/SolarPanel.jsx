import { memo } from "react";
import { Group, Image, Rect } from "react-konva";
import {
  SOLAR_PANEL_STATUS,
  SOLAR_PANEL_STATUS_COLOR,
} from "../../../utils/SolarPanel";

export default memo(function SolarPanel({
  solarPanel,
  solarPanelWidth,
  solarPanelHeight,
  onRemoveSolarPanel,
  hasLogoImage,
  image,
  imageRef,
  isSelected,
}) {
  return (
    <Group>
      <Rect
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
            ? onRemoveSolarPanel
            : null
        }
      />
      {!isSelected &&
      hasLogoImage &&
      image &&
      solarPanel.status === SOLAR_PANEL_STATUS.NORMAL ? (
        <Image
          ref={imageRef}
          image={image}
          x={solarPanel.x + solarPanelWidth / 2 - 12}
          y={solarPanel.y + solarPanelHeight / 2 - 4}
          width={24}
          height={8}
        />
      ) : null}
    </Group>
  );
});
