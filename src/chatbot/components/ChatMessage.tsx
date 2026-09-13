import React from 'react';
import { Box, Typography } from '@mui/material';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        marginBottom: 2, 
        justifyContent: message.isUser ? 'flex-end' : 'flex-start' 
      }}
    >
      <Box 
        sx={{ 
          maxWidth: '80%', 
          p: 2, 
          borderRadius: 2, 
          bgColor: message.isUser ? 'primary.main' : 'grey.200',
          color: message.isUser ? 'white' : 'text.primary',
          wordBreak: 'break-word'
        }}
      >
        {message.text}
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            textAlign: message.isUser ? 'right' : 'left', 
            mt: 1, 
            opacity: 0.7,
            fontSize: '0.75rem'
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Typography>
      </Box>
    </Box>
  );
};