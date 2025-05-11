import React, { useState } from 'react';
import { PlusCircle, MinusCircle, Ticket, DollarSign } from 'lucide-react';
import { TicketType } from '../types';

interface TicketSelectorProps {
  ticketTypes: TicketType[];
  onSubmit: (ticketTypeId: string) => void;
  isProcessing?: boolean;
}

const TicketSelector: React.FC<TicketSelectorProps> = ({ 
  ticketTypes, 
  onSubmit,
  isProcessing = false
}) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string>('');

  // Filter out sold out tickets
  const availableTickets = ticketTypes.filter(ticket => ticket.sold < ticket.quantity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicketId) {
      onSubmit(selectedTicketId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Tickets</h2>
      
      {availableTickets.length === 0 ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
          <p className="text-red-600 font-medium">Sorry, all tickets are sold out!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            {availableTickets.map((ticket) => {
              const isSelected = selectedTicketId === ticket.id;
              const remainingTickets = ticket.quantity - ticket.sold;
              
              return (
                <div 
                  key={ticket.id}
                  className={`border rounded-lg p-4 transition-all ${
                    isSelected 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedTicketId(ticket.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 flex items-center">
                        <Ticket className="h-4 w-4 mr-2 text-purple-600" />
                        {ticket.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                      
                      <div className="mt-2 text-sm text-gray-500">
                        {remainingTickets} tickets remaining
                      </div>
                    </div>
                    
                    <div className="text-xl font-bold text-gray-800 flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-600" />
                      {ticket.price.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    <input
                      type="radio"
                      id={`ticket-${ticket.id}`}
                      name="ticketType"
                      value={ticket.id}
                      checked={isSelected}
                      onChange={() => setSelectedTicketId(ticket.id)}
                      className="h-5 w-5 text-purple-600 focus:ring-purple-500"
                    />
                    <label 
                      htmlFor={`ticket-${ticket.id}`}
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Select this ticket
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button
            type="submit"
            disabled={!selectedTicketId || isProcessing}
            className={`w-full py-3 px-4 rounded-md font-medium text-white ${
              selectedTicketId && !isProcessing
                ? 'bg-purple-600 hover:bg-purple-700 transition-colors'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Continue to Registration'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default TicketSelector;