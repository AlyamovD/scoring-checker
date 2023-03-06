import React from "react";
import { v4 as uuid } from "uuid";

import Icon from "icon";
import FieldSelectType from "components/field-select-type";
import AnimatedInput from "components/animated-input";
import transcript from "utils/transcript";
import { IField, TLang, TFiledType } from "store/models/forms";
import { useDispatch } from "store/hooks";
import styles from "./styles.module.scss";
import classNames from "classnames";

const FormField = (props: { lang: TLang; field: IField; index: number }) => {
  const dispatch = useDispatch();

  const [field, setField] = React.useState(props.field);

  const fieldTypeIs = (...args: TFiledType[]): boolean => !!args.find((type) => field.type === type);

  const handleRemoveField = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch.forms.DELETE_FIELD(field.id);
  };

  const handleOpenField = (e: React.MouseEvent) => {
    e.stopPropagation();
    setField((prev) => ({
      ...prev,
      opened: true,
    }));
  };

  const handleCloseField = (e: React.MouseEvent) => {
    e.stopPropagation();
    setField((prev) => ({
      ...prev,
      opened: true,
    }));
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((prev) => ({
      ...prev,
      title: {
        ...prev.title,
        [props.lang]: e.target.value,
      },
    }));
  };

  const handleChangeBdName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((prev) => ({
      ...prev,
      bd_name: e.target.value,
    }));
  };

  const handleChangePlaceholder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((prev) => ({
      ...prev,
      placeholder: {
        ...prev.placeholder,
        [props.lang]: e.target.value,
      },
    }));
  };

  const handleChangeSymbolLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((prev) => ({
      ...prev,
      symbol_limit: e.target.value,
    }));
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        [props.lang]: e.target.value,
      },
    }));
  };

  const handleChangeMinValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((prev) => ({
      ...prev,
      min_value: e.target.value,
    }));
  };

  const handleChangeMaxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((prev) => ({
      ...prev,
      max_value: e.target.value,
    }));
  };

  const handleToggleRequired = () => {
    setField((prev) => ({
      ...prev,
      required: !prev.required,
    }));
  };

  const handleChangeInitialOption = (id: string) => {
    setField((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === id
          ? { ...option, initial: !option.initial }
          : { ...option, initial: field.type === "several_of_list" ? option.initial : false }
      ),
    }));
  };

  const handleRemoveOption = (id: string) => {
    setField((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option.id !== id),
    }));
  };

  const handleChangeOptionTitle = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setField((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === id ? { ...option, title: { ...option.title, [props.lang]: e.target.value } } : option
      ),
    }));
  };

  const handleChangeOptionBdName = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setField((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === id ? { ...option, bd_name: e.target.value } : option
      ),
    }));
  };

  const handleAddOption = () => {
    setField((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        {
          id: uuid(),
          bd_name: "",
          initial: false,
          title: {
            en: "",
            ru: "",
          },
        },
      ],
    }));
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    const debounce = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => dispatch.forms.UPDATE_FIELD(field), 200);
    };
    debounce();
  }, [dispatch.forms, field]);

  if (field.opened)
    return (
      <div className={styles.field}>
        <div className={styles.field__title}>
          Поле {props.index + 1}
          <button className={styles.field__closeButton} onClick={handleCloseField}>
            <Icon name="close" />
          </button>
        </div>
        <FieldSelectType field={field} />
        <AnimatedInput onChange={handleChangeTitle} placeholder="Название поля">
          {field.title[props.lang]}
        </AnimatedInput>
        <AnimatedInput onChange={handleChangeBdName} placeholder="Столбец в базе данных">
          {field.bd_name}
        </AnimatedInput>
        {fieldTypeIs("dropdown", "text_number", "text_float", "text_string") && (
          <AnimatedInput onChange={handleChangePlaceholder} placeholder="Заполнитель">
            {field.placeholder[props.lang]}
          </AnimatedInput>
        )}
        {fieldTypeIs("text_number", "text_float", "text_string") && (
          <AnimatedInput type="number" onChange={handleChangeSymbolLimit} placeholder="Максимум символов">
            {field.symbol_limit}
          </AnimatedInput>
        )}
        <AnimatedInput onChange={handleChangeDescription} placeholder="Описание">
          {field.description[props.lang]}
        </AnimatedInput>
        {fieldTypeIs("text_float", "text_number") && (
          <AnimatedInput type="number" onChange={handleChangeMinValue} placeholder="Мин. значение">
            {field.min_value}
          </AnimatedInput>
        )}
        {fieldTypeIs("text_float", "text_number") && (
          <AnimatedInput type="number" onChange={handleChangeMaxValue} placeholder="Макс. значение">
            {field.max_value}
          </AnimatedInput>
        )}
        {fieldTypeIs("dropdown", "one_of_list", "several_of_list") && (
          <div className={styles.field__options}>
            {field.options.map((option, index) => (
              <div className={styles.field__option} key={option.id}>
                <AnimatedInput
                  small
                  onChange={(e) => handleChangeOptionTitle(option.id, e)}
                  placeholder={`Вариант ${index + 1}`}
                >
                  {option.title[props.lang]}
                </AnimatedInput>
                <AnimatedInput
                  small
                  onChange={(e) => handleChangeOptionBdName(option.id, e)}
                  placeholder="Значение в базе данных"
                >
                  {option.bd_name}
                </AnimatedInput>
                <button
                  className={classNames(styles.field__requiredButton, option.initial && styles.active)}
                  onClick={() => handleChangeInitialOption(option.id)}
                >
                  {field.type === "several_of_list" ? (
                    <Icon name={option.initial ? "checkBox" : "checkBoxOutlineBlank"} size={20} />
                  ) : (
                    <Icon name={option.initial ? "radioButtonChecked" : "radioButtonUnchecked"} size={20} />
                  )}
                  По умолчанию
                </button>
                <button
                  className={styles.field__requiredButton}
                  onClick={() => handleRemoveOption(option.id)}
                >
                  <Icon name={"delete"} size={20} />
                  Удалить
                </button>
              </div>
            ))}
            <button className={styles.field__optionAddButton} onClick={handleAddOption}>
              <Icon name="add" />
            </button>
          </div>
        )}
        <div className={styles.field__tools}>
          <button
            className={classNames(styles.field__requiredButton, field.required && styles.active)}
            onClick={handleToggleRequired}
          >
            <Icon name={field.required ? "checkBox" : "checkBoxOutlineBlank"} size={20} />
            Обязательный
          </button>
          <button className={styles.field__closeButton} onClick={handleRemoveField}>
            <Icon name={"delete"} size={20} />
          </button>
        </div>
      </div>
    );
  return (
    <div className={styles.fieldShort} onClick={handleOpenField}>
      <div className="flex column gap-15">
        <div className={styles.fieldShort__title}>
          {field.title[props.lang]}
          {field.required && <span>обязательный</span>}
        </div>
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
          {fieldTypeIs("dropdown", "text_number", "text_string") && field.placeholder[props.lang] !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Заполнитель:</div>
              <div className={styles.fieldShort__tagValue}>{field.placeholder[props.lang]}</div>
            </div>
          )}
          {fieldTypeIs("text_number", "text_string") && field.symbol_limit !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Максимум символов:</div>
              <div className={styles.fieldShort__tagValue}>{field.symbol_limit}</div>
            </div>
          )}
          {field.description[props.lang] !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Описание:</div>
              <div className={styles.fieldShort__tagValue}>{field.description[props.lang]}</div>
            </div>
          )}
          {fieldTypeIs("text_number") && field.min_value !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Мин. значение:</div>
              <div className={styles.fieldShort__tagValue}>{field.min_value}</div>
            </div>
          )}
          {fieldTypeIs("text_number") && field.max_value !== "" && (
            <div className={styles.fieldShort__tag}>
              <div className={styles.fieldShort__tagKey}>Макс. значение:</div>
              <div className={styles.fieldShort__tagValue}>{field.max_value}</div>
            </div>
          )}
        </div>
        {fieldTypeIs("dropdown", "one_of_list", "several_of_list") && (
          <div className={styles.fieldShort__checklist}>
            {field.options.map((option) => (
              <span key={option.bd_name}>
                <Icon
                  name={
                    field.type === "one_of_list"
                      ? "radioButtonUnchecked"
                      : field.type === "dropdown"
                      ? "dot"
                      : "checkBoxOutlineBlank"
                  }
                  size={20}
                  className={styles.icon}
                />
                {option.title[props.lang]}
              </span>
            ))}
          </div>
        )}
      </div>
      <button className={styles.fieldShort__deleteButton} onClick={handleRemoveField}>
        <Icon name="delete" />
      </button>
    </div>
  );
};

export default FormField;
