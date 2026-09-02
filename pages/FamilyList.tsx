import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { MOCK_FAMILY } from '../constants';
import { Plus, HeartPulse, Droplet } from 'lucide-react';

export const FamilyList = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t('active_members')}</h2>
          <button className="bg-primary-600 text-white p-2 rounded-full shadow-md hover:bg-primary-700 transition">
              <Plus size={24} />
          </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MOCK_FAMILY.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4">
            <img 
                src={`https://picsum.photos/seed/${member.id}/200`} 
                alt={member.name}
                className="w-20 h-20 rounded-xl object-cover bg-gray-100"
            />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.relation} • {member.age} {t('age')}</p>
                    </div>
                    {member.bloodType && (
                        <div className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 rounded-lg text-xs font-bold">
                            <Droplet size={10} className="fill-current" />
                            {member.bloodType}
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{t('chronic')}</p>
                    <div className="flex flex-wrap gap-2">
                        {member.chronicConditions.length > 0 ? (
                            member.chronicConditions.map((c: string) => (
                                <span key={c} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium">
                                    {c}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-gray-400 italic flex items-center gap-1">
                                <HeartPulse size={12} />
                                {t('no_chronic')}
                            </span>
                        )}
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
