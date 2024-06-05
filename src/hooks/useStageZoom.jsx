import { useCallback, useEffect, useRef, useState } from "react";

const CHANGE_RATIO = 1.05;
const SCALE_LIMITS = {
  min: 0.01,
  max: 100,
};

const isExceededScaleMinLimit = (scale) => scale < SCALE_LIMITS.min;

const isExceededScaleMaxLimit = (scale) => scale > SCALE_LIMITS.max;

export default function useStageZoom() {
  const stageRef = useRef(null);
  const [stageScale, setStageScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });

  const makeSureNotExceedScaleLimits = useCallback((stageScale) => {
    if (isExceededScaleMinLimit(stageScale)) {
      setStageScale(SCALE_LIMITS.min);
      return false;
    }
    if (isExceededScaleMaxLimit(stageScale)) {
      setStageScale(SCALE_LIMITS.max);
      return false;
    }

    return true;
  }, []);

  const increaseScale = () => {
    if (!makeSureNotExceedScaleLimits(stageScale)) return;

    setStageScale((prevScale) => prevScale * CHANGE_RATIO);
  };

  const decreaseScale = () => {
    if (!makeSureNotExceedScaleLimits(stageScale)) return;

    setStageScale((prevScale) => prevScale / CHANGE_RATIO);
  };

  useEffect(() => {
    const stage = stageRef.current;

    const handleWheel = (e) => {
      e.evt.preventDefault();

      const oldScale = stageScale;
      const pointer = stage.getPointerPosition();

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      const direction = e.evt.deltaY < 0 ? 1 : -1;

      const newScale =
        direction > 0 ? oldScale * CHANGE_RATIO : oldScale / CHANGE_RATIO;

      console.log("newScale", newScale);

      if (!makeSureNotExceedScaleLimits(newScale)) return;

      setStageScale(newScale);

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      setStagePosition(newPos);
    };

    stage.on("wheel", handleWheel);

    return () => {
      stage.off("wheel", handleWheel);
    };
  }, [stageScale, makeSureNotExceedScaleLimits]);

  return { stageRef, stageScale, stagePosition, increaseScale, decreaseScale };
}
