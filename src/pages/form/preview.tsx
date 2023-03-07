import React from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";

import LangSwitcher from "components/lang-switcher";
import ColumnSwitcher from "components/column-switcher";
import Icon from "icon";
import { useSelector } from "store/hooks";
import { IForm } from "store/models/forms";
import styles from "./styles.module.scss";

const FormPreview = () => {
  const { id } = useParams();
  const forms = useSelector((state) => state.forms);

  const [form, setForm] = React.useState<IForm | undefined>(undefined);

  React.useEffect(() => {
    if (!id) return;
    setForm(forms.find((f) => f.id === id));
  }, [forms, id]);

  if (!form) return <></>;
  return (
    <div className={styles.preview}>
      <div className={classNames(styles.tools, styles.sticky)}>
        <LangSwitcher form={form} />
        <ColumnSwitcher form={form} />
      </div>
      <div className={form.column_number === 2 ? styles.grid2 : styles.flex}>
        {form.fields.map((field) => (
          <div className={styles.field} key={field.id}>
            <div className={styles.field__title}>{field.title[form.lang]}</div>
            {field.type === "dropdown" && (
              <Dropdown
                list={field.options.map((option) => option.title[form.lang])}
                placeholder={field.placeholder[form.lang]}
              />
            )}
            {field.type === "one_of_list" && (
              <List type="radio" list={field.options.map((option) => option.title[form.lang])} />
            )}
            {field.type === "several_of_list" && (
              <List type="checkbox" list={field.options.map((option) => option.title[form.lang])} />
            )}
            {field.type === "text_string" && (
              <Input type="string" placeholder={field.placeholder[form.lang]} />
            )}
            {field.type === "text_number" && (
              <Input type="number" placeholder={field.placeholder[form.lang]} />
            )}
            {field.type === "text_float" && <Input type="float" placeholder={field.placeholder[form.lang]} />}
            <div className={styles.field__description}>{field.description[form.lang]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dropdown = ({ placeholder, list }: { placeholder: string; list: string[] }) => {
  const [selected, setSelected] = React.useState("");
  const [opened, setOpened] = React.useState(false);

  return (
    <div className={classNames(styles.field__dropdown, opened && styles.opened)}>
      <button className={styles.field__dropdownLabel} onClick={() => setOpened(!opened)}>
        {selected === "" && (
          <span className={styles.field__dropdownInitText}>
            {placeholder !== "" ? placeholder : "Выбрать"}
          </span>
        )}
        {selected !== "" && selected}
        <Icon name="arrowDropDown" className={styles.field__dropdownArrow} />
      </button>
      {opened && (
        <div className={styles.field__dropdownMenu}>
          {list.map((item) => (
            <button
              className={styles.field__dropdownItem}
              key={item}
              onClick={() => {
                setSelected(item);
                setOpened(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const List = ({ list, type }: { list: string[]; type: "checkbox" | "radio" }) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleClick = (item: string) => {
    if (type === "checkbox")
      if (selected.includes(item)) setSelected(selected.filter((i) => i !== item));
      else setSelected([...selected, item]);
    else if (selected.includes(item)) setSelected([]);
    else setSelected([item]);
  };

  return (
    <div className={styles.field__list}>
      {list.map((item, index) => (
        <button
          className={classNames(styles.field__listItem, selected.includes(item) && styles.active)}
          key={index}
          onClick={() => handleClick(item)}
        >
          {type === "checkbox" && (
            <Icon name={selected.includes(item) ? "checkBox" : "checkBoxOutlineBlank"} />
          )}
          {type === "radio" && (
            <Icon name={selected.includes(item) ? "radioButtonChecked" : "radioButtonUnchecked"} />
          )}
          {item}
        </button>
      ))}
    </div>
  );
};

const Input = ({ placeholder, type }: { placeholder: string; type: "number" | "float" | "string" }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      if (isNaN(Number(e.target.value))) return;
      setValue(e.target.value.replaceAll(".", ""));
    }
    if (type === "float") {
      if (isNaN(Number(e.target.value))) return;
      setValue(e.target.value);
    } else {
      setValue(e.target.value);
    }
  };

  return (
    <input value={value} className={styles.field__input} onChange={handleChange} placeholder={placeholder} />
  );
};

export default FormPreview;
