import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ecomslide1 from "../assets/slider-images/ecom-slide-1.jpeg";
import ecomslide2 from "../assets/slider-images/ecom-slide-2.jpeg";
import ecomslide3 from "../assets/slider-images/ecom-slide-3.jpeg";
import ecomslide4 from "../assets/slider-images/ecom-slide-4.jpeg";
 
const slideImages = [
  ecomslide1,
  ecomslide2,
  ecomslide3,
  ecomslide4
];

function SliderShow  ()  {


  return (
    <div className="slide-container">
      <Slide>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[0]}) no-repeat cover`, width: `100%`, height: 100}}>
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]}) no-repeat cover`, width: `100%`, height: 100}}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]}) no-repeat cover`, width: `100%`, height: 100}}>
            <span>Slide 3</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[3]}) no-repeat cover`, width: `100%`, height: 100}}>
            <span>Slide 4</span>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default SliderShow;