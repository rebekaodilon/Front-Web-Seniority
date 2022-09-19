const TOKEN = "tokenBackoffice";
const PERMISSIONS = "permissions";
const USER = "user";
const ECOMMERCE_TOKEN = "tokenEcommerce";
const STATUS_INTEGRACAO = "statusIntegracao";

export default {
    saveToken(token, permissions, user) {
        window.localStorage.setItem(TOKEN, token);
        window.localStorage.setItem(PERMISSIONS, JSON.stringify(permissions));
        window.localStorage.setItem(USER, JSON.stringify(user));
    },

    destroyToken() {
        window.localStorage.removeItem(TOKEN);
        window.localStorage.removeItem(PERMISSIONS);
        window.localStorage.removeItem(USER);
        window.localStorage.removeItem(ECOMMERCE_TOKEN);
        window.localStorage.removeItem(STATUS_INTEGRACAO);
    },

    getToken() {
        return window.localStorage.getItem(TOKEN);
    },

    getPermissions() {
        return JSON.parse(window.localStorage.getItem(PERMISSIONS));
    },

    getUser() {
        return JSON.parse(window.localStorage.getItem(USER));
    },

    getPerfil() {
        let user = JSON.parse(window.localStorage.getItem(USER));
        return user.Perfil;
    },
};