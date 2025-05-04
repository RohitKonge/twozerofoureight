import React from 'react';

interface NewGameDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const NewGameDialog: React.FC<NewGameDialogProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-amber-800 text-center mb-2">New Game</h2>
          <p className="text-center text-amber-700 mb-6">
            Are you sure you want to start a new game?<br />
            All progress will be lost.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={onConfirm}
              className="w-full bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg"
            >
              Start New Game
            </button>
            
            <button
              onClick={onCancel}
              className="w-full bg-white border-2 border-amber-200 text-amber-800 font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:bg-amber-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGameDialog;