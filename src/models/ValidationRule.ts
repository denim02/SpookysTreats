type ValidationCallback = (value: string) => boolean;

class ValidationRule {
  validationCallback: ValidationCallback;
  associatedErrorMessage: string;

  constructor(
    validationCallback: ValidationCallback,
    associatedErrorMessage: string
  ) {
    this.validationCallback = validationCallback;
    this.associatedErrorMessage = associatedErrorMessage;
  }
}

export type { ValidationCallback };
export default ValidationRule;
