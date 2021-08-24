import React from "react";
// 로그아웃 기능을 위해 임시 구현 Home
export default function Home() {
  return (
    <>
      {window.localStorage.getItem("access_token") && (
        <button
          onClick={() => {
            window.localStorage.removeItem("access_token");
            window.location.href = "/login";
          }}
        >
          로그아웃
        </button>
      )}
    </>
  );
}
