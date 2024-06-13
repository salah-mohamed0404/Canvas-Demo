import { memo, useEffect, useRef } from "react";
import { Group } from "react-konva";
import { Html } from "react-konva-utils";

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
      <Html
        divProps={{
          style: {
            position: "absolute",
            top: `${y}px`,
            left: `${x}px`,
            translate: "-50% -50%",
            padding: "4px 8px",
            backgroundColor: "#222",
            color: "#ffffff",
            fontSize: "8px",
            textAlign: "center",
            fontWeight: "bold",
            zIndex: 1000,
          },
        }}
      >
        {dimension}
      </Html>
    </Group>
  );
});
