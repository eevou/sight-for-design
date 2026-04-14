import axios from 'axios';

// Configure this to point to your .NET Web API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token (ready for JWT from .NET Identity)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login when auth is implemented
      console.warn('Unauthorized request - token may be expired');
    }
    return Promise.reject(error);
  }
);

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
// .NET endpoint: POST /api/XRay/Upload
export const uploadXray = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post<UploadResponse>('/XRay/Upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Get analysis result by ID
// .NET endpoint: GET /api/Analysis/{id}
export const getAnalysisResult = async (id: string): Promise<AnalysisResult> => {
  const response = await apiClient.get<AnalysisResult>(`/Analysis/${id}`);
  return response.data;
};

// Get analysis history
// .NET endpoint: GET /api/Analysis/History
export const getAnalysisHistory = async (): Promise<HistoryItem[]> => {
  const response = await apiClient.get<HistoryItem[]>('/Analysis/History');
  return response.data;
};

// Update physician notes
// .NET endpoint: PUT /api/Analysis/{id}/Notes
export const updatePhysicianNotes = async (id: string, notes: string): Promise<void> => {
  await apiClient.put(`/Analysis/${id}/Notes`, { notes });
};

// Confirm diagnosis
// .NET endpoint: POST /api/Analysis/{id}/Confirm
export const confirmDiagnosis = async (id: string): Promise<void> => {
  await apiClient.post(`/Analysis/${id}/Confirm`);
};

// Request follow-up
// .NET endpoint: POST /api/Analysis/{id}/FollowUp
export const requestFollowUp = async (id: string): Promise<void> => {
  await apiClient.post(`/Analysis/${id}/FollowUp`);
};

export default apiClient;
