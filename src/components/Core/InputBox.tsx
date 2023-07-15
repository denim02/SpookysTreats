import { forwardRef, useImperativeHandle } from "react";
import useInput from "../../hooks/use-input";
import ValidationRule, {
  ValidationCallback,
} from "../../models/ValidationRule";

type InputTypes = "text" | "email" | "password" | "number" | "range" | "date";

interface InputHandle {
  resetInput: () => void;
}

interface InputBoxProps {
  type: InputTypes;
  label?: string;
  name: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  onBlurred?: (value: string, hasError?: boolean, wasFocused?: boolean) => void;
  validationFunction?: ValidationRule | ValidationRule[] | ValidationCallback;
}

const InputBox = forwardRef<InputHandle, InputBoxProps>(
  (
    {
      type,
      label,
      name,
      id,
      placeholder,
      required,
      onBlurred,
      validationFunction,
    },
    ref
  ) => {
    const {
      value,
      hasError: inputHasError,
      errorMessage,
      inputBlurHandler,
      valueChangeHandler,
      resetInputHandler,
    } = useInput(validationFunction ?? (() => true));

    const blurHandler = () => {
      if (onBlurred) {
        onBlurred(value, inputHasError, true);
        inputBlurHandler();
      } else {
        inputBlurHandler();
      }
    };

    useImperativeHandle(ref, () => ({
      resetInput: () => {
        resetInputHandler();
      },
    }));

    return (
      <div className="form-control">
        <label htmlFor={id ?? name}>{label ?? name}</label>
        <input
          type={type}
          value={value}
          name={name}
          id={id ?? name}
          placeholder={placeholder ?? ""}
          required={required ?? false}
          onChange={valueChangeHandler}
          onBlur={blurHandler}
          className={inputHasError ? "bg-red-100 border-red-300 border" : ""}
        />
        {inputHasError && <p>{errorMessage}</p>}
      </div>
    );
  }
);

export default InputBox;
export type { InputHandle };
