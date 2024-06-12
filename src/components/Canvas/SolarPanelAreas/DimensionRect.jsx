import { memo, useEffect, useRef } from "react";
import { Group, Rect, Text } from "react-konva";

const WIDTH = 50;
const HEIGHT = 20;

const calculateDimension = (dimension) => `${(dimension / 100).toFixed(2)} m`;

export default memo(function DimensionRect({ x, y, width, height }) {
  const ref = useRef(null);
  const dimension = width
    ? calculateDimension(width)
    : height
      ? calculateDimension(height)
      : calculateDimension(0);

  useEffect(() => {
    ref.current.moveToTop();
  }, []);

  return (
    <Group ref={ref}>
      <Rect
        x={x - (WIDTH * 3) / 5}
        y={y - (HEIGHT * 3) / 4}
        width={WIDTH}
        height={HEIGHT}
        fill="#222"
      />
      <Text
        x={x - (WIDTH * 3) / 4 + WIDTH / 3}
        y={y - (HEIGHT * 3) / 4 + HEIGHT / 3}
        fill="#ffffff"
        fontSize={8}
        text={dimension}
      />
    </Group>
  );
});
