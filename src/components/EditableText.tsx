import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { ContentState } from '../types';

interface EditableTextProps {
  section: keyof ContentState;
  field: string;
  multiline?: boolean;
  className?: string;
  as?: any;
}

export function EditableText({ section, field, multiline, className = '', as: Component = 'p' }: EditableTextProps) {
  const { content, updateContent, isAdmin } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  
  const initialValue = (content[section] as any)[field] || '';
  const [val, setVal] = useState(initialValue);

  if (!isAdmin) {
    return <Component className={className}>{initialValue}</Component>;
  }

  if (isEditing) {
    return (
      <div className={`relative block w-full z-10 bg-white/5 p-2 rounded -m-2`}>
        {multiline ? (
          <textarea 
            className="w-full bg-white text-black border p-2 rounded outline-none" 
            value={val} 
            onChange={e => setVal(e.target.value)}
            rows={4}
          />
        ) : (
          <input 
            className="w-full bg-white text-black border p-2 rounded outline-none" 
            value={val} 
            onChange={e => setVal(e.target.value)}
          />
        )}
        <div className="flex gap-2 mt-2">
          <button 
            onClick={() => { updateContent(section, field, val); setIsEditing(false); }} 
            className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded transition-colors"
          >
            <Check size={16} />
          </button>
          <button 
            onClick={() => { setVal(initialValue); setIsEditing(false); }} 
            className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative inline-block w-full">
      <Component className={className}>{initialValue}</Component>
      <button 
        onClick={() => setIsEditing(true)} 
        className="absolute -top-4 -right-4 bg-blue-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md z-10"
        title="Edit text"
      >
        <Pencil size={14} />
      </button>
    </div>
  );
}
