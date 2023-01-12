import {createSelector} from 'reselect';
import {RootState} from '../reducers/rootReducer';

const getDraw = (state: RootState) => state.paint;
export const selectAllPics = createSelector(getDraw, (paint) => paint.allPics);
export const selectTool = createSelector(getDraw, (paint) => paint.currentTool);
export const selectColor = createSelector(getDraw, (paint) => paint.color);

export const selectThickness = createSelector(
    getDraw,
    (paint) => paint.thickness
);

export const selectSearchEmail = createSelector(
    getDraw,
    (paint) => paint.searchEmail
);
