import { useDispatch as useReduxDispatch } from "react-redux";
import { TDispatch } from "../models";

const useDispatch = () => useReduxDispatch<TDispatch>();

export default useDispatch;
