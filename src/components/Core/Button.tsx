import React, { PropsWithChildren, useState, useRef } from "react";
import classNames from "classnames";
import CSSTransition from "react-transition-group/CSSTransition";

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  type?: "submit" | "button" | "reset";
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  onClick,
  children,
  type = "button",
  disabled,
}) => {
  const [buttonAnimationIsRunning, setButtonAnimationIsRunning] =
    useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonClickHandler = (event: React.MouseEvent) => {
    if (onClick) onClick(event);
    setButtonAnimationIsRunning(true);
    setTimeout(() => {
      setButtonAnimationIsRunning(false);
    }, 150);
  };

  const btnClass = className
    ? classNames({
        "text-sm rounded-3xl font-bold text-center transition duration-500":
          true,
        "bg-header-color hover:bg-white hover:text-header-color hover:border-header-color hover:border-2":
          !className.includes("bg-"),
        "text-white": !className.includes("text-"),
        "px-8": !className.includes("px-"),
        "py-1": !className.includes("py-"),
        [className]: true,
      })
    : "py-1 px-8 text-sm rounded-3xl font-bold text-white text-center transition duration-500 bg-header-color hover:bg-white hover:text-header-color hover:border-header-color hover:border-2 disabled:bg-gray-200";

  return (
    <CSSTransition
      nodeRef={buttonRef}
      in={buttonAnimationIsRunning}
      timeout={150}
      classNames="button-comp"
    >
      <button
        ref={buttonRef}
        type={type}
        disabled={disabled ?? false}
        className={btnClass}
        onClick={buttonClickHandler}
      >
        {children}
      </button>
    </CSSTransition>
  );
};

export default Button;
