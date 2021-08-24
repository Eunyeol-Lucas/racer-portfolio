import React from "react";
import { useSelector } from "react-redux";

const Certificate = () => {
  // const auth = useSelector((state) => state.auth);

  return (
    <div>
      <div>
        <h2> 자격증 </h2>
        <p> 자격증 명 </p>
        <p> 발급기관 </p>
        <p> 취득 날짜 </p>
      </div>
      <div>
        <form>
          <input placeholder="자격증 몇" />
          <input placeholder="발급 기관" />
          <input placeholder="취득 날짜" />
          <button type="submit"> 수정 </button>
        </form>
      </div>
    </div>
  );
};

export default Certificate;
