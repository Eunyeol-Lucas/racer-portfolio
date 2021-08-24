import React from "react";
import { useSelector } from "react-redux";

const Education = () => {
  // const auth = useSelector((state) => state.auth);

  return (
    <div>
      <div>
        <h2> 학력 </h2>
        <p> 학교 이름 </p>
        <p> 전공 </p>
      </div>
      <div>
        <form>
          <input placeholder="학교 이름" />
          <input placeholder="전공" />
          <p>
            <input type="radio" name="condition" value="재학중" />
            재학중
            <input type="radio" name="condition" value="학사졸업" />
            학사졸업
            <input type="radio" name="condition" value="석사졸업" />
            석사졸업
            <input type="radio" name="condition" value="박사졸업" />
            박사졸업
          </p>
        </form>
      </div>
      <button> 수정 </button>
    </div>
  );
};

export default Education;
