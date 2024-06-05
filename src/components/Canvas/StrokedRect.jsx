import { memo } from "react";
import { Rect } from "react-konva";

export default memo(function StrokedRect({ x, y, width, height, title }) {
  return (
    <>
      <Rect x={x} y={y} width={width} height={height} stroke="#B8860B" />

      {title}
    </>
  );
});
