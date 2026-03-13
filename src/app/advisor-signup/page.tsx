'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { CITIES, SPECIALIZATIONS } from '@/data/dummy';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  city: z.string().min(1, 'City required'),
  sebiRegNo: z.string().optional(),
  experience: z.string().min(1, 'Experience required'),
  bio: z.string().min(50, 'Please write at least 50 characters'),
  password: z.string().min(8, 'Min 8 characters'),
});
type FormData = z.infer<typeof schema>;

export default function AdvisorSignupPage() {
  const { register: authRegister } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await authRegister({ name: data.name, email: data.email, phone: data.phone, city: data.city, password: data.password, role: 'advisor' });
      router.push('/advisor-dashboard');
    } catch { setError('Registration failed. Please try again.'); }
  };

  const benefits = ['Get quality investor leads', 'Showcase certifications', 'Manage consultations easily', 'Analytics dashboard'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-teal-950 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-b from-teal-600 to-brand-800 p-10 w-96 flex-shrink-0">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-10">
              <div className="h-9 w-9 bg-white/20 rounded-xl flex items-center justify-center"><TrendingUp className="h-5 w-5 text-white" /></div>
              <span className="font-display font-bold text-xl text-white">AdvisorSetu</span>
            </Link>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Grow your practice</h2>
            <p className="text-teal-200 text-sm leading-relaxed">Join 2,400+ advisors and get quality leads from verified investors on India's top advisor marketplace.</p>
          </div>
          <div className="space-y-3">
            {benefits.map(b => (
              <div key={b} className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-teal-300 flex-shrink-0" /><span className="text-teal-100 text-sm">{b}</span></div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-md mx-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">Create Advisor Account</h1>
            <p className="text-slate-500 text-sm mb-6">Tell us about yourself and your practice</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Full Name" placeholder="Rajesh Mehta" error={errors.name?.message} {...register('name')} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Email" type="email" placeholder="advisor@example.com" error={errors.email?.message} {...register('email')} />
                <Input label="Phone" type="tel" placeholder="9876543210" error={errors.phone?.message} {...register('phone')} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Select label="City" placeholder="Select city" options={CITIES.map(c => ({ value: c, label: c }))} error={errors.city?.message} {...register('city')} />
                <Select label="Experience" placeholder="Years" options={['1-3','4-6','7-10','10-15','15+'].map(v => ({ value: v, label: v + ' years' }))} error={errors.experience?.message} {...register('experience')} />
              </div>
              <Input label="SEBI Registration No. (optional)" placeholder="INA000012345" hint="Leave blank if you are an MFD without SEBI RIA" {...register('sebiRegNo')} />
              <Textarea label="Professional Bio" rows={4} placeholder="Describe your experience, approach, and specializations..." error={errors.bio?.message} {...register('bio')} />
              <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
              {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}
              <Button type="submit" loading={isSubmitting} className="w-full" size="lg">Create Advisor Account</Button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-5">
              Already registered? <Link href="/login" className="text-brand-600 font-medium hover:text-brand-700">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
