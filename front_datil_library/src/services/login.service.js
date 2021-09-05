import axios from "axios";
import { url } from "../env";

import cookie from 'react-cookies'

export async function loginWithCredentials(username, password) {

    try {
        let res = await axios.post(
            url + "auth/",
            {
                username : username,
                password : password
            }
        );

        cookie.save("token", res.data.token);
    
        return true;
    } catch (error) {
        return false;
    }
}

export async function loginWithToken(){
    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.get(
            url + "user/",
            { headers: { Authorization: "Token " + token} }
        );

        return res.data;
    } catch (error) {
        cookie.remove("token");
        return undefined;
    }
}