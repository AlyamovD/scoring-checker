import React from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

import Icon from "icon";
import { useDispatch } from "store/hooks";
import { IForm, IField } from "store/models/forms";
import FormField from "../form-field";
import styles from "./styles.module.scss";

let debounceTimeout: NodeJS.Timeout;
const FormFields = ({ form }: { form: IForm }) => {
  const dispatch = useDispatch();

  const [fields, updateFields] = React.useState(form.fields);

  const getNewEmptyField = (obj: Partial<IField>): IField => {
    return {
      id: uuid(),
      opened: true,
      type: obj.type ?? "text_string",
      title: {
        ru: "",
        en: "",
      },
      bd_name: obj.bd_name ?? "",
      placeholder: {
        ru: "",
        en: "",
      },
      required: obj.required ?? false,
      symbol_limit: "",
      min_value: obj.min_value ?? "",
      max_value: obj.max_value ?? "",
      description: {
        ru: "",
        en: "",
      },
      options: obj.options ?? [
        {
          id: uuid(),
          bd_name: "",
          title: {
            ru: "",
            en: "",
          },
          initial: true,
        },
      ],
    };
  };

  const handleAddField = () => {
    if (!form) return;
    dispatch.forms.INSERT_FIELD(form.id);
  };

  const handleOnLoadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    var reader = new FileReader();
    reader.readAsText(e.target.files![0]);
    reader.onload = (e: any) => {
      let data = JSON.parse(e.target.result);

      let obj = data.properties;

      for (const [key, value] of Object.entries(obj)) {
        if (key === "required") continue;
        dispatch.forms.INSERT_EXIST_FIELD(
          form.id,
          getNewEmptyField({
            bd_name: key,
            type:
              (value as any).type === "number"
                ? "text_float"
                : (value as any).type === "integer"
                ? "text_number"
                : !!(value as any).enum
                ? "dropdown"
                : "text_string",
            min_value: (value as any).minimum ?? undefined,
            max_value: (value as any).maximum ?? undefined,
            options: (value as any).enum
              ? (value as any).enum.map((item: string) => ({
                  id: uuid(),
                  title: {
                    ru: item,
                    en: item,
                  },
                  bd_name: item,
                  initial: false,
                }))
              : undefined,
            required: data.required.includes(key),
          })
        );
      }
    };
  };

  // Скрипт закрытия всех полей при нажатии пустой части экрана
  // React.useEffect(() => {
  //   const handleMouseDown = (e: MouseEvent) => {
  //     if (!(e.target as HTMLElement).closest("#container")) dispatch.forms.CLOSE_ALL_FIELDS();
  //   };
  //   window.addEventListener("mousedown", handleMouseDown);
  //   return () => window.removeEventListener("mousedown", handleMouseDown);
  // }, [dispatch.forms]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      dispatch.forms.UPDATE({
        ...form,
        fields: items,
      });
    }, 200);

    updateFields(items);
  };

  React.useEffect(() => {
    updateFields(form.fields);
  }, [form]);

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => {
                return (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <div className={styles.field} ref={provided.innerRef} {...provided.draggableProps}>
                        <div {...provided.dragHandleProps} className={styles.dragButton}>
                          <Icon name="dragIndicator" />
                        </div>
                        <FormField lang={form.lang} field={field} index={index} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button className={styles.addFieldButton} onClick={handleAddField}>
        <Icon name="add" size={28} />
      </button>
      <label className={styles.importJSON}>
        Загрузить .json шаблон
        <input type="file" onChange={handleOnLoadJSON} />
      </label>
    </>
  );
};

export default FormFields;
