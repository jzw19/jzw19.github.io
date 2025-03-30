import { useAppBarHeight } from "hooks/useAppBarHeight";
import React, { FC, ReactNode } from "react";

interface PageViewProps {
  children: ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
}
const PageView: FC<PageViewProps> = ({ children, ref }) => {
  const muiAppBarHeight = useAppBarHeight(true);

  return (
    <div
      className="body"
      style={{ minHeight: `calc(100vh - ${muiAppBarHeight}rem)` }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default PageView;
