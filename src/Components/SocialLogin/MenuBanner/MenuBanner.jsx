/* eslint-disable react/prop-types */
import { Parallax } from 'react-parallax';

const MenuBanner = ({ title, bgImg }) => {
    return (

        <Parallax
        blur={{ min: -100, max: 100 }}
        bgImage={bgImg}
        bgImageAlt={title}
        strength={-200}
    >
        <div className="hero h-[400px]">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                    <p className="mb-5">Find All Available Assignment boost your Skill</p>

                </div>
            </div>
        </div>
    </Parallax>

    );
};

export default MenuBanner;