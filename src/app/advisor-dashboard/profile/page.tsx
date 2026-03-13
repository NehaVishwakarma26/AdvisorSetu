'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, CheckCircle, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { DUMMY_ADVISORS, CITIES, SPECIALIZATIONS } from '@/data/dummy';
import { useAuth } from '@/hooks/useAuth';

export default function AdvisorProfilePage() {
  const { user } = useAuth();
  const advisor = DUMMY_ADVISORS[0];
  const [specializations, setSpecializations] = useState(advisor.specializations);
  const [languages, setLanguages] = useState(advisor.languages);
  const [saved, setSaved] = useState(false);
  const [newSpec, setNewSpec] = useState('');
  const [newLang, setNewLang] = useState('');

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { name: advisor.name, city: advisor.city, experience: String(advisor.experience), bio: advisor.bio, consultationFee: String(advisor.fees.consultationFee), responseTime: advisor.responseTime },
  });

  const onSubmit = async (data: any) => {
    await new Promise(r => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Edit Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Update your professional information</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-sm">
            <CheckCircle className="h-4 w-4" /> Profile saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Profile Photo</h3>
          <div className="flex items-center gap-4">
            <Avatar src={advisor.avatar} name={advisor.name} size="xl" />
            <div>
              <Button type="button" variant="outline" size="sm">Upload Photo</Button>
              <p className="text-xs text-slate-500 mt-1.5">JPG, PNG up to 2MB. Square crop recommended.</p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" {...register('name')} />
            <Select label="City" options={CITIES.map(c => ({ value: c, label: c }))} {...register('city')} />
            <Input label="Years of Experience" type="number" {...register('experience')} />
            <Input label="Response Time" placeholder="e.g. < 2 hours" {...register('responseTime')} />
          </div>
          <div className="mt-4">
            <Textarea label="Professional Bio" rows={5} {...register('bio')} />
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Specializations</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {specializations.map(s => (
              <Badge key={s} variant="brand" className="gap-1.5">
                {s}
                <button type="button" onClick={() => setSpecializations(prev => prev.filter(x => x !== s))} className="hover:text-red-500 transition-colors"><Trash2 className="h-3 w-3" /></button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <select value={newSpec} onChange={e => setNewSpec(e.target.value)} className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400">
              <option value="">Add specialization...</option>
              {SPECIALIZATIONS.filter(s => !specializations.includes(s)).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <Button type="button" variant="outline" size="sm" onClick={() => { if (newSpec) { setSpecializations(prev => [...prev, newSpec]); setNewSpec(''); } }}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Languages</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {languages.map(l => (
              <Badge key={l} variant="default" className="gap-1.5">
                {l}
                <button type="button" onClick={() => setLanguages(prev => prev.filter(x => x !== l))}><Trash2 className="h-3 w-3" /></button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add language..." value={newLang} onChange={e => setNewLang(e.target.value)} />
            <Button type="button" variant="outline" size="sm" onClick={() => { if (newLang.trim()) { setLanguages(prev => [...prev, newLang.trim()]); setNewLang(''); } }}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        </div>

        {/* Fees */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Fee Structure</h3>
          <Input label="Consultation Fee (₹)" type="number" {...register('consultationFee')} />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit" loading={isSubmitting}><Save className="h-4 w-4" /> Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
