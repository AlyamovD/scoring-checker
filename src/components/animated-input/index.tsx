import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

interface IProps {
  children: string;
  placeholder?: string;
  type?: string;
  isFloat?: boolean;
  small?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const AnimatedInput: React.FC<IProps> = ({ children, onChange, placeholder, type, small, isFloat }) => {
  const [value, setValue] = React.useState(children);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
  };

  React.useEffect(() => setValue(children), [children]);

  return (
    <div className={classNames(styles.animatedInput, small && styles.small)}>
      <input
        value={value}
        type={type ?? "text"}
        step={isFloat ? "0.01" : "1"}
        placeholder=" "
        className={styles.input}
        onChange={handleChangeValue}
      />
      {placeholder && <span className={styles.placeholder}>{placeholder}</span>}
    </div>
  );
};

export default React.memo(AnimatedInput, (prev, next) => prev.children === next.children);
