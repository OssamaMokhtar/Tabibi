import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import { analyzeSymptoms } from '../services/geminiService';
import { ChatMessage, UrgencyLevel, TriageResponse } from '../types';

export const TriageChat = () => {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const triageResult: TriageResponse = await analyzeSymptoms(
          userMsg.content, 
          language, 
          "Male, 42 years old, History of Hypertension" // Mock user context
      );

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        triageResult: triageResult,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'ar' ? 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.' : 'Sorry, a connection error occurred. Please try again.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (level: UrgencyLevel) => {
    switch (level) {
      case UrgencyLevel.EMERGENCY: return 'bg-red-50 border-red-200 text-red-800';
      case UrgencyLevel.GP_CONSULT: return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case UrgencyLevel.SELF_CARE: return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getUrgencyIcon = (level: UrgencyLevel) => {
    switch (level) {
      case UrgencyLevel.EMERGENCY: return <AlertTriangle className="text-red-600" size={24} />;
      case UrgencyLevel.GP_CONSULT: return <Activity className="text-yellow-600" size={24} />;
      case UrgencyLevel.SELF_CARE: return <CheckCircle className="text-green-600" size={24} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 opacity-60">
             <div className="bg-primary-100 p-4 rounded-full mb-4">
                <StethoscopeIcon size={48} className="text-primary-600" />
             </div>
             <p className="text-lg font-medium">{t('start_triage')}</p>
             <p className="text-sm max-w-xs">{t('triage_input_placeholder')}</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'user' ? (
              <div className="bg-primary-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm">
                {msg.content}
              </div>
            ) : (
              <div className="w-full max-w-lg">
                {msg.triageResult ? (
                  <div className={`border rounded-2xl p-5 shadow-sm space-y-4 ${getUrgencyColor(msg.triageResult.urgency)}`}>
                    {/* Header */}
                    <div className="flex items-start gap-3 border-b border-black/5 pb-3">
                      <div className="shrink-0 mt-1">
                        {getUrgencyIcon(msg.triageResult.urgency)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{msg.triageResult.title}</h3>
                        <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                          {msg.triageResult.urgency === UrgencyLevel.EMERGENCY && t('urgency_emergency')}
                          {msg.triageResult.urgency === UrgencyLevel.GP_CONSULT && t('urgency_gp')}
                          {msg.triageResult.urgency === UrgencyLevel.SELF_CARE && t('urgency_self')}
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm leading-relaxed opacity-90">
                      {msg.triageResult.summary}
                    </p>

                    {/* Red Flags */}
                    {msg.triageResult.redFlags.length > 0 && (
                      <div className="bg-white/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2 text-red-700 font-bold text-sm">
                          <AlertCircle size={16} />
                          {t('red_flags')}
                        </div>
                        <ul className="list-disc ltr:pl-5 rtl:pr-5 text-sm space-y-1 opacity-90">
                          {msg.triageResult.redFlags.map((flag, idx) => (
                            <li key={idx}>{flag}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Steps */}
                    <div className="space-y-2">
                        <h4 className="font-bold text-sm">{t('care_steps')}</h4>
                        <ul className="space-y-2">
                            {msg.triageResult.careSteps.map((step, idx) => (
                                <li key={idx} className="flex gap-2 text-sm">
                                    <span className="shrink-0 bg-white/60 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="text-[10px] opacity-70 border-t border-black/5 pt-2 text-center">
                        {msg.triageResult.disclaimer}
                    </div>
                  </div>
                ) : (
                   <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-gray-800">
                      {msg.content}
                   </div>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('triage_input_placeholder')}
            className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm md:text-base outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl w-12 flex items-center justify-center transition-colors"
          >
            <Send size={20} className={language === 'ar' ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

const StethoscopeIcon = ({ size, className }: {size: number, className: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 0 0 5 2h3a.3.3 0 0 0 .2.3v0a.3.3 0 0 0-.2.3H5a.3.3 0 0 0-.2-.3v0zm0 0v1.4a6.6 6.6 0 0 0 4.3 6.3V14a4 4 0 0 1-4 4H3a2 2 0 0 0-2 2v2"/><path d="M19.2 2.3A.3.3 0 0 1 19 2h-3a.3.3 0 0 1-.2.3v0a.3.3 0 0 1 .2.3h3a.3.3 0 0 1 .2-.3v0z"/><path d="M19.2 2.3v1.4a6.6 6.6 0 0 1-4.3 6.3V14a4 4 0 0 0 4 4h2.1a2 2 0 0 1 2 2v2"/><path d="M12 14v6"/><circle cx="12" cy="21" r="1"/></svg>
);
