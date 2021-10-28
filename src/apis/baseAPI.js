import axios from "axios";

export default axios.create({
    baseURL: "https://myntrah-backend.herokuapp.com",
    // baseURL: "http://localhost:5000",
})