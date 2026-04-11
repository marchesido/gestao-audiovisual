import { api } from "./api";
import type { Project, CreateProjectData } from "../types/project";

export const getProjects = () => api.get<Project[]>("/projects");
export const getProjectById = (id: string) => api.get<Project>(`/projects/${id}`);
export const createProject = (data: CreateProjectData) => api.post<Project>("/projects", data);
export const updateProject = (id: string, data: Partial<CreateProjectData>) =>
  api.patch<Project>(`/projects/${id}`, data);
export const deleteProject = (id: string) => api.delete(`/projects/${id}`);
