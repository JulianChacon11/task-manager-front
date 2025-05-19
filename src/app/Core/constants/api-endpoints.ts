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
    list: `${API_BASE_URL}/projects`,
    create: `${API_BASE_URL}/projects`,
    detail: (id: string) => `${API_BASE_URL}/projects/${id}`,
    update: (id: string) => `${API_BASE_URL}/projects/${id}`,
    delete: (id: string) => `${API_BASE_URL}/projects/${id}`,
    tasks: (id: string) => `${API_BASE_URL}/projects/${id}/tasks`,
    create_task: (id: string) => `${API_BASE_URL}/projects/${id}/tasks`
  },
  tasks: {
    update: (id: string) => `${API_BASE_URL}/tasks/${id}`,
    delete: (id: string) => `${API_BASE_URL}/tasks/${id}`
  }
};