import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
const Header = () => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  return (
    <>
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
            className="navbar-brand "
            href="#"
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
