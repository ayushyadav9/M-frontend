import React from "react";
import Coupon from "./images/Coupon.png";
import styles from "./Login.module.css";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";

function Login() {
  let history = useHistory();

  const successGoogle = async (res) => {
    console.log(res);
    const response = await fetch("https://myntrah-backend.herokuapp.com/googleSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId: res.tokenId }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history.push("/");
    } else {
    }
  };
  const failureGoogle = () => {};

  return (
    <div className={styles.logincontainer}>
      <div className={styles.logindiv}>
        <div className={styles.loginpromo}>
          <img className={styles.couponcode} src={Coupon} alt="" />
        </div>
        <div className={styles.inputcontainer}>
          <div>
            <span className={styles.heading}>Login</span>
            <span className={styles.heading2}>or</span>
            <span className={styles.heading1}>Signup</span>
            <br />
            {/* <div className={styles.inputdiv}> */}
            <GoogleLogin
              clientId="924996333248-b18i1m98ji19j0tfl0emmiv9el52eh2u.apps.googleusercontent.com"
              onSuccess={successGoogle}
              onFailure={failureGoogle}
              render={(renderProps) => (
                <button
                  className={styles.loginbutton}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  {/* <img src='/images/google.svg' className={styles.googleimg} alt='Google' /> */}
                  <span className={styles.heading}>SignIn with Google</span>
                </button>
              )}
            />
            <p className={styles.terms}>
              By continuing, I agree to the{" "}
              <span className={styles.conditions}>Terms of Use</span> &{" "}
              <span className={styles.conditions}>Privacy Policy</span>
            </p>{" "}
            <p>
              Have trouble in logging in?{" "}
              <span className={styles.conditions}>Get help</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
