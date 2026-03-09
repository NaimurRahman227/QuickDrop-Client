import { Users, Bike, Package } from "lucide-react";

const StatCard = ({ title, value }) => {

  const getIcon = () => {
    if (title === "Total Users") return <Users size={26} />;
    if (title === "Total Riders") return <Bike size={26} />;
    if (title === "Total Parcels") return <Package size={26} />;
  };

  const getColor = () => {
    if (title === "Total Users") return "from-blue-500 to-blue-700";
    if (title === "Total Riders") return "from-green-500 to-green-700";
    if (title === "Total Parcels") return "from-purple-500 to-purple-700";
  };

  return (
    <div className={`bg-linear-to-r ${getColor()} text-white rounded-xl p-6 shadow-lg hover:scale-105 transition duration-300`}>

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm opacity-80">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="bg-white/20 p-3 rounded-lg">
          {getIcon()}
        </div>

      </div>

    </div>
  );
};

export default StatCard;