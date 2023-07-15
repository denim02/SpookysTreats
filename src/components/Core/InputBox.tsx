import useInput from "../../hooks/use-input";
import ValidationRule, {
  ValidationCallback,
} from "../../models/ValidationRule";

type InputTypes = "text" | "email" | "password" | "number" | "range" | "date";

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

const InputBox: React.FC<InputBoxProps> = (
  (
    { type, label, name, id, placeholder, required, onBlurred, validationFunction }
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
      }
      else {
        inputBlurHandler();
      }
    }

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
