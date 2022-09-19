import { API } from "../helpers/api.service"
import token from "../helpers/token.service"
import { LOGIN, LOGOUT } from "./actions.type"

export const actions = {
    isAuthenticate () {
        return !!token.getToken();
    },
    
    logout() {
        token.destroyToken();
    },

    async [LOGIN](context, credenciais) {
        const result = await API.post('auth/login', credenciais.data);
        
        if (result.Token) {
            token.saveToken(result.Token, "0", result.Usuario);
        }

        return result;
    },
    
    async [LOGOUT](context) {       
        token.destroyToken();
    },

    async recuperarSenha(data) {
        const result = await API.post('auth/recuperar-senha', data);
        return result;
    }
}

export default {
    actions
}