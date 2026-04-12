import axios from 'axios';

const API_BASE_URL = 'https://your-api-domain.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface UploadResponse {
  id: string;
  status: string;
  message: string;
}

export interface AnalysisResult {
  id: string;
  patientId: string;
  date: string;
  time: string;
  result: 'Normal' | 'Abnormal';
  confidence: number;
  condition: string;
  description: string;
  secondaryIndicators: {
    infiltration: number;
    atelectasis: number;
    effusion: number;
  };
  physicianNotes: string;
  imageUrl: string;
}

export interface HistoryItem {
  id: string;
  patient: string;
  xrayThumbnail: string;
  result: 'Normal' | 'Abnormal';
  date: string;
}

// Upload X-ray image for analysis
export const uploadXray = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post<UploadResponse>('/xray/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Get analysis result by ID
export const getAnalysisResult = async (id: string): Promise<AnalysisResult> => {
  const response = await apiClient.get<AnalysisResult>(`/analysis/${id}`);
  return response.data;
};

// Get analysis history
export const getAnalysisHistory = async (): Promise<HistoryItem[]> => {
  const response = await apiClient.get<HistoryItem[]>('/analysis/history');
  return response.data;
};

// Update physician notes
export const updatePhysicianNotes = async (id: string, notes: string): Promise<void> => {
  await apiClient.put(`/analysis/${id}/notes`, { notes });
};

// Confirm diagnosis
export const confirmDiagnosis = async (id: string): Promise<void> => {
  await apiClient.post(`/analysis/${id}/confirm`);
};

// Request follow-up
export const requestFollowUp = async (id: string): Promise<void> => {
  await apiClient.post(`/analysis/${id}/follow-up`);
};

export default apiClient;
