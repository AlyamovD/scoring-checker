import React from "react";
import JSONPretty from "react-json-pretty";
import { useParams } from "react-router-dom";
import "react-json-pretty/themes/monikai.css";

import { useSelector } from "store/hooks";
import { IForm } from "store/models/forms";
import styles from "./styles.module.scss";

const FormJSON = () => {
  const { id } = useParams();
  const forms = useSelector((state) => state.forms);

  const form: IForm | undefined = React.useMemo(() => forms.find((f) => f.id === id), [forms, id]);

  if (!form) return <></>;

  const json = {
    title: form.title,
    type: "object",
    properties: form.fields.reduce(
      (prev, current) => ({
        ...prev,
        [current.bd_name]: {
          ...current,
          options: current.options.filter((option) => option.bd_name !== ""),
          maximum: Number(current.max_value),
          minimum: Number(current.min_value),
          type:
            current.type === "text_number" ? "inter" : current.type === "text_float" ? "number" : "string",
          enum: current.options.filter((option) => option.bd_name !== "").map((option) => option.bd_name),
        },
      }),
      {}
    ),
    required: form.fields.filter((field) => field.required).map((field) => field.bd_name),
  };

  return <JSONPretty className={styles.json} id="json-pretty" data={json}></JSONPretty>;
};

export default FormJSON;
