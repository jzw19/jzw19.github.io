import "./index.scss";
import React, { FC } from "react";

interface SectionProps {
  title: string;
  logos: string[][];
}

const Section: FC<SectionProps> = ({ title, logos }) => (
  <div className="sectionContainer">
    <h4>{title}</h4>
    {logos.map((row, index) => (
      <div key={`iconRow_${index}`} className="iconRow">
        {row.map((logo, i) => (
          <img key={`${logo}_${i}`} src={logo} />
        ))}
      </div>
    ))}
  </div>
);

export default Section;
