import React, { FC, useState, ChangeEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Brush,
  ShowChart,
  Crop32,
  Rectangle,
  Circle,
  PanoramaFishEye,
  AutoFixOff,
} from "@mui/icons-material";
import {
  chooseTool,
  chooseThickness,
  chooseColor,
} from "../../../core/actions/paintActions";
import { useTypedSelector } from "../../../core/hooks/useTypedSelector";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import {
  selectColor,
  selectThickness,
  selectTool,
} from "../../../core/selectors/paintSelectors";
import Tooltip from "@mui/material/Tooltip";
import PaletteIcon from "@mui/icons-material/Palette";
import "./Instruments.css";
import useOnClickOutside from "../../../core/hooks/useOnClickOutside";

const Instruments: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentTool = useTypedSelector(selectTool);
  const currentThickness = useTypedSelector(selectThickness);
  const currentColor = useTypedSelector(selectColor);
  const [thicknessValue, setThicknessValue] = useState(currentThickness);
  const [paletteValue, setPaletteValue] = useState(currentColor);
  const [isThicknessPaletteOpen, setIsThicknessPaletteOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const clickOnTool = (toolName: string) => (): void => {
    dispatch(chooseTool(toolName));
  };

  const clickPalettePanel = () => setIsPaletteOpen(!isPaletteOpen);
  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setPaletteValue(e.target.value);
    dispatch(chooseColor(e.target.value));
  };

  const clickThicknessPanel = () =>
    setIsThicknessPaletteOpen(!isThicknessPaletteOpen);
  const changeThickness = (e: ChangeEvent<HTMLInputElement>) => {
    setThicknessValue(+e.target.value);
    dispatch(chooseThickness(+e.target.value));
  };

  useOnClickOutside(wrapperRef, () => {
    setIsThicknessPaletteOpen(false);
    setIsPaletteOpen(false);
  });

  return (
    <>
      <h2 className="paint_h2">I N S T R U M E N T S</h2>
      <div className="instruments_container">
        <Tooltip title="Line thickness">
          <button className="btn_instrument" onClick={clickThicknessPanel}>
            <LineWeightIcon />
          </button>
        </Tooltip>
        {isThicknessPaletteOpen && (
          <span className="span_input_thickness" ref={wrapperRef}>
            <Tooltip title={thicknessValue}>
              <input
                type="range"
                min="1"
                max="100"
                value={thicknessValue}
                onInput={changeThickness}
              />
            </Tooltip>
          </span>
        )}
        <Tooltip title="Palette">
          <button className="btn_instrument" onClick={clickPalettePanel}>
            <PaletteIcon />
          </button>
        </Tooltip>
        {isPaletteOpen && (
          <span className="span_input_palette" ref={wrapperRef}>
            <input type="color" value={paletteValue} onChange={changeColor} />
          </span>
        )}
        <Tooltip title="Brush">
          <button
            className={
              "brush" === currentTool
                ? "btn_instrument clicked"
                : "btn_instrument"
            }
            onClick={clickOnTool("brush")}
          >
            <Brush />
          </button>
        </Tooltip>
        <Tooltip title="Line">
          <button
            className={
              "line" === currentTool
                ? "btn_instrument clicked"
                : "btn_instrument"
            }
            onClick={clickOnTool("line")}
          >
            <ShowChart />
          </button>
        </Tooltip>
        <Tooltip title="Rectangle">
          <button
            className={
              "rectangle" === currentTool
                ? "btn_instrument clicked"
                : "btn_instrument"
            }
            onClick={clickOnTool("rectangle")}
          >
            <Crop32 />
          </button>
        </Tooltip>
        <Tooltip title="Fill rectangle">
          <button
            className={
              "fill rectangle" === currentTool
                ? "btn_instrument clicked"
                : "btn_instrument"
            }
            onClick={clickOnTool("fill rectangle")}
          >
            <Rectangle />
          </button>
        </Tooltip>
        <Tooltip title="Circle">
          <button
            className={
              "circle" === currentTool
                ? "btn_instrument clicked"
                : "btn_instrument"
            }
            onClick={clickOnTool("circle")}
          >
            <PanoramaFishEye />
          </button>
        </Tooltip>
        <Tooltip title="Fill circle">
          <button
            className={
              "fill circle" === currentTool
                ? "btn_instrument clicked"
                : "btn_instrument"
            }
            onClick={clickOnTool("fill circle")}
          >
            <Circle />
          </button>
        </Tooltip>
        <Tooltip title="Eraser">
          <button
            className={
              "eraser" === currentTool
                ? "btn_instrument clicked"
                : "btn_instrument"
            }
            onClick={clickOnTool("eraser")}
          >
            <AutoFixOff />
          </button>
        </Tooltip>
      </div>
    </>
  );
};

export default Instruments;
