import {
  Coordinates,
  OnMouseDownArguments,
  OnMouseMoveArguments,
} from "../../../core/interfaces/paintInterface";

const brush = {
  onMouseDown: ({
    e,
    context,
    canvasOffset,
    setIsPainting,
  }: OnMouseDownArguments): Coordinates => {
    setIsPainting(true);
    if (context) {
      context.beginPath();
      context.arc(
        e.pageX - canvasOffset.left,
        e.pageY - canvasOffset.top,
        context.lineWidth / 1000,
        0,
        2 * Math.PI
      );
      context.fill();
      context.stroke();
    }
    return { top: 0, left: 0 };
  },

  onMouseMove: ({
    e,
    context,
    canvasOffset,
    isPainting,
  }: OnMouseMoveArguments): void => {
    if (isPainting && context) {
      context.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
      context.lineJoin = "round";
      context.stroke();
    }
  },
};

export default brush;
