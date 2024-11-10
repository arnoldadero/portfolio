import { client } from './client';
import { Project, CreateProjectInput } from '../types/project';

export const projectApi = {
    getAll: async (): Promise<Project[]> => {
        const { data } = await client.get('/api/projects');
        return data;
    },

    getById: async (id: number): Promise<Project> => {
        const { data } = await client.get(`/api/projects/${id}`);
        return data;
    },

    create: async (project: CreateProjectInput): Promise<Project> => {
        const { data } = await client.post('/api/projects', project);
        return data;
    },

    update: async (id: number, project: Partial<CreateProjectInput>): Promise<Project> => {
        const { data } = await client.put(`/api/projects/${id}`, project);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await client.delete(`/api/projects/${id}`);
    }
};