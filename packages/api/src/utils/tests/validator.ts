import Ajv, { Schema, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

export class Validator {
  validateFn: ValidateFunction<any>;

  constructor(private schema: Schema) {
    const ajv = new Ajv();
    addFormats(ajv);
    this.validateFn = ajv.compile(schema);
  }

  validate<T extends object>(obj: T) {
    return this.validateFn(JSON.parse(JSON.stringify(obj)));
  }
}
