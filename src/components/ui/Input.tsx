import { cn } from '@/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; hint?: string; leftIcon?: React.ReactNode; }

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, hint, leftIcon, ...props }, ref) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <div className="relative">
      {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">{leftIcon}</div>}
      <input ref={ref} className={cn('block w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors', leftIcon && 'pl-10', error ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-slate-300 focus:border-brand-400 focus:ring-brand-100', className)} {...props} />
    </div>
    {error && <p className="text-xs text-red-600">{error}</p>}
    {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
  </div>
));
Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { label?: string; error?: string; options: { value: string; label: string }[]; placeholder?: string; }
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, error, options, placeholder, className, ...props }, ref) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <select ref={ref} className={cn('block w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-colors', error ? 'border-red-300 focus:ring-red-100' : 'border-slate-300 focus:border-brand-400 focus:ring-brand-100', className)} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
));
Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { label?: string; error?: string; }
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className, ...props }, ref) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <textarea ref={ref} className={cn('block w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 resize-none transition-colors', error ? 'border-red-300 focus:ring-red-100' : 'border-slate-300 focus:border-brand-400 focus:ring-brand-100', className)} {...props} />
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
));
Textarea.displayName = 'Textarea';
