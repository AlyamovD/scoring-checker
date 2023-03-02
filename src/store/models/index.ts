import { Models, RematchDispatch, RematchRootState } from "@rematch/core";
import forms from "./forms";
import cover from "./cover";

export interface IRootModel extends Models<IRootModel> {
  forms: typeof forms;
  cover: typeof cover;
}
export type TDispatch = RematchDispatch<IRootModel>;
export type TRootState = RematchRootState<IRootModel>;
export const models: IRootModel = { forms, cover };
