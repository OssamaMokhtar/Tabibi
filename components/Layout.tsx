import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { Language } from '../types';
import { Home, Stethoscope, Users, FileText, Globe } from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t, language, setLanguage, dir } = useLanguage();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === Language.AR ? Language.EN : Language.AR);
  };

  const navItems = [
    { path: '/', icon: Home, label: t('nav_home') },
    { path: '/triage', icon: Stethoscope, label: t('nav_triage') },
    { path: '/family', icon: Users, label: t('nav_family') },
    { path: '/records', icon: FileText, label: t('nav_records') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${dir === 'rtl' ? 'font-arabic' : 'font-sans'}`}>
      {/* Top Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                    T
                </div>
                <h1 className="text-xl font-bold text-gray-900">Tabibi</h1>
            </div>
            
            <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 bg-gray-100 px-3 py-1.5 rounded-full transition-colors"
            >
                <Globe size={16} />
                {language === Language.AR ? 'English' : 'العربية'}
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-6 px-4 py-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20 md:hidden pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive(item.path) 
                  ? 'text-primary-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Sidebar Navigation (Desktop) - Hidden on mobile */}
      <nav className="hidden md:flex flex-col fixed top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-10 start-0">
          <div className="flex-1 py-6 px-3 space-y-2">
            {navItems.map((item) => (
                <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                    ? 'bg-primary-50 text-primary-700 font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                >
                <item.icon size={20} />
                <span>{item.label}</span>
                </Link>
            ))}
          </div>
      </nav>
      
      {/* Spacer for desktop sidebar */}
      <div className="hidden md:block w-64 fixed top-16 bottom-0 start-0 -z-10"></div>
    </div>
  );
};
