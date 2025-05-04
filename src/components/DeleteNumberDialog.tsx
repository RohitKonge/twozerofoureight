import React from 'react';

interface DeleteNumberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNumber: (number: number) => void;
  availableNumbers: number[];
}

const DeleteNumberDialog: React.FC<DeleteNumberDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSelectNumber,
  availableNumbers 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-amber-800 text-center mb-4">Delete Tiles</h2>
          <p className="text-center text-amber-700 mb-6">
            Select a number to delete all tiles with that value
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            {availableNumbers.map(number => (
              <button
                key={number}
                onClick={() => onSelectNumber(number)}
                className="bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg text-2xl"
              >
                {number}
              </button>
            ))}
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-white border-2 border-amber-200 text-amber-800 font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:bg-amber-50 mt-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNumberDialog;