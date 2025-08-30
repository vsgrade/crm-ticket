// Сервис для работы с сотрудниками
// MOCK: Использует моковые данные, готов к замене на реальные API вызовы

import { apiService } from './api';
import { storageService } from './storage';
import { 
  ApiResponse, 
  PaginatedResponse,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  QueryParams
} from '@/types/api.types';
import { Employee } from '@/data/mockData';
import { mockEmployees } from '@/data/mockData';

class EmployeesService {
  private cacheDuration = 10; // минуты

  // MOCK: Получение списка сотрудников
  // TODO: Заменить на реальный API вызов: GET /api/employees
  async getEmployees(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Employee>>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.getCached('/employees', params, this.cacheDuration);
      }

      // MOCK: Эмуляция задержки сети
      await new Promise(resolve => setTimeout(resolve, 100));

      let filteredEmployees = [...mockEmployees];

      // Применяем фильтры
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredEmployees = filteredEmployees.filter(employee =>
          employee.name.toLowerCase().includes(searchLower) ||
          employee.email.toLowerCase().includes(searchLower) ||
          employee.role.toLowerCase().includes(searchLower)
        );
      }

      // Сортировка
      if (params?.sortBy) {
        filteredEmployees.sort((a, b) => {
          const aValue = a[params.sortBy as keyof Employee];
          const bValue = b[params.sortBy as keyof Employee];
          
          if (params.sortOrder === 'desc') {
            return bValue > aValue ? 1 : -1;
          }
          return aValue > bValue ? 1 : -1;
        });
      }

      // Пагинация
      const page = params?.page || 1;
      const limit = params?.limit || 50;
      const total = filteredEmployees.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + limit);

      console.log(`👨‍💼 MOCK: Loaded ${paginatedEmployees.length} employees (page ${page})`);

      return {
        success: true,
        data: {
          items: paginatedEmployees,
          pagination: {
            page,
            limit,
            total,
            totalPages
          }
        }
      };
    } catch (error) {
      console.error('❌ Error loading employees:', error);
      return {
        success: false,
        error: {
          code: 'EMPLOYEES_LOAD_ERROR',
          message: 'Failed to load employees'
        }
      };
    }
  }

  // MOCK: Получение конкретного сотрудника
  // TODO: Заменить на реальный API вызов: GET /api/employees/{id}
  async getEmployee(id: string): Promise<ApiResponse<Employee>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.getCached(`/employees/${id}`, undefined, this.cacheDuration);
      }

      // MOCK: Эмуляция задержки сети
      await new Promise(resolve => setTimeout(resolve, 100));

      const savedEmployees = storageService.get('mock_employees', mockEmployees);
      const employee = savedEmployees.find(e => e.id === id);

      if (!employee) {
        return {
          success: false,
          error: {
            code: 'EMPLOYEE_NOT_FOUND',
            message: `Employee with ID ${id} not found`
          }
        };
      }

      console.log(`👤 MOCK: Loaded employee ${id}`);

      return {
        success: true,
        data: employee
      };
    } catch (error) {
      console.error('❌ Error loading employee:', error);
      return {
        success: false,
        error: {
          code: 'EMPLOYEE_LOAD_ERROR',
          message: 'Failed to load employee'
        }
      };
    }
  }

  // MOCK: Создание нового сотрудника
  // TODO: Заменить на реальный API вызов: POST /api/employees
  async createEmployee(employeeData: CreateEmployeeRequest): Promise<ApiResponse<Employee>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.post('/employees', employeeData);
      }

      // MOCK: Эмуляция создания сотрудника
      await new Promise(resolve => setTimeout(resolve, 300));

      const savedEmployees = storageService.get('mock_employees', mockEmployees);
      const newId = String(savedEmployees.length + 1);
      const now = new Date();

      const newEmployee: Employee = {
        id: newId,
        name: employeeData.name,
        email: employeeData.email,
        role: employeeData.role,
        departments: employeeData.departments,
        isOnline: true,
        lastSeen: now,
        ticketsAssigned: 0,
        ticketsResolved: 0,
        avgResponseTime: 0,
        permissions: employeeData.permissions,
        customFields: employeeData.customFields || {}
      };

      savedEmployees.push(newEmployee);
      storageService.set('mock_employees', savedEmployees);

      console.log(`✅ MOCK: Created employee ${newId}`);

      return {
        success: true,
        data: newEmployee
      };
    } catch (error) {
      console.error('❌ Error creating employee:', error);
      return {
        success: false,
        error: {
          code: 'EMPLOYEE_CREATE_ERROR',
          message: 'Failed to create employee'
        }
      };
    }
  }

  // MOCK: Обновление сотрудника
  // TODO: Заменить на реальный API вызов: PUT /api/employees/{id}
  async updateEmployee(id: string, updates: UpdateEmployeeRequest): Promise<ApiResponse<Employee>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.put(`/employees/${id}`, updates);
      }

      // MOCK: Эмуляция обновления
      await new Promise(resolve => setTimeout(resolve, 200));

      const savedEmployees = storageService.get('mock_employees', mockEmployees);
      const employeeIndex = savedEmployees.findIndex(e => e.id === id);

      if (employeeIndex === -1) {
        return {
          success: false,
          error: {
            code: 'EMPLOYEE_NOT_FOUND',
            message: `Employee with ID ${id} not found`
          }
        };
      }

      const updatedEmployee = {
        ...savedEmployees[employeeIndex],
        ...updates
      };

      savedEmployees[employeeIndex] = updatedEmployee;
      storageService.set('mock_employees', savedEmployees);

      console.log(`✅ MOCK: Updated employee ${id}`);

      return {
        success: true,
        data: updatedEmployee
      };
    } catch (error) {
      console.error('❌ Error updating employee:', error);
      return {
        success: false,
        error: {
          code: 'EMPLOYEE_UPDATE_ERROR',
          message: 'Failed to update employee'
        }
      };
    }
  }

  // MOCK: Удаление сотрудника
  // TODO: Заменить на реальный API вызов: DELETE /api/employees/{id}
  async deleteEmployee(id: string): Promise<ApiResponse<void>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.delete(`/employees/${id}`);
      }

      // MOCK: Эмуляция удаления
      await new Promise(resolve => setTimeout(resolve, 200));

      const savedEmployees = storageService.get('mock_employees', mockEmployees);
      const filteredEmployees = savedEmployees.filter(e => e.id !== id);

      if (filteredEmployees.length === savedEmployees.length) {
        return {
          success: false,
          error: {
            code: 'EMPLOYEE_NOT_FOUND',
            message: `Employee with ID ${id} not found`
          }
        };
      }

      storageService.set('mock_employees', filteredEmployees);

      console.log(`🗑️ MOCK: Deleted employee ${id}`);

      return {
        success: true
      };
    } catch (error) {
      console.error('❌ Error deleting employee:', error);
      return {
        success: false,
        error: {
          code: 'EMPLOYEE_DELETE_ERROR',
          message: 'Failed to delete employee'
        }
      };
    }
  }

  // MOCK: Получение статистики сотрудника
  // TODO: Заменить на реальный API вызов: GET /api/employees/{id}/stats
  async getEmployeeStats(id: string, period?: string): Promise<ApiResponse<any>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.getCached(`/employees/${id}/stats`, { period }, 5);
      }

      // MOCK: Эмуляция статистики сотрудника
      await new Promise(resolve => setTimeout(resolve, 100));

      const employee = await this.getEmployee(id);
      if (!employee.success) {
        return employee;
      }

      const stats = {
        ticketsAssigned: employee.data!.ticketsAssigned,
        ticketsResolved: employee.data!.ticketsResolved,
        avgResponseTime: employee.data!.avgResponseTime,
        resolutionRate: employee.data!.ticketsResolved / (employee.data!.ticketsAssigned || 1) * 100,
        workloadDistribution: {
          high: Math.floor(Math.random() * 10),
          medium: Math.floor(Math.random() * 20),
          low: Math.floor(Math.random() * 15),
        },
        customerSatisfaction: 4.2 + Math.random() * 0.8,
        weeklyActivity: [
          { day: 'Mon', tickets: Math.floor(Math.random() * 10) },
          { day: 'Tue', tickets: Math.floor(Math.random() * 10) },
          { day: 'Wed', tickets: Math.floor(Math.random() * 10) },
          { day: 'Thu', tickets: Math.floor(Math.random() * 10) },
          { day: 'Fri', tickets: Math.floor(Math.random() * 10) },
        ]
      };

      console.log(`📊 MOCK: Generated stats for employee ${id}`);

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('❌ Error loading employee stats:', error);
      return {
        success: false,
        error: {
          code: 'EMPLOYEE_STATS_LOAD_ERROR',
          message: 'Failed to load employee statistics'
        }
      };
    }
  }

  // MOCK: Получение списка онлайн сотрудников
  // TODO: Заменить на реальный API вызов: GET /api/employees/online
  async getOnlineEmployees(): Promise<ApiResponse<Employee[]>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.getCached('/employees/online', undefined, 1);
      }

      // MOCK: Эмуляция получения онлайн сотрудников
      await new Promise(resolve => setTimeout(resolve, 50));

      const savedEmployees = storageService.get('mock_employees', mockEmployees);
      const onlineEmployees = savedEmployees.filter(e => e.isOnline);

      console.log(`🟢 MOCK: Found ${onlineEmployees.length} online employees`);

      return {
        success: true,
        data: onlineEmployees
      };
    } catch (error) {
      console.error('❌ Error loading online employees:', error);
      return {
        success: false,
        error: {
          code: 'ONLINE_EMPLOYEES_LOAD_ERROR',
          message: 'Failed to load online employees'
        }
      };
    }
  }

  // MOCK: Обновление статуса онлайн
  // TODO: Заменить на реальный API вызов: POST /api/employees/{id}/status
  async updateOnlineStatus(id: string, isOnline: boolean): Promise<ApiResponse<Employee>> {
    try {
      if (process.env.NODE_ENV === 'production') {
        return await apiService.post(`/employees/${id}/status`, { isOnline });
      }

      // MOCK: Эмуляция обновления статуса
      await new Promise(resolve => setTimeout(resolve, 100));

      const savedEmployees = storageService.get('mock_employees', mockEmployees);
      const employeeIndex = savedEmployees.findIndex(e => e.id === id);

      if (employeeIndex === -1) {
        return {
          success: false,
          error: {
            code: 'EMPLOYEE_NOT_FOUND',
            message: `Employee with ID ${id} not found`
          }
        };
      }

      const updatedEmployee = {
        ...savedEmployees[employeeIndex],
        isOnline,
        lastSeen: new Date()
      };

      savedEmployees[employeeIndex] = updatedEmployee;
      storageService.set('mock_employees', savedEmployees);

      console.log(`${isOnline ? '🟢' : '🔴'} MOCK: Updated online status for employee ${id}`);

      return {
        success: true,
        data: updatedEmployee
      };
    } catch (error) {
      console.error('❌ Error updating online status:', error);
      return {
        success: false,
        error: {
          code: 'STATUS_UPDATE_ERROR',
          message: 'Failed to update online status'
        }
      };
    }
  }

  // Получение сотрудников по отделу
  async getEmployeesByDepartment(departmentId: string): Promise<ApiResponse<Employee[]>> {
    try {
      const response = await this.getEmployees();
      if (!response.success) {
        return {
          success: false,
          error: response.error!
        };
      }

      const employeesInDepartment = response.data!.items.filter(employee =>
        employee.departments.includes(departmentId)
      );

      return {
        success: true,
        data: employeesInDepartment
      };
    } catch (error) {
      console.error('❌ Error loading employees by department:', error);
      return {
        success: false,
        error: {
          code: 'DEPARTMENT_EMPLOYEES_LOAD_ERROR',
          message: 'Failed to load employees by department'
        }
      };
    }
  }

  // Очистка кэша сотрудников
  clearCache(): void {
    apiService.clearCache();
  }
}

// Создаем единственный экземпляр сервиса
export const employeesService = new EmployeesService();

export default employeesService;