import { useDispatch } from "react-redux";
import Product from "./Product";
import React, { useEffect } from "react";
import {
  fetchProducts,
  fetchProductbycategory,
} from "../../redux/actions/productActions";

const ProductPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());

    // eslint-disable-next-line
  }, []);

  return <Product />;
};

export default ProductPage;
