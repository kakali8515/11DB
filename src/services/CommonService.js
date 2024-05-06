//import 
import axios from 'axios';

export default class CommonService {

    // login
    async getLogin(email, password) {
        return await axios.post(`/auth/login`,
            {
                email: email,
                password: password,
            }).then((res) => res).catch((err) => err);
    }

    // registration
    async getRegistration(email, name, password) {
        return await axios.post(`/auth/signup`,
            {
                email: email,
                name: name,
                password: password,
            }).then((res) => res).catch((err) => err);
    }

    //registration check email
    async emailCheck(email) {
        return await axios.post(`/auth/check-email`,
            {
                email: email,
            }).then((res) => res).catch((err) => err);
    }

    //registration email Verify
    async emailVerify(email, type) {
        return await axios.post(`/auth/email-verify`,
            {
                email: email,
                type: type
            }).then((res) => res).catch((err) => err);
    }

    // send reset verification code
    async resetVerificationCode(email) {
        return await axios.post(`/auth/send-reset-verification-code`,
            {
                email: email,
            }).then((res) => res).catch((err) => err);
    }

    // check verification code
    async checkVerificationCode(email, verification_code) {
        return await axios.post(`/auth/check-verification-code`,
            {
                email: email,
                verification_code: verification_code
            }).then((res) => res).catch((err) => err);
    }

    // set password
    async setPassword(user_id, verification_code, password) {
        return await axios.post(`/auth/setting-password`,
            {
                user_id: user_id,
                verification_code: verification_code,
                password: password
            }).then((res) => res).catch((err) => err);
    }

    // about us
    async aboutUs() {
        return await axios.get(`/about-us`).then((res) => res).catch((err) => err);
    }

    // term of service
    async termsOfService() {
        return await axios.get(`/terms-of-service`).then((res) => res).catch((err) => err);
    }

    // privacy policy
    async privacyPolicy() {
        return await axios.get(`/privacy-policy`).then((res) => res).catch((err) => err);
    }

    // language dropdown
    async languageDropdown() {
        return await axios.get(`/language/language-list`).then((res) => res).catch((err) => err);
    }

    // contact type list
    async contactTypeList() {
        return await axios.get(`/contact-us/type-list`).then((res) => res).catch((err) => err);
    }

    // contact
    async contactUs(name, email, type, message) {
        return await axios.post(`/contact-us`,
            {
                name: name,
                email: email,
                type: type,
                message: message
            }).then((res) => res).catch((err) => err);
    }

    // save theme
    async saveTheme(theme) {
        return await axios.post(`/user/save-user-theme`, { theme: theme }).then((res) => res).catch((err) => err);
    }

}