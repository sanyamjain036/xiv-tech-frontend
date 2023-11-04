import React from "react";

const Card = ({ country, city, temp, feelTemp, condition, icon, error }) => {
  return (
    <div className="p-5 border border-black rounded-md">
      <>
        <div className=" flex items-center justify-between text-lg pb-2">
          {city} <img src={icon} width={30} height={30} />
        </div>
        <hr className="pb-2" />
        <div className=" font-bold">
          Country: <span className=" font-normal">{country}</span>
        </div>
        <div className=" flex items-center font-bold">
          Condition: <span className="font-normal">&nbsp;{condition}</span>
        </div>
        <div className=" font-bold">
          Temperature: <span className=" font-normal">{temp}°C</span>
        </div>
        <div className=" font-bold">
          Feels Like: <span className=" font-normal">{feelTemp}°C</span>
        </div>
      </>
    </div>
  );
};

export default Card;
