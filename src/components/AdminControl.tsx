import React, { useState, useEffect } from 'react';
import { Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// Allow any logged in user, or specify an array of emails
const ALLOWED_ADMINS = ['plawania05@gmail.com', 'smlddcharitabletrust@gmail.com'];

export function AdminControl() {
  const { isAdmin, setIsAdmin } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email && (ALLOWED_ADMINS.length === 0 || ALLOWED_ADMINS.includes(user.email))) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, [setIsAdmin]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      
      if (email && (ALLOWED_ADMINS.length === 0 || ALLOWED_ADMINS.includes(email))) {
        setIsAdmin(true);
        setIsOpen(false);
        setError('');
      } else {
        setError('Unauthorized email. You do not have admin access.');
        await auth.signOut();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate with Google');
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch(err) {
      console.error(err);
    }
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
              <p className="text-sm text-gray-500 mt-2">Sign in with an authorized Google account to manage website content</p>
            </div>
            
            <div className="space-y-4">
              {error && <p className="text-red-500 text-xs text-center mt-2 font-medium bg-red-50 p-2 rounded">{error}</p>}
              <button 
                onClick={handleLogin}
                className="w-full bg-white border-2 border-gray-200 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
