import React from 'react';
// server 요청시 authorization 자동화 컴포넌트
export default function authHeader() {
  const token = JSON.parse(localStorage.getItem("access_token"));

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
