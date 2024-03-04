
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div className="">
        <div
          className="hero bg-cover"
          style={{
            backgroundImage:
              "url(https://i.ibb.co/zS1Qtts/pexels-rdne-stock-project-7915254.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="">
              <p className="mb-5 text-4xl md:text-9xl font-extrabold font-teko text-white">
                PH Arena Event
              </p>
              <div className="">
                <p className="text-3xl md:text-6xl font-teko font-semibold text-white">
                  Join the big Event Today
                </p>
                <p className="text-2xl md:text-5xl font-teko text-white">
                  Next Tournament Remaining
                </p>
                
                <Link
                  to="/about"
                  className="block md:inline-block mt-4"
                >
                  <button className="btn text-white border-none bg-gradient-to-r from-[#1C1F38] to-[#42D0D9]">
                    Join Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
