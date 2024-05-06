import validator from "validator";
import i18n from '@/config/i18n';
import { computed } from "@vue/runtime-core";

const { t } = i18n.global;

const ContactUsValidation = (data) => {
    let errors = {};

    const { email, name, type, message } = data;

    if (validator.isEmpty(name)) {
        errors.name = computed(()=>t('Error.requiredField'));
    }
    if (validator.isEmpty(email)) {
        errors.email = computed(()=>t('Error.requiredField'));
    }
    else if (!validator.isEmail(email)) {
        errors.email = computed(()=>t('Error.validEmail'));
    }
    if (validator.isEmpty(type)) {
        errors.type = computed(()=>t('Error.requiredField'));
    }
    if (validator.isEmpty(message)) {
        errors.message = computed(()=>t('Error.requiredField'));
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
};

export default ContactUsValidation;
