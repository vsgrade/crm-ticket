// Базовый API сервис для централизованных HTTP запросов
// MOCK: Эмуляция API запросов с использованием моковых данных
// TODO: Заменить на реальные fetch() запросы к бэкенду

import { ApiResponse, QueryParams } from '@/types/api.types';
import { storageService } from './storage';

class ApiService {
  private baseUrl = process.env.REACT_APP_API_URL || 'https://api.yourcompany.com/v1';
  private isProduction = process.env.NODE_ENV === 'production';

  // MOCK: Эмуляция задержки сети
  private mockDelay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Получение заголовков для запросов
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // TODO: Заменить на реальный JWT токен из авторизации
    const token = storageService.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Базовый метод для выполнения запросов
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // MOCK: В режиме разработки эмулируем API запросы
      if (!this.isProduction) {
        await this.mockDelay();
        console.log(`🔄 MOCK API Call: ${options.method || 'GET'} ${endpoint}`);
        console.log('Request options:', options);
        
        // TODO: Здесь должен быть реальный API вызов
        // return this.mockResponse(endpoint, options);
      }

      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(`❌ API Error: ${endpoint}`, error);
      return {
        success: false,
        error: {
          code: 'API_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  // GET запрос
  async get<T>(endpoint: string, params?: QueryParams): Promise<ApiResponse<T>> {
    let url = endpoint;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, String(v)));
          } else {
            searchParams.set(key, String(value));
          }
        }
      });
      
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }

    return this.request<T>(url, { method: 'GET' });
  }

  // POST запрос
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT запрос
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH запрос
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE запрос
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Загрузка файлов
  async uploadFile(endpoint: string, file: File, additionalData?: Record<string, string>): Promise<ApiResponse<any>> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (additionalData) {
        Object.entries(additionalData).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      // MOCK: Эмуляция загрузки файла
      if (!this.isProduction) {
        await this.mockDelay(1000);
        console.log(`📁 MOCK File Upload: ${endpoint}`, file.name);
        
        // TODO: Заменить на реальный API вызов
        return {
          success: true,
          data: {
            id: `file_${Date.now()}`,
            filename: file.name,
            url: `https://files.company.com/uploads/${file.name}`,
            size: file.size,
            mimeType: file.type,
          },
        };
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storageService.getAuthToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(`❌ File Upload Error: ${endpoint}`, error);
      return {
        success: false,
        error: {
          code: 'UPLOAD_ERROR',
          message: error instanceof Error ? error.message : 'Upload failed',
        },
      };
    }
  }

  // Методы для работы с кэшем
  private getCacheKey(endpoint: string, params?: any): string {
    return `api_${endpoint}_${JSON.stringify(params || {})}`;
  }

  // GET запрос с кэшированием
  async getCached<T>(
    endpoint: string, 
    params?: QueryParams, 
    cacheMinutes: number = 5
  ): Promise<ApiResponse<T>> {
    const cacheKey = this.getCacheKey(endpoint, params);
    
    // Проверяем кэш
    const cachedData = storageService.getCachedData<T>(cacheKey);
    if (cachedData) {
      console.log(`💾 Cache hit: ${endpoint}`);
      return {
        success: true,
        data: cachedData,
      };
    }

    // Выполняем запрос
    const response = await this.get<T>(endpoint, params);
    
    // Сохраняем в кэш при успешном ответе
    if (response.success && response.data) {
      storageService.setCachedData(cacheKey, response.data, cacheMinutes);
    }

    return response;
  }

  // Очистка кэша
  clearCache(): void {
    // Очищаем все кэшированные API данные
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('cache_api_')) {
        localStorage.removeItem(key);
      }
    });
  }

  // Методы для работы в offline режиме
  async requestWithOfflineSupport<T>(
    endpoint: string,
    options: RequestInit = {},
    offlineKey?: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.request<T>(endpoint, options);
      
      // Сохраняем успешный ответ для offline использования
      if (response.success && response.data && offlineKey) {
        storageService.saveOfflineData(offlineKey, response.data);
        storageService.markAsSynced(offlineKey);
      }
      
      return response;
    } catch (error) {
      // При ошибке пытаемся получить данные из offline хранилища
      if (offlineKey) {
        const offlineData = storageService.getOfflineData(offlineKey);
        if (offlineData) {
          console.log(`📱 Using offline data for: ${endpoint}`);
          return {
            success: true,
            data: offlineData,
          };
        }
      }
      
      throw error;
    }
  }

  // Проверка соединения с сервером
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.get('/health');
      return response.success;
    } catch {
      return false;
    }
  }

  // Синхронизация offline данных
  async syncOfflineData(): Promise<void> {
    const unsyncedData = storageService.getUnsyncedData();
    
    for (const item of unsyncedData) {
      try {
        // TODO: Определить правильный endpoint для синхронизации
        await this.post(`/sync/${item.key}`, item.data);
        storageService.markAsSynced(item.key);
        console.log(`✅ Synced offline data: ${item.key}`);
      } catch (error) {
        console.error(`❌ Failed to sync: ${item.key}`, error);
      }
    }
  }
}

// Создаем единственный экземпляр API сервиса
export const apiService = new ApiService();

// Экспортируем для использования в других частях приложения
export default apiService;