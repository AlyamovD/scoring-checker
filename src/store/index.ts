import { init } from "@rematch/core";
import { models, TRootState } from "./models";
import { localstorageState } from "./utils";

const store = init({
  models,
  redux: {
    initialState: localstorageState.get(),
  },
});

store.subscribe(() => {
  const { forms } = store.getState();

  let state: Partial<TRootState> = {};
  state.forms = forms;

  return localstorageState.set(state);
});

export default store;
