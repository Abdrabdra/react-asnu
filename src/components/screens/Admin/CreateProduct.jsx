import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

const initialValues = {
  title: null,
  price: null,
  picture: null,
};

const CreateProduct = () => {
  const navigate = useNavigate();
  const [hotel, setHotel] = React.useState(initialValues);

  const handleAddImage = (event) => {
    const input = event.target;
    const file = input.files[0];
    setHotel((state) => ({ ...state, picture: file }));
  };

  const handleChange = (e, type) => {
    if (type === "title") {
      setHotel((state) => ({ ...state, title: e.target.value }));
    } else if (type === "price") {
      setHotel((state) => ({ ...state, price: e.target.value }));
    }
  };

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  const create = async (enterdata) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/hotel/create-hotel",
        enterdata
      );
      setSuccess(true);
    } catch (err) {
      setErrMsg("Ошибка повторите еще раз");
    }
  };

  const handleSubmit = () => {
    const { title, price, picture } = hotel;
    const formData = new FormData();

    if (title !== null) {
      formData.append("title", title);
    }
    if (price !== null) {
      formData.append("price", price);
    }
    formData.append("picture", picture);
    console.log(formData);
    create(formData);
  };

  return (
    <Paper sx={{ p: "30px" }}>
      <Button onClick={() => navigate("/admin")}>Назад</Button>
      <Typography sx={{ fontWeight: 600, fontSize: "20px", mb: "15px" }}>
        Create Product
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item sx={{ width: "100%" }}>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <TextField
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={hotel.title}
              label="title"
              onChange={(e) => handleChange(e, "title")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <TextField
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={hotel.price}
              label="price"
              onChange={(e) => handleChange(e, "price")}
            />
          </FormControl>

          <Stack sx={{ mb: "20px" }}>
            <label>Картинка</label>
            <input type="file" onChange={(e) => handleAddImage(e)} />
          </Stack>
          <Box sx={{ width: "100%" }}>
            <Button onClick={handleSubmit} fullWidth variant="outlined">
              Добавить
            </Button>
            {success && (
              <Typography color="green">Успешно добавлено</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateProduct;
