import { Avatar, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { $imageApi } from "../../../../../api/axios";
import { removeBasket } from "../../../../../store/reducers/basket.slice";

const BasketItem = ({ id, text, price, picture }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar alt="Picture" src={`${$imageApi}/${picture}`} />
        <Stack>
          <Typography>Название:</Typography>
          <span>{text}</span>
        </Stack>
        <Stack>
          <Typography>Цена:</Typography>
          <span>{price}</span>
        </Stack>
        <span onClick={() => dispatch(removeBasket({ id }))}>&times;</span>
      </Stack>
    </>
  );
};

export default BasketItem;
