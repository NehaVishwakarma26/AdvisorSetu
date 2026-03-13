import Link from 'next/link';
import { TrendingUp, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-slate-900 text-slate-400">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 bg-brand-600 rounded-lg flex items-center justify-center"><TrendingUp className="h-4 w-4 text-white" /></div>
            <span className="font-display font-bold text-lg text-white">Advisor<span className="text-brand-400">Setu</span></span>
          </div>
          <p className="text-sm leading-relaxed">India's most trusted platform connecting investors with SEBI-registered financial advisors and mutual fund distributors.</p>
          <div className="flex gap-3 mt-4">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="h-8 w-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-white mb-4">For Investors</h4>
          <ul className="space-y-2 text-sm">{['Find Advisors','Browse by City','How It Works','Investor Guide'].map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}</ul>
        </div>
        <div>
          <h4 className="font-medium text-white mb-4">For Advisors</h4>
          <ul className="space-y-2 text-sm">{['Join as Advisor','Advisor Dashboard','Pricing','Success Stories'].map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}</ul>
        </div>
        <div>
          <h4 className="font-medium text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">{['About Us','Blog','Careers','Contact','Privacy Policy','Terms of Service'].map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}</ul>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
        <p>© 2024 AdvisorSetu. All rights reserved. SEBI Reg. No. Example.</p>
        <p>Investments are subject to market risks. Please read all scheme documents carefully.</p>
      </div>
    </div>
  </footer>
);
