import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  console.log(currentUser);
  return <div>{!currentUser ? <Navigate to="/login" /> : children}</div>;
};

export default Protected;
