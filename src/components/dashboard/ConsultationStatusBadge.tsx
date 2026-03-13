import { Badge } from '@/components/ui/Badge';
import { Consultation } from '@/types';

const configs: Record<Consultation['status'], { variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'brand'; label: string }> = {
  pending: { variant: 'warning', label: 'Pending' },
  confirmed: { variant: 'brand', label: 'Confirmed' },
  completed: { variant: 'success', label: 'Completed' },
  cancelled: { variant: 'danger', label: 'Cancelled' },
};

export const ConsultationStatusBadge = ({ status }: { status: Consultation['status'] }) => {
  const { variant, label } = configs[status];
  return <Badge variant={variant}>{label}</Badge>;
};
