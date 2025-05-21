import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.apiBaseUrl;

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`
  },
  users: {
    list: `${API_BASE_URL}/users`,
    detail: (id: string) => `${API_BASE_URL}/users/${id}`
  },
  dashboard: {
    stats: `${API_BASE_URL}/dashboard/stats`
  },
  projects: {
    list: `${API_BASE_URL}/project/all/async`,
    create: `${API_BASE_URL}/project/async`,
    detail: (id: string) => `${API_BASE_URL}/project/${id}`,
    update: `${API_BASE_URL}/project/async`,
    delete: (id: string) => `${API_BASE_URL}/project/async/${id}`,
    tasks: (id: string) => `${API_BASE_URL}/task/byProjectId/${id}`,
    create_task: (id: string) => `${API_BASE_URL}/projects/${id}/tasks`
  },
  tasks: {
    update: () => `${API_BASE_URL}/task/async`,
    delete: (id: string) => `${API_BASE_URL}/task/async/${id}`,
    create: `${API_BASE_URL}/task/async`,
    getAll: `${API_BASE_URL}/task/all/async`,
  }
};
