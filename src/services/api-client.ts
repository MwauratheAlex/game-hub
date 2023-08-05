import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "6062fe4c3af34fb686fdbe3bfcaa2d51"
    }
})

