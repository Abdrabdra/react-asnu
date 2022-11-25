import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { logged } from "../../../store/reducers/auth.slice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate("/registration");
  };
  const hanldeSuccess = (id) => {
    dispatch(logged(id));
    navigate("/");
  };

  const [errMsg, setErrMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await axios.post("/auth/login", values);
        console.log(result.data.role[0]);
        // console.log(result.data.userid);
        hanldeSuccess(result.data.userid);
      } catch (err) {
        setErrMsg("Ошибка повторите еще раз");
      }
    },
  });
  const { values, handleChange, handleSubmit } = formik;
  const { username, password } = values;
  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div class="col-sm-4">
        <form method="post" id="auth">
          <h1 class="display-4">Authorization</h1>
          <input
            id="auth_email"
            type="email"
            name="username"
            value={username}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
            required=""
          />
          <input
            id="auth_password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="form-control mt-2"
            placeholder="Password"
            required=""
          />
          <Button
            variant={"outlined"}
            sx={{ marginBottom: "20px" }}
            onClick={() => handleSubmit()}
          >
            Log in
          </Button>
          <br />
          {errMsg && <Typography color={"error"}>{errMsg}</Typography>}
          <Button variant="outlined" onClick={() => handleNavigate()}>
            Registration
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
