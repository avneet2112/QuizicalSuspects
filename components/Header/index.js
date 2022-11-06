import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Router, useRouter } from "next/router";
import Introduction from "../Introduction";
const Header = () => {
  const [client, setClient] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage?.getItem("userDetails")) {
      router.push("/");
    } else {
      setClient(true);
    }
  }, []);

  return (
    <>
      {Router.router.query.role == "admin" && <Introduction />}

      <nav className="navbar fixed-top navbar-light bg-light">
        <div className="d-flex ml-auto">
          <h4 className="pt-2">
            Welcome{" "}
            {client &&
              JSON.parse(localStorage.getItem("userDetails")).firstName}
            !!
          </h4>
          &nbsp;
          <Button
            variant="contained"
            color="success"
            className="navbar-brand logout"
            href="#"
            onClick={() => {
              router.push("/");
              localStorage.removeItem("userDetails");
            }}
          >
            <LogoutIcon fontSize="small" />
            Logout
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Header;
