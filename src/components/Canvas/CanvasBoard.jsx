import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import MainRect from "./MainRect";
import StrokedRect from "./StrokedRect";
import TextWithBackground from "./TextWithBackground";
import MouseAxises from "./MouseAxises";
import SolarPanelAreas from "./SolarPanelAreas";
import CurrentAddingSolarPanelArea from "./SolarPanelAreas/CurrentAddingSolarPanelArea";
import { throttle } from "../../utils/throttle";
import { IsExceededRoofArea, createSolarPanel } from "../../utils/SolarPanel";
import useStageZoom from "../../hooks/useStageZoom";
import ScaleButtons from "./ScaleButtons";

const stageWidth = window.innerWidth;
const stageHeight = window.innerHeight;

const MAIN_RECT_WIDTH = 1000;
const MAIN_RECT_HEIGHT = 500;
const MAIN_RECT_COORDS = {
  x: stageWidth / 2 - MAIN_RECT_WIDTH / 2,
  y: stageHeight / 2 - MAIN_RECT_HEIGHT / 2,
};

const STROKED_RECT_WIDTH = 600;
const STROKED_RECT_HEIGHT = 300;
const STROKED_RECT_COORDS = {
  x: stageWidth / 2 - STROKED_RECT_WIDTH / 2,
  y: stageHeight / 2 - STROKED_RECT_HEIGHT / 2,
};

export default function CanvasBoard() {
  const [isHovering, setIsHovering] = useState(false);
  const [isAddingSolarPanelArea, setIsAddingSolarPanelArea] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rectangles, setRectangles] = useState([]);
  const [selectedRect, selectRect] = useState(null);
  const [startPos, setStartPos] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [mainRectDimensions, setMainRectDimensions] = useState({
    width: MAIN_RECT_WIDTH,
    height: MAIN_RECT_HEIGHT,
  });
  const [mainRectCoords, setMainRectCoords] = useState(MAIN_RECT_COORDS);
  const [strokedRectDimensions, setStrokedRectDimensions] = useState({
    width: STROKED_RECT_WIDTH,
    height: STROKED_RECT_HEIGHT,
  });
  const [strokedRectCoords, setStrokedRectCoords] =
    useState(STROKED_RECT_COORDS);
  const { stageRef, stageScale, stagePosition, increaseScale, decreaseScale } =
    useStageZoom();

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleMouseMove = throttle((event) => {
    if (!isAddingSolarPanelArea) return;

    const currentCoords = { x: event.clientX, y: event.clientY };

    setMousePosition(currentCoords);

    if (
      startPos &&
      IsExceededRoofArea(createSolarPanel(startPos, currentCoords), {
        ...mainRectDimensions,
        ...mainRectCoords,
      })
    )
      return;

    setCurrentPos(currentCoords);
  }, 5);

  const handleMouseDown = (event) => {
    if (!isAddingSolarPanelArea) return;

    setStartPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    if (!isAddingSolarPanelArea && !startPos) return;

    setIsAddingSolarPanelArea(false);

    setRectangles([...rectangles, createSolarPanel(startPos, currentPos)]);
    setStartPos(null);
    setCurrentPos(null);
  };

  const handleKeyDown = (event) => {
    // Escape key Code is 27
    if (event.keyCode === 27 && isAddingSolarPanelArea) {
      setIsAddingSolarPanelArea(false);
    }
  };

  // TODO: Control main rect drag
  // const handleDragMove = (e) => {
  //   setMainRectCoords((prevCoords) => ({
  //     x: e.target.x() + prevCoords.x,
  //     y: e.target.y() + prevCoords.y,
  //   }));
  // };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty =
      e.target === e.target.getStage() ||
      e.target.parent === e.target.getLayer();
    if (clickedOnEmpty) {
      selectRect(null);
    }
  };

  const handleRectChange = (i) => (newAttrs) => {
    setRectangles((prevRects) =>
      prevRects.map((rect, index) =>
        index === i ? { ...rect, ...newAttrs } : rect,
      ),
    );
  };

  return (
    <div
      className={`grid h-dvh w-dvw place-content-center overflow-hidden bg-neutral-300 ${
        isHovering ? "cursor-move" : ""
      } ${isAddingSolarPanelArea ? "cursor-crosshair" : ""}`}
      tabIndex={0}
      onMouseMoveCapture={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
    >
      <Stage
        ref={stageRef}
        width={stageWidth}
        height={stageHeight}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stagePosition.x}
        y={stagePosition.y}
        onTouchStart={checkDeselect}
        onMouseDown={checkDeselect}
      >
        <Layer
          draggable
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          // onDragMove={handleDragMove}
        >
          <MainRect {...mainRectCoords} {...mainRectDimensions} />
          <StrokedRect
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            {...strokedRectDimensions}
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
              ...mainRectDimensions,
              ...mainRectCoords,
            }}
            selectRect={selectRect}
            selectedRect={selectedRect}
            onChange={handleRectChange}
          />

          <CurrentAddingSolarPanelArea
            startPos={startPos}
            currentPos={currentPos}
            roof={{
              ...mainRectDimensions,
              ...mainRectCoords,
            }}
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
      <ScaleButtons
        stageScale={stageScale}
        increaseScale={increaseScale}
        decreaseScale={decreaseScale}
      />
    </div>
  );
}
