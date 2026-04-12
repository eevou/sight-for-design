import StatusBadge from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';

interface DiagnosisCardProps {
  result: 'Normal' | 'Abnormal';
  confidence: number;
  condition: string;
  description: string;
  secondaryIndicators: {
    infiltration: number;
    atelectasis: number;
    effusion: number;
  };
}

const ConfidenceCircle = ({ value }: { value: number }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke="hsl(var(--primary))" strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{value}%</span>
        <span className="text-[10px] text-primary font-semibold tracking-wide">CONFIDENCE</span>
      </div>
    </div>
  );
};

const DiagnosisCard = ({ result, confidence, condition, description, secondaryIndicators }: DiagnosisCardProps) => {
  return (
    <div className="space-y-6">
      {/* AI Diagnosis */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">AI Diagnosis</h3>
          <StatusBadge status={result === 'Normal' ? 'normal' : 'abnormal'} />
        </div>

        <div className="flex items-start gap-4 mb-6">
          <ConfidenceCircle value={confidence} />
          <div>
            <p className="text-xs font-bold text-primary tracking-wider mb-1">DETECTED CONDITION</p>
            <p className="text-xl font-bold text-foreground mb-1">{condition}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="font-bold text-foreground mb-4">Secondary Indicators</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Infiltration</span>
                <span className="font-semibold">{secondaryIndicators.infiltration}%</span>
              </div>
              <Progress value={secondaryIndicators.infiltration} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Atelectasis</span>
                <span className="font-semibold">{secondaryIndicators.atelectasis}%</span>
              </div>
              <Progress value={secondaryIndicators.atelectasis} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Effusion</span>
                <span className="font-semibold">{secondaryIndicators.effusion}%</span>
              </div>
              <Progress value={secondaryIndicators.effusion} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisCard;
