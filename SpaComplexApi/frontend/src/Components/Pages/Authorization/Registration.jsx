import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Styles from "./Styles";
import { motion } from "framer-motion";
import { varibales } from "../../Variables";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function Registration() {
  // состояния и функция на скрытие пароля
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  // состояния для полей ввода и перенаправление на главную страницу
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  // функция отправки данных на сервер для регистрации
  const sumbit = async () => {
    if (
      FirstName === "" ||
      LastName === "" ||
      Email === "" ||
      Password === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Регистрация",
        text: "Все поля должны быть заполнены!",
      });
    } else {
      await fetch(varibales.API_URL + "registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FirstName,
          LastName,
          Email,
          Password,
        }),
      });

      setRedirect(true);
    }
  };

  //#region Validation

  const regName = /^[a-zA-Zа-яА-ЯёЁ]/;

  // валидация FirstName
  const [FirstNameValid, setFirstNameValid] = useState(0);

  const Fill_FirstName = (text) => {
    if (text.length > 2) {
      setFirstName(text);
      setFirstNameValid(1);
    } else if (text === "") {
      setFirstNameValid(0);
    } else {
      setFirstNameValid(-1);
    }

    for (let i = 0; i < text.length; i++) {
      if (!regName.test(text[i])) {
        setFirstNameValid(-1);
      }
    }
  };

  // валидация LastName
  const [LastNameValid, setLastNameValid] = useState(0);

  const Fill_LastName = (text) => {
    if (text.length > 2) {
      setLastName(text);
      setLastNameValid(1);
    } else if (text === "") {
      setLastNameValid(0);
    } else {
      setLastNameValid(-1);
    }

    for (let i = 0; i < text.length; i++) {
      if (!regName.test(text[i])) {
        setLastNameValid(-1);
      }
    }
  };

  // валидация Email
  const [EmailValid, setEmailValid] = useState(0);

  const Fill_Email = (text) => {
    let valid_email =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (valid_email.test(text)) {
      setEmail(text);
      setEmailValid(1);
    } else if (text === "") {
      setEmailValid(0);
    } else {
      setEmailValid(-1);
    }
  };

  // валидация Password
  const [PasswordValid, setPasswordValid] = useState(0);

  const Fill_Password = (text) => {
    if (text.length > 3) {
      setPassword(text);
      setPasswordValid(1);
    } else if (text === "") {
      setPasswordValid(0);
    } else {
      setPasswordValid(-1);
    }
  };

  //#endregion

  // условие перенаправления
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="reg" style={{ backgroundColor: "#F6F9F9" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Styles />

        <Form className="auth">
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
            <h2 className="text-center mb-3 playfair"> Регистрация </h2>
          </div>

          <InputGroup className="mb-3">
            <Row>
              <Col>
                {/* <Form.Label className="playfair"> Имя </Form.Label> */}
                <FormControl 
                  className="montserrat h-100"
                  aria-label="First name"
                  placeholder="Имя"
                  onChange={(e) => {
                    Fill_FirstName(e.target.value);
                    {
                      e.target.value.length > 0
                        ? (e.target.value =
                            e.target.value[0].toUpperCase() +
                            e.target.value.slice(1))
                        : (e.target.value = "");
                    }
                  }}
                  isValid={FirstNameValid === 1}
                  isInvalid={FirstNameValid === -1 && FirstNameValid !== 0}
                />
              </Col>
              <Col>
                {/* <Form.Label className="playfair"> Фамилия </Form.Label> */}
                <FormControl
                  className="montserrat h-100"
                  aria-label="Last name"
                  placeholder="Фамилия"
                  onChange={(e) => {
                    Fill_LastName(e.target.value);
                    {
                      e.target.value.length > 0
                        ? (e.target.value =
                            e.target.value[0].toUpperCase() +
                            e.target.value.slice(1))
                        : (e.target.value = "");
                    }
                  }}
                  isValid={LastNameValid === 1}
                  isInvalid={LastNameValid === -1 && LastNameValid !== 0}
                />
              </Col>
            </Row>
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              className="montserrat h-100"
              style={{borderTopRightRadius:'25px', borderBottomRightRadius:'25px',}}
              placeholder="Email addres"
              onChange={(e) => Fill_Email(e.target.value)}
              isValid={EmailValid === 1}
              isInvalid={EmailValid === -1 && EmailValid !== 0}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Email должен выглядить так xxx@xx.xx
            </Form.Control.Feedback>
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              className="montserrat"
              placeholder="Password"
              onChange={(e) => Fill_Password(e.target.value)}
              isValid={PasswordValid === 1}
              isInvalid={PasswordValid === -1 && PasswordValid !== 0}
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
              Регистрация
            </Button>
            <div className="w-100 text-center montserrat animate">
              <Link to="/login" className="color-dark-shades color-light-gray text-decoration-none">
                Авторизация
              </Link>
            </div>
          </Modal.Footer>
        </Form>
      </motion.div>
    </div>
  );
}

export default Registration;
