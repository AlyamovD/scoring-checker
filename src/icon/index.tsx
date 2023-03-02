import React from "react";
import DIcon from "./icon";
import list from "./svg-list";

const Icon: React.FC<DIcon.props> = React.memo(
  ({ size = 24, name, className }): JSX.Element => (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <svg
        viewBox="0 0 24 24"
        style={{ width: size + "px", height: size + "px" }}
        fill="currentColor"
      >
        {list[name]}
      </svg>
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.name === nextProps.name && prevProps.size === nextProps.size
);

export default Icon;
