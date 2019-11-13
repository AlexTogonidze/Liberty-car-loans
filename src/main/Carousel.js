import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const CarCarousel = () => {
    return (
        <div className='leftContent'>
            <Carousel
                showStatus={false}
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                showIndicators={true}
                swipeable={true}
            >
                <div>
                    <img src={require('../assets/merc.png')} alt='car' />

                </div>
                <div>
                    <img src={require('../assets/merc.png')} alt='car' />

                </div>
                <div>
                    <img src={require('../assets/merc.png')} alt='car' />

                </div>
                <div>
                    <img src={require('../assets/merc.png')} alt='car' />

                </div>
                <div>
                    <img src={require('../assets/merc.png')} alt='car' />

                </div>
            </Carousel>
            <div className='noResp'>
                <h3>მარტივი პირობები ახალი და მეორადი
            მანქანის შესაძენად</h3>
                <p>არაფერი შეედრება გრძნობას, როდესაც ახალი ავტომობილის გასაღებს
    გადმოგცემენ. ლიბერთის ავტო სესხის დახმარებით, მანქანის შეძენა მარტივია
    გააკეთე განაცხადი ონლაინ. წაიყვანე შენი ახალი ან მეორადი ავტომობილი დღესვე!
სესხის მიღება შეგიძლია:  </p>
                <ul className='mainList'>
                    <li>ახალი ან მეორადი მანქანის შესაძენად</li>
                    <li> თანამონაწილეობის გარეშე</li>
                    <li>მაქსიმუმ  100 000 ₾ და 72 თვით</li>
                    <li>შემოსავლების დადასტურების გარეშე</li>
                    <li>გირავნობის ხარჯის და გაცემის საკომისიო გარეშე</li>
                    <li>მხოლოდ ახალი ავტომობილის უზრუნველყოფით</li>
                    <li>და რაც მთავარია, მანქანის ტარების უფლებით!</li>
                </ul>
            </div>

        </div>
    );
}

export default CarCarousel;