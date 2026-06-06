import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { NewsItem } from '../types';
import { Plus, Edit2, Trash2, Calendar, X } from 'lucide-react';

export function LatestNews() {
  const { content, isAdmin, addNews, editNews, deleteNews } = useAppContext();
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showConfirmId, setShowConfirmId] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const item: NewsItem = {
      id: editingItem?.id || Date.now().toString(),
      date: formData.get('date') as string,
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      imageUrl: formData.get('imageUrl') as string || 'https://images.unsplash.com/photo-1593113563332-e147ce367eee?auto=format&fit=crop&q=80&w=600'
    };

    if (isAdding) {
      addNews(item);
    } else {
      editNews(item.id, item);
    }
    
    setIsAdding(false);
    setEditingItem(null);
  };

  const NewsFormModal = () => {
    if (!isAdding && !editingItem) return null;
    const item = editingItem || { title: '', content: '', imageUrl: '', date: new Date().toLocaleDateString('en-GB') };

    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative">
          <button 
            onClick={() => { setIsAdding(false); setEditingItem(null); }}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
          >
            <X size={24} />
          </button>
          
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              {isAdding ? 'Add Update' : 'Edit Update'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input name="date" defaultValue={item.date} required className="w-full border-gray-300 rounded-lg p-2.5 border outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input name="title" defaultValue={item.title} required className="w-full border-gray-300 rounded-lg p-2.5 border outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input name="imageUrl" defaultValue={item.imageUrl} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea name="content" defaultValue={item.content} required rows={4} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => { setIsAdding(false); setEditingItem(null); }} className="px-5 py-2.5 font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2.5 font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm">Save Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="updates" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Latest News & Updates</h2>
            <p className="text-gray-600 mt-3 text-lg">Stay informed about our recent activities and events.</p>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-sm transition-colors"
            >
              <Plus size={20} />
              Add Update
            </button>
          )}
        </div>

        {content.news.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No updates posted yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.news.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-gray-100">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-sm font-medium text-blue-600 mb-3 block">{item.date}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">{item.title}</h3>
                  <p className="text-gray-600 mb-6 flex-1">{item.content}</p>
                  
                  {isAdmin && (
                    <div className="pt-4 mt-auto border-t border-gray-100 flex justify-end space-x-2">
                      <button 
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit Update"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => setShowConfirmId(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Update"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                  
                  {/* Delete Confirmation Inline */}
                  {showConfirmId === item.id && (
                    <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                      <Trash2 className="h-10 w-10 text-red-500 mb-4" />
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Delete Update?</h4>
                      <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
                      <div className="flex gap-3">
                        <button onClick={() => setShowConfirmId(null)} className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button onClick={() => { deleteNews(item.id); setShowConfirmId(null); }} className="px-4 py-2 font-medium bg-red-600 text-white hover:bg-red-700 rounded-lg">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <NewsFormModal />
    </section>
  );
}
