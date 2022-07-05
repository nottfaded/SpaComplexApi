import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Navbar,
  Row,
} from "react-bootstrap";
import { varibales } from "../../Variables";
import photo from "../../pictures/collage-photo3.jpeg";
import { Navigate } from "react-router";

//#region Styles

const Style = () => {
  return (
    <>
      <style type="text/css">
        {`
      .accordion-button:focus{
        box-shadow: none;
        background-color: #F9E5D2;
      }
      .accordion-header:focus{
        box-shadow: none;
      }
      .accordion-button:not(.collapsed){
        background-color: #F9E5D2;
      }
      .accordion-button:not(.collapsed)::after{
        background-image: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23212529%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e");data:image/svg+xml,%3csvg xmlns=%27http://www.w3.o…1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e
      }
      .color-gray{
        color: #B3B3B3;
      }
      .accordion-item:last-of-type {
        border-bottom-right-radius: 1.5rem;
        border-bottom-left-radius: 1.5rem;
      }
      .accordion-item:first-of-type {
        border-top-left-radius: 1.5rem;
        border-top-right-radius: 1.5rem;
        border: none;
      }
      .accordion-item:last-of-type .accordion-button.collapsed{
        border-bottom-right-radius: calc(1.5rem - 1px);
        border-bottom-left-radius: calc(1.5rem - 1px);
        background-color:#F6F9F9;
        height: 60px;
      }
      .accordion-item:first-of-type .accordion-button {
        border-top-left-radius: calc(1.5rem - 1px);
        border-top-right-radius: calc(1.5rem - 1px);
        height: 60px
      }

      .Status-Decline{
        color: red;
        font-weight: bold;
      }
      .Status-New{
        color: rgb(68, 187, 68);
        font-weight: bold;
      }

      .link-for-info{
        text-decoration: underline;
      }
      .link-for-info:hover{
        cursor: pointer;
      }
      .link-for-info:active{
        color: #7e838c;
      }
      .modal-content{
        border-radius: 35px;
      }
      .modal-header{
        border-bottom: none;
      }

      .form-control:focus{
        box-shadow: none;
      }

      .my-modal .modal-content{
        max-width:400px;
      }
      .my-modal .modal-dialog{
        justify-content: center;  
      }
      .input-group input{
        border-radius: 25px;
      }
      .input-group button{
        border-radius: 25px;
        border-left: none;
        border-color: rgb(206, 212, 218);
        background-color: #fff;
      }
      .input-group .type{
        border-right: none;
      }
      .input-group input::-webkit-input-placeholder {
        color: #CCCCCC;
      }
      .input-group .form-control:focus + .invalid-tooltip + .AUTH-BTN,
      .input-group .form-control:focus{
        border-color: #F4B271;
      }
      .input-group .is-invalid + .invalid-tooltip + .AUTH-BTN,
      .input-group .is-invalid:focus + .invalid-tooltip + .AUTH-BTN
      {
        border-color: red;
      }
      .input-group .is-invalid:focus,
      .input-group .is-invalid:focus + .AUTH-BTN{
        box-shadow: none;
        border-color: red;
      }
      .AUTH-BTN{
        border-top: 1px solid;
        border-right: 1px solid;
        border-bottom: 1px solid;
        color: #CCCCCC;
        padding: 5px 10px;
        padding-bottom: 8px;
      }
      
      .my-dp-btn .dropdown .btn-primary {
        background-color: inherit;
        color: #000000;
        border-radius: 25px;
        border-color: #E6E6E6;
        width: 175px;
        text-align: left;
      }
      .my-dp-btn .dropdown .dropdown-toggle::after {
        display: inline-block;
        float: right;
        margin-left: 0.255em;
        margin-top: 0.5em;
        content: "";
        border-top: 0.3em solid;
        border-right: 0.3em solid transparent;
        border-bottom: 0;
        border-left: 0.3em solid transparent;
    }
      .my-dp-btn .dropdown .btn-primary:focus {
        box-shadow: none;
      }
      .my-dp-btn .dropdown .dropdown-menu.show{
        transform: translate(0, 0) !important;
        padding: 0;
        border-radius: 20px;
        width: 175px;
      }
      .my-dp-btn .dropdown .dropdown-menu.show .dropdown-item:first-of-type{
        border-top-left-radius: 18px;
        border-top-right-radius: 18px;
      }
      .my-dp-btn .dropdown .dropdown-menu.show .dropdown-item:last-of-type{
        border-bottom-left-radius: 18px;
        border-bottom-right-radius: 18px;
      }
      .my-dp-btn .dropdown .dropdown-menu.show .dropdown-item:focus{
        background-color: #cbced1;
      }
      }
      `}
      </style>
    </>
  );
};

