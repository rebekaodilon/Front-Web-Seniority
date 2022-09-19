import { API } from "../helpers/api.service"

export const actions = {
    async getListPost(method, data) {
        const result = await API.post(method, data);
        return result;
    },

    async getItem(method) {
        const result = await API.get(method);
        return result;
    },

	async postByEcommerceToken(method, data, tokenEcommerce) {
        const result = await API.postByEcommerceToken(method, data, tokenEcommerce);
        return result;
    },

    async postItem(method, data) {
        const result = await API.post(method, data);
        return result;
    },

    async getViaCep(url) {
        const result = await API.getViaCep(url)
        return result;
    },

	async deleteItem(method, data) {
        const result = await API.delete(method, data);
        return result;
    }
}

export default {
    actions
}