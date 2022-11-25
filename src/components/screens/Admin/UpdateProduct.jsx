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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";

let initialValues = {
  _id: null,
  title: null,
  price: null,
  picture: null,
};

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hotel, setHotel] = React.useState(initialValues);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    const result = await axios.get(`hotel/${id}`);
    console.log(result.data);
    initialValues = result.data;
    setHotel(initialValues);
    console.log("invalue: ", initialValues);
  };

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

  const update = async (enterdata) => {
    try {
      const result = await axios.put(
        "http://localhost:5000/hotel/update-hotel",
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
    formData.append("_id", id);
    console.log(formData);
    update(formData);
  };

  return (
    <Paper sx={{ p: "30px" }}>
      <Button onClick={() => navigate("/admin")}>Назад</Button>
      <Typography sx={{ fontWeight: 600, fontSize: "20px", mb: "15px" }}>
        Update Product
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item sx={{ width: "100%" }}>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <Typography>Title</Typography>
            <TextField
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={hotel.title}
              onChange={(e) => handleChange(e, "title")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: "30px" }}>
            <Typography>Price</Typography>
            <TextField
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={hotel.price}
              onChange={(e) => handleChange(e, "price")}
            />
          </FormControl>

          <Stack sx={{ mb: "20px" }}>
            <label>Картинка</label>
            <input type="file" onChange={(e) => handleAddImage(e)} />
          </Stack>
          <Box sx={{ width: "100%" }}>
            <Button onClick={handleSubmit} fullWidth variant="outlined">
              Обновить
            </Button>
            {success && (
              <Typography color="green">Успешно Обновлено</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UpdateProduct;
