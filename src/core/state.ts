import { RootState } from './reducers/rootReducer';

export const loadState = (): RootState | undefined => {
  try {
    const serialisedState = localStorage.getItem('state');
    if (!serialisedState) return undefined;
    else return JSON.parse(serialisedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState): void => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('state', serialisedState);
  } catch(err) {
    console.log(err);
  }
};
