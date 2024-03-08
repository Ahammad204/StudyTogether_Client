import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';

import ceo from '../../assets/TeamImages/ceo.jpg'
import team1 from '../../assets/TeamImages/member1.jpg'
import team2 from '../../assets/TeamImages/member2.jpg'
import team3 from '../../assets/TeamImages/member3.jpg'
import team4 from '../../assets/TeamImages/member4.jpg'



const TeamMembers = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div>
            <h1 className="font-teko font-extrabold text-center text-7xl mb-3">Team Members</h1>
            <hr />
            <div className="mt-10">

                <div data-aos="flip-left" className=" bg-base-100 w-full gap-24  md:flex items-center">

                    <div className="card-body">
                        <h2 className="card-title">CEO of PH Arena</h2>
                        <p>Kazi Ahammad Ullah is the Founder of study together.... <br /> This website work for student since 2016</p>


                    </div>
                    <div className="card-actions justify-end">
                        <figure><img className='md:w-full md:h-60' src={ceo} alt="Movie" /></figure>
                    </div>

                </div>

                <div data-aos="fade-down" className=" bg-base-100 w-full gap-24 flex flex-col-reverse md:flex md:flex-row mt-8 text-center items-center">

                    <figure><img className='md:w-full md:h-80' src={team1} alt="Movie" /></figure>

                    <div className="  justify-end text-center">
                        <h2 className="card-title"> MERN Stack Developer </h2> <br />
                        <p> Mr.Ethen is the Web developer since 2018  <br /> He has much more experience of Development </p>


                    </div>


                </div>
                <div data-aos="flip-left" className=" bg-base-100 w-full gap-24 md:flex items-center">

                    <div className="card-body">
                        <h2 className="card-title">Software developer</h2>
                        <p><br /> Alexander is the top developer since 2014 in This industry..He has much more experience for handle development</p>


                    </div>
                    <div className="card-actions justify-end">
                        <figure><img className='md:w-full md:h-80' src={team2} alt="Movie" /></figure>
                    </div>

                </div>
                <div data-aos="fade-down" className=" bg-base-100 w-full gap-24 flex flex-col-reverse md:flex md:flex-row mt-8 text-center items-center">

                    <figure><img className='md:w-full md:h-80' src={team3} alt="Movie" /></figure>

                    <div className="  justify-end text-center">
                        <h2 className="card-title">Marketing Expert</h2>
                        <p>Olivia is the marketing expert since 2017...He works with Study Together since 2019</p>


                    </div>


                </div>
                <div data-aos="flip-left" className=" bg-base-100 w-full gap-24 md:flex items-center">

                    <div className="card-body">
                        <h2 className="card-title">cyber security Expert</h2>
                        <p>Liam is the specialist in cyber security.... <br /> He also love hacking and many experience in Cyber Industry</p>


                    </div>
                    <div className="card-actions justify-end">
                        <figure><img className='md:w-full md:h-80' src={team4} alt="Movie" /></figure>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default TeamMembers;