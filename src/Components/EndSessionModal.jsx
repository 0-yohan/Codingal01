import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EndSessionModal = ({ isOpen, onClose, onEndSession }) => {
  const [reason, setReason] = useState('');
  const [subReason, setSubReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const handleEndSession = () => {
    let finalReason = reason;
    if (reason === 'interrupted') {
      finalReason += `: ${subReason}`;
      if (subReason === 'other') {
        finalReason += ` - ${otherReason}`;
      }
    }
    onEndSession(finalReason);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-6 z-100">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold pt-8 text-2xl">Select a reason to end class</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-8 w-8 object-right-top" />
            </button>
          </div>
          <div className="space-y-4 pl-4 text-xl">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="reason"
                  value="completed"
                  checked={reason === 'completed'}
                  onChange={(e) => setReason(e.target.value)}
                />
                <span className="ml-2">Class completed</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="reason"
                  value="interrupted"
                  checked={reason === 'interrupted'}
                  onChange={(e) => setReason(e.target.value)}
                />
                <span className="ml-2">Class interrupted/aborted</span>
              </label>
            </div>
            {reason === 'interrupted' && (
              <div className="ml-6 space-y-2 text-lg">
                {['Student didn\'t show up for the class.', 'Student didn\'t show any interest.', 'Student got disconnected.', 'I got disconnected.', 'Other reason'].map((option) => (
                  <div key={option}>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="subReason"
                        value={option.toLowerCase().replace(' ', '_')}
                        checked={subReason === option.toLowerCase().replace(' ', '_')}
                        onChange={(e) => setSubReason(e.target.value)}
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
                {subReason === 'other_reason' && (
                  <textarea
                    className="w-10/12 p-2 h-24 border rounded text-lg"
                    placeholder="Type here"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                  />
                )}
              </div>
            )}
          </div>
          <div className="m-6 flex justify-start space-x-4">
          <button
              onClick={handleEndSession}
              className="px-8 py-2 text-base font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              End class
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndSessionModal;

