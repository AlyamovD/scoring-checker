declare namespace DIcon {
  interface svgList {
    radioButtonUnchecked: React.ReactNode;
    radioButtonChecked: React.ReactNode;
    arrowBack: React.ReactNode;
    checkBoxOutlineBlank: React.ReactNode;
    checkBox: React.ReactNode;
    shortText: React.ReactNode;
    arrowDropDown: React.ReactNode;
    dragIndicator: React.ReactNode;
    close: React.ReactNode;
    dropdown: React.ReactNode;
    delete: React.ReactNode;
    add: React.ReactNode;
  }

  type name = keyof svgList;

  interface props {
    name: name;
    size?: number;
    className?: string;
  }
}

export default DIcon;
