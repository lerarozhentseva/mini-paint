import { createAction } from 'redux-actions';
import { PicObj } from '../interfaces/paintInterface';
import { PaintActionsTypes } from './constants';

export const chooseTool = createAction(
  PaintActionsTypes.SET_TOOL,
  (toolName: string) => ({ toolName })
);

export const chooseThickness = createAction(
  PaintActionsTypes.SET_THICKNESS,
  (thickness: number) => ({ thickness })
);

export const chooseColor = createAction(
  PaintActionsTypes.SET_COLOR,
  (color: string) => ({ color })
);

export const getAllPics = createAction(PaintActionsTypes.GET_ALL_PICS);

export const getAllPicsSuccess = createAction(
    PaintActionsTypes.GET_ALL_PICS_SUCCESS,
    (arr: Array<PicObj>) => ({ arr })
);

export const getAllPicsError = createAction(
    PaintActionsTypes.GET_ALL_PICS_ERROR,
    (getPicsErr: string) => ({ getPicsErr })
);

export const sendPic = createAction(PaintActionsTypes.SEND_PIC);

export const sendPicSuccess = createAction(PaintActionsTypes.SEND_PIC_SUCCESS);

export const sendPicError = createAction(
  PaintActionsTypes.SEND_PIC_ERROR,
  (picError: string) => ({ picError })
);

export const getSearchEmail = createAction(
  PaintActionsTypes.GET_SEARCH_EMAIL,
  (searchEmail: string) => ({ searchEmail })
);
