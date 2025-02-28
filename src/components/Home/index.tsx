import "./index.css";
import React, { FC } from "react";
import profile from "../../assets/Prom_Photo.jpg";

const Home: FC = () => {
  return (
    <div className="body">
      <img src={profile} />
      <span>Please excuse the appearance of this site</span>
      <span>while construction is in progress...</span>
    </div>
  );
};

export default Home;
