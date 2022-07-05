import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Contacts() {

    return (
        <div id='contacts'>
            <Container>

                <div className='text'>
                    <p className='title playfair color-dark-shades'> Контакты </p>
                </div>

                <div className='contacts-map d-flex mb-5'>
                    <div className='map'>
                        <div className='position-absolute locationDot'>
                            <FontAwesomeIcon icon={faLocationDot} size='2x' className='color-brand-gold' />
                        </div>
                    </div>
                    <div className='ms-auto me-auto mt-5 text-center'>
                        <p className='playfair font-size-18 color-brand-gold'> Адрес </p>
                        <p className='montserrat font-size-18'> Харьков, ул.Героев труда, 7 </p>
                        <p className='playfair font-size-18 color-brand-gold'> Телефон </p>
                        <p className='montserrat font-size-18'> +38(068)648-88-88 </p>
                        <p className='playfair font-size-18 color-brand-gold'> Социальные сети </p>
                        <div className='d-flex justify-content-md-around w-50 ms-auto me-auto social'>
                            <a href='https://www.instagram.com/dancing_eurydice/' className='color-brand-gold'><FontAwesomeIcon icon={faInstagram} size='xl' /></a>
                            <a href='https://t.me/dancing_euridyce' className='color-brand-gold'><FontAwesomeIcon icon={faTelegram} size='xl' /></a>
                        </div>
                        <p className='playfair font-size-24 color-dark-shades mt-5'> Консультация бесплатно </p>
                    </div>
                </div>

                <div className='pt-3 d-flex justify-content-between footer'>
                    <Navbar.Brand className='montserrat'> <span className='playfair'>Dancing</span> <span>Eurydice</span> </Navbar.Brand>
                    <div className='montserrat text-end' style={{ lineHeight: '1em' }}>
                        <p> <FontAwesomeIcon icon={faCircle} size='2xs' className='color-brand-gold' /> 2022 </p>
                        <p> Все права сохранены© </p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

