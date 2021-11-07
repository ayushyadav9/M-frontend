import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Product from "./Product";
import Header from "../Header";
import {fetchProductByCategory,removeCategoryProduct,fetchProductByGender} from "../../redux/actions/productActions";
import { Leaderboard } from "../Leaderboard";
import Sidebar from "../Sidebar";
import Hints from "../Hints/Hints";

const Category = (props) => {
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isLeaderboardOpen, setisLeaderboardOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsHintOpen(false);
    }
    // dispatch(getHint());
    // eslint-disable-next-line
  }, []);

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
      {isHintOpen && <Hints handleClose={() => {
        setIsHintOpen((prev) => {
          return !prev;
        }
      )}} 
      />}
      {isLeaderboardOpen && <Leaderboard setisLeaderboardOpen={setisLeaderboardOpen}/>}
      <Sidebar setIsHintOpen={setIsHintOpen} setisLeaderboardOpen={setisLeaderboardOpen}/>
      <Product />
    </>
  );
};

export default Category;
