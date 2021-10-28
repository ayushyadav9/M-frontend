import React from "react";
import Coupon from "./images/Coupon.png";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { login } from "../../../redux/actions/userActions";
import { useDispatch,useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../Header";

function Login() {
  let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch()

  const successGoogle = async (res) => {
    dispatch(login(res.tokenId))
     if(userLogin.userInfo.success){
      history.push("/")
     }
     else{
       alert(userLogin.userInfo.error)
     }
  };

  return (
    <>
    <Header/>
    <LoginContainer>
      <div className="logindiv">
        <CouponImg>
          <img className="couponcode" src={Coupon} alt="" />
        </CouponImg>
        <Inputcontainer>
          <div>
            <span className="heading">Login</span>
            <span className="heading2">or</span>
            <span className="heading1">Signup</span>
            <br />
            {/* <div className={styles.inputdiv}> */}
            <GoogleLogin
              clientId={process.env.REACT_APP_OAUTH_CLIENT}
              onSuccess={successGoogle}
              onFailure={(res)=>{console.log(res)}}
              render={(renderProps) => (
                <button
                  className="loginbutton"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  {/* <img src='/images/google.svg' className={styles.googleimg} alt='Google' /> */}
                  <span className="heading">SignIn with Google</span>
                </button>
              )}
            />
            <p className="terms">
              By continuing, I agree to the{" "}
              <span className="conditions">Terms of Use</span> &{" "}
              <span className="conditions">Privacy Policy</span>
            </p>{" "}
            <p>
              Have trouble in logging in?{" "}
              <span className="conditions">Get help</span>
            </p>
          </div>
        </Inputcontainer>
      </div>
    </LoginContainer>
    </>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  height: 85vh;
  padding-top: 15vh;
  background-color: rgb(253,239,235);
  .logindiv{
    width: 30%;
    height: 75vh;
    background-color: rgb(249, 249, 252);
    margin: auto;
  }
`;

const CouponImg = styled.div`
  width: 100%;
  height: 20vh;
  background-color: rgb(252, 253, 253);
  .couponcode{
    width: 100%;
    margin: auto;
  }
`;

const Inputcontainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 7rem 3rem;
  height: 100%;
  text-align: left;
  color: rgb(66,69,83);
  .heading{
    font-weight: 600;
    font-size: 22px;
  }
  .heading1{
    font-weight: 600;
    font-size: 22px;
  }
  .heading2{
      font-weight: 300;
      font-size: 15px;
      margin: 0px 8px ;
      margin-top: 5px;
  }
  .conditions{
    font-weight: 400;
    font-size: 15px;
    color: rgb(255,63,108);
    cursor: pointer;    
  }
  .terms{
    width: 100%;
    font-size: 15px;
    margin-top: 15px;
  }
  .loginbutton{
    width: 100%;
    height:auto;
    border: 1px solid black;
    padding: 1.2rem 0rem;
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    font-size: 22px;
    cursor: pointer;
    margin-top: 3rem;
  }
`;

export default Login;
