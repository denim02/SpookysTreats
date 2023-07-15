import { useCallback, useReducer } from "react";
import ValidationRule, { ValidationCallback } from "../models/ValidationRule";

type AcceptedValidationParameter =
  | ValidationRule
  | ValidationRule[]
  | ValidationCallback;

type ValidationReturnTuple = [boolean, string];

const validateWithRuleArray = (
  value: string,
  rules: ValidationRule[]
): ValidationReturnTuple => {
  for (const rule of rules) {
    if (rule.validationCallback(value) === false)
      return [false, rule.associatedErrorMessage];
  }

  return [true, ""];
};

const validateWithSingleRule = (
  value: string,
  rule: ValidationRule
): ValidationReturnTuple => {
  if (rule.validationCallback(value) === false)
    return [false, rule.associatedErrorMessage];
  else return [true, ""];
};

const validateWithCallback = (
  value: string,
  rule: ValidationCallback
): ValidationReturnTuple => {
  if (rule(value) === false) return [false, "The input value is invalid."];
  else return [true, ""];
};

const useInput = (validationLogic: AcceptedValidationParameter) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [wasFocused, setWasFocused] = useState(false);
  console.log("re-rendered");

  let validationResult: ValidationReturnTuple = [true, ""];

  // Parse validation logic
  if (validationLogic instanceof Function)
    validationResult = validateWithCallback(enteredValue, validationLogic);
  else if (validationLogic instanceof Array)
    validationResult = validateWithRuleArray(enteredValue, validationLogic);
  else validationResult = validateWithSingleRule(enteredValue, validationLogic);

  const enteredValueIsValid = validationResult[0];
  const inputHasError = wasFocused && !enteredValueIsValid;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setWasFocused(true);
  };

  const resetInputHandler = useCallback(() => {
    setEnteredValue("");
    setWasFocused(false);
  }, []);

  return {
    value: enteredValue,
    isValid: enteredValueIsValid,
    wasFocused,
    hasError: inputHasError,
    errorMessage: validationResult[1],
    inputBlurHandler,
    valueChangeHandler,
    resetInputHandler,
  };
};

export default useInput;
