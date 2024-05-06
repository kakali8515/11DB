import validator from "validator";
import i18n from '@/config/i18n';
import { computed } from "@vue/runtime-core";

const { t } = i18n.global;

const LoginValidation = (data) => {
    let errors = {};

    const { email, password } = data;

    if (validator.isEmpty(password)) { 
        errors.password = computed(()=>t('Error.requiredField'));
    }
    if (validator.isEmpty(email)) {
        errors.email = computed(()=>t('Error.requiredField'));
    }
    else if (!validator.isEmail(email)) {
        errors.email = computed(()=>t('Error.validEmail'));
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
};

export default LoginValidation;
