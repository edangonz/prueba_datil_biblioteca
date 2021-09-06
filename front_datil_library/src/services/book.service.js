import axios from "axios";
import { url } from "../env";

import cookie from 'react-cookies'

export async function addBook(data_book) {

    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.post(
            url + "book/",
            data_book,
            { headers: { Authorization: "Token " + token} }
        );

        return res.data;
    } catch (error) {
        return false;
    }
}


export async function addStockBook(data_book){
    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.put(
            `${url}book/${data_book.code_book}/`,
            data_book,
            { headers: { Authorization: "Token " + token} }
        );

        return res.data;
    } catch (error) {
        return false;
    }
}

export async function getBooksFilter() {

    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.get(
            url + "book/",
            {headers: { Authorization: "Token " + token} }
        );

        return res.data;
    } catch (error) {
        return [];
    }
}

export async function getBook(book_id) {

    try {
        let token = cookie.load("token");
        if(!token)
            return undefined;

        let res = await axios.get(
            `${url}book/${book_id}/`,
            {headers: { Authorization: "Token " + token} }
        );

        return [res.data];
    } catch (error) {
        return [];
    }
}
