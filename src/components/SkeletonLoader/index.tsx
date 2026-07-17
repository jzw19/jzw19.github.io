import React from "react";
import { Skeleton, Box } from "@mui/material";

const SkeletonLoader: React.FC = () => {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Simulate a header with title and subtitle */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Skeleton variant="rectangular" width={200} height={24} />
        <Skeleton variant="rectangular" width={150} height={20} />
      </Box>

      {/* Simulate some content sections */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Image placeholder */}
        <Skeleton variant="rectangular" width={100} height={100} sx={{ mb: 2 }} />

        {/* Text paragraphs */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Skeleton variant="text" width={70} height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width={90} height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width={60} height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width={80} height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width={50} height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width={70} height={16} sx={{ mb: 0.5 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonLoader;