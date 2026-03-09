import { Link } from "react-router-dom";

const ServiceCard = ({ icon, title, text, link }) => {
  return (
    <Link to={link}>
      <div className="card bg-base-100 hover:bg-teal-100 shadow-md hover:shadow-xl hover:scale-[1.07] transition ease-in-out duration-300 h-full">
        <div className="card-body items-center text-center">
          
          <div className="text-4xl text-primary mb-3">
            {icon}
          </div>

          <h2 className="card-title text-primary">{title}</h2>
          <p className="text-gray-500">{text}</p>

        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
