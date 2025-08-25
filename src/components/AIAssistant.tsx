import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Send, 
  Lightbulb, 
  MessageSquare, 
  Zap,
  Brain,
  Sparkles,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy
} from "lucide-react";
import { toast } from "sonner";

interface Suggestion {
  id: string;
  type: 'response' | 'category' | 'priority' | 'escalation';
  title: string;
  content: string;
  confidence: number;
  reasoning: string;
}

interface TicketAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  language: string;
  keyTopics: string[];
  suggestedActions: string[];
}

interface AIAssistantProps {
  ticketId?: string;
  ticketContent?: string;
  onSuggestionApply?: (suggestion: Suggestion) => void;
}

const AIAssistant = ({ ticketId, ticketContent, onSuggestionApply }: AIAssistantProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [analysis, setAnalysis] = useState<TicketAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Симуляция AI анализа тикета
  const analyzeTicket = async (content: string) => {
    setIsAnalyzing(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis: TicketAnalysis = {
      sentiment: content.includes('проблема') || content.includes('не работает') ? 'negative' : 'neutral',
      urgency: content.includes('срочно') || content.includes('критично') ? 'critical' : 'medium',
      category: content.includes('интеграция') ? 'Техническая поддержка' : 'Общие вопросы',
      language: 'ru',
      keyTopics: ['интеграция', 'настройка', 'ошибка'],
      suggestedActions: ['Проверить настройки', 'Проверить логи', 'Обратиться к документации']
    };

    const mockSuggestions: Suggestion[] = [
      {
        id: '1',
        type: 'response',
        title: 'Рекомендованный ответ',
        content: 'Здравствуйте! Я понимаю вашу проблему с интеграцией. Давайте разберем это пошагово:\n\n1. Проверьте правильность API ключей\n2. Убедитесь что webhook URL корректен\n3. Проверьте логи на предмет ошибок\n\nЕсли проблема сохраняется, пришлите скриншот настроек.',
        confidence: 85,
        reasoning: 'На основе анализа содержания тикета и похожих случаев'
      },
      {
        id: '2',
        type: 'category',
        title: 'Предлагаемая категория',
        content: 'Техническая поддержка → Интеграции',
        confidence: 92,
        reasoning: 'Содержание указывает на техническую проблему с интеграцией'
      },
      {
        id: '3',
        type: 'priority',
        title: 'Рекомендованный приоритет',
        content: 'Высокий',
        confidence: 78,
        reasoning: 'Клиент упоминает влияние на бизнес-процессы'
      }
    ];

    setAnalysis(mockAnalysis);
    setSuggestions(mockSuggestions);
    setIsAnalyzing(false);
  };

  // Обработка сообщения пользователя
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const userMsg = { role: 'user' as const, content: userMessage, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMsg]);
    setUserMessage("");
    setIsProcessing(true);

    // Имитация ответа AI
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = { 
      role: 'assistant' as const, 
      content: `Я понимаю ваш вопрос: "${userMessage}". Основываясь на контексте тикета, рекомендую:\n\n• Проверить настройки интеграции\n• Проверить права доступа\n• Просмотреть логи ошибок\n\nХотите, чтобы я создал подробный ответ для клиента?`,
      timestamp: new Date() 
    };
    
    setChatHistory(prev => [...prev, aiResponse]);
    setIsProcessing(false);
  };

  // Применение предложения
  const applySuggestion = (suggestion: Suggestion) => {
    if (onSuggestionApply) {
      onSuggestionApply(suggestion);
    }
    toast.success("Предложение применено");
  };

  // Копирование в буфер обмена
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Скопировано в буфер обмена");
  };

  // Автоматический анализ при изменении контента
  useEffect(() => {
    if (ticketContent) {
      analyzeTicket(ticketContent);
    }
  }, [ticketContent]);

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-success/20 text-success">😊 Позитивный</Badge>;
      case 'negative':
        return <Badge className="bg-destructive/20 text-destructive">😟 Негативный</Badge>;
      default:
        return <Badge variant="outline">😐 Нейтральный</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return <Badge className="bg-destructive text-destructive-foreground">🚨 Критично</Badge>;
      case 'high':
        return <Badge className="bg-warning text-warning-foreground">⚡ Высокая</Badge>;
      case 'medium':
        return <Badge variant="secondary">⏰ Средняя</Badge>;
      default:
        return <Badge variant="outline">📋 Низкая</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold">AI Суфлёр</div>
              <div className="text-sm text-muted-foreground font-normal">
                Умный помощник для обработки тикетов
              </div>
            </div>
            <div className="ml-auto">
              <Badge className="bg-primary/20 text-primary border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Активен
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Анализ тикета */}
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Анализ тикета
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Тональность</div>
                {getSentimentBadge(analysis.sentiment)}
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Срочность</div>
                {getUrgencyBadge(analysis.urgency)}
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Категория</div>
                <Badge variant="outline">{analysis.category}</Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Язык</div>
                <Badge variant="outline">{analysis.language.toUpperCase()}</Badge>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="text-sm text-muted-foreground mb-2">Ключевые темы</div>
              <div className="flex flex-wrap gap-1">
                {analysis.keyTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-2">Рекомендуемые действия</div>
              <ul className="text-sm space-y-1">
                {analysis.suggestedActions.map((action, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Zap className="h-3 w-3 text-primary" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Предложения AI */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              Предложения ИИ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{suggestion.title}</div>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.confidence}% уверенность
                  </Badge>
                </div>
                
                <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                  {suggestion.reasoning}
                </div>
                
                <div className="bg-background border rounded p-3">
                  <div className="whitespace-pre-wrap text-sm">{suggestion.content}</div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => applySuggestion(suggestion)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Применить
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(suggestion.content)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Копировать
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Чат с AI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Диалог с AI помощником
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-64 w-full border rounded p-3">
            <div className="space-y-3">
              {chatHistory.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                  Задайте вопрос AI помощнику о тикете
                </div>
              )}
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span className="text-sm">AI думает...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2">
            <Textarea
              placeholder="Спросите что-то о тикете..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="min-h-[40px] max-h-[120px]"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!userMessage.trim() || isProcessing}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Статистика работы AI */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-xs text-muted-foreground">Предложений сегодня</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">18</div>
              <div className="text-xs text-muted-foreground">Принято</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">92%</div>
              <div className="text-xs text-muted-foreground">Точность</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;