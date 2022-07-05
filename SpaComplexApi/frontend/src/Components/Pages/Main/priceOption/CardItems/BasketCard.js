import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import photo from '../../../../pictures/collage-photo3.jpeg';
import photo2 from '../../../../pictures/collage-photo5.jpg';
import photo3 from '../../../../pictures/collage-photo2.jpg';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const BasketCard = ({ item, orders, deleteOrder, sum, setSum }) => {
  const [num, setNum] = useState(1);
  const [initialPrice] = useState(() => {
    if (item.Category === "взрослый" || item.Category === "детский" || item.Category === "студенческий") {
      if (item.Time_type === "Абонемент на 1 час") {
        return 250;
      }
      if (item.Time_type === "Абонемент на 3 час") {
        return 600;
      }
      if (item.Time_type === "Абонемент на весь день") {
        return 1200;
      }
    }
    else {
      if (item.Time_type === "Абонемент на 1 час") {
        return 600;
      }
      if (item.Time_type === "Абонемент на 3 час") {
        return 900;
      }
      if (item.Time_type === "Абонемент на весь день") {
        return 1800;
      }
    }
  });
  const [price, setPrice] = useState(initialPrice);

  // useEffect(() => {
  //   item.count = num;
  //   setPrice(item.Price);
  // }, [num]);

  const PlusNum = (num) => {
    if (item.count < 5) {
      item.count += 1;
      // setNum(num + 1);
      item.Price += initialPrice;
      setSum(sum + initialPrice);
    }
  }

  const MinusNum = (num) => {
    if (item.count > 1) {
      // setNum(num - 1);
      item.count -= 1;
      item.Price -= initialPrice;
      setSum(sum - initialPrice);
    }
  }

  useEffect(() => {
    localStorage.setItem("корзина", JSON.stringify(orders));
  }, [orders, item.Price])

  return (
    <div className="basket-card mb-2 d-flex">

      <div>
        {item.Subscription_Id === 1 && (
          <img src={photo} alt='orders' />
        )}
        {item.Subscription_Id === 4 && (
          <img src={photo} alt='orders' />
        )}
        {item.Subscription_Id === 7 && (
          <img src={photo} alt='orders' />
        )}
        {item.Subscription_Id === 10 && (
          <img src={photo} alt='orders' />
        )}

        {item.Subscription_Id === 2 && (
          <img src={photo2} alt='orders' />
        )}
        {item.Subscription_Id === 5 && (
          <img src={photo2} alt='orders' />
        )}
        {item.Subscription_Id === 8 && (
          <img src={photo2} alt='orders' />
        )}
        {item.Subscription_Id === 11 && (
          <img src={photo2} alt='orders' />
        )}

        {item.Subscription_Id === 3 && (
          <img src={photo3} alt='orders' />
        )}
        {item.Subscription_Id === 6 && (
          <img src={photo3} alt='orders' />
        )}
        {item.Subscription_Id === 9 && (
          <img src={photo3} alt='orders' />
        )}
        {item.Subscription_Id === 12 && (
          <img src={photo3} alt='orders' />
        )}
      </div>

      <div className="w-100 ms-3 mt-1 me-3">

        <div className='d-flex justify-content-between' style={{ height: '36px' }}>
          <div className='mb-3 ' style={{ fontSize: '16px' }}>
            {item.Time_type} ({item.Title})
          </div>
          <motion.div
            className='me-2'
            whileHover={{ cursor: 'pointer', scale: 1.1 }}
            onClick={() => { deleteOrder(item.Subscription_Id); item.Price = initialPrice; item.count = 1; setSum(0) }}
          >
            <FontAwesomeIcon icon={faXmark} className='color-dark-shades color-light-gray' />
          </motion.div>
        </div>

        <div className='d-flex justify-content-between'>
          <div className='count-option font-size-18'>
            <motion.button className='w-100' whileTap={{ backgroundColor: '#ebebeb' }} onClick={() => MinusNum(num)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" color='#CACBCE' viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
              </svg>
            </motion.button>
            <div className='w-100 count'>
              {item.count}
            </div>
            <motion.button className='w-100' whileTap={{ backgroundColor: '#ebebeb' }} onClick={() => PlusNum(num)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" color='#CACBCE' className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
              </svg>
            </motion.button>
          </div>
          <div>
            <span className='color-brand-gold font-size-24 me-1' style={{ fontWeight: '700' }}> {item.Price}</span>
            <span style={{ fontSize: '13px' }}>грн</span>
          </div>
        </div>

      </div>
    </div>
  );
}