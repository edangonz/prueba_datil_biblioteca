import axios from "axios";
import { url } from "../env";

import cookie from 'react-cookies'

export async function reservarBook(data_book){
    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.post(
            `${url}book/reserva/add/`,
            data_book,
            { headers: { Authorization: "Token " + token} }
        );
        
        return res.status === 202;
    } catch (error) {
        return false;
    }
}

export async function getReserveBooks(){
    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.get(
            `${url}book/reserva/add/`,
            {headers: { Authorization: "Token " + token} }
        );

        return res.data;
    } catch (error) {
        return [];
    }
}

export async function updateReserveBooks(){
    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.put(
            `${url}book/reserva/add/`,
            {},
            {headers: { Authorization: "Token " + token} }
        );

        return res.status === 202;
    } catch (error) {
        return [];
    }
}