import { Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

const Registration = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
  };
  const hanldeSuccess = () => {
    navigate("/login");
  };

  const [errMsg, setErrMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await axios.post("/auth/registration", values);
        navigate("/login");
      } catch (err) {
        setErrMsg("Ошибка повторите еще раз");
      }
    },
  });
  const { values, handleChange, handleSubmit } = formik;
  const { username, password } = values;
  return (
    <div className="container">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <form>
          <div className="intt">
            <h1 class="display-4">Registration</h1>
            <input
              id="reg_login"
              type="text"
              name="username"
              class="form-control"
              placeholder="Enter mail"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="intt">
            <input
              id="reg_password"
              type="password"
              name="password"
              class="form-control mt-2"
              onChange={handleChange}
              value={password}
              placeholder="Pick a password"
              required
            />
          </div>
          <Button type="submit" name="submit" onClick={handleSubmit}>
            Registration
          </Button>
          <br />
          <Button onClick={() => handleNavigate()}>Login</Button>
        </form>
        <div className="social">
          <a
            href="https://www.facebook.com/profile.php?id=100023375347115"
            className="fa fa-facebook"
          ></a>
          <a href="https://vk.com/didar2121" className="fa fa-vk"></a>
          <a
            href="https://www.instagram.com/didar.dd/"
            className="fa fa-instagram"
          ></a>
          <a href="https://twitter.com/explore" className="fa fa-twitter"></a>
        </div>
      </Box>
    </div>
  );
};

export default Registration;
