import React from "react";
import { useSelector } from "store/hooks";
import styles from "./styles.module.scss";

const Cover = () => {
  const cover = useSelector((state) => state.cover);
  if (!cover) return <></>;
  return <div className={styles.root}/>;
};

export default Cover;
