import React from "react";

import Icon from "icon";
import { useDispatch } from "store/hooks";
import { IForm } from "store/models/forms";
import FormField from "../form-field";
import styles from "./styles.module.scss";

const FormFields = ({ form }: { form: IForm }) => {
  const dispatch = useDispatch();

  const handleAddField = () => {
    if (!form) return;
    dispatch.forms.INSERT_FIELD(form.id);
  };

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#container")) dispatch.forms.CLOSE_ALL_FIELDS();
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [dispatch.forms]);

  return (
    <>
      {form.fields.map((field, index) => (
        <FormField key={field.id} form={form} field={field} index={index} />
      ))}
      <button className={styles.addFieldButton} onClick={handleAddField}>
        <Icon name="add" size={28} />
      </button>
    </>
  );
};

export default FormFields;
