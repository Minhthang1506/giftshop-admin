import axios from "axios";
import { URL_DOMAIN_V1 } from "../../services/API";

const authProvider = {
    login: async ({username, password}) => {

        try {
            const result = await axios.post(`${URL_DOMAIN_V1}/Auths/signin`, {
                // email : "gaughegomth01@gmail.com",
                // password: "123456",
                email : username,
                password : password
            });

            const config = {
                headers: { 'Authorization': 'Bearer ' + result.data?.data?.accessToken}
            }
            const order = await axios.get(`${URL_DOMAIN_V1}/orders?sortBy=createAt`,config)
            //console.log(order)
            localStorage.setItem(
                "auth",
                JSON.stringify(result.data?.data?.accessToken)
            );
        } catch (e) {
            console.log(e)
            throw new Error(e.response?.data?.message);
        }
    },
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
    getPermissions: () => {
        // Required for the authentication to work
        return Promise.resolve();
    },
    checkError:  (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    // ...
};

export default authProvider;
