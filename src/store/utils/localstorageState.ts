import { TRootState } from "../models";

const initialState = {
  get: () => {
    const initalState = localStorage.getItem("state");
    return initalState ? JSON.parse(initalState) : {};
  },
  set: (state: Partial<TRootState>) => {
    localStorage.setItem("state", JSON.stringify(state));
  },
};

export default initialState;
