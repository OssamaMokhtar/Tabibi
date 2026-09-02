import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { Lock, Unlock, Pill, FileText, Syringe, ShieldCheck } from 'lucide-react';

export const RecordsVault = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(true);
  const [unlocking, setUnlocking] = useState(false);

  const handleUnlock = () => {
    setUnlocking(true);
    // Simulate biometric authentication delay
    setTimeout(() => {
      setIsLocked(false);
      setUnlocking(false);
    }, 1200);
  };

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] p-6 text-center space-y-6">
        <div className="bg-gray-100 p-8 rounded-full mb-4 relative">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full animate-pulse"></div>
          <Lock size={64} className="text-gray-400" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('records_vault')}</h2>
          <p className="text-gray-500 max-w-xs mx-auto mb-6">{t('records_locked')}</p>
          
          <button
            onClick={handleUnlock}
            disabled={unlocking}
            className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold shadow-lg active:scale-95 transition-all flex items-center gap-3 mx-auto"
          >
            {unlocking ? (
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
               <Unlock size={20} />
            )}
            {t('unlock_vault')}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-lg">
          <ShieldCheck size={14} />
          {t('secure_badge')}
        </div>
      </div>
    );
  }

  const sections = [
    {
      id: 'medications',
      title: t('medications'),
      icon: Pill,
      color: 'bg-blue-50 text-blue-600',
      path: '/records/medications',
      count: 3
    },
    {
      id: 'labs',
      title: t('lab_results'),
      icon: FileText,
      color: 'bg-purple-50 text-purple-600',
      path: '#', // Placeholder
      count: 0
    },
    {
      id: 'vaccinations',
      title: t('vaccinations'),
      icon: Syringe,
      color: 'bg-orange-50 text-orange-600',
      path: '#', // Placeholder
      count: 5
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{t('records_vault')}</h2>
        <button 
          onClick={() => setIsLocked(true)}
          className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
        >
          <Lock size={14} />
          {language === 'ar' ? 'قفل' : 'Lock'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={() => section.path !== '#' && navigate(section.path)}
            className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md active:scale-95 cursor-pointer ${section.path === '#' ? 'opacity-60 grayscale' : ''}`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${section.color}`}>
              <section.icon size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
              <p className="text-sm text-gray-500">
                {section.count > 0 ? `${section.count} ${language === 'ar' ? 'سجلات' : 'records'}` : (language === 'ar' ? 'لا يوجد سجلات' : 'No records')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 flex gap-3 items-start">
        <ShieldCheck size={24} className="text-primary-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-primary-800 text-sm mb-1">{t('secure_badge')}</h4>
          <p className="text-xs text-primary-700 opacity-80 leading-relaxed">
            {language === 'ar' 
              ? "يتم تخزين جميع السجلات محلياً وتشفيرها قبل المزامنة السحابية لضمان الخصوصية التامة."
              : "All records are locally stored and encrypted before cloud synchronization to ensure complete privacy."}
          </p>
        </div>
      </div>
    </div>
  );
};