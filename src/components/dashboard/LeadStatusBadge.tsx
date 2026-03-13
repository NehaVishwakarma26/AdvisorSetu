import { Badge } from '@/components/ui/Badge';
import { Lead } from '@/types';

const configs: Record<Lead['status'], { variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'brand'; label: string }> = {
  new: { variant: 'info', label: 'New' },
  contacted: { variant: 'warning', label: 'Contacted' },
  accepted: { variant: 'brand', label: 'Accepted' },
  rejected: { variant: 'danger', label: 'Rejected' },
  completed: { variant: 'success', label: 'Completed' },
};

export const LeadStatusBadge = ({ status }: { status: Lead['status'] }) => {
  const { variant, label } = configs[status];
  return <Badge variant={variant}>{label}</Badge>;
};
