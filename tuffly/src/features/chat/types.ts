export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  text?: string;
  imageUrl?: string;
  timestamp: number;
  seen: boolean;
}

export interface ChatThread {
  id: string;
  users: string[];
  lastMessage?: string;
  updatedAt: number;
}
