import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'operational' | 'idle' | 'normal' | 'abnormal';
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const configs = {
    operational: {
      label: 'System Operational',
      dotClass: 'bg-success',
      badgeClass: 'border-border bg-card text-foreground',
    },
    idle: {
      label: 'Idle',
      dotClass: '',
      badgeClass: 'border-primary/30 bg-primary/5 text-primary',
    },
    normal: {
      label: 'Normal',
      dotClass: '',
      badgeClass: 'border-success/30 bg-success/5 text-success font-semibold',
    },
    abnormal: {
      label: 'Abnormal',
      dotClass: '',
      badgeClass: 'border-destructive/30 bg-destructive/5 text-destructive font-semibold',
    },
  };

  const config = configs[status];

  return (
    <span className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm', config.badgeClass, className)}>
      {config.dotClass && <span className={cn('w-2 h-2 rounded-full', config.dotClass)} />}
      {status === 'abnormal' && <span className="text-xs">⚠</span>}
      {config.label}
    </span>
  );
};

export default StatusBadge;
