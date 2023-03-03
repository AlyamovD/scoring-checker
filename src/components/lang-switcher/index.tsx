import React from "react";
import classNames from "classnames";

import { useDispatch } from "store/hooks";
import { IForm, TLang } from "store/models/forms";
import styles from "./styles.module.scss";

const LangSwitcher = ({ form }: { form: IForm }) => {
  const dispatch = useDispatch();

  const handleSwitchLang = async (lang: TLang) => {
    if (!form) return;
    dispatch.forms.UPDATE({
      ...form,
      lang,
    });
  };

  return (
    <div className={styles.langSwitcher}>
      <button
        className={classNames(styles.langSwitcher__button, form.lang === "ru" && styles.active)}
        onClick={() => handleSwitchLang("ru")}
      >
        Русский
      </button>
      <button
        className={classNames(styles.langSwitcher__button, form.lang === "en" && styles.active)}
        onClick={() => handleSwitchLang("en")}
      >
        Английский
      </button>
    </div>
  );
};

export default LangSwitcher;
