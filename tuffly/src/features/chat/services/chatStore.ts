import { ChatMessage, ChatThread } from "../types";

const THREADS_KEY = "chat-threads";
const MESSAGES_KEY = "chat-messages";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function listThreads(userId: string): ChatThread[] {
  return read<ChatThread[]>(THREADS_KEY, [])
    .filter((thread) => thread.users.includes(userId))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function listMessages(chatId: string): ChatMessage[] {
  return read<ChatMessage[]>(MESSAGES_KEY, [])
    .filter((message) => message.chatId === chatId)
    .sort((a, b) => a.timestamp - b.timestamp);
}

export function sendMessage(input: {
  chatId: string;
  senderId: string;
  text?: string;
  imageUrl?: string;
}): ChatMessage {
  const nextMessage: ChatMessage = {
    id: Date.now().toString(),
    chatId: input.chatId,
    senderId: input.senderId,
    text: input.text,
    imageUrl: input.imageUrl,
    timestamp: Date.now(),
    seen: false,
  };

  const messages = read<ChatMessage[]>(MESSAGES_KEY, []);
  messages.push(nextMessage);
  write(MESSAGES_KEY, messages);

  const threads = read<ChatThread[]>(THREADS_KEY, []);
  const index = threads.findIndex((thread) => thread.id === input.chatId);
  if (index >= 0) {
    threads[index] = {
      ...threads[index],
      updatedAt: Date.now(),
      lastMessage: input.text || "Image",
    };
  } else {
    threads.push({
      id: input.chatId,
      users: [input.senderId, "seller"],
      updatedAt: Date.now(),
      lastMessage: input.text || "Image",
    });
  }
  write(THREADS_KEY, threads);
  return nextMessage;
}
