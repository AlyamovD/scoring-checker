import React from "react";

import FormFields from "components/form-fields";
import LangSwitcher from "components/lang-switcher";
import FormTitle from "components/form-title";
import { useSelector } from "store/hooks";
import styles from "./styles.module.scss";
import classNames from "classnames";

const FormConstructor = () => {
  const forms = useSelector((state) => state.forms);

  return (
    <>
      <FormTitle form={forms[0]} />
      <div className={classNames(styles.tools, styles.sticky)}>
        <LangSwitcher form={forms[0]} />
      </div>
      <FormFields form={forms[0]} />
    </>
  );
};

export default FormConstructor;
