import React, { PropsWithChildren } from "react";
import classNames from "classnames";

interface ButtonProps {
  className: string,
  onClick?: (event: React.MouseEvent) => void,
  type?: "submit" | "button" | "reset",
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ className, onClick, children, type="button" }) => {
  const btnClass = classNames({
    "text-sm rounded-3xl font-bold text-center": true,
    "bg-header-color": !className.includes("bg-"),
    "text-white": !className.includes("text-"),
    "px-8": !className.includes("px-"),
    "py-1": !className.includes("py-"),
    [className]: true,
  });

  return (
    <button type={type} className={btnClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
