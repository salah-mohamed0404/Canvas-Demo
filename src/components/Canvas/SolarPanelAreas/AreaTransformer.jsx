import { Transformer } from "react-konva";

export default function AreaTransformer({ trRef, onResize, onTransformEnd }) {
  return (
    <Transformer
      ref={trRef}
      anchorFill="#111"
      anchorStroke="#111"
      anchorCornerRadius={1000}
      borderStroke="#111"
      rotateEnabled={false}
      keepRatio={false}
      enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
      boundBoxFunc={onResize}
      onTransformEnd={onTransformEnd}
    />
  );
}
