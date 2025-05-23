
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Send, 
  User,
  Clock,
  CheckCheck
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
  isCustomer: boolean;
}

interface Conversation {
  id: string;
  customer: string;
  customerAddress: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

const MerchantInbox: React.FC = () => {
  // Mock conversations for demonstration
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      customer: 'Customer 1',
      customerAddress: '0x1234...5678',
      lastMessage: 'Is this product still available?',
      lastMessageTime: new Date(2023, 10, 20, 14, 35),
      unreadCount: 2,
      messages: [
        {
          id: 'msg-1',
          sender: '0x1234...5678',
          content: 'Hello, I\'m interested in your Crypto Hardware Wallet.',
          timestamp: new Date(2023, 10, 20, 14, 30),
          read: true,
          isCustomer: true
        },
        {
          id: 'msg-2',
          sender: '0x1234...5678',
          content: 'Is this product still available?',
          timestamp: new Date(2023, 10, 20, 14, 35),
          read: false,
          isCustomer: true
        }
      ]
    },
    {
      id: 'conv-2',
      customer: 'Customer 2',
      customerAddress: '0x5678...9abc',
      lastMessage: 'Thank you for your help!',
      lastMessageTime: new Date(2023, 10, 19, 10, 15),
      unreadCount: 0,
      messages: [
        {
          id: 'msg-3',
          sender: '0x5678...9abc',
          content: 'Hi, I have a question about the Bitcoin T-Shirt sizing.',
          timestamp: new Date(2023, 10, 19, 10, 10),
          read: true,
          isCustomer: true
        },
        {
          id: 'msg-4',
          sender: 'merchant',
          content: 'Hello! The T-shirts run true to size. Let me know if you need specific measurements.',
          timestamp: new Date(2023, 10, 19, 10, 12),
          read: true,
          isCustomer: false
        },
        {
          id: 'msg-5',
          sender: '0x5678...9abc',
          content: 'Thank you for your help!',
          timestamp: new Date(2023, 10, 19, 10, 15),
          read: true,
          isCustomer: true
        }
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleSelectConversation = (conversation: Conversation) => {
    // Mark all messages as read
    const updatedConversation = {
      ...conversation,
      unreadCount: 0,
      messages: conversation.messages.map(message => ({ ...message, read: true }))
    };
    
    setSelectedConversation(updatedConversation);
    
    // Update the conversations list
    setConversations(conversations.map(conv => 
      conv.id === conversation.id ? updatedConversation : conv
    ));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'merchant',
      content: messageInput,
      timestamp: new Date(),
      read: true,
      isCustomer: false
    };
    
    // Update the selected conversation
    const updatedConversation = {
      ...selectedConversation,
      lastMessage: messageInput,
      lastMessageTime: new Date(),
      messages: [...selectedConversation.messages, newMessage]
    };
    
    setSelectedConversation(updatedConversation);
    
    // Update the conversations list
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation.id ? updatedConversation : conv
    ));
    
    // Clear the input field
    setMessageInput('');
  };

  // Filter conversations based on search input
  const filteredConversations = conversations.filter(conv => 
    conv.customer.toLowerCase().includes(searchInput.toLowerCase()) || 
    conv.customerAddress.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (conversations.length === 0) {
    return (
      <Card className="bg-bitaccess-black-light">
        <CardContent className="py-12 flex flex-col items-center">
          <MessageSquare className="h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
          <p className="text-gray-400 text-center">
            When customers have questions, they'll appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
      {/* Conversations List */}
      <Card className="md:col-span-1 flex flex-col">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="mb-4">
            <Input 
              placeholder="Search conversations..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-bitaccess-black border-bitaccess-gold/30"
            />
          </div>
          <ScrollArea className="flex-grow">
            <div className="space-y-2">
              {filteredConversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`
                    p-3 rounded-lg cursor-pointer
                    ${selectedConversation?.id === conversation.id 
                      ? 'bg-bitaccess-gold/20 border-bitaccess-gold/30' 
                      : 'hover:bg-bitaccess-black-light'}
                    ${conversation.unreadCount > 0 ? 'border-l-2 border-bitaccess-gold' : ''}
                  `}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-bitaccess-gold/20 text-bitaccess-gold">
                          {conversation.customer[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{conversation.customer}</h3>
                          {conversation.unreadCount > 0 && (
                            <span className="ml-2 bg-bitaccess-gold text-black text-xs px-1.5 py-0.5 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{conversation.customerAddress}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {conversation.lastMessageTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                    {conversation.lastMessage}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {/* Message Content */}
      <Card className="md:col-span-2 flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-bitaccess-gold/20 text-bitaccess-gold">
                      {selectedConversation.customer[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation.customer}</h3>
                    <p className="text-xs text-gray-400">{selectedConversation.customerAddress}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.isCustomer ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`
                          max-w-[80%] rounded-lg p-3
                          ${message.isCustomer 
                            ? 'bg-bitaccess-black-light text-white' 
                            : 'bg-bitaccess-gold/20 text-bitaccess-gold'}
                        `}
                      >
                        <p>{message.content}</p>
                        <div className="flex items-center justify-end mt-1 text-xs text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          {!message.isCustomer && (
                            <CheckCheck className={`h-3 w-3 ml-1 ${message.read ? 'text-green-500' : 'text-gray-500'}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-4 border-t border-gray-700 flex">
                <Textarea 
                  placeholder="Type your message..." 
                  className="flex-grow bg-bitaccess-black border-bitaccess-gold/20 mr-2"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90 self-end"
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <MessageSquare className="h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No conversation selected</h3>
              <p className="text-gray-400">
                Select a conversation from the list to start messaging.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantInbox;
