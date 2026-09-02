import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { MOCK_FAMILY, MOCK_APPOINTMENTS } from '../constants';
import { Users, Calendar, Video, MapPin, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">{t('welcome')}</h2>
            <p className="text-primary-100 mb-6">{t('subtitle')}</p>
            
            <Link to="/triage" className="inline-flex items-center gap-2 bg-white text-primary-700 px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95">
                <Heart size={18} className="text-red-500 fill-current" />
                {t('start_triage')}
            </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-28">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users size={18} />
            </div>
            <div>
                <span className="text-2xl font-bold text-gray-900">{MOCK_FAMILY.length}</span>
                <p className="text-xs text-gray-500 mt-1">{t('active_members')}</p>
            </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-28">
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <Calendar size={18} />
            </div>
            <div>
                <span className="text-2xl font-bold text-gray-900">{MOCK_APPOINTMENTS.length}</span>
                <p className="text-xs text-gray-500 mt-1">{t('upcoming_appointments')}</p>
            </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <section>
        <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-gray-800">{t('upcoming_appointments')}</h3>
        </div>
        <div className="space-y-3">
            {MOCK_APPOINTMENTS.map(apt => (
                <div key={apt.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="shrink-0 flex flex-col items-center bg-gray-50 rounded-xl px-3 py-2 text-center min-w-[60px]">
                        <span className="text-xs font-bold text-gray-500 uppercase">
                            {new Date(apt.date).toLocaleDateString(language, { month: 'short' })}
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                             {new Date(apt.date).getDate()}
                        </span>
                    </div>
                    
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{apt.doctorName}</h4>
                        <p className="text-xs text-gray-500 mb-2">{apt.specialty}</p>
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                                apt.type === 'video' ? 'bg-indigo-50 text-indigo-700' : 'bg-orange-50 text-orange-700'
                            }`}>
                                {apt.type === 'video' ? <Video size={12}/> : <MapPin size={12}/>}
                                {apt.type === 'video' ? t('consult_video') : t('consult_person')}
                            </span>
                        </div>
                    </div>

                    <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 ${language === 'ar' ? 'rotate-180' : ''}`}>
                        <ChevronRight size={18} />
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Family Members Horizontal Scroll */}
      <section>
        <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-gray-800">{t('active_members')}</h3>
            <button className="text-primary-600 text-sm font-medium">{t('add_member')}</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
            {MOCK_FAMILY.map(member => (
                <div key={member.id} className="snap-start shrink-0 w-32 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm text-center">
                    <div className="w-14 h-14 mx-auto bg-gray-100 rounded-full mb-2 overflow-hidden relative">
                         <img 
                            src={`https://picsum.photos/seed/${member.id}/200`} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                         />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 truncate">{member.name.split(' ')[0]}</h4>
                    <p className="text-xs text-gray-500">{member.relation}</p>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};
