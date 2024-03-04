import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../src//assets/Banner/1.jpeg'
import img2 from '../../../src/assets/Banner/2.jpg'
import img3 from '../../../src/assets/Banner/3.jpg'


const Banner = () => {
    return (
        <Carousel className="text-center">
            <div className="text-center">
           

              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
             <div className="text-center">
             <p className="mb-5 absolute mt-20  text-4xl md:text-9xl font-extrabold font-teko text-white ">
                Meet, Study Together..
              </p>
             <p className="mb-5 absolute ml-48 mt-96  text-4xl md:text-4xl font-extrabold font-teko text-white ">
             Join the largest global student community online <br /> and say goodbye to lack of motivation.
              </p>
             </div>
            
                <img className="bg-black" src={img1} />


            </div>
            <div className="text-center">
           

              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
             <div className="text-center">
             <p className="mb-5 absolute mt-20  text-4xl md:text-9xl font-extrabold font-teko text-white ">
                Meet, Study Together..
              </p>
             <p className="mb-5 absolute ml-48 mt-96  text-4xl md:text-4xl font-extrabold font-teko text-white ">
             Join the largest global student community online <br /> and say goodbye to lack of motivation.
              </p>
             </div>
            
                <img className="bg-black" src={img2} />


            </div>
            <div className="text-center">
           

              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
             <div className="text-center">
             <p className="mb-5 absolute mt-20  text-4xl md:text-9xl font-extrabold font-teko text-white ">
                Meet, Study Together..
              </p>
             <p className="mb-5 absolute ml-48 mt-96  text-4xl md:text-4xl font-extrabold font-teko text-white ">
             Join the largest global student community online <br /> and say goodbye to lack of motivation.
              </p>
             </div>
            
                <img className="bg-black" src={img3} />


            </div>
        
         
        </Carousel>
    );
};

export default Banner;