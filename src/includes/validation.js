import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage } from 'vee-validate';
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

// definedRule function allows us to register a rule globally.
// This rule will be available to every validation from.

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('email', email);
    defineRule('minVal', minVal);
    defineRule('maxVal', maxVal);
    defineRule('confirmed', confirmed);
    defineRule('excluded', excluded);
  },
};
