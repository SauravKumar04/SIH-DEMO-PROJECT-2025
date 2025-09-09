import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChatBubbleLeftRightIcon, 
  PaperAirplaneIcon, 
  SparklesIcon,
  HeartIcon,
  UserIcon,
  ComputerDesktopIcon
} from "@heroicons/react/24/outline";

export default function AIHealthAssistant() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI Health Assistant. I can help you with health questions, symptom analysis, wellness tips, and more. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "patient") {
      navigate("/");
    } else {
      setUser(storedUser);
      // Load chat history
      const chatHistory = JSON.parse(localStorage.getItem(`chat_${storedUser.email}`) || "[]");
      if (chatHistory.length > 0) {
        setMessages([...messages, ...chatHistory]);
      }
    }
  }, [navigate]);

  const quickQuestions = [
    "What are the symptoms of common cold?",
    "How can I improve my sleep quality?",
    "What foods are good for heart health?",
    "How often should I exercise?",
    "What are normal blood pressure ranges?",
    "How can I reduce stress naturally?"
  ];

  const getAIResponse = (userMessage) => {
    // Simple AI response logic - in real app, this would call an AI API
    const responses = {
      "cold": "Common cold symptoms include runny nose, sneezing, cough, sore throat, and mild fever. Rest, hydration, and over-the-counter medications can help manage symptoms.",
      "sleep": "To improve sleep quality: maintain a regular sleep schedule, create a comfortable environment, avoid screens before bed, limit caffeine, and try relaxation techniques.",
      "heart": "Heart-healthy foods include leafy greens, berries, fatty fish, nuts, whole grains, and foods rich in omega-3 fatty acids. Limit processed foods and excessive sodium.",
      "exercise": "Adults should aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities twice a week.",
      "blood pressure": "Normal blood pressure is typically below 120/80 mmHg. High blood pressure is 130/80 mmHg or higher. Regular monitoring and healthy lifestyle are important.",
      "stress": "Natural stress reduction methods include deep breathing, meditation, regular exercise, adequate sleep, healthy diet, and engaging in hobbies you enjoy."
    };

    const message = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    return "Thank you for your question! While I can provide general health information, please remember that I'm an AI assistant and not a replacement for professional medical advice. For specific health concerns, please consult with a healthcare provider.";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Save chat history
      if (user) {
        const chatHistory = [...messages, userMessage, aiResponse].slice(1); // Remove initial message
        localStorage.setItem(`chat_${user.email}`, JSON.stringify(chatHistory));
      }
    }, 1500);
  };

  const sendQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm your AI Health Assistant. I can help you with health questions, symptom analysis, wellness tips, and more. How can I assist you today?",
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    if (user) {
      localStorage.removeItem(`chat_${user.email}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
              AI Health Assistant
            </h1>
            <p className="text-black text-lg font-medium">
              Your 24/7 intelligent health companion
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="text-sm text-black font-medium">AI Online</div>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-xl font-medium transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">{messages.length}</div>
              <div className="text-black font-medium">Messages Today</div>
            </div>
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">24/7</div>
              <div className="text-black font-medium">Availability</div>
            </div>
            <SparklesIcon className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">98%</div>
              <div className="text-black font-medium">Accuracy</div>
            </div>
            <ComputerDesktopIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-black">5K+</div>
              <div className="text-black font-medium">Health Topics</div>
            </div>
            <HeartIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black">AI Health Assistant</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-xs lg:max-w-md ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                    }`}>
                      {message.type === 'user' ? (
                        <UserIcon className="w-5 h-5 text-white" />
                      ) : (
                        <SparklesIcon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-black'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                      <SparklesIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your health question here..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Quick Questions */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">Quick Questions</h3>
            <div className="space-y-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendQuickQuestion(question)}
                  className="w-full p-3 text-left bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all text-black font-medium"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* AI Features */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black mb-4">AI Features</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <SparklesIcon className="w-5 h-5 text-emerald-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Symptom Analysis</h4>
                  <p className="text-sm text-gray-600">Get insights on symptoms and when to see a doctor</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeartIcon className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Health Tips</h4>
                  <p className="text-sm text-gray-600">Personalized wellness recommendations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-black">24/7 Support</h4>
                  <p className="text-sm text-gray-600">Available anytime for health questions</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This AI assistant provides general health information only. Always consult healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
