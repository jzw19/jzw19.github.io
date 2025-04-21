import PageView from "../PageView"
import React, { FC } from "react"

const Processes: FC = () => {
  return (
    <PageView>
      <h3>Debugging</h3>
      <ol>
        <li>Understand and verify the discrepancy</li>
        <li>Reproduce the problem in a safe environment</li>
        <li>Use tools to identify and isolate the root cause</li>
        <li>Propose one or more ways to resolve the issue</li>
        <li>Test the fix(es) and identify tradeoffs</li>
        <li>Document the selected fix and tradeoffs</li>
      </ol>
    </PageView>
  );
};

export default Processes;