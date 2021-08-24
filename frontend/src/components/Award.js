import React from "react";
import { useSelector } from "react-redux";

const Award = () => {
  // const auth = useSelector((state) => state.auth);

  return (
    <div>
      <div>
        <h2> 수상이력 </h2>
        <p> 수상 내역 </p>
        <p> 상세 내역 </p>
      </div>
      <div>
        <form>
          <input placeholder="수상내역" />
          <input placeholder="상세내역" />
          <button type="submit"> 수정 </button>
        </form>
      </div>
    </div>
  );
};

export default Award;
