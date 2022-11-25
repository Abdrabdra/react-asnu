import { Avatar, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";

const ListUser = () => {
  const [users, setUsers] = React.useState([{ username: "", roles: [] }]);
  const navigate = useNavigate();

  React.useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const result = await axios.get(`/user/all`);
    setUsers(result.data);
  };

  const handleDelete = async (id) => {
    const result = await axios.delete(`/user/delete/${id}`);
    load();
  };

  return (
    <Paper sx={{ p: "30px" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography sx={{ fontWeight: 600, fontSize: "20px", mb: "15px" }}>
          List User
        </Typography>
        <Button onClick={() => navigate("/admin")}>Back</Button>
      </Stack>
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
                    <TableCell></TableCell>
                    <TableCell>UserName</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="center">Acion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Avatar alt="Picture">
                          <PersonIcon />
                        </Avatar>
                      </TableCell>
                      <TableCell>{row?.username}</TableCell>
                      <TableCell>{row?.roles[0]}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="error"
                          onClick={() => handleDelete(row._id)}
                        >
                          Delete
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

export default ListUser;
