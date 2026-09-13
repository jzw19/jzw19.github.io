import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
// src/chatbot/components/ChatBot.tsx
import React, { FC, useState } from 'react';

import { ChatBotService } from '../chatbotService';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import { KnowledgeDocument } from '../knowledge/knowledgeBase';
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

// Mock responses for testing UI
const mockResponses: Record<string, string> = {
  'hello': 'Hello! I am Jimmy Wen\'s AI assistant. I can answer questions about his professional experience, technical skills, projects, and education. How can I help you today?',
  'what technologies does jimmy use': 'Jimmy has significant experience with JavaScript, TypeScript, React, and Go as his primary expertise. He also has experience with HTML, CSS, Redux, PostgreSQL, REST APIs, gRPC, Google Cloud Platform, AWS, Docker, CI/CD, Terraform, Playwright for testing, and various analytics tools like Looker and LookML.',
  'what did jimmy build at madhive': 'At Madhive, Jimmy led the design and development of an internal experiment management platform used by approximately 300 internal users with 20-30 active stakeholders. The platform allows users to configure and run A/B tests on advertising campaign line items.',
  'how much did he improve export latency': 'Jimmy reduced data export latency by approximately 90%, from more than 10 seconds to approximately 1 second. This optimization involved processing approximately 270K rows and eliminating redundant object initialization.',
  'what experience does he have with testing': 'Jimmy has extensive testing experience. At Madhive, he implemented a Playwright-based end-to-end testing framework that reduced manual QA effort by approximately 83% and improved release confidence. At iCIMS, he worked on security testing, accessibility testing using tools like Burp Suite, JMeter, and AXE, and debugged end-to-end automated tests.',
  'has he worked with go': 'Yes, Go is one of Jimmy\'s primary areas of expertise. He has significant experience with Go from his work at Madhive where he partnered with backend engineers to evolve data models and API behavior.',
  'default': 'I\'m currently in demo mode with mocked responses. In the full implementation, I would use the knowledge base and retrieval system to provide accurate, grounded answers based on Jimmy\'s resume. For now, I can respond to a few common questions about his experience with technologies, Madhive projects, performance improvements, testing experience, and Go expertise.'
};

export const ChatBot: FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatBotService, setChatBotService] = useState<ChatBotService | null>(null);
  const [isInitializingService, setIsInitializingService] = useState(false);

  // Initialize with welcome message
  React.useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: `${Date.now()}-welcome`,
        text: 'Hello! I am Jimmy Wen\'s AI assistant. I can answer questions about his professional experience, technical skills, projects, and education. How can I help you today?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

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
      // Initialize the chatbot service if not already initialized
      if (!chatBotService && !isInitializingService) {
        setIsInitializingService(true);
        const newService = new ChatBotService();
        await newService.initialize();
        setChatBotService(newService);
        setIsInitializingService(false);
      }

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
      } else {
        // Fallback to mock response if service is not available
        const lowerInput = inputValue.toLowerCase().trim();
        let responseText = mockResponses['default'];
        
        for (const [key, value] of Object.entries(mockResponses)) {
          if (key !== 'default' && lowerInput.includes(key)) {
            responseText = value;
            break;
          }
        }
        
        const botMessage: ChatMessage = {
          id: `${Date.now()}-bot`,
          text: responseText,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      // Fallback to mock response on error
      const lowerInput = inputValue.toLowerCase().trim();
      let responseText = mockResponses['default'];
      
      for (const [key, value] of Object.entries(mockResponses)) {
        if (key !== 'default' && lowerInput.includes(key)) {
          responseText = value;
          break;
        }
      }
      
      const botMessage: ChatMessage = {
        id: `${Date.now()}-bot`,
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <Box position="fixed" bottom={2} right={2} sx={{ zIndex: 1500 }}>
      <Button 
        variant="contained" 
        size="small" 
        color="primary" 
        startIcon={<ChatBubbleOutlineIcon fontSize="small" />} 
        onClick={toggleChat}
        sx={{ 
          height: 48, 
          width: 48, 
          padding: 0,
          '&:hover': { backgroundColor: 'primary.dark' }
        }}
        title="Chat with Jimmy's AI Assistant"
        aria-label="Open chatbot"
      />
      
      <Dialog 
        open={isChatOpen} 
        onClose={toggleChat}
        maxWidth="sm"
        fullWidth
        PaperProps={{ 
          sx: { 
            height: 500, 
            width: 350, 
            marginTop: 4, 
            marginRight: 2 
          } 
        }}
      >
        <DialogTitle sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ChatBubbleOutlineIcon fontSize="medium" color="primary" />
            <Typography variant="h6">Jimmy's AI Assistant</Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ py: 2, overflow: 'auto', height: 'calc(100% - 64px)' }}>
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
                  '&:first-letter': { textTransform: 'capitalize' }
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
        </DialogContent>
        
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
      </Dialog>
    </Box>
  );
};