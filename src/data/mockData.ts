import { AnalysisResult, HistoryItem } from '@/services/api';
import chestXrayImg from '@/assets/chest-xray.jpg';

export const mockAnalysisResult: AnalysisResult = {
  id: '48291',
  patientId: '48291',
  date: 'Oct 24, 2023',
  time: '14:30 PM',
  result: 'Abnormal',
  confidence: 98,
  condition: 'Pneumonia',
  description: 'High probability of bacterial pneumonia in the lower right lobe.',
  secondaryIndicators: {
    infiltration: 87,
    atelectasis: 12,
    effusion: 0.8,
  },
  physicianNotes: 'Patient complains of shortness of breath and fever for 3 days. X-ray confirms AI finding of opacity in the right lung base consistent with pneumonia.',
  imageUrl: chestXrayImg,
};

export const mockHistory: HistoryItem[] = [
  {
    id: '1',
    patient: 'mahmoud',
    xrayThumbnail: chestXrayImg,
    result: 'Normal',
    date: '3/10/2026',
  },
  {
    id: '2',
    patient: 'mahmoud',
    xrayThumbnail: chestXrayImg,
    result: 'Normal',
    date: '3/10/2026',
  },
];
