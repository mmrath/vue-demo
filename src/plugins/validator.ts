import VeeValidate from "vee-validate";
import Vue from "vue";
import { Validator, install } from "vee-validate";

VeeValidate.install(Vue);

const dictionary = {
  en: {
    attributes: {
      email: "email address",
      firstName: "first name",
      lastName: "last name"
    }
  }
};

Validator.localize(dictionary);
