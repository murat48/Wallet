"use server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const initialize_user = async () => {
    const idempotencyKey = uuidv4(); // generates an idempotency key

    const options = {
        method: "POST",
        url: "https://api.circle.com/v1/w3s/user/initialize",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  TEST_API_KEY:951118525fe74c74d28c8e4ac20a4459:8bc450f8d1bf979205f00c8a93291e3c`,
            "X-User-Token": `${process.env.NEXT_PUBLIC_USER_TOKEN}`,
        },
        data: {
            idempotencyKey: idempotencyKey, accountType: "SCA",
            blockchains: ["MATIC-AMOY"]
        },
    };

    return axios
        .request(options)
        .then(function (response) {
            console.log("idempotency key: ", idempotencyKey);
            return response.data.data.challengeId;
        })
        .catch(function (error) {
            console.error(error);
        });
};