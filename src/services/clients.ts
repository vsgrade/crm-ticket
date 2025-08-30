// Сервис для работы с клиентами
// MOCK: Использует моковые данные, готов к замене на реальные API вызовы

import { apiService } from './api';
import { storageService } from './storage';
import { 
  ApiResponse, 
  PaginatedResponse,
  CreateClientRequest,
  UpdateClientRequest,
  QueryParams
} from '@/types/api.types';
import { Client } from '@/data/mockData';
import { mockClients } from '@/data/mockData';

const IS_PROD = (typeof window !== 'undefined') && !/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);

class ClientsService {
  private cacheDuration = 5; // минуты

  // MOCK: Получение списка клиентов
  // TODO: Заменить на реальный API вызов: GET /api/clients
  async getClients(
    params?: QueryParams & {
      search?: string;
      segment?: string;
    }
  ): Promise<ApiResponse<PaginatedResponse<Client>>> {
    try {
      if (IS_PROD) {
        return await apiService.getCached('/clients', params, this.cacheDuration);
      }

      // MOCK: Эмуляция задержки сети
      await new Promise(resolve => setTimeout(resolve, 150));

      let filteredClients = [...mockClients];
      
      // Применяем фильтры
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredClients = filteredClients.filter(client =>
          client.name.toLowerCase().includes(searchLower) ||
          client.email?.toLowerCase().includes(searchLower) ||
          client.phone?.toLowerCase().includes(searchLower) ||
          client.company?.toLowerCase().includes(searchLower)
        );
      }

      if (params?.segment) {
        filteredClients = filteredClients.filter(client =>
          client.customFields?.segment === params.segment
        );
      }

      // Сортировка
      if (params?.sortBy) {
        filteredClients.sort((a, b) => {
          const aValue = a[params.sortBy as keyof Client];
          const bValue = b[params.sortBy as keyof Client];
          
          if (params.sortOrder === 'desc') {
            return bValue > aValue ? 1 : -1;
          }
          return aValue > bValue ? 1 : -1;
        });
      }

      // Пагинация
      const page = params?.page || 1;
      const limit = params?.limit || 50;
      const total = filteredClients.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const paginatedClients = filteredClients.slice(startIndex, startIndex + limit);

      console.log(`👥 MOCK: Loaded ${paginatedClients.length} clients (page ${page})`);

      return {
        success: true,
        data: {
          items: paginatedClients,
          pagination: {
            page,
            limit,
            total,
            totalPages
          }
        }
      };
    } catch (error) {
      console.error('❌ Error loading clients:', error);
      return {
        success: false,
        error: {
          code: 'CLIENTS_LOAD_ERROR',
          message: 'Failed to load clients'
        }
      };
    }
  }

  // MOCK: Получение конкретного клиента
  // TODO: Заменить на реальный API вызов: GET /api/clients/{id}
  async getClient(id: string): Promise<ApiResponse<Client>> {
    try {
      if (IS_PROD) {
        return await apiService.getCached(`/clients/${id}`, undefined, this.cacheDuration);
      }

      // MOCK: Эмуляция задержки сети
      await new Promise(resolve => setTimeout(resolve, 100));

      const savedClients = storageService.get('mock_clients', mockClients);
      const client = savedClients.find(c => c.id === id);

      if (!client) {
        return {
          success: false,
          error: {
            code: 'CLIENT_NOT_FOUND',
            message: `Client with ID ${id} not found`
          }
        };
      }

      console.log(`👤 MOCK: Loaded client ${id}`);

      return {
        success: true,
        data: client
      };
    } catch (error) {
      console.error('❌ Error loading client:', error);
      return {
        success: false,
        error: {
          code: 'CLIENT_LOAD_ERROR',
          message: 'Failed to load client'
        }
      };
    }
  }

  // MOCK: Создание нового клиента
  // TODO: Заменить на реальный API вызов: POST /api/clients
  async createClient(clientData: CreateClientRequest): Promise<ApiResponse<Client>> {
    try {
      if (IS_PROD) {
        return await apiService.post('/clients', clientData);
      }

      // MOCK: Эмуляция создания клиента
      await new Promise(resolve => setTimeout(resolve, 250));

      const savedClients = storageService.get('mock_clients', mockClients);
      const newId = String(savedClients.length + 1);
      const now = new Date();

      const newClient: Client = {
        id: newId,
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        messengerIds: clientData.messengerIds || {},
        ticketsCount: 0,
        lastTicketDate: now,
        location: clientData.location,
        company: clientData.company,
        customFields: clientData.customFields || {},
        rating: 5.0,
        totalSpent: 0,
        registrationDate: now
      };

      savedClients.push(newClient);
      storageService.set('mock_clients', savedClients);

      console.log(`✅ MOCK: Created client ${newId}`);

      return {
        success: true,
        data: newClient
      };
    } catch (error) {
      console.error('❌ Error creating client:', error);
      return {
        success: false,
        error: {
          code: 'CLIENT_CREATE_ERROR',
          message: 'Failed to create client'
        }
      };
    }
  }

  // MOCK: Обновление клиента
  // TODO: Заменить на реальный API вызов: PUT /api/clients/{id}
  async updateClient(id: string, updates: UpdateClientRequest): Promise<ApiResponse<Client>> {
    try {
      if (IS_PROD) {
        return await apiService.put(`/clients/${id}`, updates);
      }

      // MOCK: Эмуляция обновления
      await new Promise(resolve => setTimeout(resolve, 200));

      const savedClients = storageService.get('mock_clients', mockClients);
      const clientIndex = savedClients.findIndex(c => c.id === id);

      if (clientIndex === -1) {
        return {
          success: false,
          error: {
            code: 'CLIENT_NOT_FOUND',
            message: `Client with ID ${id} not found`
          }
        };
      }

      const updatedClient = {
        ...savedClients[clientIndex],
        ...updates
      };

      savedClients[clientIndex] = updatedClient;
      storageService.set('mock_clients', savedClients);

      console.log(`✅ MOCK: Updated client ${id}`);

      return {
        success: true,
        data: updatedClient
      };
    } catch (error) {
      console.error('❌ Error updating client:', error);
      return {
        success: false,
        error: {
          code: 'CLIENT_UPDATE_ERROR',
          message: 'Failed to update client'
        }
      };
    }
  }

  // MOCK: Удаление клиента
  // TODO: Заменить на реальный API вызов: DELETE /api/clients/{id}
  async deleteClient(id: string): Promise<ApiResponse<void>> {
    try {
      if (IS_PROD) {
        return await apiService.delete(`/clients/${id}`);
      }

      // MOCK: Эмуляция удаления
      await new Promise(resolve => setTimeout(resolve, 200));

      const savedClients = storageService.get('mock_clients', mockClients);
      const filteredClients = savedClients.filter(c => c.id !== id);

      if (filteredClients.length === savedClients.length) {
        return {
          success: false,
          error: {
            code: 'CLIENT_NOT_FOUND',
            message: `Client with ID ${id} not found`
          }
        };
      }

      storageService.set('mock_clients', filteredClients);

      console.log(`🗑️ MOCK: Deleted client ${id}`);

      return {
        success: true
      };
    } catch (error) {
      console.error('❌ Error deleting client:', error);
      return {
        success: false,
        error: {
          code: 'CLIENT_DELETE_ERROR',
          message: 'Failed to delete client'
        }
      };
    }
  }

  // MOCK: Получение тикетов клиента
  // TODO: Заменить на реальный API вызов: GET /api/clients/{id}/tickets
  async getClientTickets(
    clientId: string,
    params?: QueryParams
  ): Promise<ApiResponse<PaginatedResponse<any>>> {
    try {
      if (IS_PROD) {
        return await apiService.getCached(`/clients/${clientId}/tickets`, params, this.cacheDuration);
      }

      // MOCK: Эмуляция получения тикетов клиента
      await new Promise(resolve => setTimeout(resolve, 100));

      // Импортируем тикеты (избегаем циклических зависимостей)
      const { mockTickets } = await import('@/data/mockData');
      const clientTickets = mockTickets.filter(ticket => ticket.clientId === clientId);

      // Пагинация
      const page = params?.page || 1;
      const limit = params?.limit || 20;
      const total = clientTickets.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const paginatedTickets = clientTickets.slice(startIndex, startIndex + limit);

      console.log(`🎫 MOCK: Loaded ${paginatedTickets.length} tickets for client ${clientId}`);

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
      console.error('❌ Error loading client tickets:', error);
      return {
        success: false,
        error: {
          code: 'CLIENT_TICKETS_LOAD_ERROR',
          message: 'Failed to load client tickets'
        }
      };
    }
  }

  // MOCK: Получение статистики клиентов
  // TODO: Заменить на реальный API вызов: GET /api/clients/stats
  async getClientStats(): Promise<ApiResponse<any>> {
    try {
       if (IS_PROD) {
        return await apiService.getCached('/clients/stats', undefined, 10);
      }

      // MOCK: Эмуляция статистики
      await new Promise(resolve => setTimeout(resolve, 100));

      const savedClients = storageService.get('mock_clients', mockClients);

      const stats = {
        totalClients: savedClients.length,
        newClientsThisMonth: Math.floor(savedClients.length * 0.1),
        activeClients: Math.floor(savedClients.length * 0.8),
        vipClients: savedClients.filter(c => c.customFields?.vip).length,
        averageRating: savedClients.reduce((sum, c) => sum + (c.rating || 0), 0) / savedClients.length,
        totalRevenue: savedClients.reduce((sum, c) => sum + (c.totalSpent || 0), 0),
        clientsBySegment: {
          enterprise: savedClients.filter(c => c.customFields?.segment === 'enterprise').length,
          smb: savedClients.filter(c => c.customFields?.segment === 'smb').length,
          individual: savedClients.filter(c => c.customFields?.segment === 'individual').length,
        }
      };

      console.log(`📊 MOCK: Generated client stats`);

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('❌ Error loading client stats:', error);
      return {
        success: false,
        error: {
          code: 'CLIENT_STATS_LOAD_ERROR',
          message: 'Failed to load client statistics'
        }
      };
    }
  }

  // Очистка кэша клиентов
  clearCache(): void {
    apiService.clearCache();
  }

  // Импорт клиентов из файла
  // TODO: Заменить на реальный API вызов: POST /api/clients/import
  async importClients(file: File): Promise<ApiResponse<{ imported: number; errors: string[] }>> {
    try {
       if (IS_PROD) {
        return await apiService.uploadFile('/clients/import', file);
      }

      // MOCK: Эмуляция импорта
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(`📁 MOCK: Imported clients from file ${file.name}`);

      return {
        success: true,
        data: {
          imported: 10,
          errors: []
        }
      };
    } catch (error) {
      console.error('❌ Error importing clients:', error);
      return {
        success: false,
        error: {
          code: 'CLIENT_IMPORT_ERROR',
          message: 'Failed to import clients'
        }
      };
    }
  }

  // Экспорт клиентов
  // TODO: Заменить на реальный API вызов: GET /api/clients/export
  async exportClients(format: 'csv' | 'excel' = 'csv'): Promise<ApiResponse<{ downloadUrl: string }>> {
    try {
      if (IS_PROD) {
        return await apiService.get(`/clients/export?format=${format}`);
      }

      // MOCK: Эмуляция экспорта
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log(`📤 MOCK: Exported clients in ${format} format`);

      return {
        success: true,
        data: {
          downloadUrl: `https://files.company.com/exports/clients_${Date.now()}.${format}`
        }
      };
    } catch (error) {
      console.error('❌ Error exporting clients:', error);
      return {
        success: false,
        error: {
          code: 'CLIENT_EXPORT_ERROR',
          message: 'Failed to export clients'
        }
      };
    }
  }
}

// Создаем единственный экземпляр сервиса
export const clientsService = new ClientsService();

export default clientsService;