//#endregion

export const Profile = ({
  data,
  user_orders,
  info,
  newReceipt,
  setNewReceipt,
  RECEIPT,
  setRECEIPT,
}) => {
  // Состояния для отображения инф. о пользователе
  const [FirstName] = useState(data.FirstName);
  const [LastName] = useState(data.LastName);
  const [Email] = useState(data.Email);

  // Состояния для модальных окон
  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [modalShow_Pass, setModalShow_Pass] = useState(false);
  const [modalShow_Edit, setModalShow_Edit] = useState(false);

  // ModalChange_Pass
  const [ValidPassword, setValidPassword] = useState(false);
  const [PrevPass, setPrevPass] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [check, setCheck] = useState("");
  const [checkLength, setCheckLength] = useState(0);

  // ModalEdit
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [checkValid_Email, setCheckValid_Email] = useState(0);

  //dropdown btn
  const [drop_title, setDrop_Title] = useState("Все");

  var summa = 0;

  useEffect(() => {
    setNewReceipt(!newReceipt);
  }, []);

  const Decline = async (id) => {
    await fetch(varibales.API_URL + "receipt/decline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Receipt_Id: id,
      }),
    });
    setNewReceipt(!newReceipt);
  };

  const chooseStatus = (status) => {
    if (status === "") {
      setRECEIPT(user_orders);
    } else {
      setRECEIPT(user_orders.filter((el) => el.Status === status));
    }
  };

  //#region for Admin
  const Admin_Accept = async (id) => {
    await fetch(varibales.API_URL + "receipt/admin/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Receipt_Id: id,
      }),
    });
    setNewReceipt(!newReceipt);
  };
  //#endregion

  //#region for Store_clerk

  const Forming = async (id) => {
    await fetch(varibales.API_URL + "receipt/store-clerk/forming", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Receipt_Id: id,
      }),
    });
    setNewReceipt(!newReceipt);
  };

  const Formed = async (id) => {
    await fetch(varibales.API_URL + "receipt/store-clerk/formed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Receipt_Id: id,
      }),
    });
    setNewReceipt(!newReceipt);
  };

  //#endregion

  //#region for Courier

  const Delivering = async (id) => {
    await fetch(varibales.API_URL + "receipt/courier/delivering", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Receipt_Id: id,
      }),
    });
    setNewReceipt(!newReceipt);
  };

  const Delivered = async (id) => {
    const response = await fetch(
      varibales.API_URL + "receipt/courier/delivered",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Receipt_Id: id,
        }),
      }
    );
    const content = await response.json();
    for (let i = 0; i < content.length; i++) {
      await fetch(varibales.API_URL + "subscription/amount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Count: content[i].Count,
          Subscription_Id: content[i].Subscription_Id,
        }),
      });
    }

    setNewReceipt(!newReceipt);
  };

  const Undelivered = async (id) => {
    await fetch(varibales.API_URL + "receipt/courier/undelivered", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Receipt_Id: id,
      }),
    });
    setNewReceipt(!newReceipt);
  };

  //#endregion

  return (
    <div className="Profile">
      <Style />
      <ModalInfo
        modalShow={modalShow}
        onHide={() => setModalShow(false)}
        modalInfo={modalInfo}
      />
      <ModalChangePass
        modalShow_Pass={modalShow_Pass}
        onHide={() => setModalShow_Pass(false)}
        data={data}
        ValidPassword={ValidPassword}
        setValidPassword={setValidPassword}
        NewPassword={NewPassword}
        setNewPassword={setNewPassword}
        check={check}
        setCheck={setCheck}
        checkLength={checkLength}
        setCheckLength={setCheckLength}
      />
      <ModalEdit
        modalShow_Edit={modalShow_Edit}
        onHide={() => setModalShow_Edit(false)}
        data={data}
        newName={newName}
        setNewName={setNewName}
        newSurname={newSurname}
        setNewSurname={setNewSurname}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        checkValid_Email={checkValid_Email}
        setCheckValid_Email={setCheckValid_Email}
      />

      <Container>
        <p className="color-brand-gold playfair" style={{ fontSize: "34px" }}>
          Профиль
        </p>
        <div className="personal-data mt-4 ps-5 pt-4 pb-4 pe-5">
          <p className="playfair font-size-24 "> Личные данные </p>
          <hr />
          <div className=" ms-4 me-4">
            <div className="d-flex">
              <div className="montserrat font-size-18 w-100">
                <Row className="pb-2 pt-2">
                  <Col>
                    <div className="font-size-16 color-gray"> Имя: </div>
                    <span className="ps-1"> {FirstName} </span>
                  </Col>
                  <Col>
                    <div className="font-size-16 color-gray">Фамилия:</div>
                    <span className="ps-1">{LastName}</span>
                  </Col>
                </Row>
                <Row className="pb-2 pt-2">
                  <Col>
                    <div className="font-size-16 color-gray"> Почта: </div>
                    <div>
                      <span className="ps-1"> {Email} </span>
                    </div>
                  </Col>
                  <Col> </Col>
                </Row>
              </div>
              <div className="montserrat font-size-18 w-50 text-center">
                <Row className="pb-2 pt-2">
                  <Col>
                    <button
                      // className="org-button font-size-16"
                      className={`${
                        data.Role === "client"
                          ? "org-button font-size-16"
                          : "org-button-disabled font-size-16"
                      }`}
                      style={{ padding: "11px 20px" }}
                      onClick={() => {
                        if (data.Role === "client") {
                          setModalShow_Edit(true);
                          setNewName("");
                          setNewSurname("");
                          setNewEmail("");
                          setCheckValid_Email(0);
                        } else {
                          alert("Вы не можете изменять свои данные");
                        }
                      }}
                    >
                      Редактировать профиль
                    </button>
                  </Col>
                </Row>
                <Row className="pb-2 pt-2">
                  <Col>
                    <button
                      className="org-button font-size-16"
                      style={{ padding: "11px 48px" }}
                      onClick={() => {
                        setModalShow_Pass(true);
                        setValidPassword(false);
                        setNewPassword("");
                        setCheck("");
                        setCheckLength(0);
                      }}
                    >
                      Изменить пароль
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>

        <div className="personal-data mt-4 mb-5 ps-5 pt-4 pb-4 pe-5">
          <div className="d-flex">
            <p className="playfair font-size-24 mb-0"> Заказы </p>
            <div className="ms-3 my-dp-btn montserrat">
              <DropdownButton id="dropdown-basic-button" title={drop_title}>
                <Dropdown.Item
                  onClick={() => {
                    setDrop_Title("Все");
                    chooseStatus("");
                  }}
                >
                  Все
                </Dropdown.Item>

                {data.Role !== "store_clerk" && data.Role !== "courier" && (
                  <hr className="m-0" />
                )}
                {data.Role !== "store_clerk" && data.Role !== "courier" && (
                  <Dropdown.Item
                    onClick={() => {
                      setDrop_Title("Новые");
                      chooseStatus("Новый");
                    }}
                  >
                    Новые
                  </Dropdown.Item>
                )}

                {data.Role !== "courier" && <hr className="m-0" />}
                {data.Role !== "courier" && (
                  <Dropdown.Item
                    onClick={() => {
                      setDrop_Title("Принятые");
                      chooseStatus("Принят");
                    }}
                  >
                    Принятые
                  </Dropdown.Item>
                )}

                {data.Role !== "courier" && <hr className="m-0" />}
                {data.Role !== "courier" && (
                  <Dropdown.Item
                    onClick={() => {
                      setDrop_Title("Формируются");
                      chooseStatus("Формируется");
                    }}
                  >
                    Формируются
                  </Dropdown.Item>
                )}

                {data.Role !== "store_clerk" && <hr className="m-0" />}
                {data.Role !== "store_clerk" && (
                  <Dropdown.Item>
                    <div
                      onClick={() => {
                        setDrop_Title("Сформированы");
                        chooseStatus("Сформирован");
                      }}
                    >
                      Сформированы
                    </div>
                  </Dropdown.Item>
                )}

                {data.Role !== "store_clerk" && <hr className="m-0" />}
                {data.Role !== "store_clerk" && (
                  <Dropdown.Item
                    onClick={() => {
                      setDrop_Title("Доставляются");
                      chooseStatus("Доставляется");
                    }}
                  >
                    Доставляются
                  </Dropdown.Item>
                )}

                {data.Role !== "courier" && data.Role !== "store_clerk" && (
                  <hr className="m-0" />
                )}
                {data.Role !== "courier" && data.Role !== "store_clerk" && (
                  <Dropdown.Item
                    onClick={() => {
                      setDrop_Title("Доставлены");
                      chooseStatus("Доставлен");
                    }}
                  >
                    Доставлены
                  </Dropdown.Item>
                )}

                {data.Role !== "store_clerk" && data.Role !== "courier" && (
                  <hr className="m-0" />
                )}
                {data.Role !== "store_clerk" && data.Role !== "courier" && (
                  <Dropdown.Item
                    onClick={() => {
                      setDrop_Title("Не Доставлены");
                      chooseStatus("Не Доставлен");
                    }}
                  >
                    Не Доставлены
                  </Dropdown.Item>
                )}

                {data.Role !== "store_clerk" && data.Role !== "courier" && (
                  <hr className="m-0" />
                )}
                {data.Role !== "store_clerk" && data.Role !== "courier" && (
                  <Dropdown.Item
                    onClick={() => {
                      setDrop_Title("Отменены");
                      chooseStatus("Отменен");
                    }}
                  >
                    Отменены
                  </Dropdown.Item>
                )}
              </DropdownButton>
            </div>
          </div>
          <hr className="mb-2 mt-2" />
          <div className="scroll-controller">
            <div
              className="ps-2 pe-5 pb-1 montserrat font-size-18 d-flex justify-content-between"
              style={{ color: "#B3B3B3" }}
            >
              <div> Номер заказа </div>
              <div className="pe-3"> Статус </div>
            </div>
            {RECEIPT.length !== 0 ? (
              RECEIPT.map((usr) => {
                summa = 0;
                return (
                  <Accordion key={usr.Receipt_Id} className="mb-2">
                    <Accordion.Item
                      eventKey="0"
                      style={{ backgroundColor: "#F6F9F9" }}
                    >
                      <Accordion.Header>
                        <div className="w-100 d-flex justify-content-between montserrat color-000000 font-size-18">
                          <div> Заказ №{usr.Receipt_Id} </div>
                          <div
                            className={
                              (usr.Status === "Отменен" && data.Role === "admin"
                                ? "pe-2 Status-Decline"
                                : "") ||
                              (usr.Status === "Новый" && data.Role === "admin"
                                ? "pe-2 Status-New"
                                : "") ||
                              "pe-3"
                            }
                          >
                            {usr.Status}
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="d-flex">
                          <div className="w-100">
                            {info.map((inf, indx) => {
                              if (inf.Receipt_Id === usr.Receipt_Id) {
                                summa += inf.Price * inf.Count;
                                usr.Sum = summa;
                                return (
                                  <div
                                    className="basket-card mb-2 d-flex montserrat"
                                    key={indx}
                                    style={{ backgroundColor: "#FFFFFF" }}
                                  >
                                    <div>
                                      <img src={photo} alt="orders" />
                                    </div>

                                    <div className="w-100 ms-3 mt-2 me-3">
                                      <div
                                        className="d-flex justify-content-between"
                                        style={{
                                          height: "36px",
                                          lineHeight: "2em",
                                        }}
                                      >
                                        <div
                                          className="mb-3 "
                                          style={{ fontSize: "16px" }}
                                        >
                                          {inf.Time_type} ({inf.Title})
                                          <div className="w-100 count">
                                            <span style={{ color: "#B3B3B3" }}>
                                              Количество:
                                            </span>
                                            <span style={{ fontWeight: "700" }}>
                                              &nbsp;{inf.Count}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="me-2 mt-3">
                                          <span
                                            className="color-brand-gold font-size-24 me-1"
                                            style={{ fontWeight: "700" }}
                                          >
                                            {inf.Price * inf.Count}
                                          </span>
                                          <span style={{ fontSize: "13px" }}>
                                            грн
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                          <div
                            className="color-dark-shades montserrat"
                            style={{ width: "70%" }}
                          >
                            <div className="ms-4">
                              <div
                                className="link-for-info"
                                onClick={() => {
                                  setModalShow(true);
                                  setModalInfo(usr);
                                }}
                              >
                                Информация о заказе <ICircle />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ADMIN */}

                        {data.Role === "admin" && (
                          <div>
                            <hr />
                            <div className="mt-1 montserrat d-flex justify-content-around">
                              <button
                                className={
                                  usr.Status === "Новый"
                                    ? `dark-button ms-auto me-auto`
                                    : `dark-button-disabled ms-auto me-auto`
                                }
                                style={{ width: "325px" }}
                                onClick={
                                  usr.Status === "Новый"
                                    ? () => {
                                        Admin_Accept(usr.Receipt_Id);
                                      }
                                    : () => {
                                        alert(
                                          `Вы не можете изменить статус ${usr.Status}`
                                        );
                                      }
                                }
                              >
                                Подтвердить
                              </button>
                              <button
                                className={
                                  usr.Status === "Новый"
                                    ? `dark-button ms-auto me-auto`
                                    : `dark-button-disabled ms-auto me-auto`
                                }
                                style={{ width: "325px" }}
                                onClick={
                                  usr.Status === "Новый"
                                    ? () => {
                                        Decline(usr.Receipt_Id);
                                      }
                                    : () => {
                                        alert(
                                          `Вы не можете отменить заказ со статусом ${usr.Status}`
                                        );
                                      }
                                }
                              >
                                Отменить
                              </button>
                            </div>
                          </div>
                        )}

                        {/* STORE_CLERK */}

                        {data.Role === "store_clerk" && (
                          <div>
                            <hr />
                            <div className="mt-1 montserrat d-flex justify-content-around">
                              <button
                                className={
                                  usr.Status !== "Формируется"
                                    ? `dark-button ms-auto me-auto`
                                    : `dark-button-disabled ms-auto me-auto`
                                }
                                style={{ width: "325px" }}
                                onClick={
                                  usr.Status !== "Формируется"
                                    ? () => {
                                        Forming(usr.Receipt_Id);
                                      }
                                    : () => {
                                        alert("заказ уже формируется");
                                      }
                                }
                              >
                                Формируется
                              </button>
                              <button
                                className={
                                  usr.Status !== "Принят"
                                    ? `dark-button ms-auto me-auto`
                                    : `dark-button-disabled ms-auto me-auto`
                                }
                                style={{ width: "325px" }}
                                onClick={() => {
                                  if (usr.Status !== "Принят") {
                                    Formed(usr.Receipt_Id);
                                  }
                                }}
                              >
                                Сформирован
                              </button>
                              <button
                                className={
                                  usr.Status === "Принят"
                                    ? `dark-button ms-auto me-auto`
                                    : `dark-button-disabled ms-auto me-auto`
                                }
                                style={{ width: "325px" }}
                                onClick={() => {
                                  if (usr.Status === "Принят") {
                                    Decline(usr.Receipt_Id);
                                  }
                                }}
                              >
                                Отменить
                              </button>
                            </div>
                          </div>
                        )}

                        {/* COURIER */}

                        {data.Role === "courier" && (
                          <div>
                            <hr />
                            <div className="mt-1 montserrat d-flex justify-content-around">
                              <button
                                className={
                                  usr.Status !== "Доставляется"
                                    ? `dark-button ms-auto me-auto`
                                    : `dark-button-disabled ms-auto me-auto`
                                }
                                style={{ width: "235px" }}
                                onClick={
                                  usr.Status !== "Доставляется"
                                    ? () => {
                                        Delivering(usr.Receipt_Id);
                                      }
                                    : () => {
                                        alert("заказ уже в доставке");
                                      }
                                }
                              >
                                В доставке
                              </button>
                              <button
                                className={
                                  usr.Status !== "Сформирован"
                                    ? `dark-button ms-auto me-auto`
                                    : `dark-button-disabled ms-auto me-auto`
                                }
                                style={{ width: "235px" }}
                                onClick={() => {
                                  if (usr.Status !== "Сформирован") {
                                    Delivered(usr.Receipt_Id);
                                  }
                                }}
                              >
                                Доставлен
                              </button>
                              <button
                                className={
                                  usr.Status !== "Сформирован"
                                    ? `dark-button ms-auto me-auto`
                                    : `dark-button-disabled ms-auto me-auto`
                                }
                                style={{ width: "235px" }}
                                onClick={() => {
                                  if (usr.Status !== "Сформирован") {
                                    Undelivered(usr.Receipt_Id);
                                  }
                                }}
                              >
                                Не доставлен
                              </button>
                              <button
                                className={
                                  usr.Status === "Сформирован"
                                    ? "dark-button ms-auto me-auto"
                                    : "dark-button-disabled ms-auto me-auto"
                                }
                                style={{ width: "235px" }}
                                onClick={() => {
                                  if (usr.Status === "Сформирован") {
                                    Decline(usr.Receipt_Id);
                                  }
                                }}
                              >
                                Отменен
                              </button>
                            </div>
                          </div>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                );
              })
            ) : (
              <div className="montserrat font-size-24 text-center pb-3">
                Заказов нет
              </div>
            )}
          </div>
        </div>

        <div className="pt-3 d-flex justify-content-between footer">
        <Navbar.Brand className='montserrat'> <span className='playfair'>Dancing</span> <span>Eurydice</span> </Navbar.Brand>
          <Navbar.Brand className="montserrat" style={{ fontSize: "16px" }}>
            *заказ может быть отеменен по причине невозможности исполнения
          </Navbar.Brand>
          <div className="montserrat text-end" style={{ lineHeight: "1em" }}>
            <p>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                className="color-brand-gold pe-1"
              />
              2022
            </p>
            <p> Все права сохранены© </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

// Модальное окно
const ModalInfo = ({ modalShow, onHide, modalInfo }) => {
  return (
    <Modal
      show={modalShow}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <Modal.Header className="pb-0">
          <Modal.Title id="contained-modal-title-vcenter">
            <span
              className="playfair color-dark-shades font-weight-bold"
              style={{ fontWeight: "bold" }}
            >
              1. Контактные данные
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="montserrat font-size-18 w-100 ps-3">
            <Row className="pb-2">
              <Col>
                <div className="font-size-16 color-gray"> Имя: </div>
                <span className="ps-1"> {modalInfo.Name} </span>
              </Col>
              <Col>
                <div className="font-size-16 color-gray">Фамилия:</div>
                <span className="ps-1">{modalInfo.Surname}</span>
              </Col>
            </Row>
            <Row className="pb-2">
              <Col>
                <div className="font-size-16 color-gray"> Почта: </div>
                <div>
                  <span className="ps-1"> {modalInfo.Email} </span>
                </div>
              </Col>
              <Col>
                <div className="font-size-16 color-gray"> Номер телефона: </div>
                <div>
                  <span className="ps-1"> +38{modalInfo.Phone} </span>
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </div>

      <div>
        <Modal.Header className="pb-0">
          <Modal.Title id="contained-modal-title-vcenter">
            <span
              className="playfair color-dark-shades font"
              style={{ fontWeight: "bold" }}
            >
              2. Информация о доставке
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="montserrat font-size-18 w-100 ps-3">
            <Row className="pb-2">
              <Col>
                <div className="font-size-16 color-gray"> Город: </div>
                <span className="ps-1"> {modalInfo.City} </span>
              </Col>
              <Col>
                <div className="font-size-16 color-gray">Адрес:</div>
                <span className="ps-1">{modalInfo.Address}</span>
              </Col>
            </Row>
            <Row className="pb-2">
              <Col>
                <div className="font-size-16 color-gray">
                  Комментарий к заказу:
                </div>
                <div>
                  <span className="ps-1"> {modalInfo.Comment} </span>
                </div>
              </Col>
            </Row>
          </div>
          <hr />
          <span
            className="montserrat ps-3"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Всего к оплате: {modalInfo.Sum} грн
          </span>
        </Modal.Body>
      </div>
    </Modal>
  );
};

const ModalChangePass = ({
  modalShow_Pass,
  onHide,
  data,
  ValidPassword,
  setValidPassword,
  NewPassword,
  setNewPassword,
  check,
  setCheck,
  checkLength,
  setCheckLength,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Fill_Password = (text) => {
    let MD5 = require("crypto-js/md5");
    let prevPass = MD5(text).toString().toUpperCase();
    if (prevPass === data.Password) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const changePassword = async () => {
    if (check === NewPassword && NewPassword.length > 3) {
      if (ValidPassword) {
        await fetch(varibales.API_URL + "users/change_pass", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            User_Id: data.User_Id,
            Password: NewPassword,
          }),
        });

        onHide(false);
      } else {
        alert("вы ввели неправильный пароль");
      }
    }
  };

  return (
    <Modal
      show={modalShow_Pass}
      onHide={onHide}
      aria-labelledby="example-custom-modal-styling-title"
      className="my-modal"
      centered
    >
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title" className="w-100">
          <div
            className="playfair color-dark-shades font-weight-bold text-center"
            style={{ fontWeight: "bold" }}
          >
            Изменение пароля
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="ps-4 pe-4">
        <div className="montserrat font-size-18 ps-3">
          <InputGroup className="mb-3" style={{ height: "50px" }}>
            <FormControl
              className="montserrat"
              placeholder="Введите старый пароль"
              type="password"
              onChange={(e) => {
                Fill_Password(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3" style={{ height: "50px" }}>
            <FormControl
              className="montserrat type"
              placeholder="Введите новый пароль"
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (e.target.value.length > 3 || e.target.value.length === 0) {
                  setCheckLength(1);
                } else {
                  setCheckLength(-1);
                }
              }}
              isInvalid={checkLength === -1 ? true : false}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Пароль должен состоять неменее из 4 символов
            </Form.Control.Feedback>
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
          <InputGroup className="mb-3" style={{ height: "50px" }}>
            <FormControl
              className="montserrat"
              placeholder="Повторите новый пароль"
              type="password"
              onChange={(e) => {
                setCheck(e.target.value);
              }}
            />
          </InputGroup>
          <div className="w-100 mt-4">
            <button
              className={`${
                check === NewPassword && NewPassword.length > 3
                  ? "org-button w-100 font-size-16"
                  : "org-button-disabled w-100 font-size-16"
              }`}
              style={{ height: "50px" }}
              onClick={() => changePassword()}
            >
              Сохранить
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ModalEdit = ({
  modalShow_Edit,
  onHide,
  data,
  newName,
  setNewName,
  newSurname,
  setNewSurname,
  newEmail,
  setNewEmail,
  checkValid_Email,
  setCheckValid_Email,
}) => {
  const Fill_newEmail = (text) => {
    let valid_email =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (valid_email.test(text)) {
      setNewEmail(text);
      setCheckValid_Email(1);
    } else if (text === "") {
      setCheckValid_Email(0);
    } else {
      setCheckValid_Email(-1);
    }
  };

  const [redirect, setRedirect] = useState(false);

  const changeProfileInfo = async () => {
    if (newName.length > 3 && newSurname.length > 3 && checkValid_Email) {
      await fetch(varibales.API_URL + "users/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          User_Id: data.User_Id,
          FirstName: newName,
          LastName: newSurname,
          Email: newEmail,
        }),
      });

      setRedirect(true);
      onHide(false);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Modal
      show={modalShow_Edit}
      onHide={onHide}
      aria-labelledby="example-custom-modal-styling-title"
      className="my-modal"
      centered
    >
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title" className="w-100">
          <div
            className="playfair color-dark-shades font-weight-bold text-center"
            style={{ fontWeight: "bold" }}
          >
            Изменение профиля
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="ps-4 pe-4">
        <div className="montserrat font-size-18 ps-3">
          <InputGroup className="mb-3" style={{ height: "50px" }}>
            <FormControl
              className="montserrat"
              placeholder="Имя"
              type="text"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3" style={{ height: "50px" }}>
            <FormControl
              className="montserrat"
              placeholder="Фамилия"
              type="text"
              onChange={(e) => {
                setNewSurname(e.target.value);
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3" style={{ height: "50px" }}>
            <FormControl
              className="montserrat"
              placeholder="E-mail"
              type="text"
              onChange={(e) => {
                Fill_newEmail(e.target.value);
              }}
              isValid={checkValid_Email === 1}
              isInvalid={checkValid_Email === -1 && checkValid_Email !== 0}
            />
          </InputGroup>

          <div className="w-100 mt-4">
            <button
              className={`${
                newName.length > 3 && newSurname.length > 3 && checkValid_Email
                  ? "org-button w-100 font-size-16"
                  : "org-button-disabled w-100 font-size-16"
              }`}
              style={{ height: "50px" }}
              onClick={() => {
                changeProfileInfo();
              }}
            >
              Сохранить
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ICircle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-info-circle"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
    </svg>
  );
};
