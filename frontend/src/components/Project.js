import React, { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";

const Project = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
//   const auth = useSelector((state) => state.auth);

  return (
    <div>
      <div>
        <h2> 프로젝트 </h2>
        <p> 프로젝트명 </p>
        <p> 프로젝트 내용 </p>
        <p> 날짜 </p>
        <button> 수정 </button>
      </div>
      <div>
        <input placeholder="프로젝트명" />
        <input placeholder="프로젝트 내용" />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
    </div>
  );
};

export default Project;
