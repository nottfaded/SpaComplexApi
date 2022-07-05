import React, { StrictMode, useEffect } from 'react'
import Info from './Info'
import Prices from './Prices';
import Reviews from './Reviews'
import Gallery from './Gallery';
import Contacts from './Contacts';

export default function Main({ data, subscription, addToOrder }) {
    return (
        <>
            <div className='app'>
                <div className="container">
                    <div className='text-body'>
                        <p className='playfair'
                            style={{
                                fontSize: '28px',
                                fontStyle: 'italic',
                                color: '#44464A'
                            }}>
                            Лучший spa-комплекс в Харькове
                        </p>
                        <div className='playfair'
                            style={{
                                fontSize: '96px',
                                fontWeight: 'bold',
                                color: '#F4B271'
                            }}>
                            <div style={{lineHeight:'1.2em'}}>Dancing <p className='ms-5 ps-5'>Eurydice</p></div>
                        </div>
                        <p className="montserrat font-size-24" style={{ color: '#44464A' }}>
                            Наши опытные мастера перенесут вас <br />в атмосферу безмятежности и уюта
                        </p>
                        <a href='#prices'>
                            <button className='org-button montserrat font-size-18 mt-5' style={{ width: '300px', heigh: '40px' }}>Выбрать абонемент</button>
                        </a>
                    </div>
                </div>
            </div>

            <Info />

            <StrictMode>
                <Prices data={data} subscription={subscription} addToOrder={addToOrder} />
            </StrictMode>

            <Reviews />

            <Gallery />

            <Contacts />
        </>
    )
}
