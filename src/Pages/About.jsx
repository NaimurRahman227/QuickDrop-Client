import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="btn btn-outline btn-primary mb-4"
      >
        ← Back to Home
      </button>

      {/* HERO */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About QuickDrop</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          QuickDrop is a smart parcel delivery platform built to simplify
          logistics for individuals and businesses. We combine technology
          and reliable courier services to deliver packages quickly,
          safely, and efficiently.
        </p>
      </div>

      {/* MISSION */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
          alt="logistics"
          className="rounded-xl shadow"
        />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to make parcel delivery fast, transparent, and
            reliable. QuickDrop aims to simplify logistics by connecting
            customers with service centers and delivery riders through a
            seamless digital platform.
          </p>
          <p className="text-gray-600">
            Whether you are sending documents, packages, or business
            shipments, QuickDrop ensures your parcel reaches its
            destination securely and on time.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-500">
            QuickDrop ensures fast and efficient parcel delivery through
            optimized routes and dedicated riders.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Secure Handling</h3>
          <p className="text-gray-500">
            Every parcel is handled with care and monitored through our
            tracking system to ensure safe delivery.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
          <p className="text-gray-500">
            Customers can track their parcels using a unique tracking ID
            and stay updated on delivery progress.
          </p>
        </div>

      </div>

      {/* VISION */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Our Vision</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We aim to build a smarter logistics ecosystem where technology,
          automation, and efficient delivery networks work together to
          provide the best courier experience for our customers.
        </p>
      </div>

    </div>
  );
};

export default About;