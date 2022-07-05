import React from "react";
import { useEffect } from "react";
import Items from "./CardItems/Items";

const circle_style = {
  backgroundColor: "#DA730B",
  color: "#F6F9F9",
};
const info_style = {
  backgroundColor: "#F9E5D2",
};

// массив
export const Cards = ({ currentCards, addToOrder }) => {
  return (
    <div className="container mt-4 mb-5">
      <Items
        items={currentCards}
        addToOrder={addToOrder}
        circle_style={circle_style}
        info_style={info_style}
      />
    </div>
  );
};

// массив в массиве

export const Adults = ({ data, currentCards, addToOrder, subscription }) => {
  return (
    <div className="container mt-4 mb-5">
      {/* <Items items={currentCards} num={0} addToOrder={addToOrder} /> */}
      <div className="pr-cards d-flex justify-content-around mt-4">
        <div className="pr-card ms-auto me-auto">
          <div className="card-bg card-img-1 pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> В-1 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">Абонемент на 1 час</span>
          </div>
          <div className="circle-price text-center playfair color-dark-shades">
            <div className="pt-4">
              <span> 250 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>Быстрый перерыв во время насыщенного дня.</p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массаж</li>
                <li>Массаж камнями </li>
                <li>Педикюр рыбками</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(0)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>

        <div className="pr-card ms-auto me-auto">
          <div className="card-bg card-img-2 pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> В-2 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">Абонемент на 3 час</span>
          </div>
          <div className="circle-price text-center playfair color-dark-shades">
            <div className="pt-4">
              <span> 600 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>Отличный выбор для любой жизненной ситуации.</p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массажи</li>
                <li>Все виды терапий </li>
                <li>Душ впечатлений</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(1)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>

        <div className="pr-card ms-auto me-auto">
          <div className="card-bg card-img-3  pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> В-3 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">
              Абонемент на весь день
            </span>
          </div>
          <div className="circle-price text-center playfair color-dark-shades">
            <div className="pt-4">
              <span> 1200 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>
                Идеальный выходной? Наши мастера покажут вам, что это такое.
              </p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массажи</li>
                <li>Все виды терапий</li>
                <li>Сауны</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(2)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Children = ({ data, currentCards, addToOrder }) => {
  return (
    <div className="container mt-4 mb-5">
      {/* <Items items={currentCards} num={1} addToOrder={addToOrder} /> */}
      <div className="pr-cards d-flex justify-content-around mt-4">
        <div className="pr-card ms-auto me-auto">
          <div className="card-bg card-img-1 pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> Д-1 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">Абонемент на 1 час</span>
          </div>
          <div className="circle-price text-center playfair color-dark-shades">
            <div className="pt-4">
              <span> 250 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>Быстрый перерыв во время насыщенного дня.</p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массаж</li>
                <li>Массаж камнями </li>
                <li>Педикюр рыбками</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(3)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>

        <div className="pr-card ms-auto me-auto">
          <div className="card-bg card-img-2 pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> Д-2 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">Абонемент на 3 час</span>
          </div>
          <div className="circle-price text-center playfair color-dark-shades">
            <div className="pt-4">
              <span> 600 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>Отличный выбор для любой жизненной ситуации.</p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массажи</li>
                <li>Все виды терапий </li>
                <li>Душ впечатлений</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(4)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>

        <div className="pr-card ms-auto me-auto">
          <div className="card-bg card-img-3  pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> Д-3 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">
              Абонемент на весь день
            </span>
          </div>
          <div className="circle-price text-center playfair color-dark-shades">
            <div className="pt-4">
              <span> 1200 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>
                Идеальный выходной? Наши мастера покажут вам, что это такое.
              </p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массажи</li>
                <li>Все виды терапий</li>
                <li>Сауны</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(5)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Students = ({ data, currentCards, addToOrder }) => {
  return (
    <div className="container mt-4 mb-5">
      {/* <Items items={currentCards} num={2} addToOrder={addToOrder} /> */}
      <div className="pr-cards d-flex justify-content-around mt-4">
        <div className="pr-card ms-auto me-auto">
          <div className="card-bg card-img-1 pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> С-1 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">Абонемент на 1 час</span>
          </div>
          <div className="circle-price text-center playfair color-dark-shades">
            <div className="pt-4">
              <span> 250 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>Быстрый перерыв во время насыщенного дня.</p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массаж</li>
                <li>Массаж камнями </li>
                <li>Педикюр рыбками</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(6)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>

        <div className="pr-card ms-auto me-auto">
          <div className="card-bg card-img-2 pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> С-2 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">Абонемент на 3 час</span>
          </div>
          <div className="circle-price text-center playfair color-dark-shades">
            <div className="pt-4">
              <span> 600 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>Отличный выбор для любой жизненной ситуации.</p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массажи</li>
                <li>Все виды терапий </li>
                <li>Душ впечатлений</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(7)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>

        <div className="pr-card ms-auto me-auto">
          <div className="card-bg card-img-3  pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> С-3 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">
              Абонемент на весь день
            </span>
          </div>
          <div className="circle-price text-center playfair color-dark-shades">
            <div className="pt-4">
              <span> 1200 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>
                Идеальный выходной? Наши мастера покажут вам, что это такое.
              </p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массажи</li>
                <li>Все виды терапий</li>
                <li>Сауны</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(8)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Specials = ({ data, currentCards, addToOrder }) => {
  return (
    <div className="container mt-4 mb-5">
      {/* <Items
        items={currentCards}
        num={3}
        circle_style={circle_style}
        info_style={info_style}
        addToOrder={addToOrder}
      /> */}
      <div className="pr-cards d-flex justify-content-around mt-4">
        <div className="pr-card ms-auto me-auto" style={info_style}>
          <div className="card-bg card-img-1 pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> О-1 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">Абонемент на 1 час</span>
          </div>
          <div
            className="circle-price text-center playfair color-dark-shades"
            style={circle_style}
          >
            <div className="pt-4">
              <span> 600 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>Быстрый перерыв во время насыщенного дня.</p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массаж</li>
                <li>Массаж камнями </li>
                <li>Педикюр рыбками</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(9)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled -special"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>

        <div className="pr-card ms-auto me-auto" style={info_style}>
          <div className="card-bg card-img-2 pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> О-2 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">Абонемент на 3 час</span>
          </div>
          <div
            className="circle-price text-center playfair color-dark-shades"
            style={circle_style}
          >
            <div className="pt-4">
              <span> 900 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>Отличный выбор для любой жизненной ситуации.</p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массажи</li>
                <li>Все виды терапий </li>
                <li>Душ впечатлений</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(10)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled -special"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>

        <div className="pr-card ms-auto me-auto" style={info_style}>
          <div className="card-bg card-img-3  pt-2">
            <p className="name-card p-0 m-0  ms-auto me-auto"> О-3 </p>
            <span className="playfair font-size-24"> Будний день </span>
            <br />
            <span className="montserrat font-size-16">
              Абонемент на весь день
            </span>
          </div>
          <div
            className="circle-price text-center playfair color-dark-shades"
            style={circle_style}
          >
            <div className="pt-4">
              <span> 1800 </span> <br /> <span> UAH </span>
            </div>
          </div>
          <div className="card-info mt-2">
            <div className="m-auto montserrat font-size-16 mw-80">
              <p>
                Идеальный выходной? Наши мастера покажут вам, что это такое.
              </p>
              <ul className="color-dark-shades">
                <li>Посещение бассейна</li>
                <li>Массажи</li>
                <li>Все виды терапий</li>
                <li>Сауны</li>
              </ul>
              <p>Дополниельные услуги узнавайте у администратора на месте*</p>
              <button
                onClick={() => addToOrder(11)}
                className={`montserrat font-size-18 mt-4 ms-auto me-auto d-block ${
                  data.Role === "admin" ||
                  data.Role === "store_clerk" ||
                  data.Role === "courier"
                    ? "org-button-disabled -special"
                    : "org-button"
                }`}
                style={{ width: "292px", height: "50px" }}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
