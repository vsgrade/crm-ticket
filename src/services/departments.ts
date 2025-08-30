// Сервис для работы с отделами
// MOCK: Использует моковые данные, готов к замене на реальные API вызовы

import { apiService } from './api';
import { storageService } from './storage';
import { 
  ApiResponse, 
  PaginatedResponse,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  QueryParams
} from '@/types/api.types';
import { Department } from '@/data/mockData';
import { mockDepartments } from '@/data/mockData';

class DepartmentsService {
  private cacheDuration = 15; // минуты

  // MOCK: Получение списка отделов
  // TODO: Заменить на реальный API вызов: GET /api/departments
  async getDepartments(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Department>>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.getCached('/departments', params, this.cacheDuration);
      }

      // MOCK: Эмуляция задержки сети
      await new Promise(resolve => setTimeout(resolve, 100));

      let filteredDepartments = [...mockDepartments];

      // Применяем фильтры
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredDepartments = filteredDepartments.filter(dept =>
          dept.name.toLowerCase().includes(searchLower) ||
          dept.description.toLowerCase().includes(searchLower)
        );
      }

      // Фильтр по активности
      if (params?.isActive !== undefined) {
        filteredDepartments = filteredDepartments.filter(dept => 
          dept.isActive === params.isActive
        );
      }

      // Сортировка
      if (params?.sortBy) {
        filteredDepartments.sort((a, b) => {
          const aValue = a[params.sortBy as keyof Department];
          const bValue = b[params.sortBy as keyof Department];
          
          if (params.sortOrder === 'desc') {
            return bValue > aValue ? 1 : -1;
          }
          return aValue > bValue ? 1 : -1;
        });
      }

      // Пагинация
      const page = params?.page || 1;
      const limit = params?.limit || 50;
      const total = filteredDepartments.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const paginatedDepartments = filteredDepartments.slice(startIndex, startIndex + limit);

      console.log(`🏢 MOCK: Loaded ${paginatedDepartments.length} departments (page ${page})`);

      return {
        success: true,
        data: {
          items: paginatedDepartments,
          pagination: {
            page,
            limit,
            total,
            totalPages
          }
        }
      };
    } catch (error) {
      console.error('❌ Error loading departments:', error);
      return {
        success: false,
        error: {
          code: 'DEPARTMENTS_LOAD_ERROR',
          message: 'Failed to load departments'
        }
      };
    }
  }

  // MOCK: Получение конкретного отдела
  // TODO: Заменить на реальный API вызов: GET /api/departments/{id}
  async getDepartment(id: string): Promise<ApiResponse<Department>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.getCached(`/departments/${id}`, undefined, this.cacheDuration);
      }

      // MOCK: Эмуляция задержки сети
      await new Promise(resolve => setTimeout(resolve, 100));

      const savedDepartments = storageService.get('mock_departments', mockDepartments);
      const department = savedDepartments.find(d => d.id === id);

      if (!department) {
        return {
          success: false,
          error: {
            code: 'DEPARTMENT_NOT_FOUND',
            message: `Department with ID ${id} not found`
          }
        };
      }

      console.log(`🏢 MOCK: Loaded department ${id}`);

      return {
        success: true,
        data: department
      };
    } catch (error) {
      console.error('❌ Error loading department:', error);
      return {
        success: false,
        error: {
          code: 'DEPARTMENT_LOAD_ERROR',
          message: 'Failed to load department'
        }
      };
    }
  }

  // MOCK: Создание нового отдела
  // TODO: Заменить на реальный API вызов: POST /api/departments
  async createDepartment(departmentData: CreateDepartmentRequest): Promise<ApiResponse<Department>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.post('/departments', departmentData);
      }

      // MOCK: Эмуляция создания отдела
      await new Promise(resolve => setTimeout(resolve, 300));

      const savedDepartments = storageService.get('mock_departments', mockDepartments);
      
      // Генерируем ID на основе названия
      const newId = departmentData.name.toLowerCase()
        .replace(/[^a-zа-я0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');

      const newDepartment: Department = {
        id: newId,
        name: departmentData.name,
        description: departmentData.description,
        employees: departmentData.employees,
        integrations: [],
        workingHours: departmentData.workingHours,
        slaRules: [],
        isActive: departmentData.isActive
      };

      savedDepartments.push(newDepartment);
      storageService.set('mock_departments', savedDepartments);

      console.log(`✅ MOCK: Created department ${newId}`);

      return {
        success: true,
        data: newDepartment
      };
    } catch (error) {
      console.error('❌ Error creating department:', error);
      return {
        success: false,
        error: {
          code: 'DEPARTMENT_CREATE_ERROR',
          message: 'Failed to create department'
        }
      };
    }
  }

  // MOCK: Обновление отдела
  // TODO: Заменить на реальный API вызов: PUT /api/departments/{id}
  async updateDepartment(id: string, updates: UpdateDepartmentRequest): Promise<ApiResponse<Department>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.put(`/departments/${id}`, updates);
      }

      // MOCK: Эмуляция обновления
      await new Promise(resolve => setTimeout(resolve, 200));

      const savedDepartments = storageService.get('mock_departments', mockDepartments);
      const departmentIndex = savedDepartments.findIndex(d => d.id === id);

      if (departmentIndex === -1) {
        return {
          success: false,
          error: {
            code: 'DEPARTMENT_NOT_FOUND',
            message: `Department with ID ${id} not found`
          }
        };
      }

      const updatedDepartment = {
        ...savedDepartments[departmentIndex],
        ...updates
      };

      savedDepartments[departmentIndex] = updatedDepartment;
      storageService.set('mock_departments', savedDepartments);

      console.log(`✅ MOCK: Updated department ${id}`);

      return {
        success: true,
        data: updatedDepartment
      };
    } catch (error) {
      console.error('❌ Error updating department:', error);
      return {
        success: false,
        error: {
          code: 'DEPARTMENT_UPDATE_ERROR',
          message: 'Failed to update department'
        }
      };
    }
  }

  // MOCK: Удаление отдела
  // TODO: Заменить на реальный API вызов: DELETE /api/departments/{id}
  async deleteDepartment(id: string): Promise<ApiResponse<void>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.delete(`/departments/${id}`);
      }

      // MOCK: Эмуляция удаления
      await new Promise(resolve => setTimeout(resolve, 200));

      const savedDepartments = storageService.get('mock_departments', mockDepartments);
      const filteredDepartments = savedDepartments.filter(d => d.id !== id);

      if (filteredDepartments.length === savedDepartments.length) {
        return {
          success: false,
          error: {
            code: 'DEPARTMENT_NOT_FOUND',
            message: `Department with ID ${id} not found`
          }
        };
      }

      storageService.set('mock_departments', filteredDepartments);

      console.log(`🗑️ MOCK: Deleted department ${id}`);

      return {
        success: true
      };
    } catch (error) {
      console.error('❌ Error deleting department:', error);
      return {
        success: false,
        error: {
          code: 'DEPARTMENT_DELETE_ERROR',
          message: 'Failed to delete department'
        }
      };
    }
  }

  // MOCK: Получение статистики отдела
  // TODO: Заменить на реальный API вызов: GET /api/departments/{id}/stats
  async getDepartmentStats(id: string, period?: string): Promise<ApiResponse<any>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.getCached(`/departments/${id}/stats`, { period }, 5);
      }

      // MOCK: Эмуляция статистики отдела
      await new Promise(resolve => setTimeout(resolve, 100));

      const department = await this.getDepartment(id);
      if (!department.success) {
        return department;
      }

      // Импортируем тикеты для расчета статистики
      const { mockTickets } = await import('@/data/mockData');
      const departmentTickets = mockTickets.filter(ticket => 
        ticket.departments.includes(id)
      );

      const stats = {
        totalTickets: departmentTickets.length,
        newTickets: departmentTickets.filter(t => t.status === 'new').length,
        inProgressTickets: departmentTickets.filter(t => t.status === 'in-progress').length,
        resolvedTickets: departmentTickets.filter(t => t.status === 'resolved').length,
        employeeCount: department.data!.employees.length,
        avgResponseTime: Math.floor(Math.random() * 60) + 15, // 15-75 минут
        slaCompliance: 85 + Math.random() * 15, // 85-100%
        workload: {
          low: Math.floor(Math.random() * 10),
          medium: Math.floor(Math.random() * 20),
          high: Math.floor(Math.random() * 15),
          critical: Math.floor(Math.random() * 5),
        },
        ticketTrends: {
          labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'],
          data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 20))
        }
      };

      console.log(`📊 MOCK: Generated stats for department ${id}`);

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('❌ Error loading department stats:', error);
      return {
        success: false,
        error: {
          code: 'DEPARTMENT_STATS_LOAD_ERROR',
          message: 'Failed to load department statistics'
        }
      };
    }
  }

  // MOCK: Получение активных отделов
  // TODO: Заменить на реальный API вызов: GET /api/departments/active
  async getActiveDepartments(): Promise<ApiResponse<Department[]>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.getCached('/departments/active', undefined, this.cacheDuration);
      }

      const response = await this.getDepartments({ isActive: true });
      if (!response.success) {
        return {
          success: false,
          error: response.error!
        };
      }

      return {
        success: true,
        data: response.data!.items
      };
    } catch (error) {
      console.error('❌ Error loading active departments:', error);
      return {
        success: false,
        error: {
          code: 'ACTIVE_DEPARTMENTS_LOAD_ERROR',
          message: 'Failed to load active departments'
        }
      };
    }
  }

  // MOCK: Добавление сотрудника в отдел
  // TODO: Заменить на реальный API вызов: POST /api/departments/{id}/employees
  async addEmployeeToDepartment(departmentId: string, employeeId: string): Promise<ApiResponse<Department>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.post(`/departments/${departmentId}/employees`, { employeeId });
      }

      const department = await this.getDepartment(departmentId);
      if (!department.success) {
        return department;
      }

      const employees = [...department.data!.employees];
      if (!employees.includes(employeeId)) {
        employees.push(employeeId);
      }

      return this.updateDepartment(departmentId, { employees });
    } catch (error) {
      console.error('❌ Error adding employee to department:', error);
      return {
        success: false,
        error: {
          code: 'ADD_EMPLOYEE_ERROR',
          message: 'Failed to add employee to department'
        }
      };
    }
  }

  // MOCK: Удаление сотрудника из отдела
  // TODO: Заменить на реальный API вызов: DELETE /api/departments/{id}/employees/{employeeId}
  async removeEmployeeFromDepartment(departmentId: string, employeeId: string): Promise<ApiResponse<Department>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.delete(`/departments/${departmentId}/employees/${employeeId}`);
      }

      const department = await this.getDepartment(departmentId);
      if (!department.success) {
        return department;
      }

      const employees = department.data!.employees.filter(id => id !== employeeId);

      return this.updateDepartment(departmentId, { employees });
    } catch (error) {
      console.error('❌ Error removing employee from department:', error);
      return {
        success: false,
        error: {
          code: 'REMOVE_EMPLOYEE_ERROR',
          message: 'Failed to remove employee from department'
        }
      };
    }
  }

  // Очистка кэша отделов
  clearCache(): void {
    apiService.clearCache();
  }
}

// Создаем единственный экземпляр сервиса
export const departmentsService = new DepartmentsService();

export default departmentsService;