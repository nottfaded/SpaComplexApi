import React, { useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Styles from "./Styles.jsx";
import { motion } from "framer-motion";
import { varibales } from "../../Variables.js";
import Swal from "sweetalert2";

function Login() {
  // состояния и функция на скрытие пароля
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  // состояния для полей ввода и перенаправление на главную страницу
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  // функция отправки данных введеным пользователем на сервер
  const sumbit = async () => {
    await fetch(varibales.API_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        Email,
        Password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          setRedirect(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Авторизация",
            text: "Проверьте правильность введенных вами данные!",
          });
        }
      });
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ backgroundColor: "#F6F9F9" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Styles />

        <div className="auth">
          <div>
            <Link to="/" className="color-dark-shades color-light-gray">
              <motion.svg
                whileHover={{ rotate: 15, scale: 1.2 }}
                width="25"
                height="25"
                className="position-absolute mt-2"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10" r="9.5" stroke="#44464A" />
                <path
                  d="M11.667 15L6.66699 10L11.667 5"
                  stroke="#44464A"
                  strokeLinecap="round"
                />
              </motion.svg>
            </Link>
            <h2 className="text-center mb-4 playfair"> Авторизация </h2>
          </div>

          <InputGroup className="mb-3" style={{height:'50px'}}>
            {/* <InputGroup.Text id="basic-addon1" style={{width:'50px'}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
            </InputGroup.Text> */}
            <FormControl
              className="montserrat"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3" style={{height:'50px'}}>
            {/* <InputGroup.Text id="basic-addon2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-key-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </InputGroup.Text> */}
            <FormControl
              className="montserrat"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              type={passwordVisible ? "text" : "password"}
            />
            <button onClick={togglePassword} className="AUTH-BTN">
              {passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                </svg>
              )}
            </button>
          </InputGroup>

          <Modal.Footer>
            <Button
              variant="outline-warning"
              className="ms-auto me-auto montserrat"
              onClick={sumbit}
              style={{ width: "250px", borderRadius: "25px", height:'50px' }}
            >
              Войти
            </Button>
            <div className="w-100 text-center montserrat">
              <span className="animate">
                <Link to="/registration" className="text-decoration-none"> Регистрация </Link>
              </span>
            </div>
          </Modal.Footer>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
