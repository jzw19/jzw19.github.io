import "./index.scss";
import React, { FC } from "react";
import {
  jsLogo,
  cssLogo,
  goLogo,
  htmlLogo,
  pythonLogo,
  sqlLogo,
  tsLogo,
  svelteLogo,
  agileLogo,
  scrumLogo,
  kanbanLogo,
  webdriverLogo,
  reactLogo,
  reduxLogo,
  jestLogo,
  rtlLogo,
  nodeLogo,
  playwrightLogo,
  dockerLogo,
  gitLogo,
  yarnLogo,
  npmLogo,
  gcpLogo,
  atlassianLogo,
  githubActionsLogo,
  chromeDevToolsLogo,
  reduxDevToolsLogo,
  debuggerLogo,
  postmanLogo,
  grpcLogo,
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
