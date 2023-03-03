import classNames from "classnames";
import React from "react";

import { useDispatch } from "store/hooks";
import { IForm } from "store/models/forms";
import styles from "./styles.module.scss";

const FormTitle = ({ form }: { form: IForm }) => {
  const dispatch = useDispatch();

  const handleChangeTitle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    dispatch.forms.UPDATE({
      ...form,
      title: {
        en: form.lang === "en" ? event.target.value : form.title.en,
        ru: form.lang === "ru" ? event.target.value : form.title.ru,
      },
    });
  };

  return (
    <div className={styles.formTitle}>
      <input
        value={form.title[form.lang]}
        type="text"
        className={classNames(styles.formTitle__input, form.title[form.lang].trim() !== "" && styles.active)}
        onChange={handleChangeTitle}
      />
    </div>
  );
};

export default FormTitle;
