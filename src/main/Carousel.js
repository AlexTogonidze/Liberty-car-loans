import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const CarCarousel = () => {

    var urlParams = new URLSearchParams(window.location.search);

    const imgBaseURL = urlParams.get('image_url');
    const imgCount = urlParams.get('image_count');

    const imageArray = [];

    for (var i = 0; i < imgCount; i++) {
        imageArray.push(imgBaseURL + (i + 1) + '.jpg');
    }

    return (
        <div className='leftContent'>
            <Carousel
                showStatus={false}
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                showIndicators={!!imgBaseURL && imgCount.length > 0 ? true : false}
                swipeable={true}
            >

                {!!imgBaseURL > 0 && imgCount.length > 0 ? imageArray.map((x, i) => {
                    return (
                        <div key={i}>
                            <img src={x} alt='Car image' />
                        </div>
                    )
                }) :
                    <div key={i}>
                        <img src={require('../assets/tesla-model.png')} alt='Car image' />
                    </div>}
            </Carousel>
            <div className='noResp'>
                <h3>მარტივი პირობები ახალი და მეორადი
            მანქანის შესაძენად</h3>
                <p className='mainText'>არაფერი შეედრება გრძნობას, როდესაც ახალი ავტომობილის გასაღებს
    გადმოგცემენ. ლიბერთის ავტო სესხის დახმარებით, მანქანის შეძენა მარტივია
    გააკეთე განაცხადი ონლაინ. წაიყვანე შენი ახალი ან მეორადი ავტომობილი დღესვე!
სესხის მიღება შეგიძლია:  </p>
                <ul className='mainList'>
                    <li>ახალი ან მეორადი მანქანის შესაძენად</li>
                    <li> თანამონაწილეობის გარეშე</li>
                    <li>მაქსიმუმ 100 000<img src={require('../assets/lari.svg')} style={{width: 16, marginTop: -4}} alt='GEL' /> და 72 თვით</li>
                    <li>შემოსავლების დადასტურების გარეშე</li>
                    <li>გირავნობის ხარჯის და გაცემის საკომისიო გარეშე</li>
                    <li>მხოლოდ ახალი ავტომობილის უზრუნველყოფით</li>
                </ul>
            </div>

        </div>
    );
}

export default CarCarousel;