import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios, { $imageApi } from "../../../api/axios";

const hotelState = {
  _id: "",
  title: "",
  price: 0,
  picture: "",
};

const AdminProducts = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [hotels, setHotels] = useState([hotelState]);

  useEffect(() => {
    hotelLoad();
  }, []);

  const hotelLoad = async () => {
    const result = await axios.get(`/hotel/get-hotels`);
    setHotels(result.data);
  };

  const handleDelete = async (id) => {
    const result = await axios.delete(`/hotel/${id}`);
    setSuccess(true);
    hotelLoad();
  };

  const handleUpdate = async (id) => {
    navigate(`/admin/update-product/${id}`);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await axios.delete(`/hotel/${values.id}`);
        setSuccess(true);
      } catch (err) {
        setErrMsg("Ошибка повторите еще раз");
      }
    },
  });
  const { values, handleChange, handleSubmit } = formik;
  const { id } = values;

  return (
    <Paper sx={{ p: "30px" }}>
      <Stack direction="row" justifyContent={"space-between"}>
        <Button onClick={() => navigate("/")}>Back</Button>
        <Button variant={"contained"} onClick={() => navigate("/admin/user")}>
          User List
        </Button>
        <Button
          variant={"contained"}
          onClick={() => navigate("/admin/create-product")}
        >
          Create Product
        </Button>
      </Stack>
      <Typography sx={{ fontWeight: 600, fontSize: "20px", mb: "15px" }}>
        List Product
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item sx={{ width: "100%" }}>
          <form>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Picture</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hotels &&
                    hotels?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Avatar
                            alt="Picture"
                            src={`${$imageApi}/${row?.picture}`}
                          />
                        </TableCell>
                        <TableCell align="right">{row?.title}</TableCell>
                        <TableCell align="right">{row?.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            color="error"
                            onClick={() => handleDelete(row._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            color="info"
                            onClick={() => handleUpdate(row._id)}
                          >
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdminProducts;
