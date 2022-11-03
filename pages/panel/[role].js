import Router from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import AdminPanel from "../../components/Panels/adminPanel";
import StudentPanel from "../../components/Panels/studentPanel";

const PanelRole = () => {
  const [user, setUsers] = useState("");
  useEffect(() => {
    console.log(Router.query.role == "admin");
    setUsers(JSON.parse(localStorage.getItem("userDetails")));
  }, []);
  return (
    <>
      <Header />
      {user &&
        (Router.query.role == "admin" ? (
          <AdminPanel />
        ) : Router.query.role == "student" ? (
          <StudentPanel />
        ) : (
          ""
        ))}
    </>
  );
};

export default PanelRole;
