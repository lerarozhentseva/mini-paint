import React, { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import line from './helpers/line';
import rectangle from './helpers/rectangle';
import circle from './helpers/circle';
import brush from './helpers/brush';
import eraser from './helpers/eraser';
import circleFill from './helpers/circleFill';
import rectangleFill from './helpers/rectangleFill';
import Buttons from './components/Buttons';
import { Coordinates, ListOfTools } from '../../core/interfaces/paintInterface';
import { useTypedSelector } from '../../core/hooks/useTypedSelector';
import {
  selectColor,
  selectThickness,
  selectTool,
} from '../../core/selectors/paintSelectors';
import NavigationHeader from '../../components/navigationHeader/NavigationHeader';
import {PaintPageNav} from '../../components/navigationHeader/navConstants';
import './PaintPage.css';
import Instruments from './components/Instruments';
import {selectUser} from '../../core/selectors/authSelectors';
import {useNavigate} from 'react-router-dom';

const tools: ListOfTools = {
  line: line,
  rectangle: rectangle,
  ['fill rectangle']: rectangleFill,
  circle: circle,
  ['fill circle']: circleFill,
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
  const [canvasSize, setCanvasSize] = useState({ width: 100, height: 100 });
  const [isPainting, setIsPainting] = useState(false);
  const [canvasData, setCanvasData] = useState<ImageData | undefined>();
  const [startDrawingPos, setStartDrawingPos] = useState({ top: 0, left: 0 });

  const userEmail = useTypedSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) {
      navigate('/', {replace: true})
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      setContext(canvasRef.current.getContext('2d'));
      setCanvasOffset({
        left: canvasRef.current.offsetLeft,
        top: canvasRef.current.offsetTop,
      });
      setCanvasSize({
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientWidth / 1.9,
      });
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.fillStyle = '#FFFFFF';
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
    }
  };

  return (

      <>
        <NavigationHeader navType={PaintPageNav}/>
          <div className={'paint_container'}>
            <Instruments />
            <canvas
                id='canvas'
                ref={canvasRef}
                height={`${canvasSize.height}px`}
                width={`${canvasSize.width}px`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onMouseMove={onMouseMove}
            ></canvas>
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
