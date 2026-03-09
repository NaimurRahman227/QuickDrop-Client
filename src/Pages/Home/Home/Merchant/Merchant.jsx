import React from "react";
import { Link } from "react-router";
import merchantImg from "/src/assets/location-merchant.png"; // change image name if needed

const Merchant = () => {
  return (
    <section className="bg-[url('/src/assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] text-white rounded-2xl my-20 px-6 md:px-12 py-12">
      <div className="flex flex-col-reverse md:flex-row items-center gap-10">

        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>

          <p className="text-gray-200 max-w-lg mx-auto md:mx-0">
            Join thousands of merchants who trust QuickDrop for fast,
            secure and reliable delivery services. Grow your business with
            our nationwide logistics network.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="btn rounded-full bg-primary border border-white text-white hover:bg-white hover:text-[#03373D] transition duration-300 card-hover">
              Earn with QuickDrop
            </button>

            <Link to='/RiderRegister' className="btn rounded-full bg-transparent border border-white text-white hover:bg-white hover:text-[#03373D] transition duration-300 card-hover">
              Become a Rider
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src={merchantImg}
            alt="Merchant"
            className="w-72 md:w-96 rounded-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Merchant;

