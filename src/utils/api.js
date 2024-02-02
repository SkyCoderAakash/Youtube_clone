import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: { hl: "hi", gl: "US" },
    headers: {
        "X-RapidAPI-Key": '68841d66f1msh7b987157764ded6p15939cjsn1e14d83b2ae3',
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};
