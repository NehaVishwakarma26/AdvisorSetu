'use client';
import Link from 'next/link';
import { TrendingUp, UserCircle, Briefcase, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
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
          <h1 className="font-display text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1">Choose how you want to join</p>
        </div>

        <div className="space-y-4">
          <Link href="/investor/signup" className="flex items-center gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-brand-400 hover:bg-brand-50 transition-all group">
            <div className="h-12 w-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-200 transition-colors">
              <UserCircle className="h-6 w-6 text-brand-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">I'm an Investor</p>
              <p className="text-sm text-slate-500 mt-0.5">Find and connect with advisors</p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-600 transition-colors" />
          </Link>

          <Link href="/advisor-signup" className="flex items-center gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-brand-400 hover:bg-brand-50 transition-all group">
            <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-200 transition-colors">
              <Briefcase className="h-6 w-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">I'm a Financial Advisor</p>
              <p className="text-sm text-slate-500 mt-0.5">Grow your client base</p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-600 transition-colors" />
          </Link>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-600 font-medium hover:text-brand-700">Log in</Link>
        </p>
      </div>
    </div>
  );
}
