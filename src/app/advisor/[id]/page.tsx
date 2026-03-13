'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Briefcase, Users, Star, CheckCircle, Clock, Award, Languages, IndianRupee, ChevronRight, Share2, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StarRating } from '@/components/ui/StarRating';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LeadForm } from '@/components/forms/LeadForm';
import { ReviewCard } from '@/components/advisor/ReviewCard';
import { useAdvisor } from '@/hooks/useAdvisors';
import { useReviews } from '@/hooks/useReviews';
import { formatCurrency } from '@/utils/format';

export default function AdvisorProfilePage({ params }: { params: { id: string } }) {
  const { data: advisor, isLoading } = useAdvisor(params.id);
  const { data: reviews = [] } = useReviews(params.id);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'reviews'>('overview');

  if (isLoading) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  if (!advisor) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-bold text-xl text-slate-900">Advisor not found</h2>
          <Link href="/advisors" className="text-brand-600 mt-2 inline-block">Back to advisors</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-700">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/advisors" className="hover:text-slate-700">Advisors</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-900">{advisor.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="relative flex-shrink-0">
                  <Avatar src={advisor.avatar} name={advisor.name} size="xl" />
                  {advisor.isAvailable && <span className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="font-display text-2xl font-bold text-slate-900">{advisor.name}</h1>
                        {advisor.isVerified && <CheckCircle className="h-5 w-5 text-brand-500" />}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-0.5">
                        <MapPin className="h-3.5 w-3.5" /> {advisor.city}
                      </div>
                    </div>
                    <Button variant="outline" size="sm"><Share2 className="h-4 w-4" /> Share</Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <StarRating rating={advisor.rating} size="md" />
                    <span className="text-sm text-slate-500">{advisor.reviewCount} reviews</span>
                    <span className="text-sm text-slate-300">|</span>
                    <div className="flex items-center gap-1 text-sm text-slate-500"><Users className="h-3.5 w-3.5" /> {advisor.clientCount}+ clients</div>
                    <div className="flex items-center gap-1 text-sm text-slate-500"><Briefcase className="h-3.5 w-3.5" /> {advisor.experience} years exp</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {advisor.specializations.map(s => <Badge key={s} variant="brand">{s}</Badge>)}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Clock className="h-4 w-4 text-brand-500" />
                      <span>Responds {advisor.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Languages className="h-4 w-4 text-brand-500" />
                      <span>{advisor.languages.join(', ')}</span>
                    </div>
                    {advisor.aum && <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <IndianRupee className="h-4 w-4 text-brand-500" />
                      <span>AUM: {advisor.aum}</span>
                    </div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-200">
                {(['overview', 'services', 'reviews'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'text-brand-600 border-b-2 border-brand-600 bg-brand-50/50' : 'text-slate-500 hover:text-slate-700'}`}>
                    {tab} {tab === 'reviews' && `(${reviews.length})`}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">About</h3>
                      <p className="text-slate-600 leading-relaxed">{advisor.bio}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Certifications</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {advisor.certifications.map(cert => (
                          <div key={cert.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="h-9 w-9 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Award className="h-5 w-5 text-brand-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm">{cert.name}</p>
                              <p className="text-xs text-slate-500">{cert.issuer} · {cert.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Fee Structure</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="p-3 bg-brand-50 rounded-lg border border-brand-100 text-center">
                          <p className="text-xs text-brand-600 mb-1">Consultation</p>
                          <p className="font-bold text-brand-800">{formatCurrency(advisor.fees.consultationFee)}</p>
                        </div>
                        {advisor.fees.annualFee && <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                          <p className="text-xs text-slate-500 mb-1">Annual Fee</p>
                          <p className="font-bold text-slate-900">{formatCurrency(advisor.fees.annualFee)}</p>
                        </div>}
                        {advisor.fees.aum && <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                          <p className="text-xs text-slate-500 mb-1">AUM Based</p>
                          <p className="font-bold text-slate-900">{advisor.fees.aum}</p>
                        </div>}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="space-y-4">
                    {advisor.services.map(service => (
                      <div key={service.id} className="flex items-start justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-start gap-3">
                          <div className="h-9 w-9 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <BookOpen className="h-4 w-4 text-brand-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{service.name}</p>
                            <p className="text-sm text-slate-600 mt-0.5">{service.description}</p>
                            <p className="text-xs text-slate-400 mt-1">{service.duration}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {service.price && <p className="font-bold text-slate-900">{formatCurrency(service.price)}</p>}
                          <Button size="sm" className="mt-2">Book</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <p className="text-center text-slate-500 py-8">No reviews yet. Be the first to review!</p>
                    ) : (
                      reviews.map(review => <ReviewCard key={review.id} review={review} />)
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact Card */}
            <div id="contact" className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-display font-bold text-slate-900 mb-1">Connect with {advisor.name.split(' ')[0]}</h3>
              <p className="text-sm text-slate-500 mb-5">Send your inquiry and get a response within {advisor.responseTime}</p>
              <LeadForm advisorId={advisor.id} advisorName={advisor.name} />
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h4 className="font-semibold text-slate-900 mb-3">Quick Stats</h4>
              <div className="space-y-3">
                {[
                  { label: 'Experience', value: advisor.experience + ' years' },
                  { label: 'Total Clients', value: advisor.clientCount + '+' },
                  { label: 'Avg Rating', value: advisor.rating.toFixed(1) + '/5.0' },
                  { label: 'Response Time', value: advisor.responseTime },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-medium text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
