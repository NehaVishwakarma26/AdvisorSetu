'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { CITIES } from '@/data/dummy';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  city: z.string().min(1, 'City required'),
  password: z.string().min(8, 'Min 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });
type FormData = z.infer<typeof schema>;

export default function InvestorSignupPage() {
  const { register: authRegister } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await authRegister({ ...data, role: 'investor' });
      router.push('/dashboard');
    } catch { setError('Registration failed. Please try again.'); }
  };

  const benefits = ['Access 2,400+ verified advisors', 'Compare fees and reviews', 'Secure document sharing', 'Track your consultations'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-brand-950 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex">
        {/* Left panel */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-b from-brand-600 to-brand-800 p-10 w-96 flex-shrink-0">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-10">
              <div className="h-9 w-9 bg-white/20 rounded-xl flex items-center justify-center"><TrendingUp className="h-5 w-5 text-white" /></div>
              <span className="font-display font-bold text-xl text-white">AdvisorSetu</span>
            </Link>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Start your financial journey</h2>
            <p className="text-brand-200 text-sm leading-relaxed">Join thousands of investors who found their ideal advisor on AdvisorSetu.</p>
          </div>
          <div className="space-y-3">
            {benefits.map(b => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-brand-300 flex-shrink-0" />
                <span className="text-brand-100 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 p-8">
          <div className="max-w-md mx-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">Create Investor Account</h1>
            <p className="text-slate-500 text-sm mb-6">Fill in your details to get started</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Full Name" placeholder="Rahul Kapoor" error={errors.name?.message} {...register('name')} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
                <Input label="Phone" type="tel" placeholder="9876543210" error={errors.phone?.message} {...register('phone')} />
              </div>
              <Select label="City" placeholder="Select city" options={CITIES.map(c => ({ value: c, label: c }))} error={errors.city?.message} {...register('city')} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
                <Input label="Confirm Password" type="password" placeholder="••••••••" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
              </div>
              {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}
              <p className="text-xs text-slate-500">By signing up you agree to our <Link href="#" className="text-brand-600 hover:underline">Terms of Service</Link> and <Link href="#" className="text-brand-600 hover:underline">Privacy Policy</Link>.</p>
              <Button type="submit" loading={isSubmitting} className="w-full" size="lg">Create Account</Button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-5">
              Already have an account? <Link href="/login" className="text-brand-600 font-medium hover:text-brand-700">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
