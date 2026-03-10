import React from 'react'
import agent from "/src/assets/agent-pending.png"
import live from "/src/assets/live-tracking.png"
import safe from "/src/assets/safe-delivery.png"

const FeatureSection = () => {
  return (
    <div className="my-20 px-4 space-y-8 border-y border-dashed border-primary/30 py-12">

      {/* SECTION TITLE */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Why Choose Us?
        </h2>
      </div>

      {/* CARD 1 */}
      <div data-aos='fade-left' className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">

          <figure className="flex justify-center w-full md:w-auto">
            <img
              className="w-40 rounded-xl"
              src={agent}
              alt="feature"
            />
          </figure>

          <div className="hidden md:block border-l border-dashed border-primary/40 h-24"></div>

          <div className="w-full text-center md:text-left">
            <h2 className="card-title text-primary mb-2 justify-center md:justify-start">
              Fast & Reliable Delivery
            </h2>
            <p className="text-gray-500">
              We ensure your parcels reach their destination safely and on time with real-time tracking.
            </p>
          </div>

        </div>
      </div>

      {/* CARD 2 */}
      <div data-aos='fade-right' className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">

          <figure className="flex justify-center w-full md:w-auto">
            <img
              className="w-40 rounded-xl"
              src={live}
              alt="feature"
            />
          </figure>

          <div className="hidden md:block border-l border-dashed border-primary/40 h-24"></div>

          <div className="w-full text-center md:text-left">
            <h2 className="card-title text-primary mb-2 justify-center md:justify-start">
              Secure Packaging
            </h2>
            <p className="text-gray-500">
              Professional packaging solutions to keep your products safe from damage during transit.
            </p>
          </div>

        </div>
      </div>

      {/* CARD 3 */}
      <div data-aos='fade-left' className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">

          <figure className="flex justify-center w-full md:w-auto">
            <img
              className="w-40 rounded-xl"
              src={safe}
              alt="feature"
            />
          </figure>

          <div className="hidden md:block border-l border-dashed border-primary/40 h-24"></div>

          <div className="w-full text-center md:text-left">
            <h2 className="card-title text-primary mb-2 justify-center md:justify-start">
              24/7 Customer Support
            </h2>
            <p className="text-gray-500">
              Our dedicated support team is always ready to help you with any delivery queries.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default FeatureSection;
