import React, { FC, useEffect, useRef, useState, MouseEvent } from "react";
import line from "./helpers/line";
import rectangle from "./helpers/rectangle";
import circle from "./helpers/circle";
import brush from "./helpers/brush";
import eraser from "./helpers/eraser";
import circleFill from "./helpers/circleFill";
import rectangleFill from "./helpers/rectangleFill";
import Buttons from "./components/Buttons";
import { Coordinates, ListOfTools } from "../../core/interfaces/paintInterface";
import { useTypedSelector } from "../../core/hooks/useTypedSelector";
import {
  selectColor,
  selectThickness,
  selectTool,
} from "../../core/selectors/paintSelectors";
import NavigationHeader from "../../components/navigationHeader/NavigationHeader";
import "./PaintPage.css";
import Instruments from "./components/Instruments";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

const tools: ListOfTools = {
  line: line,
  rectangle: rectangle,
  ["fill rectangle"]: rectangleFill,
  circle: circle,
  ["fill circle"]: circleFill,
  brush: brush,
  eraser: eraser,
};

const PaintComponent: FC = (): JSX.Element => {
  const currentTool = useTypedSelector(selectTool);
  const currentThickness = useTypedSelector(selectThickness);
  const currentColor = useTypedSelector(selectColor);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasOffset, setCanvasOffset] = useState({ left: 0, top: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 700, height: 400 });
  const [isPainting, setIsPainting] = useState(false);
  const [canvasData, setCanvasData] = useState<ImageData | undefined>();
  const [startDrawingPos, setStartDrawingPos] = useState({ top: 0, left: 0 });

  const navigate = useNavigate();

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      navigate("/", { replace: true });
    }
  });

  useEffect(() => {
    if (canvasRef.current) {
      setContext(canvasRef.current.getContext("2d"));
      setCanvasOffset({
        left: canvasRef.current.offsetLeft,
        top: canvasRef.current.offsetTop,
      });
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvasSize.width, canvasSize.height);
    }
  }, [context, canvasSize]);

  const onMouseDown = (e: MouseEvent) => {
    if (context) {
      context.lineWidth = currentThickness;
      context.strokeStyle = currentColor;
      context.fillStyle = currentColor;
    }

    const startPosition: Coordinates = tools[currentTool].onMouseDown({
      e,
      context,
      canvasOffset,
      setIsPainting,
    });

    setStartDrawingPos(startPosition);

    if (context)
      setCanvasData(
        context.getImageData(0, 0, canvasSize.width, canvasSize.height)
      );
  };

  const onMouseUp = () => {
    setIsPainting(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (context) {
      tools[currentTool].onMouseMove({
        e,
        context,
        canvasOffset,
        isPainting,
        startDrawingPos,
        canvasData,
        canvasSize,
      });
      context.lineCap = "round";
    }
  };

  return (
    <>
      <NavigationHeader
        title={"Paint"}
        link={"/profile"}
        linkName={"Profile Page"}
      />
      <div className={"paint_container"}>
        <Instruments />
        <div style={{ width: "700px", margin: "0 auto" }}>
          <canvas
            id="canvas"
            ref={canvasRef}
            height={`${canvasSize.height}px`}
            width={`${canvasSize.width}px`}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
          ></canvas>
        </div>

        <Buttons
          context={context}
          canvasRef={canvasRef}
          canvasSize={canvasSize}
        />
      </div>
    </>
  );
};

export default PaintComponent;
