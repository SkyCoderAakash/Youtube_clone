import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: { hl: "hi", gl: "US" },
    headers: {
        'X-RapidAPI-Key': '96944dea79mshf90a13e8da9d260p1c4c5bjsnb843eb687961',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};
