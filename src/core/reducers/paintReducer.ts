import { handleActions } from "redux-actions";
import { PicObj } from "../interfaces/paintInterface";
import { AnyAction } from "redux";
import { PaintActionsTypes } from "../actions/constants";

interface InitialState {
  currentTool: string;
  thickness: number;
  color: string;
  allPics: Array<PicObj>;
  errors: {
    picError: string;
    getPicsErr: string;
  };
  searchEmail: string;
}

const initialState: InitialState = {
  currentTool: "line",
  thickness: 1,
  color: "#000000",
  allPics: [],
  errors: {
    picError: "",
    getPicsErr: "",
  },
  searchEmail: "",
};

const paintReducer = handleActions<InitialState>(
  {
    [PaintActionsTypes.SET_TOOL]: (state: InitialState, action: AnyAction) => ({
      ...state,
      currentTool: action.payload.toolName,
    }),

    [PaintActionsTypes.SET_THICKNESS]: (
      state: InitialState,
      action: AnyAction
    ) => ({
      ...state,
      thickness: action.payload.thickness,
    }),

    [PaintActionsTypes.SET_COLOR]: (
      state: InitialState,
      action: AnyAction
    ) => ({
      ...state,
      color: action.payload.color,
    }),

    [PaintActionsTypes.SEND_PIC]: (state: InitialState) => ({
      ...state,
    }),

    [PaintActionsTypes.SEND_PIC_SUCCESS]: (state: InitialState) => ({
      ...state,
    }),

    [PaintActionsTypes.SEND_PIC_ERROR]: (
      state: InitialState,
      action: AnyAction
    ) => ({
      ...state,
      errors: {
        ...state.errors,
        picError: action.payload.picError,
      },
    }),

    [PaintActionsTypes.GET_ALL_PICS]: (state: InitialState) => ({
      ...state,
    }),

    [PaintActionsTypes.GET_ALL_PICS_SUCCESS]: (
      state: InitialState,
      action: AnyAction
    ) => ({
      ...state,
      allPics: [...action.payload.arr],
    }),

    [PaintActionsTypes.GET_ALL_PICS_ERROR]: (
      state: InitialState,
      action: AnyAction
    ) => ({
      ...state,
      errors: {
        ...state.errors,
        getPicsErr: action.payload.getPicsErr,
      },
    }),

    [PaintActionsTypes.GET_SEARCH_EMAIL]: (
      state: InitialState,
      action: AnyAction
    ) => ({
      ...state,
      searchEmail: action.payload.searchEmail,
    }),
  },
  initialState
);

export default paintReducer;
