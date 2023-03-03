import DIcon from "icon/icon";
import { TFiledType } from "store/models/forms";

const transcript = {
  fieldType: {
    keyToText: (fieldType: TFiledType) => {
      switch (fieldType) {
        case "dropdown":
          return "Выпадающее меню";
        case "one_of_list":
          return "Один из списка";
        case "several_of_list":
          return "Несколько из списка";
        case "text_number":
          return "Текст (число)";
        case "text_float":
          return "Текст (число c плавающей точкой)";
        case "text_string":
          return "Текст (строка)";
        default:
          return "Неопределено";
      }
    },
    keyToIconname: (fieldType: TFiledType): DIcon.name => {
      switch (fieldType) {
        case "dropdown":
          return "dropdown";
        case "one_of_list":
          return "radioButtonChecked";
        case "several_of_list":
          return "checkBox";
        case "text_float":
          return "shortText";
        case "text_number":
          return "shortText";
        case "text_string":
          return "shortText";
      }
    },
  },
};

export default transcript;
