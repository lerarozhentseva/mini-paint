import { MouseEvent } from 'react';

export interface PicObj {
  user: string;
  picData: string;
}

export interface CanvasSize {
  width: number;
  height: number;
}

export interface Coordinates {
  top: number;
  left: number;
}

export interface OnMouseDownArguments {
  e: MouseEvent;
  context: CanvasRenderingContext2D | undefined | null;
  canvasOffset: Coordinates;
  setIsPainting: (isPainting: boolean) => void;
}

export interface OnMouseMoveArguments {
  e: MouseEvent;
  context: CanvasRenderingContext2D | undefined | null;
  canvasOffset: Coordinates;
  isPainting: boolean;
  startDrawingPos: Coordinates;
  canvasData: ImageData | undefined;
  canvasSize: CanvasSize;
}

export interface ListOfTools {
  [key: string]: {
    onMouseDown: ({
      e,
      canvasOffset,
      setIsPainting,
    }: OnMouseDownArguments) => Coordinates;
    onMouseMove: ({
      e,
      context,
      canvasOffset,
      isPainting,
      startDrawingPos,
      canvasData,
    }: OnMouseMoveArguments) => void;
  };
}