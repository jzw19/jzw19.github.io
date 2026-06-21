import "./index.scss";

import React, { FC } from "react";
import {
  agileLogo,
  atlassianLogo,
  awsLogo,
  bigqueryLogo,
  chromeDevToolsLogo,
  cssLogo,
  debuggerLogo,
  dockerLogo,
  gcpLogo,
  gitLogo,
  githubActionsLogo,
  goLogo,
  grpcLogo,
  htmlLogo,
  jestLogo,
  jsLogo,
  kanbanLogo,
  lookerLogo,
  nodeLogo,
  npmLogo,
  playwrightLogo,
  postgresLogo,
  postmanLogo,
  pythonLogo,
  reactLogo,
  reduxDevToolsLogo,
  reduxLogo,
  restApiLogo,
  rtlLogo,
  scrumLogo,
  sqlLogo,
  svelteLogo,
  terraformLogo,
  tsLogo,
  vitestLogo,
  webdriverLogo,
  yarnLogo,
} from "../../../assets";

import Section from "./Section";

const SkillLogos: FC = () => (
  <div className="skillsContainer">
    <Section
      title="Languages"
      logos={[[jsLogo, goLogo, sqlLogo, tsLogo, htmlLogo, cssLogo, pythonLogo]]}
    />

    <Section
      title="Frameworks"
      logos={[[svelteLogo, agileLogo, scrumLogo, kanbanLogo, webdriverLogo]]}
    />

    <Section
      title="Backend & Data"
      logos={[
        [postgresLogo, restApiLogo, grpcLogo, bigqueryLogo, lookerLogo],
      ]}
    />

    <Section
      title="Cloud & Infrastructure"
      logos={[
        [awsLogo, gcpLogo, dockerLogo, terraformLogo, githubActionsLogo],
      ]}
    />

    <Section
      title="Testing"
      logos={[
        [jestLogo, vitestLogo, rtlLogo, playwrightLogo],
      ]}
    />

    <Section
      title="Other Tools"
      logos={[
        [
          reactLogo,
          reduxLogo,
          nodeLogo,
          gitLogo,
          yarnLogo,
        ],
        [
          npmLogo,
          atlassianLogo,
          chromeDevToolsLogo,
          reduxDevToolsLogo,
          debuggerLogo,
          postmanLogo,
        ],
      ]}
    />
  </div>
);

export default SkillLogos;
