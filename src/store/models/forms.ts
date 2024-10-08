import { createModel } from "@rematch/core";
import { IRootModel } from ".";
import { v4 as uuid } from "uuid";
import request from "request";

export type TFiledType =
  | "text_float"
  | "text_string"
  | "text_number"
  | "dropdown"
  | "one_of_list"
  | "several_of_list";

export type TLang = "ru" | "en";

export type TColumnCount = 1 | 2;

export interface IField {
  id: string;
  type: TFiledType;
  title: {
    ru: string;
    en: string;
  };
  bd_name: string;
  opened: boolean;
  placeholder: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  symbol_limit: string;
  min_value: string;
  max_value: string;
  required: boolean;
  options: {
    id: string;
    title: {
      ru: string;
      en: string;
    };
    bd_name: string;
    initial: boolean;
  }[];
}

export interface IForm {
  id: string;
  title: string;
  lang: TLang;
  column_number: TColumnCount;
  fields: IField[];
}

const getNewEmptyField = (): IField => ({
  id: uuid(),
  opened: true,
  type: "text_string",
  title: {
    ru: "",
    en: ""
  },
  bd_name: "",
  placeholder: {
    ru: "",
    en: ""
  },
  required: false,
  symbol_limit: "",
  min_value: "",
  max_value: "",
  description: {
    ru: "",
    en: ""
  },
  options: [
    {
      id: uuid(),
      bd_name: "",
      title: {
        ru: "",
        en: ""
      },
      initial: true
    }
  ]
});

const getNewEmptyForm = (id: string): IForm => ({
  id,
  title: "New Form",
  lang: "ru",
  column_number: 1,
  fields: []
});

const forms = createModel<IRootModel>()({
  state: [] as IForm[],
  reducers: {
    INSERT: (state, newform: IForm) => [...state, newform],
    INIT: (_, payload: IForm[]) => payload,
    UPDATE: (state, updatedform: IForm | undefined) =>
      state.map((form) => (form.id === updatedform?.id ? updatedform : form)),
    DELETE: (state, id: string) => state.filter((form) => form.id !== id),
    RESET: () => [],
    DELETE_FIELD: (state, id) =>
      state.map((form) => ({ ...form, fields: form.fields.filter((field) => field.id !== id) })),
    OPEN_FIELD: (state, id) =>
      state.map((form) => ({
        ...form,
        fields: form.fields.map((field) => ({
          ...field,
          opened: field.id === id ? true : false
        }))
      })),
    CLOSE_FIELD: (state, id) =>
      state.map((form) => ({
        ...form,
        fields: form.fields.map((field) => ({
          ...field,
          opened: field.id === id ? false : field.opened
        }))
      })),
    CLOSE_ALL_FIELDS: (state) =>
      state.map((form) => ({
        ...form,
        fields: form.fields.map((field) => ({
          ...field,
          opened: false
        }))
      })),
    INSERT_FIELD: (state, formId) =>
      state.map((form) => ({
        ...form,
        fields:
          form.id === formId
            ? [...form.fields.map((field) => ({ ...field, opened: false })), getNewEmptyField()]
            : form.fields
      })),
    INSERT_EXIST_FIELD: (state, formId, field) =>
      state.map((form) => ({
        ...form,
        fields:
          form.id === formId
            ? [...form.fields.map((field) => ({ ...field, opened: false })), field]
            : form.fields
      })),
    UPDATE_FIELD: (state, updatedfield: IField | undefined) =>
      state.map((form) => ({
        ...form,
        fields: form.fields.map((field) => (field.id === updatedfield?.id ? updatedfield : field))
      }))
  },
  effects: (dispatch) => ({
    async FETCH_CREATE_FORM() {
      const response = await request.post("/forms", {
        name: "New Form"
      });
      const responseData = await response.data;
      const form = getNewEmptyForm(responseData.id);
      dispatch.forms.INSERT(form);
      return form;
    },
    async FETCH_GET_ALL_FORMS() {
      dispatch.forms.INIT([getNewEmptyForm("1")]);
    },
    async FETCH_DELETE_FORM(id: string) {
      const response = await request.del("/forms/" + id);
      if (response.status === 200) dispatch.forms.DELETE(id);
      else console.log("Удаление не удалось");
    },
    async FETCH_UPDATE_FORM(form: IForm) {
      await request.put("/forms/" + form.id, {
        name: form.title,
        template: JSON.stringify(form)
      });
    }
  })
});

export default forms;
