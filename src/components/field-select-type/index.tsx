import React from "react";
import classNames from "classnames";

import Icon from "icon";
import transcript from "utils/transcript";
import { IField, TFiledType } from "store/models/forms";
import { useDispatch } from "store/hooks";
import styles from "./styles.module.scss";

interface IProps {
  field: IField;
}
const FieldSelectType: React.FC<IProps> = ({ field }) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = React.useState(false);

  const handleSelect = (type: TFiledType) => {
    setOpened(false);
    dispatch.forms.UPDATE_FIELD({
      ...field,
      type,
    });
  };

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#field-" + field.id)) setOpened(false);
    };
    window.addEventListener("click", handleMouseDown);
    return () => window.removeEventListener("click", handleMouseDown);
  }, [field.id]);

  return (
    <div id={"field-" + field.id} className={classNames(styles.select, opened && styles.opened)}>
      <button className={styles.select__label} onClick={() => setOpened(!opened)}>
        <div className="flex gap-20">
          <Icon name={transcript.fieldType.keyToIconname(field.type)} />
          {transcript.fieldType.keyToText(field.type)}
        </div>
        <Icon name="arrowDropDown" className={styles.select__arrow} />
      </button>
      {opened && (
        <div className={styles.select__options}>
          <button className={styles.select__option} onClick={() => handleSelect("text_string")}>
            <Icon size={20} name="shortText" />
            {transcript.fieldType.keyToText("text_string")}
          </button>
          <button className={styles.select__option} onClick={() => handleSelect("text_number")}>
            <Icon size={20} name="shortText" />
            {transcript.fieldType.keyToText("text_number")}
          </button>
          <button className={styles.select__option} onClick={() => handleSelect("text_float")}>
            <Icon size={20} name="shortText" />
            {transcript.fieldType.keyToText("text_float")}
          </button>
          <button className={styles.select__option} onClick={() => handleSelect("dropdown")}>
            <Icon size={20} name="dropdown" />
            {transcript.fieldType.keyToText("dropdown")}
          </button>
          <button className={styles.select__option} onClick={() => handleSelect("one_of_list")}>
            <Icon size={20} name="radioButtonChecked" />
            {transcript.fieldType.keyToText("one_of_list")}
          </button>
          <button className={styles.select__option} onClick={() => handleSelect("several_of_list")}>
            <Icon size={20} name="checkBox" />
            {transcript.fieldType.keyToText("several_of_list")}
          </button>
        </div>
      )}
    </div>
  );
};

export default FieldSelectType;
