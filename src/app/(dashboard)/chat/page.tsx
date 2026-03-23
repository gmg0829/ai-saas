import { ChatInterface } from "@/components/ChatInterface";

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Chat</h1>
      <ChatInterface />
    </div>
  );
}
