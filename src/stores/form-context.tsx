import React, { PropsWithChildren, useState, useEffect } from "react";

type InputState = {
  name: string;
  value: string;
  isValid: boolean;
  resetInput: () => void;
};

interface FormContextType {
  inputs: InputState[];
  isDisabled: boolean;
  initializeInputs: (inputs: InputState[]) => void;
  upsertInput: (input: InputState) => void;
  resetAllInputs: (input: InputState) => void;
}

const FormContext = React.createContext<FormContextType>({} as FormContextType);

const FormContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [inputs, setInputs] = useState<InputState[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const initializeInputs = (inputs: InputState[]) => {
    setInputs(inputs);
  };

  const upsertInput = (input: InputState) => {
    const inputIndex = inputs.findIndex((entry) => entry.name === input.name);

    if (inputIndex >= 0) {
      setInputs((prevState) =>
        prevState.filter((_, index) => inputIndex !== index).concat(input)
      );
    } else {
      setInputs((prevState) => [...prevState, input]);
    }
  };

  const resetAllInputs = () => {
    inputs.forEach((input) => input.resetInput());
  };

  useEffect(() => {
    setIsDisabled(inputs.some(input => !input.isValid));
  }, [inputs])
  

  return (
    <FormContext.Provider
      value={{ inputs, isDisabled, initializeInputs, upsertInput, resetAllInputs }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export { FormContextProvider };
export type { InputState };
export default FormContext;
