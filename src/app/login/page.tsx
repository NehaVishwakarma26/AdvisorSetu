'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TrendingUp, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';

const schema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      setError('');
      const user = await login(data);
      router.push(user.role === 'advisor' ? '/advisor-dashboard' : '/dashboard');
    } catch (e) {
      setError('Invalid credentials. Try demo: investor@demo.com / any password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-brand-950 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-9 w-9 bg-brand-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900">Advisor<span className="text-brand-600">Setu</span></span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
          <div className="space-y-1">
            <Input label="Password" type={showPw ? 'text' : 'password'} placeholder="••••••••" error={errors.password?.message} {...register('password')} />
            <button type="button" onClick={() => setShowPw(!showPw)} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 ml-auto">
              {showPw ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />} {showPw ? 'Hide' : 'Show'} password
            </button>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}

          <div className="bg-brand-50 border border-brand-200 rounded-lg p-3 text-xs text-brand-700">
            <strong>Demo:</strong> Use any email/password.<br />
            Use <code className="bg-white px-1 rounded">advisor@demo.com</code> to log in as an advisor.
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full" size="lg">Sign In</Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-brand-600 font-medium hover:text-brand-700">Sign up free</Link>
        </div>
      </div>
    </div>
  );
}
