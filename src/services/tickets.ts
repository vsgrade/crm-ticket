// Сервис для работы с тикетами
// MOCK: Использует моковые данные, готов к замене на реальные API вызовы

import { apiService } from './api';
import { storageService } from './storage';
import { 
  ApiResponse, 
  PaginatedResponse, 
  TicketFilters,
  CreateTicketRequest,
  UpdateTicketRequest,
  CreateMessageRequest
} from '@/types/api.types';
import { Ticket } from '@/data/mockData';
import { mockTickets, mockClients, mockEmployees } from '@/data/mockData';

const IS_PROD = (typeof window !== 'undefined') && !/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);

class TicketsService {
  private cacheDuration = 2; // минуты

  // MOCK: Эмуляция получения списка тикетов
  // TODO: Заменить на реальный API вызов: GET /api/tickets
  async getTickets(
    filters?: TicketFilters,
    page: number = 1,
    limit: number = 50
  ): Promise<ApiResponse<PaginatedResponse<Ticket>>> {
    try {
      // В продакшене это будет реальный API вызов
      if (IS_PROD) {
        const params = {
          page,
          limit,
          ...filters,
          // Преобразуем даты в ISO строки для API
          dateFrom: filters?.dateRange?.from?.toISOString(),
          dateTo: filters?.dateRange?.to?.toISOString(),
        };
        
        return await apiService.getCached(`/tickets`, params, this.cacheDuration);
      }

      // MOCK: Эмуляция задержки сети
      await new Promise(resolve => setTimeout(resolve, 200));

      let filteredTickets = [...mockTickets];

      // Применяем фильтры
      if (filters) {
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredTickets = filteredTickets.filter(ticket =>
            ticket.id.toLowerCase().includes(searchLower) ||
            ticket.subject.toLowerCase().includes(searchLower) ||
            ticket.content.toLowerCase().includes(searchLower)
          );
        }

        if (filters.status?.length) {
          filteredTickets = filteredTickets.filter(ticket =>
            filters.status!.includes(ticket.status)
          );
        }

        if (filters.priority?.length) {
          filteredTickets = filteredTickets.filter(ticket =>
            filters.priority!.includes(ticket.priority)
          );
        }

        if (filters.assignedTo?.length) {
          filteredTickets = filteredTickets.filter(ticket => {
            // Специальная обработка для "current_user"
            if (filters.assignedTo!.includes('current_user')) {
              // TODO: Заменить на реальный ID текущего пользователя
              const currentUserId = storageService.getCurrentUser()?.id || '1';
              return ticket.assignedTo.includes(currentUserId);
            }
            return ticket.assignedTo.some(id => filters.assignedTo!.includes(id));
          });
        }

        if (filters.departments?.length) {
          filteredTickets = filteredTickets.filter(ticket =>
            ticket.departments.some(dept => filters.departments!.includes(dept))
          );
        }

        if (filters.source?.length) {
          filteredTickets = filteredTickets.filter(ticket =>
            filters.source!.includes(ticket.source)
          );
        }

        if (filters.slaStatus?.length) {
          filteredTickets = filteredTickets.filter(ticket =>
            filters.slaStatus!.includes(ticket.slaStatus)
          );
        }

        if (filters.dateRange?.from) {
          filteredTickets = filteredTickets.filter(ticket =>
            new Date(ticket.createdAt) >= filters.dateRange!.from!
          );
        }

        if (filters.dateRange?.to) {
          filteredTickets = filteredTickets.filter(ticket =>
            new Date(ticket.createdAt) <= filters.dateRange!.to!
          );
        }
      }

      // Пагинация
      const total = filteredTickets.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const paginatedTickets = filteredTickets.slice(startIndex, startIndex + limit);

      console.log(`📋 MOCK: Loaded ${paginatedTickets.length} tickets (page ${page})`);

      return {
        success: true,
        data: {
          items: paginatedTickets,
          pagination: {
            page,
            limit,
            total,
            totalPages
          }
        }
      };
    } catch (error) {
      console.error('❌ Error loading tickets:', error);
      return {
        success: false,
        error: {
          code: 'TICKETS_LOAD_ERROR',
          message: 'Failed to load tickets'
        }
      };
    }
  }

  // MOCK: Получение конкретного тикета
  // TODO: Заменить на реальный API вызов: GET /api/tickets/{id}
  async getTicket(id: string): Promise<ApiResponse<Ticket>> {
    try {
       if (IS_PROD) {
        return await apiService.getCached(`/tickets/${id}`, undefined, this.cacheDuration);
      }

      // MOCK: Эмуляция задержки сети
      await new Promise(resolve => setTimeout(resolve, 150));

      const ticket = mockTickets.find(t => t.id === id);
      
      if (!ticket) {
        return {
          success: false,
          error: {
            code: 'TICKET_NOT_FOUND',
            message: `Ticket with ID ${id} not found`
          }
        };
      }

      console.log(`🎫 MOCK: Loaded ticket ${id}`);

      return {
        success: true,
        data: ticket
      };
    } catch (error) {
      console.error('❌ Error loading ticket:', error);
      return {
        success: false,
        error: {
          code: 'TICKET_LOAD_ERROR',
          message: 'Failed to load ticket'
        }
      };
    }
  }

  // MOCK: Создание нового тикета
  // TODO: Заменить на реальный API вызов: POST /api/tickets
  async createTicket(ticketData: CreateTicketRequest): Promise<ApiResponse<Ticket>> {
    try {
       if (IS_PROD) {
        return await apiService.post('/tickets', ticketData);
      }

      // MOCK: Эмуляция создания тикета
      await new Promise(resolve => setTimeout(resolve, 300));

      const newId = `TIC-2024-${String(mockTickets.length + 1).padStart(3, '0')}`;
      const now = new Date();

      const newTicket: Ticket = {
        id: newId,
        subject: ticketData.subject,
        content: ticketData.content,
        status: 'new',
        priority: ticketData.priority,
        source: ticketData.source,
        clientId: ticketData.clientId,
        assignedTo: ticketData.assignedTo || [],
        departments: ticketData.departments || [],
        createdAt: now,
        updatedAt: now,
        lastReply: now,
        lastReplyBy: 'client',
        slaStatus: 'good',
        slaDeadline: new Date(now.getTime() + 4 * 60 * 60 * 1000), // +4 часа
        tags: ticketData.tags || [],
        hasAttachments: false,
        internalNotes: [],
        messages: [
          {
            id: '1',
            content: ticketData.content,
            author: 'client',
            timestamp: now,
            type: 'text'
          }
        ]
      };

      // MOCK: Сохраняем в localStorage для эмуляции
      const savedTickets = storageService.get('mock_tickets', mockTickets);
      savedTickets.push(newTicket);
      storageService.set('mock_tickets', savedTickets);

      console.log(`✅ MOCK: Created ticket ${newId}`);

      return {
        success: true,
        data: newTicket
      };
    } catch (error) {
      console.error('❌ Error creating ticket:', error);
      return {
        success: false,
        error: {
          code: 'TICKET_CREATE_ERROR',
          message: 'Failed to create ticket'
        }
      };
    }
  }

  // MOCK: Обновление тикета
  // TODO: Заменить на реальный API вызов: PUT /api/tickets/{id}
  async updateTicket(id: string, updates: UpdateTicketRequest): Promise<ApiResponse<Ticket>> {
    try {
       if (IS_PROD) {
        return await apiService.put(`/tickets/${id}`, updates);
      }

      // MOCK: Эмуляция обновления
      await new Promise(resolve => setTimeout(resolve, 200));

      const savedTickets = storageService.get('mock_tickets', mockTickets);
      const ticketIndex = savedTickets.findIndex(t => t.id === id);

      if (ticketIndex === -1) {
        return {
          success: false,
          error: {
            code: 'TICKET_NOT_FOUND',
            message: `Ticket with ID ${id} not found`
          }
        };
      }

      const updatedTicket = {
        ...savedTickets[ticketIndex],
        ...updates,
        updatedAt: new Date()
      };

      savedTickets[ticketIndex] = updatedTicket;
      storageService.set('mock_tickets', savedTickets);

      console.log(`✅ MOCK: Updated ticket ${id}`);

      return {
        success: true,
        data: updatedTicket
      };
    } catch (error) {
      console.error('❌ Error updating ticket:', error);
      return {
        success: false,
        error: {
          code: 'TICKET_UPDATE_ERROR',
          message: 'Failed to update ticket'
        }
      };
    }
  }

  // MOCK: Удаление тикета
  // TODO: Заменить на реальный API вызов: DELETE /api/tickets/{id}
  async deleteTicket(id: string): Promise<ApiResponse<void>> {
    try {
       if (IS_PROD) {
        return await apiService.delete(`/tickets/${id}`);
      }

      // MOCK: Эмуляция удаления
      await new Promise(resolve => setTimeout(resolve, 200));

      const savedTickets = storageService.get('mock_tickets', mockTickets);
      const filteredTickets = savedTickets.filter(t => t.id !== id);
      
      if (filteredTickets.length === savedTickets.length) {
        return {
          success: false,
          error: {
            code: 'TICKET_NOT_FOUND',
            message: `Ticket with ID ${id} not found`
          }
        };
      }

      storageService.set('mock_tickets', filteredTickets);

      console.log(`🗑️ MOCK: Deleted ticket ${id}`);

      return {
        success: true
      };
    } catch (error) {
      console.error('❌ Error deleting ticket:', error);
      return {
        success: false,
        error: {
          code: 'TICKET_DELETE_ERROR',
          message: 'Failed to delete ticket'
        }
      };
    }
  }

  // MOCK: Добавление сообщения в тикет
  // TODO: Заменить на реальный API вызов: POST /api/tickets/{id}/messages
  async addMessage(ticketId: string, messageData: CreateMessageRequest): Promise<ApiResponse<any>> {
    try {
       if (IS_PROD) {
        return await apiService.post(`/tickets/${ticketId}/messages`, messageData);
      }

      // MOCK: Эмуляция добавления сообщения
      await new Promise(resolve => setTimeout(resolve, 200));

      const savedTickets = storageService.get('mock_tickets', mockTickets);
      const ticket = savedTickets.find(t => t.id === ticketId);

      if (!ticket) {
        return {
          success: false,
          error: {
            code: 'TICKET_NOT_FOUND',
            message: `Ticket with ID ${ticketId} not found`
          }
        };
      }

      const currentUser = storageService.getCurrentUser();
      const newMessage = {
        id: String(Date.now()),
        content: messageData.content,
        author: messageData.isInternal ? 'agent' : 'client',
        authorName: currentUser?.name || 'Система',
        timestamp: new Date(),
        type: messageData.type,
        attachments: messageData.attachments || []
      };

      ticket.messages.push(newMessage);
      ticket.lastReply = new Date();
      ticket.lastReplyBy = messageData.isInternal ? 'agent' : 'client';
      ticket.lastReplyByName = currentUser?.name;
      ticket.updatedAt = new Date();

      storageService.set('mock_tickets', savedTickets);

      console.log(`💬 MOCK: Added message to ticket ${ticketId}`);

      return {
        success: true,
        data: newMessage
      };
    } catch (error) {
      console.error('❌ Error adding message:', error);
      return {
        success: false,
        error: {
          code: 'MESSAGE_ADD_ERROR',
          message: 'Failed to add message'
        }
      };
    }
  }

  // MOCK: Назначение тикета
  // TODO: Заменить на реальный API вызов: POST /api/tickets/{id}/assign
  async assignTicket(
    ticketId: string, 
    assignedTo: string[], 
    departments: string[]
  ): Promise<ApiResponse<Ticket>> {
    return this.updateTicket(ticketId, { assignedTo, departments });
  }

  // MOCK: Получение статистики тикетов
  // TODO: Заменить на реальный API вызов: GET /api/tickets/stats
  async getTicketStats(period?: string, departments?: string[]): Promise<ApiResponse<any>> {
    try {
      if (IS_PROD) {
        return await apiService.getCached('/tickets/stats', { period, departments }, 5);
      }

      // MOCK: Эмуляция статистики
      await new Promise(resolve => setTimeout(resolve, 100));

      const tickets = storageService.get('mock_tickets', mockTickets);
      
      const stats = {
        totalTickets: tickets.length,
        newTickets: tickets.filter(t => t.status === 'new').length,
        inProgressTickets: tickets.filter(t => t.status === 'in-progress').length,
        resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
        closedTickets: tickets.filter(t => t.status === 'closed').length,
        avgResponseTime: 23, // минуты
        slaCompliance: 94.2,
        ticketsByStatus: {
          new: tickets.filter(t => t.status === 'new').length,
          'in-progress': tickets.filter(t => t.status === 'in-progress').length,
          resolved: tickets.filter(t => t.status === 'resolved').length,
          closed: tickets.filter(t => t.status === 'closed').length,
        },
        ticketsByPriority: {
          low: tickets.filter(t => t.priority === 'low').length,
          medium: tickets.filter(t => t.priority === 'medium').length,
          high: tickets.filter(t => t.priority === 'high').length,
          critical: tickets.filter(t => t.priority === 'critical').length,
        }
      };

      console.log(`📊 MOCK: Generated ticket stats`);

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('❌ Error loading ticket stats:', error);
      return {
        success: false,
        error: {
          code: 'STATS_LOAD_ERROR',
          message: 'Failed to load statistics'
        }
      };
    }
  }

  // Вспомогательные методы для работы с фильтрами
  saveUserFilters(userId: string, filters: TicketFilters): void {
    storageService.saveUserFilters(userId, filters);
  }

  getUserFilters(userId: string): TicketFilters {
    return storageService.getUserFilters(userId);
  }

  // Очистка кэша тикетов
  clearCache(): void {
    apiService.clearCache();
  }
}

// Создаем единственный экземпляр сервиса
export const ticketsService = new TicketsService();

export default ticketsService;