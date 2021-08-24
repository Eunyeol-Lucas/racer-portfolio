import React, { useEffect } from "react";
import axios from "axios";
import authHeader from "./authHeader";

export default async function tokenCheck(url) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/${url}`, {
      headers: authHeader(),
    });
    console.log("response", response);
    const image = (response) => {
      let image = btoa(
        new Uint8Array(response.data.image).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:${response.headers[
        "content-type"
      ].toLowerCase()};base64,${image}`;
    }
    console.log(image(response))

  } catch (error) {
    console.log("error.response", error.response);
    if (error.response.status === 401) {
      alert("토큰이 만료되었습니다.");
      window.localStorage.removeItem("access_token")
    }
  }
}
