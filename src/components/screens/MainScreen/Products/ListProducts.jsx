import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../api/axios";
import OneProduct from "./OneProduct";

const ListProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = React.useState([
    {
      _id: "1",
      title: "фыв",
      content: "фывфыв",
      room: 4,
      address: "asdas",
      price: 1111,
      picture: "asdasd",
    },
  ]);
  useEffect(() => {
    hotelLoad();
  }, []);

  const hotelLoad = async () => {
    const result = await axios.get(`/hotel/get-hotels`);
    setProducts(result.data);
  };

  const handleClick = () => {
    hotelLoad();
  };

  return (
    <Stack direction={"row"} sx={{ gap: "20px", flexWrap: "wrap" }}>
      {products.map((product, index) => (
        <OneProduct key={index} product={product} />
      ))}
    </Stack>
  );
};

export default ListProducts;
