import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { MOCK_MEDICATIONS, MOCK_FAMILY } from '../constants';
import { Medication, FamilyMember } from '../types';
import { ArrowLeft, Plus, Calendar, User, Clock, Check, X, Pill, AlertCircle, Edit2, Trash2, Users, AlertTriangle } from 'lucide-react';

const UNITS = ['mg', 'mcg', 'g', 'ml', 'L', 'IU', 'tab', 'cap', 'puff', 'drop', 'unit(s)'];

export const MedicationManager = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedMemberId, setSelectedMemberId] = useState<string>('all');
  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDICATIONS);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Split dosage state for the form
  const [dosageValue, setDosageValue] = useState('');
  const [dosageUnit, setDosageUnit] = useState('mg');

  // Form State
  const initialFormState: Partial<Medication> = {
    name: '',
    dosage: '', // We construct this from dosageValue + dosageUnit on save
    frequency: '',
    prescribedBy: '',
    startDate: new Date().toISOString().split('T')[0],
    status: 'active',
    instructions: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const filteredMeds = medications.filter(m => {
    const statusMatch = activeTab === 'active' ? m.status === 'active' : m.status !== 'active';
    const memberMatch = selectedMemberId === 'all' || m.memberId === selectedMemberId;
    return statusMatch && memberMatch;
  });

  const handleSave = () => {
    if (!formData.name || !dosageValue) return;
    
    // Construct the full dosage string
    const finalDosage = `${dosageValue} ${dosageUnit}`;

    const dataToSave = {
        ...formData,
        dosage: finalDosage
    };

    if (editingId) {
      // Update existing
      setMedications(medications.map(med => 
        med.id === editingId ? { ...med, ...dataToSave } as Medication : med
      ));
    } else {
      // Create new
      const newMed: Medication = {
        ...dataToSave as Medication,
        id: Math.random().toString(36).substr(2, 9),
        memberId: selectedMemberId === 'all' ? '1' : selectedMemberId, // Default to first user or selected
      };
      setMedications([newMed, ...medications]);
    }
    
    handleCloseForm();
  };

  const handleEdit = (med: Medication) => {
    setEditingId(med.id);
    
    // Parse existing dosage string (e.g. "500mg" or "500 mg")
    const match = med.dosage.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    if (match) {
        setDosageValue(match[1]);
        setDosageUnit(match[2] || 'mg');
    } else {
        setDosageValue(med.dosage);
        setDosageUnit('mg');
    }

    setFormData({
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      prescribedBy: med.prescribedBy,
      startDate: med.startDate,
      status: med.status,
      instructions: med.instructions || '',
      memberId: med.memberId,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
        ...initialFormState,
        // If specific member is selected in filter, select them in form by default
        memberId: selectedMemberId !== 'all' ? selectedMemberId : MOCK_FAMILY[0].id
    });
    setDosageValue('');
    setDosageUnit('mg');
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormState);
    setDosageValue('');
    setDosageUnit('mg');
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return t('status_active');
      case 'completed': return t('status_completed');
      case 'stopped': return t('status_stopped');
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'stopped': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  // Allergy Check Logic
  const allergyConflict = useMemo(() => {
      if (!showForm || !formData.name) return null;
      
      const targetMemberId = formData.memberId || (selectedMemberId === 'all' ? MOCK_FAMILY[0].id : selectedMemberId);
      const targetMember = MOCK_FAMILY.find(m => m.id === targetMemberId);
      
      if (!targetMember || !targetMember.allergies) return null;

      const conflictingAllergy = targetMember.allergies.find((allergy: string) => 
          formData.name!.toLowerCase().includes(allergy.toLowerCase()) || 
          allergy.toLowerCase().includes(formData.name!.toLowerCase())
      );

      return conflictingAllergy;
  }, [formData.name, formData.memberId, showForm, selectedMemberId]);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/records')}
          className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:text-primary-600"
        >
          <ArrowLeft size={20} className={language === 'ar' ? 'rotate-180' : ''} />
        </button>
        <h2 className="text-xl font-bold text-gray-900 flex-1">{t('medications')}</h2>
        <button 
          onClick={handleAddNew}
          className="bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 shadow-md active:scale-95"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">{t('add_medication')}</span>
        </button>
      </div>

      {/* Family Member Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 snap-x hide-scrollbar">
        <button
          onClick={() => setSelectedMemberId('all')}
          className={`snap-start shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition-all ${
            selectedMemberId === 'all'
              ? 'bg-gray-800 text-white border-gray-800'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
          }`}
        >
          {language === 'ar' ? 'الكل' : 'All'}
        </button>
        {MOCK_FAMILY.map(member => (
          <button
            key={member.id}
            onClick={() => setSelectedMemberId(member.id)}
            className={`snap-start shrink-0 px-4 py-2 rounded-full text-sm font-bold border flex items-center gap-2 transition-all ${
              selectedMemberId === member.id
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <User size={14} />
            {member.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-gray-200 p-1 rounded-xl flex gap-1">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'active' 
              ? 'bg-white text-primary-700 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t('active_meds')}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'history' 
              ? 'bg-white text-gray-800 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t('past_meds')}
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredMeds.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Pill size={48} className="mx-auto mb-3 opacity-30" />
            <p>{t('no_meds')}</p>
          </div>
        ) : (
          filteredMeds.map((med) => (
            <div key={med.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{med.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded-md font-bold">
                        {med.dosage}
                    </span>
                    <span className="text-xs text-gray-500 border-l border-gray-200 pl-2 rtl:pl-0 rtl:pr-2 rtl:border-l-0 rtl:border-r">
                        {med.frequency}
                    </span>
                  </div>
                </div>
                <div className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getStatusColor(med.status)}`}>
                    {getStatusLabel(med.status)}
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                 {med.instructions && (
                    <div className="flex gap-2">
                        <AlertCircle size={14} className="mt-0.5 text-orange-500" />
                        <span className="text-gray-800 font-medium">{med.instructions}</span>
                    </div>
                 )}
                 
                 <div className="flex items-center gap-4 text-xs opacity-80 pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1.5">
                        <User size={12} />
                        <span>{med.prescribedBy}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>{med.startDate}</span>
                    </div>
                 </div>
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 hidden group-hover:flex gap-2">
                <button 
                  onClick={() => handleEdit(med)}
                  className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600"
                >
                    <Edit2 size={14} />
                </button>
                <button onClick={() => handleDelete(med.id)} className="p-1.5 bg-red-50 rounded-full hover:bg-red-100 text-red-600">
                    <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">
                      {editingId ? t('edit') : t('add_medication')}
                    </h3>
                    <button onClick={handleCloseForm} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Member Selection */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{language === 'ar' ? 'فرد العائلة' : 'Family Member'}</label>
                        <select
                           className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500"
                           value={formData.memberId}
                           onChange={e => setFormData({...formData, memberId: e.target.value})}
                        >
                            {MOCK_FAMILY.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{t('med_name_placeholder')}</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500"
                            placeholder="e.g. Panadol"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                        {/* Allergy Warning */}
                        {allergyConflict && (
                          <div className="bg-red-50 text-red-700 p-3 rounded-xl flex items-start gap-2 text-sm mt-2 border border-red-100 animate-in fade-in slide-in-from-top-1">
                             <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                             <div>
                                <p className="font-bold">{t('allergy_warning')} <span className="underline decoration-red-400">{allergyConflict}</span></p>
                             </div>
                          </div>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">{t('dosage')}</label>
                            <div className="flex gap-2">
                              <input 
                                  type="number"
                                  className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500"
                                  placeholder="500"
                                  value={dosageValue}
                                  onChange={e => setDosageValue(e.target.value)}
                              />
                              <select 
                                className="bg-gray-100 border-0 rounded-xl px-2 py-3 focus:ring-2 focus:ring-primary-500 text-sm font-medium"
                                value={dosageUnit}
                                onChange={e => setDosageUnit(e.target.value)}
                              >
                                {UNITS.map(unit => (
                                  <option key={unit} value={unit}>{unit}</option>
                                ))}
                              </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">{t('frequency')}</label>
                            <input 
                                type="text" 
                                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500"
                                placeholder={t('med_freq_placeholder')}
                                value={formData.frequency}
                                onChange={e => setFormData({...formData, frequency: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{t('status_active')}</label>
                        <select
                          className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500"
                          value={formData.status}
                          onChange={e => setFormData({...formData, status: e.target.value as any})}
                        >
                          <option value="active">{t('status_active')}</option>
                          <option value="completed">{t('status_completed')}</option>
                          <option value="stopped">{t('status_stopped')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{t('start_date')}</label>
                        <input 
                          type="date"
                          className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500"
                          value={formData.startDate}
                          onChange={e => setFormData({...formData, startDate: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{t('prescriber')}</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500"
                            placeholder={t('med_doc_placeholder')}
                            value={formData.prescribedBy}
                            onChange={e => setFormData({...formData, prescribedBy: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{t('instructions')}</label>
                        <textarea 
                            className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500"
                            rows={2}
                            value={formData.instructions}
                            onChange={e => setFormData({...formData, instructions: e.target.value})}
                        />
                    </div>

                    <button 
                        onClick={handleSave}
                        className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-primary-700 shadow-lg active:scale-95 transition-all"
                    >
                        {t('save')}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};