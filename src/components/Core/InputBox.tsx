import { useContext, useEffect } from "react";
import useInput from "../../hooks/use-input";
import ValidationRule, {
  ValidationCallback,
} from "../../models/ValidationRule";
import FormContext, { InputState } from "../../stores/form-context";

type InputTypes = "text" | "email" | "password" | "number" | "range" | "date";


interface InputBoxProps {
  type: InputTypes;
  label?: string;
  name: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  validationFunction?: ValidationRule | ValidationRule[] | ValidationCallback;
}

const InputBox: React.FC<InputBoxProps> = (
  (
    { type, label, name, id, placeholder, required, validationFunction }
  ) => {
    const {
      value,
      isValid: valueIsValid,
      hasError: inputHasError,
      errorMessage,
      inputBlurHandler,
      valueChangeHandler,
      resetInputHandler,
    } = useInput(validationFunction ?? (() => true));

    const formCtx = useContext(FormContext);
    formCtx.upsertInput({
        name,
        value,
        isValid: valueIsValid,
        resetInput: resetInputHandler
    } as InputState);

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
          onBlur={inputBlurHandler}
          className={inputHasError ? "bg-red-100 border-red-300 border" : ""}
        />
        {inputHasError && <p>{errorMessage}</p>}
      </div>
    );
  }
);

export default InputBox;
