/*
    Credit: https://github.com/mui/material-ui/issues/10739#issuecomment-1484828925
*/

import { useMediaQuery, useTheme } from "@mui/material";

type MinHeight = {
  minHeight: number;
};

/**
 * @returns App Bar height in rem or px
 */
export function useAppBarHeight(convertToRem?: boolean): number {
  const {
    mixins: { toolbar },
    breakpoints,
  } = useTheme();
  const toolbarDesktopQuery = breakpoints.up("sm");
  const toolbarLandscapeQuery = `${breakpoints.up(
    "xs"
  )} and (orientation: landscape)`;
  const isDesktop = useMediaQuery(toolbarDesktopQuery);
  const isLandscape = useMediaQuery(toolbarLandscapeQuery);
  let currentToolbarMinHeight;
  if (isDesktop) {
    currentToolbarMinHeight = toolbar[toolbarDesktopQuery];
  } else if (isLandscape) {
    currentToolbarMinHeight = toolbar[toolbarLandscapeQuery];
  } else {
    currentToolbarMinHeight = toolbar;
  }

  const divisor = parseInt(getComputedStyle(document.documentElement).fontSize);
  const height = convertToRem
    ? (currentToolbarMinHeight as MinHeight).minHeight / divisor
    : (currentToolbarMinHeight as MinHeight).minHeight;

  return height;
}
