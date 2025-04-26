import "./index.scss";

import React, { FC } from "react";
import {
  agileLogo,
  atlassianLogo,
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
  nodeLogo,
  npmLogo,
  playwrightLogo,
  postmanLogo,
  pythonLogo,
  reactLogo,
  reduxDevToolsLogo,
  reduxLogo,
  rtlLogo,
  scrumLogo,
  sqlLogo,
  svelteLogo,
  tsLogo,
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
      title="Other Tools"
      logos={[
        [
          reactLogo,
          reduxLogo,
          jestLogo,
          rtlLogo,
          nodeLogo,
          playwrightLogo,
          dockerLogo,
          gitLogo,
          yarnLogo,
        ],
        [
          npmLogo,
          gcpLogo,
          atlassianLogo,
          githubActionsLogo,
          chromeDevToolsLogo,
          reduxDevToolsLogo,
          debuggerLogo,
          postmanLogo,
          grpcLogo,
        ],
      ]}
    />
  </div>
);

export default SkillLogos;
