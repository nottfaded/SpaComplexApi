import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import prof from '../../pictures/prof.svg';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from 'react-grid-carousel';

export default function Reviews() {
  return (
    <div id='reviews' className='pb-4'>

      <Container>
        <div className='text'>
          <p className='title playfair color-brand-gold'> Отзывы </p>
          <p className='montserrat font-size-16 color-light-shades'> Эмоции наших клиентов </p>
        </div>

        <div className='CAROUSEL'>
          <Carousel cols={2}
            rows={1} gap={10}
            loop showDots dot={MyDot}
            autoplay={2000}
          >
            <Carousel.Item>
              <Card count={5}
                name={'Косячук Соня'}
                tag={'kosyachuksofia'}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Card count={4}
                name={'Олейников Алексей'}
                tag={'oleynikovaleksey'}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Card count={3}
                name={'Никита Ляшенко'}
                tag={'nikitalyashenko'}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Card count={2}
                name={'Никита Ляшенко'}
                tag={'nikitalyashenko'}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Card count={2}
                name={'Олейников Алексей'}
                tag={'oleynikovaleksey'}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Card count={1}
                name={'Косячук Соня'}
                tag={'kosyachuksofia'}
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </Container>

    </div>
  )
}

const Card = ({ count, name, tag }) => {

  const outStar = (counter) => {
    let cont = []
    for (let index = 0; index < counter; index++) {
      cont.push(<p key={index}><FontAwesomeIcon icon={faStar} size='lg' className='color-brand-gold' /></p>)
    }
    return cont;
  }

  return (
    <div className='re-card ms-auto me-auto'>
      <div className='info pt-5 ms-auto me-auto'>
        <Row>
          <Col className='d-flex' lg={7}>
            <img src={prof} height='50' width='50' alt='prof' />
            <div className='d-block ms-2'>
              <p className='montserrat font-size-18 mb-0'> {name} </p>
              <p className='montserrat mb-0'> @{tag} </p>
            </div>
          </Col>
          <Col>
            <div className='d-flex justify-content-end'>
              {outStar(count)}
            </div>
          </Col>
        </Row>
        <div className='down mt-4'>
          <p className='montserrat'>
            Bibendum habitasse ultrices tortor scelerisque. Id tristique nisi tellus massa odio.
            Varius ac sit maecenas dis.
            Blandit massa odio porttitor nulla pulvinar mauris.
            Vitae, lacus eget etiam pharetra nisl eget neque metus.</p>
        </div>
      </div>
    </div>
  );
}

const MyDot = ({ isActive }) => (
  <span
    style={{
      display: 'inline-block',
      height: '11px',
      width: '11px',
      borderRadius: '50px',
      border: isActive ? '3px solid #F4B271' : '',
      background: '#F6F9F9'
    }}
  ></span>
)
