import { Box, Button, Divider, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { $imageApi } from "../../../../api/axios";
import { addBasket } from "../../../../store/reducers/basket.slice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OneProduct = ({ product }) => {
  const { _id, title, price, picture } = product;

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addBasket({ _id, title, price, picture }));
    setOpen(true);
  };

  return (
    <Stack
      justifyContent={"space-between"}
      sx={{
        flex: "1 0 calc(100% / 4 - 20px * 3 / 4)",
        maxWidth: "285px",
        height: "465px",
        backgroundColor: "white",
      }}
    >
      <Stack>
        <img
          alt="Montale Roses Musk"
          title="Montale Roses Musk"
          class="card-img-top"
          src={`${$imageApi}/${picture}`}
          style={{ width: "285px", height: "285px" }}
        />
        <Stack
          spacing={2}
          class="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h5 class="card-title">{title}</h5>
          <Divider sx={{ width: "100%" }} />
          <p class="card-text text-success">{price} ₸</p>
        </Stack>
      </Stack>
      <div
        class="card-footer"
        style={{
          padding: "10px",
          backgroundColor: "rgba(0,0,0,.03)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          id="1"
          type="button"
          className="btn btn-success btn-sm"
          onClick={handleClick}
        >
          Add To Basket
        </button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
      </div>
    </Stack>
  );
};

export default OneProduct;
