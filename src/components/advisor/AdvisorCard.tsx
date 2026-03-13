'use client';
import Link from 'next/link';
import { MapPin, Star, Briefcase, Users, CheckCircle, Heart, Clock } from 'lucide-react';
import { Advisor } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';
import { useSavedStore } from '@/store/savedAdvisorsStore';
import { cn } from '@/utils/cn';

interface AdvisorCardProps { advisor: Advisor; }

export const AdvisorCard = ({ advisor }: AdvisorCardProps) => {
  const { toggleSave, isSaved } = useSavedStore();
  const saved = isSaved(advisor.id);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-200 overflow-hidden group">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar src={advisor.avatar} name={advisor.name} size="lg" />
              {advisor.isAvailable && <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-white" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">{advisor.name}</h3>
                {advisor.isVerified && <CheckCircle className="h-4 w-4 text-brand-500 flex-shrink-0" />}
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                <MapPin className="h-3 w-3" />{advisor.city}
              </div>
              <StarRating rating={advisor.rating} size="sm" className="mt-1" />
            </div>
          </div>
          <button onClick={() => toggleSave(advisor.id)} className={cn('p-1.5 rounded-lg transition-colors flex-shrink-0', saved ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-red-400 hover:bg-red-50')}>
            <Heart className={cn('h-4 w-4', saved && 'fill-current')} />
          </button>
        </div>

        <p className="text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">{advisor.bio}</p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {advisor.specializations.slice(0, 3).map(spec => (
            <Badge key={spec} variant="brand" className="text-xs">{spec}</Badge>
          ))}
          {advisor.specializations.length > 3 && <Badge variant="default">+{advisor.specializations.length - 3}</Badge>}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-slate-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-500 text-xs mb-0.5"><Briefcase className="h-3 w-3" />Exp</div>
            <p className="font-semibold text-slate-900 text-sm">{advisor.experience}y</p>
          </div>
          <div className="text-center border-x border-slate-200">
            <div className="flex items-center justify-center gap-1 text-slate-500 text-xs mb-0.5"><Users className="h-3 w-3" />Clients</div>
            <p className="font-semibold text-slate-900 text-sm">{advisor.clientCount}+</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-500 text-xs mb-0.5"><Star className="h-3 w-3" />Reviews</div>
            <p className="font-semibold text-slate-900 text-sm">{advisor.reviewCount}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xs text-slate-500">Consultation fee</p>
            <p className="font-semibold text-slate-900">₹{advisor.fees.consultationFee.toLocaleString('en-IN')}</p>
          </div>
          <div className="flex gap-2">
            <Link href={'/advisor/' + advisor.id}>
              <Button variant="outline" size="sm">View Profile</Button>
            </Link>
            <Link href={'/advisor/' + advisor.id + '#contact'}>
              <Button size="sm">Connect</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
