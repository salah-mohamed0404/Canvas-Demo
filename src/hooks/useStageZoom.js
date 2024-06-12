import { useCallback, useEffect, useRef, useState } from "react";

const CHANGE_RATIO = 1.05;
const TITLE_CHANGE_RATIO = 1.04;
export const SCALE_LIMITS = {
  min: 0.01,
  max: 10,
};

const isExceededScaleMinLimit = (scale) => scale < SCALE_LIMITS.min;

const isExceededScaleMaxLimit = (scale) => scale > SCALE_LIMITS.max;

export default function useStageZoom() {
  const stageRef = useRef(null);
  const [stageScale, setStageScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
  const [titleScale, setTitleScale] = useState(1);

  const makeSureNotExceedScaleLimits = useCallback((stageScale) => {
    if (isExceededScaleMinLimit(stageScale)) {
      setStageScale(SCALE_LIMITS.min);
      setTitleScale(SCALE_LIMITS.max);
      return false;
    }
    if (isExceededScaleMaxLimit(stageScale)) {
      setStageScale(SCALE_LIMITS.max);
      setTitleScale(SCALE_LIMITS.min);
      return false;
    }

    return true;
  }, []);

  const increaseScale = () => {
    if (!makeSureNotExceedScaleLimits(stageScale)) return;

    setStageScale((prevScale) => prevScale * CHANGE_RATIO);
    setTitleScale((prevScale) => prevScale / CHANGE_RATIO);
  };

  const decreaseScale = () => {
    if (!makeSureNotExceedScaleLimits(stageScale)) return;

    setStageScale((prevScale) => prevScale / CHANGE_RATIO);
    setTitleScale((prevScale) => prevScale * CHANGE_RATIO);
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
      const newTitleScale =
        direction > 0
          ? titleScale / TITLE_CHANGE_RATIO
          : titleScale * TITLE_CHANGE_RATIO;

      if (!makeSureNotExceedScaleLimits(newScale)) return;

      setStageScale(newScale);

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      setStagePosition(newPos);
      setTitleScale(newTitleScale);
    };

    stage.on("wheel", handleWheel);

    return () => {
      stage.off("wheel", handleWheel);
    };
  }, [stageScale, titleScale, makeSureNotExceedScaleLimits]);

  return {
    stageRef,
    stageScale,
    stagePosition,
    titleScale,
    increaseScale,
    decreaseScale,
  };
}
