import React, { useEffect, useState } from 'react'
import Categories from './priceOption/Categories.jsx'
import {
    Adults, Children,
    Students, Specials, Cards
} from './priceOption/priceOption.jsx'

export var Prices_y;

export default function Prices({ data, subscription, addToOrder }) {
    const [value, setValue] = useState();
    const [activeValue, setActiveValue] = useState([
        {
            id: 1,
            text: "Взрослым",
            value: <Adults />,
            active: true,
        },
        {
            id: 2,
            text: "Детям",
            value: <Children />,
            active: false,
        },
        {
            id: 3,
            text: "Студентам",
            value: <Students />,
            active: false,
        },
        {
            id: 4,
            text: "Особые",
            value: <Specials />,
            active: false,
        },
    ]);

    const chooseCategory = (category) => {
        activeValue.map(element => { element.active = false });
        setValue(category.value);
    }

    return (
        <div className="container" id='prices'>
            <div className='text'>
                <p className='title playfair color-dark-shades'>Цены и тарифы</p>
            </div>

            <div className='categories montserrat font-size-18'>
                {activeValue.map((el) => (
                    <div key={el.id} onClick={() => { chooseCategory(el); el.active = true; }} className={el.active ? "active" : ""}> {el.text} </div>
                ))}
            </div>

            <div className={activeValue[0].active ? 'd-block' : 'd-none'}><Adults data={data} addToOrder={addToOrder} /> </div>
            <div className={activeValue[1].active ? 'd-block' : 'd-none'}><Children data={data} addToOrder={addToOrder} /></div>
            <div className={activeValue[2].active ? 'd-block' : 'd-none'}><Students data={data} addToOrder={addToOrder} /></div>
            <div className={activeValue[3].active ? 'd-block' : 'd-none'}><Specials data={data} addToOrder={addToOrder} /></div>

        </div >
    )
}
