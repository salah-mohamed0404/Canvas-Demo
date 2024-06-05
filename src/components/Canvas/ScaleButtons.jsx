export default function ScaleButtons({
  stageScale,
  increaseScale,
  decreaseScale,
}) {
  const zoomPercentage =
    stageScale == 1
      ? 100
      : parseInt(parseFloat((stageScale % 10).toFixed(2)) * 100);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <button className="rounded-full bg-gray-200 p-2" onClick={increaseScale}>
        +
      </button>
      <span className="px-2">{zoomPercentage}%</span>
      <button className="rounded-full bg-gray-200 p-2" onClick={decreaseScale}>
        -
      </button>
    </div>
  );
}
