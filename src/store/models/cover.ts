import { createModel } from "@rematch/core";
import { IRootModel } from ".";

const coverage = createModel<IRootModel>()({
  state: false,
  reducers: {
    open: () => true,
    close: () => false,
  },
});

export default coverage;
