import { Box, Typography } from '@mui/material';
// src/chatbot/components/SourceCitation.tsx
import React from 'react';

interface SourceCitationProps {
  sources: string[];
}

/**
 * Component to display source citations
 * @param sources - Array of source titles to display
 */
export const SourceCitation: React.FC<SourceCitationProps> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2, padding: 1, borderTop: '1px solid', borderColor: 'grey.300' }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
        Sources: {sources.map((source, index) => (
          <React.Fragment key={index}>
            {index > 0 && ', '}
            <strong>{source}</strong>
          </React.Fragment>
        ))}
      </Typography>
    </Box>
  );
};