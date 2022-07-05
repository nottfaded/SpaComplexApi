import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Registration from './Components/Pages/Authorization/Registration';
import Login from './Components/Pages/Authorization/Login.jsx';
import { AnimatePresence } from 'framer-motion';
import { varibales } from './Components/Variables';
import { Profile } from './Components/Pages/Account/Profile';
import Ordering from './Components/Pages/Account/Ordering'
import Main from './Components/Pages/Main/Main';
import Home from './Components/Pages/Main/Home';

function App() {
  const location = useLocation();

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("data");
    const initialValue = JSON.parse(saved);
    return initialValue || []
  });
  const [subscription, setSubscription] = useState([]);
  // абонементы для корзины
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("корзина");
    const initialValue = JSON.parse(saved);
    return initialValue || []
  });
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (orders.length !== 0) {
      orders.map((el) => {
        setSum(el.Price + sum);
      })
    }
    localStorage.setItem("корзина", JSON.stringify(orders));
  }, [orders])

  // установка абонементов из БД
  useEffect(() => {
    (
      async () => {
        const response = await fetch(varibales.API_URL + "subscription", {
          headers: { "Content-Type": "application/json" }
        });

        const content = await response.json();
        content.map((el) => {
          el["count"] = 1;
        })
        setSubscription(content);
      }
    )();
  }, [])

  const [user_orders, setUser_Orders] = useState([]);
  const [RECEIPT, setRECEIPT] = useState([]); ///////////////////////////////////////
  const [info, setInfo] = useState([]);

  //состояние для отслеживания изинений в статусе заказа
  const [newReceipt, setNewReceipt] = useState(false);

  // установка заказов пользователя из БД
  useEffect(() => {
    if (data.Role === "client") {  // for Client
      (async () => {
        const response = await fetch(varibales.API_URL + "receipt/client", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            User_Id: data.User_Id,
          }),
        });
        const content = await response.json();
        content.map((el) => {
          el["Sum"] = 0;
        })
        setUser_Orders(content);
        setRECEIPT(content);

      })();

      (async () => {
        const response = await fetch(varibales.API_URL + "receipt/client/info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            User_Id: data.User_Id,
          }),
        });

        setInfo(await response.json());
      })();
    }
    else if (data.Role === "admin") {  // for Admin
      (async () => {
        const response = await fetch(varibales.API_URL + "receipt/admin", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const content = await response.json();
        content.map((el) => {
          el["Sum"] = 0;
        })
        setUser_Orders(content);
        setRECEIPT(content);

      })();

      (async () => {
        const response = await fetch(varibales.API_URL + "receipt/admin/info", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        setInfo(await response.json());
      })();
    }
    else if (data.Role === "store_clerk") {  // for Store_Clerk
      (async () => {
        const response = await fetch(varibales.API_URL + "receipt/store-clerk", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const content = await response.json();
        content.map((el) => {
          el["Sum"] = 0;
        })
        setUser_Orders(content);
        setRECEIPT(content);

      })();

      (async () => {
        const response = await fetch(varibales.API_URL + "receipt/store-clerk/info", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        setInfo(await response.json());
      })();
    }
    else if (data.Role === "courier") {  // for Courier
      (async () => {
        const response = await fetch(varibales.API_URL + "receipt/courier", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const content = await response.json();
        content.map((el) => {
          el["Sum"] = 0;
        })
        setUser_Orders(content);
        setRECEIPT(content);

      })();

      (async () => {
        const response = await fetch(varibales.API_URL + "receipt/courier/info", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        setInfo(await response.json());
      })();
    }
  }, [newReceipt]);

  // функция для добавления в корзину
  const addToOrder = (id) => {
    if (data.Role !== "admin" && data.Role !== "store_clerk" && data.Role !== "courier") {
      if (!orders.includes(subscription[id])) {
        setOrders([...orders, subscription[id]]);
      }
    }
    else if (data.Role === 'admin')
      alert("Вы зашли за админа");
    else if (data.Role === 'store_clerk')
      alert("Вы зашли за работника склада");
    else if (data.Role === 'courier')
      alert("Вы зашли за курьера");
  }

  // функция для удаления из корзину
  const deleteOrder = (id) => {
    setOrders(orders.filter(el => el.Subscription_Id !== id));
  }

  // функция очистки корзины
  const deleteAllOrders = () => {
    setOrders([]);
    localStorage.removeItem("корзина");
  }

  return (
    <>

      <AnimatePresence>
        <Routes location={location} key={location.pathname} >
          <Route path='/' element={
            <Home
              data={data} setData={setData}
              orders={orders} deleteOrder={deleteOrder} deleteAllOrders={deleteAllOrders}
              sum={sum} setSum={setSum}
            />}>
            <Route index element={<Main data={data} subscription={subscription} addToOrder={addToOrder} />} />
            <Route path='profile' element={
              <Profile data={data} user_orders={user_orders}
                info={info} 
                newReceipt={newReceipt} setNewReceipt={setNewReceipt}
                RECEIPT={RECEIPT} setRECEIPT={setRECEIPT}
              />}
            />
          </Route>
          <Route path='/ordering' element={
            <Ordering orders={orders} setOrders={setOrders}
              data={data} sum={sum}
              setSum={setSum} deleteOrder={deleteOrder}
              deleteAllOrders={deleteAllOrders} setSubscription={setSubscription} />
          } />
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />

          <Route
            path='*'
            element={<Navigate to='/' replace />}
          />

        </Routes>
      </AnimatePresence>

    </>
  );
}

export default App;
