import { Mail, Phone, Calendar, Building, MapPin, Trash2, MessageSquare, GraduationCap } from 'lucide-react';

interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'read' | 'unread';
}

interface TrainingRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  location: string;
  branches: string;
  preferredDate: string;
  message: string;
  createdAt: string;
  status: 'read' | 'unread';
}

interface FormSubmissionsProps {
  contacts: ContactMessage[];
  trainingRequests: TrainingRequest[];
  formSubmissionsTab: 'contact' | 'training';
  setFormSubmissionsTab: (tab: 'contact' | 'training') => void;
  loading: boolean;
  error: string;
  onDeleteContact: (id: string) => void;
  onDeleteTraining: (id: string) => void;
}

export function FormSubmissions({
  contacts,
  trainingRequests,
  formSubmissionsTab,
  setFormSubmissionsTab,
  loading,
  error,
  onDeleteContact,
  onDeleteTraining,
}: FormSubmissionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-900 mb-4">Form Submissions</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setFormSubmissionsTab('contact')}
            className={`px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ${
              formSubmissionsTab === 'contact' ? 'bg-gray-50' : ''
            }`}
          >
            Contact Messages
          </button>
          <button
            onClick={() => setFormSubmissionsTab('training')}
            className={`px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ${
              formSubmissionsTab === 'training' ? 'bg-gray-50' : ''
            }`}
          >
            Training Requests
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-gray-600 text-sm">Loading form submissions...</div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {formSubmissionsTab === 'contact' && (
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
                  <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No contact messages yet</p>
                  <p className="text-sm text-gray-400 mt-2">Form submissions will appear here</p>
                </div>
              ) : (
                contacts.map(contact => (
                  <div key={contact.id} className={`border rounded-2xl p-6 ${
                    contact.status === 'unread' ? 'border-[#005EEA] border-2 bg-blue-50' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-gray-900">{contact.name}</h3>
                          {contact.status === 'unread' && (
                            <span className="bg-blue-100 text-[#005EEA] text-xs px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Mail size={16} />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-1">
                              <Phone size={16} />
                              {contact.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {new Date(contact.createdAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg px-3 py-1 inline-block text-sm text-[#005EEA] mb-3">
                          Subject: {contact.subject}
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                      </div>
                      <button
                        onClick={() => onDeleteContact(contact.id!)}
                        className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                        title="Delete message"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {formSubmissionsTab === 'training' && (
            <div className="space-y-4">
              {trainingRequests.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
                  <GraduationCap size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No training requests yet</p>
                  <p className="text-sm text-gray-400 mt-2">Training bookings will appear here</p>
                </div>
              ) : (
                trainingRequests.map(request => (
                  <div key={request.id} className={`border rounded-2xl p-6 ${
                    request.status === 'unread' ? 'border-[#005EEA] border-2 bg-blue-50' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-gray-900">{request.name}</h3>
                          {request.status === 'unread' && (
                            <span className="bg-blue-100 text-[#005EEA] text-xs px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Mail size={16} />
                            {request.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone size={16} />
                            {request.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building size={16} />
                            {request.businessName}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {request.location}
                          </div>
                          {request.branches && (
                            <div className="flex items-center gap-1">
                              <Building size={16} />
                              {request.branches} staff
                            </div>
                          )}
                          {request.preferredDate && (
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              Preferred: {new Date(request.preferredDate).toLocaleDateString('en-NG')}
                            </div>
                          )}
                          <div className="flex items-center gap-1 col-span-2">
                            <Calendar size={16} />
                            Submitted: {new Date(request.createdAt).toLocaleString()}
                          </div>
                        </div>
                        {request.message && (
                          <div className="bg-gray-50 rounded-lg p-4 mt-3">
                            <p className="text-gray-700 whitespace-pre-wrap">{request.message}</p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onDeleteTraining(request.id!)}
                        className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                        title="Delete request"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
