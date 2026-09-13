import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';

import { ChatBotService } from '../chatbotService';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import { SourceCitation } from './SourceCitation';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): number;
}

// Types
interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: string[]; // Only for bot messages
}

export const ChatBot: FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatBotService, setChatBotService] = useState<ChatBotService | null>(null);
  const [isInitializingService, setIsInitializingService] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with welcome message
  React.useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: `${Date.now()}-welcome`,
        text: "Hello! I am Jimmy Wen's AI assistant. I can answer questions about his professional experience, technical skills, projects, and education. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get response from the chatbot service
      const response = await chatBotService?.generateResponse(inputValue);

      if (response) {
        const botMessage: ChatMessage = {
          id: `${Date.now()}-bot`,
          text: response.response,
          isUser: false,
          timestamp: new Date(),
          sources: response.sources
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      const errorMessageChat: ChatMessage = {
        id: `${Date.now()}-error`,
        text: `Sorry, I encountered an error: ${errorMessage}. Please try again later.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessageChat]);
    } finally {
      setIsLoading(false);
    }

    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const initializeChatBotService = async () => {
    try {
      // Initialize the chatbot service if not already initialized
      if (!chatBotService && !isInitializingService) {
        setIsInitializingService(true);
        try {
          const newService = new ChatBotService();
          await newService.initialize();
          setChatBotService(newService);
        } finally {
          setIsInitializingService(false);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      const errorMessageChat: ChatMessage = {
        id: `${Date.now()}-error`,
        text: `Sorry, I encountered an error: ${errorMessage}. Please try again later.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessageChat]);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleChat = async () => {
    await initializeChatBotService();
    setIsChatOpen(!isChatOpen)
  };

  return (
    <Box position="fixed" bottom={2} left={2} sx={{ zIndex: 1500 }}>
      <Button 
        variant="contained" 
        size="small" 
        color="primary" 
        onClick={toggleChat}
        sx={{ 
          height: 48, 
          width: 48, 
          padding: 0,
          '&:hover': { backgroundColor: 'primary.dark' }
        }}
        title="Chat with Jimmy's AI Assistant"
        aria-label="Open chatbot"
      >
        <ChatBubbleOutlineIcon fontSize="small" />
      </Button>
      
      {isChatOpen && (
        <Box 
          position="fixed"
          bottom={2}  // 48px button height
          left={72}
          sx={{
            width: 350,
            height: 500,
            backgroundColor: 'background.paper',
            border: '1px solid white',
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 1500,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <ChatBubbleOutlineIcon fontSize="medium" color="primary" />
              <Typography variant="h6">AI Assistant</Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1, overflow: 'auto', py: 2 }}>
            {messages.map((msg, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  marginBottom: 2, 
                  justifyContent: msg.isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <Box 
                  sx={{ 
                    maxWidth: '80%', 
                    p: 2, 
                    borderRadius: 2, 
                    bgColor: msg.isUser ? 'primary.main' : 'grey.200',
                    color: msg.isUser ? 'white' : 'text.primary',
                    '&:first-letter': { textTransform: 'capitalize' },
                    textAlign: 'left'
                  }}
                >
                  {msg.text}
                  {!msg.isUser && msg.sources && msg.sources.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <SourceCitation sources={msg.sources} />
                    </Box>
                  )}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      textAlign: msg.isUser ? 'right' : 'left', 
                      mt: 1, 
                      opacity: 0.7,
                      fontSize: '0.75rem'
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </Typography>
                </Box>
              </Box>
            ))}
            
            {isLoading && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 2 
              }}>
                <CircularProgress size={24} thickness={3} />
              </Box>
            )}
            
            {error && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 2,
                color: 'error.main'
              }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  {error}
                </Typography>
              </Box>
            )}
          </Box>
          
          <div style={{ 
            display: 'flex', 
            paddingInline: 2, 
            paddingBottom: 2, 
            gap: 1, 
            borderTop: '1px solid', 
            borderColor: 'grey.300'
          }}>
            <TextField
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ flexGrow: 1 }}
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
            />
            <Button 
              variant="contained" 
              size="small" 
              color="primary" 
              disabled={isLoading || !inputValue.trim()}
              onClick={handleSendMessage}
              sx={{ px: 2 }}
              startIcon={<SendIcon fontSize="small" />}
            >
              Send
            </Button>
            {!isLoading && (
              <Button 
                variant="text" 
                size="small" 
                color="primary" 
                onClick={() => {
                  setInputValue('What technologies does Jimmy use?');
                  handleSendMessage();
                }}
                sx={{ px: 1 }}
              >
                Example
              </Button>
            )}
          </div>
        </Box>
      )}
    </Box>
  );
};