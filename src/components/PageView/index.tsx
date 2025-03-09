import { useAppBarHeight } from "hooks/useAppBarHeight";
import React, { FC, ReactNode } from "react";

interface PageViewProps {
    children: ReactNode
    ref?: React.RefObject<null>
}
const PageView: FC<PageViewProps> = ({ children, ref }) => {
    const muiAppBarHeight = useAppBarHeight();
    
    return (
        <div
            className="body"
            style={{ minHeight: `calc(100vh - ${muiAppBarHeight}px)` }}
            ref={ref}
        >
            {children}
        </div>
    );
};

export default PageView;