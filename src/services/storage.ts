// Утилиты для работы с localStorage (временное хранение до интеграции с бэкендом)

// MOCK: Эмуляция серверного хранения через localStorage
// TODO: Заменить на реальные API вызовы при подключении бэкенда

class StorageService {
  private prefix = 'ticketpro_';

  // Базовые операции с localStorage
  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.getKey(key), serialized);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (item === null) {
        return defaultValue || null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue || null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  // Специализированные методы для различных типов данных

  // Сохранение пользовательских фильтров
  saveUserFilters(userId: string, filters: any): void {
    this.set(`user_filters_${userId}`, filters);
  }

  getUserFilters(userId: string): any {
    return this.get(`user_filters_${userId}`, {});
  }

  // Сохранение настроек колонок таблицы
  saveColumnSettings(tableName: string, settings: any): void {
    this.set(`column_settings_${tableName}`, settings);
  }

  getColumnSettings(tableName: string): any {
    return this.get(`column_settings_${tableName}`, null);
  }

  // Кэширование данных (эмуляция кэша)
  setCachedData<T>(key: string, data: T, expiryMinutes: number = 60): void {
    const cacheItem = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + (expiryMinutes * 60 * 1000)
    };
    this.set(`cache_${key}`, cacheItem);
  }

  getCachedData<T>(key: string): T | null {
    const cacheItem = this.get<{
      data: T;
      timestamp: number;
      expiry: number;
    }>(`cache_${key}`);

    if (!cacheItem) {
      return null;
    }

    if (Date.now() > cacheItem.expiry) {
      this.remove(`cache_${key}`);
      return null;
    }

    return cacheItem.data;
  }

  // Сохранение черновиков форм
  saveDraft(formName: string, data: any): void {
    this.set(`draft_${formName}`, {
      data,
      timestamp: Date.now()
    });
  }

  getDraft(formName: string): any {
    const draft = this.get<{
      data: any;
      timestamp: number;
    }>(`draft_${formName}`);

    if (!draft) {
      return null;
    }

    // Удаляем черновики старше 24 часов
    const dayInMs = 24 * 60 * 60 * 1000;
    if (Date.now() - draft.timestamp > dayInMs) {
      this.remove(`draft_${formName}`);
      return null;
    }

    return draft.data;
  }

  clearDraft(formName: string): void {
    this.remove(`draft_${formName}`);
  }

  // Сохранение пользовательских настроек
  saveUserPreferences(userId: string, preferences: any): void {
    this.set(`user_prefs_${userId}`, preferences);
  }

  getUserPreferences(userId: string): any {
    return this.get(`user_prefs_${userId}`, {
      theme: 'dark',
      language: 'ru',
      itemsPerPage: 50,
      notifications: {
        email: true,
        push: true,
        sound: true
      }
    });
  }

  // Сохранение токена аутентификации
  saveAuthToken(token: string): void {
    this.set('auth_token', token);
  }

  getAuthToken(): string | null {
    return this.get('auth_token');
  }

  clearAuthToken(): void {
    this.remove('auth_token');
  }

  // Сохранение информации о пользователе
  saveCurrentUser(user: any): void {
    this.set('current_user', user);
  }

  getCurrentUser(): any {
    return this.get('current_user');
  }

  clearCurrentUser(): void {
    this.remove('current_user');
  }

  // Методы для работы с offline данными
  saveOfflineData(key: string, data: any): void {
    this.set(`offline_${key}`, {
      data,
      timestamp: Date.now(),
      synced: false
    });
  }

  getOfflineData(key: string): any {
    const offlineData = this.get<{
      data: any;
      timestamp: number;
      synced: boolean;
    }>(`offline_${key}`);
    return offlineData?.data || null;
  }

  markAsSynced(key: string): void {
    const offlineData = this.get<{
      data: any;
      timestamp: number;
      synced: boolean;
    }>(`offline_${key}`);
    if (offlineData) {
      offlineData.synced = true;
      this.set(`offline_${key}`, offlineData);
    }
  }

  getUnsyncedData(): Array<{ key: string; data: any; timestamp: number }> {
    const unsynced: Array<{ key: string; data: any; timestamp: number }> = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(storageKey => {
      if (storageKey.startsWith(`${this.prefix}offline_`)) {
        const data = this.get<{
          data: any;
          timestamp: number;
          synced: boolean;
        }>(storageKey.replace(this.prefix, ''));
        if (data && !data.synced) {
          unsynced.push({
            key: storageKey.replace(`${this.prefix}offline_`, ''),
            data: data.data,
            timestamp: data.timestamp
          });
        }
      }
    });

    return unsynced.sort((a, b) => a.timestamp - b.timestamp);
  }
}

// Создаем единственный экземпляр сервиса
export const storageService = new StorageService();

// Экспортируем для использования в других частях приложения
export default storageService;