import React, { useEffect, useState } from "react";
import { Container, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { varibales } from "../../Variables";
import { BasketCard } from "../Main/priceOption/CardItems/BasketCard";

function Ordering({
  orders,
  setOrders,
  data,
  sum,
  setSum,
  deleteOrder,
  deleteAllOrders,
  setSubscription
}) {
  const [receipt, setReceipt] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const [Name, setName] = useState(data.FirstName);
  const [Surname, setSurname] = useState(data.LastName);
  const [Email, setEmail] = useState(data.Email);
  const [Phone, setPhone] = useState("0501112223");
  const [City, setCity] = useState("Харьков");
  const [Address, setAddress] = useState("ул. Героев Труда");
  const [Comment, setComment] = useState("");

  useEffect(() => {
    if (orders.length === 0) {
      setRedirect(true);
    }
    setReceipt(
      orders.map((el) => {
        return { Subscription_Id: el.Subscription_Id, count: el.count };
      })
    );
  }, [orders]);

  const SumbitReceipt = async () => {
    await fetch(varibales.API_URL + "ordering", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: data.User_Id,
        name: Name,
        surname: Surname,
        email: Email,
        phone: Phone,
        city: City,
        address: Address,
        comment: Comment,
      }),
    });

    const response = await fetch(varibales.API_URL + "ordering", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const receipt_id = await response.json();

    for (let i = 0; i < orders.length; i++) {
      fetch(varibales.API_URL + "ordering/receiptHasSubscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Subscription_Id: receipt[i].Subscription_Id,
          // receipt_id,
          Receipt_Id: receipt_id[0].Receipt_Id,
          Count: receipt[i].count,
        }),
      });
    }

    localStorage.removeItem("корзина");
    setOrders([]);
    setReceipt([]);

    const sub_res = await fetch(varibales.API_URL + "subscription", {
      headers: { "Content-Type": "application/json" },
    });

    const sub_cont = await sub_res.json();
    sub_cont.map((el) => {
      el["count"] = 1;
    });
    setSubscription(sub_cont);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="ordering" style={{ backgroundColor: "#F6F9F9" }}>
      <Container>
        <div className="text">
          <p className="title playfair color-brand-gold">Оформление заказа</p>
        </div>
      </Container>

      <div className="ordering-form  ms-auto me-auto mt-4">
        <div className="title p-3 montserrat ps-4">
          <p className="mb-auto mt-auto color-brand-gold">Данные покупателя</p>
        </div>
        <div className="body p-3">
          <div className="d-flex">
            <div className="w-100 p-2">
              <FloatingLabel controlId="floatingInput" label="Имя">
                <Form.Control
                  type="text"
                  placeholder="Имя"
                  className="montserrat"
                  value={Name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FloatingLabel>
            </div>
            <div className="w-100 p-2">
              <FloatingLabel controlId="floatingInput" label="Фамилия">
                <Form.Control
                  type="text"
                  placeholder="Фамилия"
                  className="montserrat"
                  value={Surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                />
              </FloatingLabel>
            </div>
          </div>

          <div className="d-flex">
            <div className="w-100 p-2">
              <FloatingLabel controlId="floatingInput" label="Email адрес">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  className="montserrat"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
            </div>
            <div className="w-100 p-2">
              {/* <FloatingLabel controlId="floatingInput" label="Номер телефона">
                <Form.Control
                  type="phone"
                  placeholder="Phone"
                  className="montserrat"
                  defaultValue={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FloatingLabel> */}
              <InputGroup className="mb-3 w-100 h-100">
                <InputGroup.Text id="basic-addon1">+38</InputGroup.Text>
                <Form.Control
                  placeholder="Номер телефона"
                  aria-label="Номер телефона"
                  aria-describedby="Номер телефона"
                  maxLength="10"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
                />
              </InputGroup>
            </div>
          </div>
        </div>
      </div>

      <div className="ordering-form  ms-auto me-auto mt-4">
        <div className="title p-3 montserrat ps-4">
          <p className="mb-auto mt-auto color-brand-gold"> Адрес доставки </p>
        </div>
        <div className="body p-3">
          <div className="d-flex">
            <div className="w-100 p-2">
              <FloatingLabel controlId="floatingInput" label="Город">
                <Form.Control
                  type="text"
                  placeholder="Город"
                  className="montserrat"
                  value={City}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FloatingLabel>
            </div>
            <div className="w-100 p-2">
              <FloatingLabel controlId="floatingInput" label="Адрес">
                <Form.Control
                  type="text"
                  placeholder="Адрес"
                  className="montserrat"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FloatingLabel>
            </div>
          </div>

          <div className="p-2">
            <FloatingLabel
              controlId="floatingTextarea2"
              label="Комментарии, если есть"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                className="montserrat"
                style={{ height: "100px" }}
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FloatingLabel>
          </div>
        </div>
      </div>

      <div className="ordering-form  ms-auto me-auto mt-4">
        <div className="title p-3 montserrat ps-4">
          <p className="mb-auto mt-auto color-brand-gold"> Ваш заказ </p>
        </div>
        <div className="body p-4">
          <div className="d-flex justify-content-between">
            <p
              className="montserrat color-dark-shades"
              style={{ fontSize: "14px" }}
            >
              Выбрано {orders.length} абонементов
            </p>
            <div
              className="montserrat color-dark-shades remove-basket"
              style={{ fontSize: "14px" }}
              onClick={() => {
                deleteAllOrders();
                setRedirect(true);
              }}
            >
              Очистить корзину
            </div>
          </div>
          <div className="scroll-controller-header montserrat">
            {orders.map((el) => (
              <BasketCard
                key={el.Subscription_Id}
                item={el}
                orders={orders}
                deleteOrder={deleteOrder}
                sum={sum}
                setSum={setSum}
              />
            ))}
          </div>
          <div className="d-flex justify-content-between montserrat">
            <div>
              <p className="m-0 mt-2" style={{ fontSize: "18px" }}>
                Сумма заказа:
              </p>
              <span
                className="color-brand-gold font-size-24"
                style={{ fontWeight: "600" }}
              >
                {sum}
              </span>
              грн
            </div>
          </div>
        </div>
      </div>

      <div className="p-3">
        <button
          className={`ms-auto me-auto montserrat mt-0 d-block text-center ${
            orders.length !== 0 ? "org-button" : "org-button-disabled"
          } `}
          onClick={() => {
            if (
              Name !== "" &&
              Surname !== "" &&
              Email !== "" &&
              Phone !== "" &&
              City !== "" &&
              Address !== "" &&
              Phone.length === 10
            ) {
              SumbitReceipt();
              setSum(0);
              setRedirect(true);
            } else {
              alert(
                "Всё кроме комментария должно быть заполнено.\nДлина номера телефона должна быть равна 10."
              );
            }
          }}
          style={{ width: "323px", height: "50px" }}
        >
          <p className="p-1" style={{ fontSize: "18px" }}>
            Оформить заказ
          </p>
        </button>
      </div>
    </div>
  );
}

export default Ordering;
