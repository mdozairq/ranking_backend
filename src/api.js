import axios from "axios";

const baseUrl = "https://api.avinashgarg.in/"

export const getData = async(regNo) =>{
    let res;
    try {
         res = await axios.get(baseUrl+regNo); 
    } catch (error) {
        console.log(error);
    }

    return res.data;
}