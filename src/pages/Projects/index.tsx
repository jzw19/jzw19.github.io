import React, { FC } from 'react';

import PageView from '../../components/PageView';

const Projects: FC = () => {
  return (
    <PageView>
      <a href="/projects/markdown" className="project-link">
        Markdown Parser
      </a>
    </PageView>
  );
}

export default Projects;