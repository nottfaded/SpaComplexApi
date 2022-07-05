import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container } from 'react-bootstrap'
import card from '../../pictures/card.svg'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default function Info() {
    return (
        <div className='body' id='about'>
            <div>
                <Container>
                    <div className='text'>
                        <p className='title playfair color-dark-shades'>Коротко о главном</p>
                        <p className='montserrat font-size-16'>Наши услуги помогут каждому их покупателю познать тайны мира релаксации и единения с самим собой, посредством нахождения путей к своему расслаблению
                        </p>
                    </div>
                </Container>
                <div className='cards pb-5'>

                    <div className='card'>
                        <div className='card front'>
                            <div className='text'>
                                <p className='playfair font-size-24 w-100 mt-0 text-center'> Процедуры для тела </p>
                            </div>
                            <img src={card} alt='card-up' />
                        </div>
                        <div className='card back'>
                            <div className='text'>
                                <p className='playfair font-size-24 w-100 mt-0 text-center'> Процедуры для тела </p>
                                <p className='montserrat font-size-16'>Это ряд процедур, направленных на выведение шлаков и токсинов, уменьшение целлюлитных отложений и сокращение подкожного жира, регуляцию работы потовых желез, и др. Огромной популярностью пользуются обертывания и сеансы массажа, направленные на очищение пор и улучшение состояния кожи тела, а также на общее расслабление организма. После курса из 8-10 процедур пациент как будто рождается заново: улучшается общее самочувствие, ускоряется обмен веществ и т.п.</p>
                                {/* <div className='d-flex justify-content-between m-4 mt-5 mb-1 montserrat font-size-16'>
                                    <ul>
                                        <li> 10 минут * </li>
                                        <li> 20 минут </li>
                                        <li> 40 минут </li>
                                    </ul>
                                    <ul>
                                        <li> 100 UAH </li>
                                        <li> 200 UAH </li>
                                        <li> 300 UAH </li>
                                    </ul>
                                </div> */}
                                {/* <p className="montserrat mt-0" style={{ fontSize: '12px' }}>* Включен в тариф
                                    <span style={{ fontStyle: 'italic', color: '#F6F9F9' }}>
                                        “На 3 часа ViP”
                                    </span>
                                </p> */}
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card front'>
                            <div className='text'>
                                <p className='playfair font-size-24 w-100 mt-0 text-center'> Водные процедуры </p>
                            </div>
                            <img src={card} alt='card-up' />
                        </div>
                        <div className='card back'>
                            <div className='text'>
                                <p className='playfair font-size-24 w-100 mt-0 text-center'> Водные процедуры </p>
                                <p className='montserrat font-size-16'>Первым делом отправляйтесь в сауну или баню, чтобы хорошенько распарить кожу и расслабиться. Не спешите. Проведите в банной зоне столько времени, сколько вам необходимо, чтобы полностью абстрагироваться от городской суеты. SPA-салоны для того и существуют, чтобы в первую очередь успокоить, расслабить и гармонизировать ваше сознание и чувства.</p>
                                <div className='d-flex justify-content-between m-4 mt-5 mb-1 montserrat font-size-16'>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card front'>
                            <div className='text'>
                                <p className='playfair font-size-24 w-100 mt-0 text-center'> Beaty процедуры </p>
                            </div>
                            <img src={card} alt='card-up' />
                        </div>
                        <div className='card back'>
                            <div className='text'>
                                <p className='playfair font-size-24 w-100 mt-0 text-center'> Beaty процедуры </p>
                                
                                <p className='montserrat font-size-16' style={{fontSize:'15px'}}>Для волос. Благодаря специальным средствам, приготовленным на основе натуральных компонентов, можно вылечить посеченные кончики и алопецию, избавиться от перхоти и повышенной жирности.</p>
                                <p className='montserrat font-size-16' style={{fontSize:'15px'}}>Для лица. Классическая косметология, призванная улучшить внешний вид кожи и оздоровить ее. Очень часто дополняется массажем, сауной или ваннами. Это отличный способ сохранить красоту и упругость кожного покрова. Отдельные процедуры помогают убрать морщины, складки, мешки под глазами.</p>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card front'>
                            <div className='text'>
                                <p className='playfair font-size-24 w-100 mt-0 text-center'> Терапии </p>
                            </div>
                            <img src={card} alt='card-up' />
                        </div>
                        <div className='card back'>
                            <div className='text'>
                                <p className='playfair font-size-24 w-100 mt-0 text-center'> Терапии </p>
                                <p className='montserrat' style={{fontSize:'14px'}}>Массаж – одна из лечебных процедур, известных с давних времен. Его лечебные свойства использовались древними греками, египтянами и китайцами для лечения различных заболеваний. Массажная терапия представляет собой разминание и прочие манипуляции с мышцами и мягкими тканями человека для улучшения его самочувствия и укрепления здоровья. Это форма мануальной терапии, включающая в себя давление, перемещение, сжимание мышц, сухожилий, связок и фасций. Термин в общем смысле слова обозначает широкий спектр техник, различающихся по способу выполнения и интенсивности.</p>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <Container className='text-center montserrat'>
                    <p><button className='org-button' style={{padding: ''}}> Посмотреть все сервисы </button></p>
                </Container> */}
            </div>
        </div>
    )
}