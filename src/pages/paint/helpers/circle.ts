import {
    Coordinates,
    OnMouseDownArguments,
    OnMouseMoveArguments,
} from '../../../core/interfaces/paintInterface';

const circle = {
    onMouseDown: ({
                      e,
                      canvasOffset,
                      setIsPainting,
                  }: OnMouseDownArguments): Coordinates => {
        setIsPainting(true);
        return {
            top: e.pageY - canvasOffset.top,
            left: e.pageX - canvasOffset.left,
        };
    },

    onMouseMove: ({
                      e,
                      context,
                      canvasOffset,
                      isPainting,
                      startDrawingPos,
                      canvasData,
                      canvasSize,
                  }: OnMouseMoveArguments): void => {
        const isCanDraw = isPainting && context && canvasData;
        if (isCanDraw) {
            const radiusX: number = Math.round(
                (e.pageX - canvasOffset.left - startDrawingPos.left) / 2
            );
            const radiusY: number = Math.round(
                (e.pageY - canvasOffset.top - startDrawingPos.top) / 2
            );

            context.clearRect(0, 0, canvasSize.width, canvasSize.height);
            context.putImageData(canvasData, 0, 0);
            context.beginPath();

            if (e.shiftKey) {
                let ellipseHeightRadius: number;

                if (radiusY < 0) {
                    ellipseHeightRadius =
                        radiusX > 0
                            ? startDrawingPos.left - radiusY
                            : startDrawingPos.left + radiusY;
                } else {
                    ellipseHeightRadius =
                        radiusX < 0
                            ? startDrawingPos.left - radiusY
                            : startDrawingPos.left + radiusY;
                }

                context.arc(
                    ellipseHeightRadius,
                    startDrawingPos.top + radiusY,
                    Math.abs(radiusY),
                    0,
                    2 * Math.PI
                );
            } else {
                context.ellipse(
                    startDrawingPos.left + radiusX,
                    startDrawingPos.top + radiusY,
                    Math.abs(radiusX),
                    Math.abs(radiusY),
                    0,
                    0,
                    2 * Math.PI
                );
            }
            context.stroke();
        }
    },
};

export default circle;
