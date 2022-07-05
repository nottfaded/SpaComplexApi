import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { varibales } from "../../Variables";
import Header from "./Header";

export default function Home({ data, setData, orders, deleteOrder, sum, setSum, deleteAllOrders}) {
    const [Email, setEmail] = useState('')

    useEffect(() => {
        (
            async () => {
                const response = await fetch(varibales.API_URL + "online", {
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                });

                if (response.status !== 401) {
                    const content = await response.json();
                    setData(content);
                    localStorage.setItem("data", JSON.stringify(data));
                    setEmail(content.Email);
                }
            }
        )();

    }, []);

    
    return (
        <div className='w-100'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="position-relative"
            >

                <Header
                    Email={Email} setEmail={setEmail}
                    orders={orders} deleteOrder={deleteOrder} deleteAllOrders={deleteAllOrders}
                    data={data}
                    sum={sum} setSum={setSum}
                />

                <Outlet />

            </motion.div>
        </div>
    );
}