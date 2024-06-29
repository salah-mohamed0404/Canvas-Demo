export default function Tooltip({ position = { x: 0, y: 0 }, children }) {
  return (
    <div
      className="absolute flex -translate-y-1/2 flex-col justify-center rounded-sm bg-gray-200 p-2 text-sm shadow-sm *:whitespace-nowrap"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      {children}
    </div>
  );
}
