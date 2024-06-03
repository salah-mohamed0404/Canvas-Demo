export default function MouseAxises({ mousePosition }) {
  return (
    <>
      <div
        className="absolute inset-y-0 w-1 border-l-2 border-dashed border-neutral-500"
        style={{ left: `${mousePosition.x}px` }}
      ></div>
      <div
        className="absolute inset-x-0 h-1 border-t-2 border-dashed border-neutral-500"
        style={{ top: `${mousePosition.y}px` }}
      ></div>
    </>
  );
}
