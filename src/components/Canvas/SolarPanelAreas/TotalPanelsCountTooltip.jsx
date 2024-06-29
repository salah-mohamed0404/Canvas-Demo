import { memo } from "react";
import { Html } from "react-konva-utils";
import Tooltip from "../../Tooltip";

export default memo(function TotalPanelsCountTooltip({
  position = { x: 0, y: 0 },
  totalCountX = 0,
  totalCountY = 0,
}) {
  return (
    <Html>
      <Tooltip position={position}>
        {/* {totalCountX} | {totalCountY} */}
        <p>Panels Y: {totalCountY}</p>
        <p>Panels X: {totalCountX}</p>
        <p>Total Panels: {totalCountX * totalCountY}</p>
      </Tooltip>
    </Html>
  );
});
