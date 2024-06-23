import { memo } from "react";
import { Html } from "react-konva-utils";

export default memo(function TotalPanelsCount({
  position,
  totalCountX,
  totalCountY,
}) {
  return (
    <Html>
      <div
        className="absolute flex -translate-y-1/2 flex-col justify-center bg-gray-200 p-2 text-sm *:whitespace-nowrap"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      >
        {/* {totalCountX} | {totalCountY} */}
        <p>Panels Y: {totalCountY}</p>
        <p>Panels X: {totalCountX}</p>
        <p>Total Panels: {totalCountX * totalCountY}</p>
      </div>
    </Html>
  );
});
