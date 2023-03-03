import React from "react";
import classNames from "classnames";

import { useDispatch } from "store/hooks";
import { IForm, TColumnCount } from "store/models/forms";
import styles from "./styles.module.scss";

const ColumnSwitcher = ({ form }: { form: IForm }) => {
  const dispatch = useDispatch();

  const handleSwitchColumnNumber = async (column_number: TColumnCount) => {
    if (!form) return;
    dispatch.forms.UPDATE({
      ...form,
      column_number,
    });
  };

  return (
    <div className={styles.langSwitcher}>
      <button
        className={classNames(styles.langSwitcher__button, form.column_number === 1 && styles.active)}
        onClick={() => handleSwitchColumnNumber(1)}
      >
        Один столбец
      </button>
      <button
        className={classNames(styles.langSwitcher__button, form.column_number === 2 && styles.active)}
        onClick={() => handleSwitchColumnNumber(2)}
      >
        Два столбца
      </button>
    </div>
  );
};

export default ColumnSwitcher;
