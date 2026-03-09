import { Link } from "react-router-dom";
import { FaTruck, FaBoxOpen, FaMapMarkedAlt, FaMoneyBillWave, FaHeadset, FaShieldAlt } from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const Services = () => {
  return (
    <div data-aos="fade-up" className="my-20 px-6 py-16 bg-[#03373D] rounded-2xl">

      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Services</h2>
        <p className="text-gray-500">
          We provide fast, reliable and secure delivery solutions to make your
          shipping experience smooth and stress-free.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card 1 */}
        <ServiceCard
          icon={<FaTruck />}
          title="Express  & Standard Delivery"
          text="We deliver parcels within 24/72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4/6 hours from pick-up to drop-off."
          link="/services/fast-delivery"
        />

        {/* Card 2 */}
        <ServiceCard
          icon={<FaBoxOpen />}
          title="Nationwide Delivery"
          text="We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
          link="/services/handling"
        />

        {/* Card 3 */}
        <ServiceCard
          icon={<FaMapMarkedAlt />}
          title="Live Tracking"
          text="Track your parcel in real-time anytime.Real-time tracking keeps you updated always.From personal packages to business shipments."
          link="/services/tracking"
        />

        {/* Card 4 */}
        <ServiceCard
          icon={<FaMoneyBillWave />}
          title="Cash On Delivery"
          text="Flexible payment options for customers.100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
          link="/services/cod"
        />

        {/* Card 5 */}
        <ServiceCard
          icon={<FaHeadset />}
          title="24/7 Support"
          text="We are here for you anytime you need help.Customized corporate services which includes warehouse and inventory management support."
          link="/services/support"
        />

        {/* Card 6 */}
        <ServiceCard
          icon={<FaShieldAlt />}
          title="Secure Shipping"
          text="Your parcel safety is our top priority.Fast and secure delivery at your doorstep.From personal packages to business shipments."
          link="/services/security"
        />

      </div>
    </div>
  );
};

export default Services;
