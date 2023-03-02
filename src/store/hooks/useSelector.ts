import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { TRootState } from "../models";

const useSelector: TypedUseSelectorHook<TRootState> = useReduxSelector;

export default useSelector;
