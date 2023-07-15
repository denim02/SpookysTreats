import React, { useContext, useReducer, useRef } from "react";
import Button from "../Core/Button";
import InputBox, { InputHandle } from "../Core/InputBox";
import CartContext from "../../stores/cart-context";
import ValidationRule from "../../models/ValidationRule";

interface OrderFormProps {
  totalPrice: string;
  onChangePage: () => void;
}

const FORM_URL = "";

const validationRules = {
  name: new ValidationRule(
    (value) => value.length > 0,
    "The name field cannot be blank!"
  ),
  phoneNumber: [
    new ValidationRule(
      (value) => value.length > 0,
      "You must specify a phone number!"
    ),
    new ValidationRule(
      (value) => /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(value),
      "Invalid format for the phone number!"
    ),
  ],
  address: [
    new ValidationRule(
      (value) => value.length > 0,
      "The address cannot be blank!"
    ),
    new ValidationRule(
      (value) => value.length > 10,
      "The address must be longer than 10 characters!"
    ),
  ],
};

class InputState {
  name: string;
  value: string;
  hasError: boolean;
  wasFocused: boolean;

  constructor(
    name: string,
    value: string,
    hasError: boolean,
    wasFocused: boolean
  ) {
    this.name = name;
    this.value = value;
    this.hasError = hasError;
    this.wasFocused = wasFocused;
  }
}

interface FormState {
  disabled: boolean;
  inputs: {
    name: InputState;
    phoneNumber: InputState;
    address: InputState;
  };
}

type ActionType =
  | {
      type: "CHANGE_INPUT";
      inputName: string;
      value?: string;
      hasError?: boolean;
      wasFocused?: boolean;
    }
  | {
      type: "RESET_FORM";
    };

const INIT_STATE = {
  disabled: true,
  inputs: {
    name: new InputState("name", "", false, false),
    phoneNumber: new InputState("phoneNumber", "", false, false),
    address: new InputState("address", "", false, false),
  },
};

const formReducer = (state: FormState, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      const updatedInputs = {
        ...state.inputs,
        [action.inputName]: {
          ...state.inputs[action.inputName as keyof FormState["inputs"]],
          value: action.value,
          hasError:
            action?.hasError ??
            state.inputs[action.inputName as keyof FormState["inputs"]]
              .hasError,
          wasFocused:
            action?.wasFocused ??
            state.inputs[action.inputName as keyof FormState["inputs"]]
              .wasFocused,
        },
      };

      const updatedFormState = {
        ...state,
        inputs: updatedInputs,
      };

      let isFormDisabled = false;
      for (const inputName in updatedInputs) {
        const input = updatedInputs[inputName as keyof FormState["inputs"]];
        if (input.hasError || !input.wasFocused) {
          isFormDisabled = true;
          break;
        }
      }
      updatedFormState.disabled = isFormDisabled;

      return updatedFormState;
    case "RESET_FORM":
      return INIT_STATE;
    default:
      return state;
  }
};

const OrderForm: React.FC<OrderFormProps> = ({ onChangePage }) => {
  const [formState, dispatchFormState] = useReducer(formReducer, INIT_STATE);
  const nameInputRef = useRef<InputHandle>(null);
  const phoneNumberInputRef = useRef<InputHandle>(null);
  const addressInputRef = useRef<InputHandle>(null);
  const inputRefs = [nameInputRef, phoneNumberInputRef, addressInputRef];
  const cartCtx = useContext(CartContext);

  const inputBlurHandler = (inputName: string) => {
    return (value: string, hasError?: boolean, wasFocused?: boolean) => {
      dispatchFormState({
        type: "CHANGE_INPUT",
        inputName,
        value,
        hasError,
        wasFocused,
      });
    };
  };

  const formClearHandler = () => {
    dispatchFormState({ type: "RESET_FORM" });
    inputRefs.forEach((inputRef) => {
      inputRef.current?.resetInput();
    });
  };

  return (
    <div>
      <form>
        <InputBox
          name="name"
          label="Name"
          placeholder="Your name"
          type="text"
          ref={nameInputRef}
          onBlurred={inputBlurHandler("name")}
          validationFunction={validationRules.name}
        />
        <InputBox
          name="phone_number"
          label="Phone Number"
          placeholder="e.g. (+355 69 236 1634)"
          type="text"
          ref={phoneNumberInputRef}
          onBlurred={inputBlurHandler("phoneNumber")}
          validationFunction={validationRules.phoneNumber}
        />
        <InputBox
          name="address"
          label="Address"
          placeholder="e.g. &ldquo;Prokop&rdquo; St."
          type="text"
          ref={addressInputRef}
          onBlurred={inputBlurHandler("address")}
          validationFunction={validationRules.address}
        />

        <Button type="reset" onClick={formClearHandler}>
          Clear
        </Button>
        <Button type="submit" disabled={formState.disabled}>
          Order Items
        </Button>
      </form>

      <Button onClick={onChangePage}>Go back to cart</Button>
    </div>
  );
};

export default OrderForm;
