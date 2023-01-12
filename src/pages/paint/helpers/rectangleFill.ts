import {
    Coordinates,
    OnMouseDownArguments,
    OnMouseMoveArguments,
} from '../../../core/interfaces/paintInterface';

const rectangleFill = {
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
            const rectangle = {
                width: e.pageX - canvasOffset.left - startDrawingPos.left,
                height: e.pageY - canvasOffset.top - startDrawingPos.top,
            };

            context.clearRect(0, 0, canvasSize.width, canvasSize.height);
            context.putImageData(canvasData, 0, 0);

            if (e.shiftKey) {
                let rectangleHeight: number;

                if (rectangle.height < 0) {
                    rectangleHeight =
                        rectangle.width > 0 ? -rectangle.width : rectangle.width;
                } else {
                    rectangleHeight =
                        rectangle.width < 0 ? -rectangle.width : rectangle.width;
                }

                context.fillRect(
                    startDrawingPos.left,
                    startDrawingPos.top,
                    rectangle.width,
                    rectangleHeight
                );
            } else {
                context.fillRect(
                    startDrawingPos.left,
                    startDrawingPos.top,
                    rectangle.width,
                    rectangle.height
                );
            }
        }
    },
};

export default rectangleFill;