import Marquee from "react-fast-marquee";

import logo1 from "/src/assets/brands/amazon_vector.png";
import logo2 from "/src/assets/brands/amazon.png";
import logo3 from "/src/assets/brands/casio.png";
import logo4 from "/src/assets/brands/moonstar.png";
import logo5 from "/src/assets/brands/randstad.png";
import logo6 from "/src/assets/brands/star.png";
import logo7 from "/src/assets/brands/start_people.png";

const PartnerBrands = () => {
  return (
    <div className="my-20 px-4">

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Our Delivery Partner's
      </h2>

      {/* Marquee */}
      <Marquee
        pauseOnHover={true}
        speed={60}
        gradient={false}
      >
        <div className="flex gap-16 items-center">

          <img src={logo1} className="h-10 md:h-14" />
          <img src={logo2} className="h-10 md:h-14" />
          <img src={logo3} className="h-10 md:h-14" />
          <img src={logo4} className="h-10 md:h-14" />
          <img src={logo5} className="h-10 md:h-14" />
          <img src={logo6} className="h-10 md:h-14" />
          <img src={logo7} className="h-10 md:h-14" />

        </div>
      </Marquee>

    </div>
  );
};

export default PartnerBrands;
