import React, { useContext, useState } from "react";
import Button from "../Core/Button";
import InputBox from "../Core/InputBox";
import CartContext from "../../stores/cart-context";
import FormContext from "../../stores/form-context";
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

const OrderForm: React.FC<OrderFormProps> = ({ onChangePage }) => {
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);
  const cartCtx = useContext(CartContext);
  const formCtx = useContext(FormContext);

  const disabled = formCtx.isDisabled;

  return (
    <div>
      <form>
        <InputBox
          name="name"
          label="Name"
          placeholder="Your name"
          type="text"
          validationFunction={validationRules.name}
        />
        <InputBox
          name="phone_number"
          label="Phone Number"
          placeholder="e.g. (+355 69 236 1634)"
          type="text"
          validationFunction={validationRules.phoneNumber}
        />
        <InputBox
          name="address"
          label="Address"
          placeholder="e.g. &ldquo;Prokop&rdquo; St."
          type="text"
          validationFunction={validationRules.address}
        />

        <Button type="submit" disabled={isFormDisabled}>
          Order Items
        </Button>
      </form>

      <Button onClick={onChangePage}>Go back to cart</Button>
    </div>
  );
};

export default OrderForm;
