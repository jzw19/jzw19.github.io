import "./index.scss";

import React, { FC, useRef } from "react";
import {
  accessibility,
  api,
  database,
  findBug,
  frontend,
  saas,
  swissArmyKnife,
} from "../../assets";

import PageScrollButtons from "../../components/PageScrollButtons";
import PageView from "../../components/PageView";

const About: FC = () => {
  const SAAS_LABEL = "Image of a cloud labelled SaaS connected to various devices, users or databases";
  const FRONTEND_LABEL = "Image representing frontend development";
  const FIND_BUG_LABEL = "Image of a magnifying glass over a bug, representing the ability to find bugs efficiently";
  const SWISS_ARMY_KNIFE_LABEL = "Image of a swiss army knife";
  const DATABASE_LABEL = "Image of a database";
  const API_LABEL = "Image representing an API";
  const ACCESSIBILITY_LABEL = "Image representing accessibility standards";

  const firstPageRef = useRef<HTMLDivElement | null>(null);
  const secondPageRef = useRef<HTMLDivElement | null>(null);
  const thirdPageRef = useRef<HTMLDivElement | null>(null);
  const fourthPageRef = useRef<HTMLDivElement | null>(null);

  const pageRefs: React.RefObject<HTMLDivElement | null>[] = [
    firstPageRef,
    secondPageRef,
    thirdPageRef,
    fourthPageRef,
  ];

  return (
    <>
      <PageView ref={firstPageRef}>
        <img src={saas} aria-label={SAAS_LABEL} alt={SAAS_LABEL} />
        <p>
          I am an adaptable software engineer with about 6 years of experience in maintaining and developing B2B SaaS platforms.
        </p>
      </PageView>
      <PageView ref={secondPageRef}>
        <div className="imageContainer">
          <img src={frontend} aria-label={FRONTEND_LABEL} alt={FRONTEND_LABEL} />
          <img src={findBug} aria-label={FIND_BUG_LABEL} alt={FIND_BUG_LABEL} />
        </div>
        <p>
          My strengths are in frontend development, debugging and testing methodologies.
        </p>
      </PageView>
      <PageView ref={thirdPageRef}>
        <div className="imageContainer">
          <img src={database} aria-label={DATABASE_LABEL} alt={DATABASE_LABEL} />
          <img src={api} aria-label={API_LABEL} alt={API_LABEL} />
          <img src={accessibility} aria-label={ACCESSIBILITY_LABEL} alt={ACCESSIBILITY_LABEL} />
        </div>
        <p>
          I also have experience with databases, API development, software architecture, accessibility standards and responsive design.
        </p>
      </PageView>
      <PageView ref={fourthPageRef}>
        <img src={swissArmyKnife} aria-label={SWISS_ARMY_KNIFE_LABEL} alt={SWISS_ARMY_KNIFE_LABEL} />
        <p>
          My peers have described me as a quick learner and a "swiss army knife" due to my wide breadth of skills.
        </p>
      </PageView>
      <PageScrollButtons pageRefs={pageRefs} />
    </>
  );
};

export default About;
