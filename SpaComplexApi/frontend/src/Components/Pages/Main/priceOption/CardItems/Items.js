import React from 'react'

export default function Items({ items, info_style, circle_style, addToOrder }) {
    return (
        <div className="pr-cards d-flex justify-content-around mt-4">
            {items.map((el) => (
                <PriceCard
                    key={el.Subscription_Id}
                    item={el}
                    info_style={el.Category === 'особый' ? info_style : null}
                    circle_style={el.Category === 'особый' ? circle_style : null}
                    addToOrder={addToOrder}
                />
            ))}
        </div>
    )
}

function PriceCard({ item, info_style, circle_style, addToOrder }) {
    return (
        <div className="pr-card ms-auto me-auto" style={info_style}>
            <div className="card-bg pt-2">
                <p className="name-card p-0 m-0  ms-auto me-auto"> {item.Title} </p>
                <span className="playfair font-size-24"> {item.Days_type} </span>
                <br />
                <span className="montserrat font-size-16">{item.Time_type}</span>
            </div>
            <div
                className="circle-price text-center playfair color-dark-shades"
                style={circle_style}>
                <div className="pt-4">
                    <span> {item.Price} </span> <br /> <span> UAH </span>
                </div>
            </div>
            <div className="card-info mt-2">
                <div className="m-auto montserrat font-size-16 mw-80">
                    <p>
                        Sed id blandit tempus etiam. Aliquet ac est ipsum maecenas nec nisi,
                        eget.
                    </p>
                    <p>
                        Elementum sed etiam amet cras volutpat. Imperdiet phasellus aliquam
                        felis libero. Nunc morbi cras morbi nec.
                    </p>
                    <p>
                        Sed id blandit tempus etiam. Aliquet ac est ipsum maecenas nec nisi,
                        eget.
                    </p>
                    <button className="button-pr-card btn-hover montserrat font-size-18" onClick={() => addToOrder(item)}>
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    );
};
