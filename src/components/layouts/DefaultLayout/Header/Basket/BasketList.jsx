import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../../api/axios";
import BasketItem from "./BasketItem";

const BasketList = () => {
  const basket = useSelector((state) => state.basket.basket);
  const userId = useSelector((state) => state.auth.userId);

  const dispath = useDispatch();
  const basketList = basket.map((row) => row.id);

  console.log("BasketList: ", basketList);
  console.log("userId: ", userId);

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleClick = async (enterdata) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/book/create",
        { userId: userId, productsId: basketList }
      );
      setSuccess(true);
      console.log(result);
    } catch (err) {
      setErrMsg("Ошибка повторите еще раз");
    }
  };

  return (
    <Stack spacing={2}>
      <Typography sx={{ marginBottom: "20px", fontWeight: 500, fontSize: 26 }}>
        Корзина
      </Typography>
      {basket.length == 0 ? (
        <Typography>Ваша Корзина пуста</Typography>
      ) : (
        basket.map((row) => <BasketItem key={row.id} {...row} />)
      )}
      {basket.length != 0 && <Button onClick={handleClick}>Оформить</Button>}
    </Stack>
  );
};

export default BasketList;
