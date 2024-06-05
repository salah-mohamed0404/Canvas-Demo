import { SCALE_LIMITS } from "../../hooks/useStageZoom";

export default function ScaleButtons({
  stageScale,
  increaseScale,
  decreaseScale,
}) {
  const zoomPercentage =
    stageScale === SCALE_LIMITS.max
      ? SCALE_LIMITS.max * 100
      : parseInt(parseFloat((stageScale % 10).toFixed(2)) * 100);

  return (
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-center gap-3">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 font-bold"
        onClick={increaseScale}
      >
        +
      </button>
      <span className="px-2">{zoomPercentage}%</span>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 font-bold"
        onClick={decreaseScale}
      >
        -
      </button>
    </div>
  );
}
