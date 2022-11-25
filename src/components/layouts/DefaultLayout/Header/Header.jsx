import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Logo from "../../../../assets/img/dux.png";
import { logout } from "../../../../store/reducers/auth.slice";
import Basket from "./Basket/Basket";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(isAuth);

  const handleClick = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent={"space-between"}
      sx={{
        boxShadow: "0 1rem 3rem rgba(0,0,0,.175)!important",
      }}
    >
      <Stack direction={"row"} alignItems="center">
        <Box
          component="img"
          sx={{
            height: 100,
            width: 100,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src={Logo}
        />
        <Stack direction="row" spacing={2}>
          <Link to="/" style={{ color: "rgba(0,0,0,.5)" }}>
            Main
          </Link>
          <Link style={{ color: "rgba(0,0,0,.5)" }} to="/contacts">
            Contacts
          </Link>
          {!isAuth && (
            <Link style={{ color: "rgba(0,0,0,.5)" }} to="/login">
              Reg/Auth
            </Link>
          )}
          {isAuth && (
            <Link style={{ color: "rgba(0,0,0,.5)" }} to="/my-account">
              My account
            </Link>
          )}
          {isAuth && (
            <Link style={{ color: "rgba(0,0,0,.5)" }} to="/admin">
              Admin
            </Link>
          )}
        </Stack>
      </Stack>
      <Stack>
        <Basket />
        {isAuth && <Button onClick={handleClick}>Log Out</Button>}
      </Stack>
    </Stack>
  );
};

export default Header;
