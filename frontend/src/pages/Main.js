import React from "react";
import { useSelector } from "react-redux";
import {
  Award,
  Certificate,
  Education,
  Profile,
  Project,
} from '../components/allComponents'
import { TextInput } from "../components/TextInput";
const Main = () => {
//   const isLogin = useSelector((state) => state.auth);
//   console.log(isLogin);
  return (
    <div>
      <h1> Main </h1>
      <Profile />
      <TextInput />
      <Education />
      <Award />
      <Project />
      <Certificate />
    </div>
  );
};

export default Main;
