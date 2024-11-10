// src/api/projects.ts
import axios from 'axios';
import { Project } from '../types/project';

const API_URL = 'http://localhost:8080/api';

export const getProjects = async (): Promise<Project[]> => {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
};

export const getProject = async (id: number): Promise<Project> => {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
};