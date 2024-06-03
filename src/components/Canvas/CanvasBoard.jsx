import { useState } from "react";
import { Layer, Stage } from "react-konva";
import MainRect from "./MainRect";
import StrokedRect from "./StrokedRect";
import TextWithBackground from "./TextWithBackground";
import { throttle } from "../../utils/throttle";
import MouseAxises from "./MouseAxises";
import SolarPanelAreas from "./SolarPanelAreas";
import CurrentAddingSolarPanelArea from "./SolarPanelAreas/CurrentAddingSolarPanelArea";

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
  const [rectangles, setRectangles] = useState([]);
  const [startPos, setStartPos] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleMouseMove = throttle((event) => {
    if (!isAddingSolarPanelArea) return;

    setMousePosition({ x: event.clientX, y: event.clientY });
    setCurrentPos({ x: event.clientX, y: event.clientY });
  }, 5);

  const handleMouseDown = (event) => {
    if (!isAddingSolarPanelArea) return;

    setStartPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    if (!isAddingSolarPanelArea && !startPos) return;

    setIsAddingSolarPanelArea(false);

    setRectangles([
      ...rectangles,
      {
        x: Math.min(startPos.x, currentPos.x),
        y: Math.min(startPos.y, currentPos.y),
        width: Math.abs(startPos.x - currentPos.x),
        height: Math.abs(startPos.y - currentPos.y),
      },
    ]);
    setStartPos(null);
    setCurrentPos(null);
  };

  const handleKeyDown = (event) => {
    // Escape key Code is 27
    if (event.keyCode === 27 && isAddingSolarPanelArea) {
      setIsAddingSolarPanelArea(false);
    }
  };

  return (
    <div
      className={`grid h-dvh w-dvw place-content-center overflow-hidden bg-neutral-300 ${
        isHovering ? "cursor-move" : ""
      } ${isAddingSolarPanelArea ? "cursor-crosshair" : ""}`}
      onMouseMoveCapture={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <Stage width={stageWidth} height={stageHeight}>
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

          <SolarPanelAreas
            rectangles={rectangles}
            roof={{
              width: mainRectWidth,
              height: mainRectHeight,
              ...mainRectCoords,
            }}
          />

          <CurrentAddingSolarPanelArea
            startPos={startPos}
            currentPos={currentPos}
          />
        </Layer>
      </Stage>

      <button
        type="button"
        className="bg-primary-500 absolute right-5 top-5 rounded-md bg-slate-800 p-2 px-6 py-3 text-white"
        onClick={() => setIsAddingSolarPanelArea(true)}
      >
        {isAddingSolarPanelArea ? "Adding" : "Add Solar Panel Area"}
      </button>
      {isAddingSolarPanelArea && <MouseAxises mousePosition={mousePosition} />}
    </div>
  );
}
