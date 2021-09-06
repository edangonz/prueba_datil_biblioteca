import axios from "axios";
import { url } from "../env";

import cookie from 'react-cookies'

export async function getBorrowedBooks(){
    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.get(
            `${url}book/borrowed/add/`,
            {headers: { Authorization: "Token " + token} }
        );

        return res.data;
    } catch (error) {
        return [];
    }
}

export async function getAllBorrowedBooks() {
    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.get(
            `${url}book/borrowed/admin/`,
            {headers: { Authorization: "Token " + token} }
        );

        return res.data;
    } catch (error) {
        return [];
    }
}

export async function deleteBorrowedBook(data_book) {
    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.delete(
            `${url}book/borrowed/admin/`,
            {
                params : data_book,
                headers: { Authorization: "Token " + token}
            }
        );
        
        return res.status === 202;
    } catch (error) {
        return false;
    }
}