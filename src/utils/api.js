import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: { hl: "hi", gl: "US" },
    headers: {
        "X-RapidAPI-Key": 'a2cc1107b5msh405fd127b38c297p1e16f6jsn303d2ffbfb19',
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};
