import React from 'react';
import { Container } from 'react-bootstrap';
import photo1 from '../../pictures/collage-photo1.jpg';
import photo2 from '../../pictures/collage-photo2.jpg';
import photo3 from '../../pictures/collage-photo3.jpeg';
import photo4 from '../../pictures/collage-photo4.jpg';
import photo5 from '../../pictures/collage-photo5.jpg';
import photo6 from '../../pictures/collage-photo6.jpg';

export default function Gallery() {
    return (
        <div className='gallery-bg'>
            <Container>
                <div className='text'>
                    <p className='title playfair'> Галерея </p>
                    <p className='montserrat font-size-16'> Viverra ultricies porta cursus aenean libero. Lobortis magna nec at vitae justo, viverra quis. </p>
                </div>

            </Container>


            <div className='collage mt-5 ms-auto me-auto'>
                <div className='d-flex justify-content-around'>
                    <section>
                        <div className='mt-3 vr-photo'>
                            <img src={photo1} alt='collage-photo' />
                        </div>
                        <div className='mt-3 hz-photo'>
                            <img src={photo2} alt='collage-photo' />
                        </div>
                    </section>

                    <section>
                        <div className='mt-3 hz-photo'>
                            <img src={photo3} alt='collage-photo' />
                        </div>
                        <div className='mt-3 vr-photo'>
                            <img src={photo4} alt='collage-photo' />
                        </div>
                    </section>

                    <section className='mb-4'>
                        <div className='mt-3 vr-photo'>
                            <img src={photo5} alt='collage-photo' />
                        </div>
                        <div className='mt-3 hz-photo'>
                            <img src={photo6} alt='collage-photo' />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
