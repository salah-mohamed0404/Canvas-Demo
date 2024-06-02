import { useState } from "react";
import { Layer, Stage } from "react-konva";
import MainRect from "./MainRect";
import StrokedRect from "./StrokedRect";
import TextWithBackground from "./TextWithBackground";
import { throttle } from "../../utils/throttle";
import MouseAxises from "./MouseAxises";

const stageWidth = window.innerWidth;
const stageHeight = window.innerHeight;

const mainRectWidth = 800;
const mainRectHeight = 400;
const mainRectCoords = {
  x: stageWidth / 2 - mainRectWidth / 2,
  y: stageHeight / 2 - mainRectHeight / 2,
};

const strokedRectWidth = 600;
const strokedRectHeight = 300;
const strokedRectCoords = {
  x: stageWidth / 2 - strokedRectWidth / 2,
  y: stageHeight / 2 - strokedRectHeight / 2,
};

export default function CanvasBoard() {
  const [isHovering, setIsHovering] = useState(false);
  const [isAddingSolarPanelArea, setIsAddingSolarPanelArea] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = throttle((event) => {
    setMousePosition({ x: event.evt.clientX, y: event.evt.clientY });
  }, 60);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      className={`grid h-dvh w-dvw place-content-center bg-neutral-300 ${isHovering ? "cursor-move" : ""} ${isAddingSolarPanelArea ? "cursor-crosshair" : ""}`}
    >
      <Stage
        width={stageWidth}
        height={stageHeight}
        onMouseMove={handleMouseMove}
      >
        <Layer
          draggable
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MainRect
            {...mainRectCoords}
            width={mainRectWidth}
            height={mainRectHeight}
          />
          <StrokedRect
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            width={600}
            height={300}
            {...strokedRectCoords}
            title={
              <TextWithBackground
                stageWidth={stageWidth}
                stageHeight={stageHeight}
              />
            }
          />
        </Layer>
      </Stage>

      <button
        className="bg-primary-500 absolute right-5 top-5 rounded-md bg-slate-800 p-2 px-6 py-3 text-white"
        onClick={() => setIsAddingSolarPanelArea((prev) => !prev)}
      >
        {isAddingSolarPanelArea ? "Cancel" : "Add Solar Panel Area"}
      </button>
      {isAddingSolarPanelArea && <MouseAxises mousePosition={mousePosition} />}
    </div>
  );
}
