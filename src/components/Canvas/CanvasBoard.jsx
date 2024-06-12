import { useState } from "react";
import { Layer, Stage } from "react-konva";
import MainRect from "./MainRect";
import StrokedRect from "./StrokedRect";
import TextWithBackground from "./TextWithBackground";
import Axises from "./Axises";
import SolarPanelAreas from "./SolarPanelAreas";
import CurrentAddingSolarPanelArea from "./SolarPanelAreas/CurrentAddingSolarPanelArea";
import ScaleButtons from "./ScaleButtons";
import useStageZoom from "../../hooks/useStageZoom";
import { throttle } from "../../utils/throttle";
import {
  IsExceededRoofArea,
  createSolarPanel,
  MAIN_RECT_COORDS,
  MAIN_RECT_HEIGHT,
  MAIN_RECT_WIDTH,
  STROKED_RECT_COORDS,
  STROKED_RECT_HEIGHT,
  STROKED_RECT_WIDTH,
  STAGE_HEIGHT,
  STAGE_WIDTH,
} from "../../utils/SolarPanel";

export default function CanvasBoard() {
  const [isHovering, setIsHovering] = useState(false);
  const [isAddingSolarPanelArea, setIsAddingSolarPanelArea] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rectangles, setRectangles] = useState([]);
  const [selectedRect, selectRect] = useState(null);
  const [startPos, setStartPos] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [layerCoords, setLayerCoords] = useState({ x: 0, y: 0 });
  const {
    stageRef,
    stageScale,
    stagePosition,
    titleScale,
    increaseScale,
    decreaseScale,
  } = useStageZoom();

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleMouseMove = throttle((event) => {
    if (!isAddingSolarPanelArea) return;

    const newCoords = {
      x: event.clientX - layerCoords.x,
      y: event.clientY - layerCoords.y,
    };

    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });

    if (
      startPos &&
      IsExceededRoofArea(createSolarPanel(startPos, newCoords), {
        width: MAIN_RECT_WIDTH,
        height: MAIN_RECT_HEIGHT,
        ...MAIN_RECT_COORDS,
      })
    )
      return;

    setCurrentPos(newCoords);
  }, 5);

  const handleMouseDown = (event) => {
    if (!isAddingSolarPanelArea) return;

    setStartPos({
      x: event.clientX - layerCoords.x,
      y: event.clientY - layerCoords.y,
    });
  };

  const handleMouseUp = () => {
    if (!isAddingSolarPanelArea && !startPos) return;

    setIsAddingSolarPanelArea(false);

    setRectangles([...rectangles, createSolarPanel(startPos, currentPos)]);
    selectRect(rectangles?.length);
    setStartPos(null);
    setCurrentPos(null);
  };

  const handleKeyDown = (event) => {
    // Escape key Code is 27
    if (event.keyCode === 27 && isAddingSolarPanelArea) {
      setIsAddingSolarPanelArea(false);
    }
  };

  const handleDragMove = (event) => {
    const target = event.target;
    setLayerCoords({ x: target.x(), y: target.y() });
  };

  const checkDeselect = (e) => {
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
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stagePosition.x}
        y={stagePosition.y}
        onTouchStart={checkDeselect}
        onMouseDown={checkDeselect}
      >
        <Layer
          x={layerCoords.x}
          y={layerCoords.y}
          draggable
          onDragMove={handleDragMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MainRect
            height={MAIN_RECT_HEIGHT}
            width={MAIN_RECT_WIDTH}
            {...MAIN_RECT_COORDS}
          />
          <StrokedRect
            stageWidth={STAGE_WIDTH}
            stageHeight={STAGE_HEIGHT}
            width={STROKED_RECT_WIDTH}
            height={STROKED_RECT_HEIGHT}
            {...STROKED_RECT_COORDS}
            scale={titleScale}
            title={
              <TextWithBackground
                strokedRectWidth={STROKED_RECT_WIDTH}
                strokedRectHeight={STROKED_RECT_HEIGHT}
                strokedRectCoords={STROKED_RECT_COORDS}
                scale={titleScale}
              />
            }
          />
        </Layer>

        <Layer
          x={layerCoords.x}
          y={layerCoords.y}
          draggable
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SolarPanelAreas
            rectangles={rectangles}
            roof={{
              width: MAIN_RECT_WIDTH,
              height: MAIN_RECT_HEIGHT,
              ...MAIN_RECT_COORDS,
            }}
            selectRect={selectRect}
            selectedRect={selectedRect}
            onChange={handleRectChange}
            scale={stageScale}
          />

          <CurrentAddingSolarPanelArea
            startPos={startPos}
            currentPos={currentPos}
            roof={{
              width: MAIN_RECT_WIDTH,
              height: MAIN_RECT_HEIGHT,
              ...MAIN_RECT_COORDS,
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
      {isAddingSolarPanelArea && <Axises position={mousePosition} />}
      <ScaleButtons
        stageScale={stageScale}
        increaseScale={increaseScale}
        decreaseScale={decreaseScale}
      />
    </div>
  );
}
