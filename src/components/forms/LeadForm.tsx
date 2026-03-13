'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { useSubmitLead } from '@/hooks/useLeads';
import { useAuth } from '@/hooks/useAuth';
import { DUMMY_INVESTOR } from '@/data/dummy';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  investmentGoal: z.string().min(1, 'Please select a goal'),
  investmentAmount: z.string().min(1, 'Please select an amount'),
  message: z.string().min(10, 'Please write a brief message'),
});

type FormData = z.infer<typeof schema>;

export const LeadForm = ({ advisorId, advisorName }: { advisorId: string; advisorName: string }) => {
  const { user } = useAuth();
  const { mutate, isPending } = useSubmitLead();
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name || DUMMY_INVESTOR.name, email: user?.email || DUMMY_INVESTOR.email, phone: user?.phone || DUMMY_INVESTOR.phone || '' },
  });

  const onSubmit = (data: FormData) => {
    mutate({ advisorId, investorId: user?.id || DUMMY_INVESTOR.id, investorName: data.name, investorEmail: data.email, investorPhone: data.phone, message: data.message, investmentGoal: data.investmentGoal, investmentAmount: data.investmentAmount }, {
      onSuccess: () => setSubmitted(true),
    });
  };

  if (submitted) return (
    <div className="text-center py-10">
      <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="h-7 w-7 text-emerald-600" /></div>
      <h3 className="font-semibold text-slate-900 text-lg">Request Sent!</h3>
      <p className="text-slate-600 text-sm mt-2">Your inquiry has been sent to {advisorName}. They typically respond within 24 hours.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Your Name" placeholder="Rahul Kapoor" error={errors.name?.message} {...register('name')} />
        <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
      </div>
      <Input label="Phone Number" type="tel" placeholder="9876543210" error={errors.phone?.message} {...register('phone')} />
      <Select label="Investment Goal" placeholder="Select your goal" options={[
        { value: 'Wealth Creation', label: 'Wealth Creation' }, { value: 'Retirement', label: 'Retirement Planning' },
        { value: 'Tax Saving', label: 'Tax Saving' }, { value: 'SIP Planning', label: 'SIP Planning' },
        { value: 'Children Education', label: "Children's Education" }, { value: 'Home Purchase', label: 'Home Purchase' },
      ]} error={errors.investmentGoal?.message} {...register('investmentGoal')} />
      <Select label="Investment Amount" placeholder="Select range" options={[
        { value: 'Below 5 Lakhs', label: 'Below ₹5 Lakhs' }, { value: '5-10 Lakhs', label: '₹5 – 10 Lakhs' },
        { value: '10-25 Lakhs', label: '₹10 – 25 Lakhs' }, { value: '25-50 Lakhs', label: '₹25 – 50 Lakhs' },
        { value: '50 Lakhs+', label: '₹50 Lakhs+' }, { value: '1 Cr+', label: '₹1 Crore+' },
      ]} error={errors.investmentAmount?.message} {...register('investmentAmount')} />
      <Textarea label="Message" rows={4} placeholder={`Hi ${advisorName}, I'm looking for advice on...`} error={errors.message?.message} {...register('message')} />
      <Button type="submit" loading={isPending} className="w-full" size="lg">
        <Send className="h-4 w-4" /> Send Inquiry
      </Button>
      <p className="text-xs text-slate-500 text-center">Your information is secure and will only be shared with {advisorName}.</p>
    </form>
  );
};
