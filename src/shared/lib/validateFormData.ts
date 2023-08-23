enum ValidateMethodsEnum {
  isRequired = 'isRequired',
  isEmail = 'isEmail',
  minLength = 'minLength',
  maxLength = 'maxLength',
  isContainDigital = 'isContainDigital',
  isContainDifferentCase = 'isContainDifferentCase',
}

type ValidateMethods = {
  [key in keyof typeof ValidateMethodsEnum]: (
    fieldValue: string,
    validateValue?: string | number
  ) => boolean;
};

type FieldValidateSchemaItem = { message: string; value?: string | number };

export type FieldValidateSchema = {
  [key in keyof typeof ValidateMethodsEnum]?: FieldValidateSchemaItem;
};

const validateMethods: ValidateMethods = {
  isRequired: (value) => value.trim() !== '',
  isEmail: (value) => /^\S+@\S+\.\S+$/g.test(value),
  minLength: (value, validateValue) => value.trim().length >= Number(validateValue),
  maxLength: (value, validateValue) => value.trim().length <= Number(validateValue),
  isContainDigital: (value) => /\d+/g.test(value),
  isContainDifferentCase: (value) => /[A-Z]+/g.test(value),
};

const validateField = (fieldValue: string, fieldSchema: FieldValidateSchema): string | void => {
  for (const validateMethod in fieldSchema) {
    const fieldSchemaItem = fieldSchema[
      validateMethod as ValidateMethodsEnum
    ] as FieldValidateSchemaItem;

    const isValid = validateMethods[validateMethod as ValidateMethodsEnum](
      fieldValue,
      fieldSchemaItem.value
    );

    if (!isValid) return fieldSchemaItem.message;
  }
};

export const validateFormData = (
  data: { [key: string]: string },
  schema: { [key: string]: FieldValidateSchema }
) => {
  const errors: { [key: string]: string } = {};

  for (const fieldName in data) {
    const error = validateField(data[fieldName], schema[fieldName]);
    if (error) errors[fieldName] = error;
  }

  return errors;
};
