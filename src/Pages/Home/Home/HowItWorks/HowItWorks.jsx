import React from 'react'
import authImg from "/src/assets/authImage.png"
import agent from "/src/assets/agent-pending.png"
import liveTrack from "/src/assets/live-tracking.png"
import booking from "/src/assets/bookingIcon.png"
const HowItWorks = () => {
  return (
    <div data-aos='fade-right' className="my-16 px-4">
      
      {/* Section Title */}
      <h2 className="text-3xl text-center md:text-3xl font-bold text-primary mb-10">
        How It Works
      </h2>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="card bg-base-100 hover:bg-teal-100 shadow-md hover:shadow-xl hover:scale-[1.04] transition duration-300 ease-in-out">
          <figure className="px-6 pt-6 justify-start">
            <img
              src={authImg}
              alt="Step 1"
              className="rounded-xl w-24"
            />
          </figure>
          <div className="card-body text-left">
            <h2 className="card-title text-primary">Booking Pick & Drop</h2>
            <p>From personal packages to business shipments — we deliver on time, every time.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-100 hover:bg-teal-100 shadow-md hover:shadow-xl hover:scale-[1.04] transition duration-300 ease-in-out ">
          <figure className="px-6 pt-6 justify-start">
            <img
              src={agent}
              alt="Step 2"
              className="rounded-xl w-24"
            />
          </figure>
          <div className="card-body text-left">
            <h2 className="card-title text-primary">Cash On Delivery</h2>
            <p>From personal packages to business shipments — we deliver on time, every time.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-100 hover:bg-teal-100 shadow-md hover:shadow-xl hover:scale-[1.04] transition duration-300 ease-in-out">
          <figure className="px-6 pt-6 justify-start">
            <img
              src={liveTrack}
              alt="Step 3"
              className="rounded-xl w-24"
            />
          </figure>
          <div className="card-body text-left">
            <h2 className="card-title text-primary">Delivery Hub</h2>
            <p>Real-time tracking keeps you updated always.From personal packages to business shipments.</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card bg-base-100 hover:bg-teal-100 shadow-md hover:shadow-xl hover:scale-[1.04] transition duration-300 ease-in-out">
          <figure className="px-6 pt-6 justify-start">
            <img
              src={booking}
              alt="Step 4"
              className="rounded-xl w-24"
            />
          </figure>
          <div className="card-body text-left">
            <h2 className="card-title text-primary">Booking SME & Corporate</h2>
            <p>Fast and secure delivery at your doorstep.From personal packages to business shipments.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
