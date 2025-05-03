import React, { useState } from 'react';
import { HelpCircle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, X } from 'lucide-react';

const GameInstructions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-4 right-4 bg-amber-500 text-white p-2 rounded-full shadow-lg hover:bg-amber-600 transition-colors"
        aria-label="Game Instructions"
      >
        <HelpCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close instructions"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-amber-800 mb-4">How to Play 2048</h2>
            
            <div className="space-y-4">
              <p>
                Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one!
              </p>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Controls:</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <ArrowUp className="text-amber-700 mr-2" size={20} />
                    <span>Move tiles up</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowDown className="text-amber-700 mr-2" size={20} />
                    <span>Move tiles down</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowLeft className="text-amber-700 mr-2" size={20} />
                    <span>Move tiles left</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="text-amber-700 mr-2" size={20} />
                    <span>Move tiles right</span>
                  </div>
                </div>
              </div>
              
              <p>
                On mobile devices, you can swipe in any direction to move the tiles.
              </p>
              
              <h3 className="font-bold">Goal:</h3>
              <p>
                Join the tiles to create a tile with the number <span className="font-bold text-amber-600">2048</span>!
              </p>
              
              <p className="text-sm text-gray-600 italic">
                Keep going even after reaching 2048 for a higher score!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameInstructions;