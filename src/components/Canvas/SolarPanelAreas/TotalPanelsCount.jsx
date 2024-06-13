import { Html } from "react-konva-utils";

export default function TotalPanelsCount({ totalCountX, totalCountY }) {
  return (
    <Html>
      {totalCountX} | {totalCountY}
    </Html>
  );
}
