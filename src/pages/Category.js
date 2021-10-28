import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Product from "../components/Products/Product";
import Header from "../components/Header";
import {
  fetchProductByCategory,
  removeCategoryProduct,
} from "../redux/actions/productActions";

const Category = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductByCategory(props.match.params.category));
    return () => {
      dispatch(removeCategoryProduct());
    };
    // eslint-disable-next-line
  }, [props.match.params.category]);
  return (
    <>
      <Header />
      <Product />
    </>
  );
};

export default Category;
