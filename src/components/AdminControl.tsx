import React, { useState } from 'react';
import { Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../AppContext';

// Simple passcode for demonstration
const ADMIN_PASSCODE = 'Prasoon@adminsmldd';

export function AdminControl() {
  const { isAdmin, setIsAdmin } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAdmin(true);
      setIsOpen(false);
      setPasscode('');
      setError('');
    } else {
      setError('Incorrect passcode');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isAdmin ? (
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:bg-black hover:scale-105 transition-all outline-none focus:ring-4 focus:ring-gray-300"
            title="Admin Login"
          >
            <Settings size={24} />
          </button>
        ) : (
          <div className="flex flex-col gap-3">
             <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg font-medium flex items-center justify-center gap-2 drop-shadow-xl text-sm">
              <CheckCircle2 size={16} /> Admin Mode Active
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 hover:scale-105 transition-all self-end outline-none focus:ring-4 focus:ring-red-300"
              title="Logout"
            >
              <LogOut size={24} />
            </button>
          </div>
        )}
      </div>

      {isOpen && !isAdmin && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-8 relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
            >
              ×
            </button>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="text-gray-900" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Admin Login</h3>
              <p className="text-sm text-gray-500 mt-2">Enter passcode to manage website content</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input 
                  type="password" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Passcode"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white text-center font-mono tracking-widest text-lg"
                  autoFocus
                />
                {error && <p className="text-red-500 text-xs text-center mt-2 font-medium">{error}</p>}
              </div>
              <button 
                type="submit" 
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-colors"
              >
                Access Admin Panel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
