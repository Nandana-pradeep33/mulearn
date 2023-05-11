import React, { useEffect, useState } from "react";
import Eye from "./assets/Eye";
import styles from "./Login.module.css";
import { useToast } from "@chakra-ui/react";
import {
  login,
  requestMuidOtp,
  requestEmailOtp,
  otpVerification,
} from "./helpers/apis";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showOrHidePassword, setShowOrHidePassword] = useState("password");
  const [muid, setMuID] = useState("");
  const [emailOrMuid, setEmailOrMuid] = useState("");
  const [hasError, setHasError] = useState(true);
  const [password, setPassword] = useState("");
  const [otpForm, setOtpForm] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    setHasError(true);
  }, [emailOrMuid]);
  return (
    <div className={styles.login_page}>
      <div className={styles.login_container}>
        {!otpForm ? (
          <div className={styles.login_form}>
            <h1>User Login</h1>
            <p className={styles.p_welcome}>
              Hey welcome, Please enter your details to get sign in to your
              account
            </p>
            <form>
              <input
                type="text"
                placeholder="Enter µID"
                required
                value={muid}
                onChange={(e) => setMuID(e.target.value)}
              />
              <div className={styles.password_div}>
                <input
                  type={showOrHidePassword}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className={styles.password_icon}
                  onClick={(e) => {
                    e.preventDefault();
                    showOrHidePassword == "password"
                      ? setShowOrHidePassword("text")
                      : setShowOrHidePassword("password");
                  }}
                >
                  {showOrHidePassword === "text" ? (
                    <i className="fi fi-sr-eye"></i>
                  ) : (
                    <i className="fi fi-sr-eye-crossed"></i>
                  )}
                </button>
              </div>
              <p style={{ textAlign: "left" }}>
                <a href="forgot-password">
                  Forgot your <b>password?</b>
                </a>
                <a href="register">
                  <b>SignUp?</b>
                </a>
              </p>
              <p className={styles.otp_link}>
                <a
                  onClick={() => {
                    setOtpForm(true);
                  }}
                >
                  login with OTP
                </a>
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (muid != "" && password != "") {
                    login(muid, password, toast, navigate);
                    // console.log("Hoi");
                  }
                }}
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        ) : null}

        {otpForm ? (
          <div className={styles.login_form}>
            <h1>User Login</h1>
            <p className={styles.p_welcome}>
              Hey welcome, Please enter your details to get sign in to your
              account
            </p>
            <form>
              <input
                type="text"
                placeholder="Enter email or µID"
                required
                value={emailOrMuid}
                onChange={(e) => setEmailOrMuid(e.target.value)}
              />
              {!hasError ? (
                <div className={styles.password_div}>
                  <input
                    type={showOrHidePassword}
                    placeholder="OTP"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className={styles.password_icon}
                    onClick={(e) => {
                      e.preventDefault();
                      showOrHidePassword == "password"
                        ? setShowOrHidePassword("text")
                        : setShowOrHidePassword("password");
                    }}
                  >
                    {showOrHidePassword === "text" ? (
                      <i className="fi fi-sr-eye"></i>
                    ) : (
                      <i className="fi fi-sr-eye-crossed"></i>
                    )}
                  </button>
                </div>
              ) : null}
              <p style={{ textAlign: "left" }}>
                <a href="forgot-password">
                  Forgot your <b>password?</b>
                </a>
                <a href="register">
                  <b>SignUp?</b>
                </a>
              </p>
              <p className={styles.otp_link}>
                <a
                  onClick={() => {
                    setOtpForm(false);
                  }}
                >
                  login with Password
                </a>
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (emailOrMuid != "" && hasError) {
                    emailOrMuid.includes("@mulearn")
                      ? requestMuidOtp(emailOrMuid, toast, setHasError)
                      : requestEmailOtp(emailOrMuid, toast, setHasError);
                  } else {
                    toast({
                      title: "Error",
                      description: "Please enter valid email or µID",
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                  if (!hasError) {
                    otpVerification(password, toast, navigate);
                  }
                }}
                type="submit"
              >
                {hasError ? "Request OTP" : "Sign in"}
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;