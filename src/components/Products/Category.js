import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Product from "./Product";
import Header from "../Header";
import {fetchProductByCategory,removeCategoryProduct,fetchProductByGender} from "../../redux/actions/productActions";
// import { getHint } from "../../redux/actions/hintActions";

const Category = (props) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getHint())    
  //   //eslint-disable-next-line
  // }, [])
  
  useEffect(() => {
    if(props.match.params.category){
      dispatch(fetchProductByCategory(props.match.params.category));
    }
    else if(props.match.params.gender){
      dispatch(fetchProductByGender(props.match.params.gender));
    }
    return () => {
      dispatch(removeCategoryProduct());
    };
    // eslint-disable-next-line
  }, [props.match.params]);
  return (
    <>
      <Header />
      <Product />
    </>
  );
};

export default Category;
