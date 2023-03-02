import React from "react";

import Icon from "icon";
import FieldSelectType from "components/field-select-type";
import transcript from "utils/transcript";
import { IField, IForm } from "store/models/forms";
import { useDispatch } from "store/hooks";
import styles from "./styles.module.scss";

const FormField = ({ form, field, index }: { form: IForm; field: IField; index: number }) => {
  const dispatch = useDispatch();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch.forms.DELETE_FIELD(field.id);
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch.forms.OPEN_FIELD(field.id);
  };

  if (field.opened)
    return (
      <div className={styles.field}>
        <div className={styles.field__title}>Поле {index + 1}</div>
        <FieldSelectType field={field} />
      </div>
    );
  return (
    <div className={styles.fieldShort} onClick={handleOpen}>
      <div className="flex column gap-15">
        <div className={styles.fieldShort__title}>{field.title[form.lang]}</div>
        <div className={styles.fieldShort__tags}>
          <div className={styles.fieldShort__tag}>
            <div className={styles.fieldShort__tagKey}>Тип:</div>
            <div className={styles.fieldShort__tagValue}>{transcript.fieldType.keyToText(field.type)}</div>
          </div>
          {field.bd_name !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Столбец в базе данных:</div>
              <div className={styles.fieldShort__tagValue}>{field.bd_name}</div>
            </div>
          )}
          {field.placeholder[form.lang] !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Заполнитель:</div>
              <div className={styles.fieldShort__tagValue}>{field.placeholder[form.lang]}</div>
            </div>
          )}
          {field.symbol_limit !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Максимум символов:</div>
              <div className={styles.fieldShort__tagValue}>{field.symbol_limit}</div>
            </div>
          )}
          {field.description[form.lang] !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Описание:</div>
              <div className={styles.fieldShort__tagValue}>{field.description[form.lang]}</div>
            </div>
          )}
          {field.min_value !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Мин. значение:</div>
              <div className={styles.fieldShort__tagValue}>{field.min_value}</div>
            </div>
          )}
          {field.max_value !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Макс. значение:</div>
              <div className={styles.fieldShort__tagValue}>{field.max_value}</div>
            </div>
          )}
        </div>
        {field.type === "dropdown" && (
          <div className={styles.fieldShort__dropdown}>
            {field.options.slice(0, 3).map((option) => (
              <span key={option.bd_name}>{option.title[form.lang]}</span>
            ))}
            {field.options.length > 3 && <span>...</span>}
          </div>
        )}
        {(field.type === "one_of_list" || field.type === "several_of_list") && (
          <div className={styles.fieldShort__checklist}>
            {field.options.map((option) => (
              <span key={option.bd_name}>
                <Icon
                  name={field.type === "one_of_list" ? "radioButtonUnchecked" : "checkBoxOutlineBlank"}
                  size={20}
                  className={styles.icon}
                />
                {option.title[form.lang]}
              </span>
            ))}
          </div>
        )}
      </div>
      <button className={styles.fieldShort__deleteButton} onClick={handleRemove}>
        <Icon name="delete" />
      </button>
    </div>
  );
};

export default FormField;
