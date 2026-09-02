import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { TriageChat } from './pages/TriageChat';
import { FamilyList } from './pages/FamilyList';
import { RecordsVault } from './pages/RecordsVault';
import { MedicationManager } from './pages/MedicationManager';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/triage" element={<TriageChat />} />
            <Route path="/family" element={<FamilyList />} />
            <Route path="/records" element={<RecordsVault />} />
            <Route path="/records/medications" element={<MedicationManager />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
};

export default App;