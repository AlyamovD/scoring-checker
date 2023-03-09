import React from "react";
import { useParams } from "react-router-dom";

import FormFields from "components/form-fields";
import LangSwitcher from "components/lang-switcher";
import FormTitle from "components/form-title";
import { useDispatch, useSelector } from "store/hooks";
import { IForm } from "store/models/forms";
import styles from "./styles.module.scss";
import classNames from "classnames";

let debounce: NodeJS.Timeout;
const FormConstructor = () => {
  const { id } = useParams();
  const forms = useSelector((state) => state.forms);
  const dispatch = useDispatch();

  const [form, setForm] = React.useState<IForm>();

  React.useEffect(() => setForm(forms.find((f) => f.id === id)), [forms, id]);

  React.useEffect(() => {
    if (!form) return;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      dispatch.forms.FETCH_UPDATE_FORM(form);
    }, 400);
    return () => clearTimeout(debounce);
  }, [form, dispatch]);

  if (!form) return <></>;
  return (
    <>
      <FormTitle form={form} />
      <div className={classNames(styles.tools, styles.sticky)}>
        <LangSwitcher form={form} />
      </div>
      <FormFields form={form} />
    </>
  );
};

export default FormConstructor;
