import React, { useEffect } from 'react';

export default function Logout() {
    useEffect(() => {
         window.localStorage.removeItem("access_token");
    })
    return (
        <div>로그아웃 되었습니다.</div>
    )
}