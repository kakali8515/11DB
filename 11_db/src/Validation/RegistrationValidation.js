import validator from "validator";
import i18n from '@/config/i18n';
import { computed } from "@vue/runtime-core";

const { t } = i18n.global;


const RegistrationValidation = (data) => {
    let errors = {};

    const { email, name, password, confirmPassword } = data;

    if (validator.isEmpty(password)) {
        errors.password = computed(()=>t('Error.requiredField'));
    }
    else if (!(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/))) {
        errors.password = computed(()=>t('Error.PasswordFormat'));
      }
    if (validator.isEmpty(email)) {
        errors.email = computed(()=>t('Error.requiredField'));
    }
    if (validator.isEmpty(name)) {
        errors.name = computed(()=>t('Error.requiredField'));
    }
    if (validator.isEmpty(confirmPassword)) {
        errors.confirmPassword = computed(()=>t('Error.requiredField'));
    }
    else if (!validator.equals(password, confirmPassword)) {
        errors.confirmPassword = computed(()=>t('Error.checkPassword'));
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
};

export default RegistrationValidation;
