import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { ScheduleItem } from '../types';
import { formatTime } from '../utils/dateUtils';

interface EventScheduleProps {
  scheduleItems: ScheduleItem[];
}

const EventSchedule: React.FC<EventScheduleProps> = ({ scheduleItems }) => {
  // Sort schedule items by startTime
  const sortedItems = [...scheduleItems].sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Schedule</h2>
      
      <div className="space-y-6">
        {sortedItems.map((item, index) => (
          <div key={item.id} className="relative">
            {/* Timeline connector */}
            {index !== sortedItems.length - 1 && (
              <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
            )}
            
            <div className="flex">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 border-2 border-purple-600 flex items-center justify-center">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
              
              {/* Content */}
              <div className="ml-4 flex-grow">
                <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  
                  <div className="flex flex-wrap gap-y-2 mt-2 text-sm text-gray-600">
                    <div className="flex items-center mr-4">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{formatTime(item.startTime)} - {formatTime(item.endTime)}</span>
                    </div>
                    
                    {item.location && (
                      <div className="flex items-center mr-4">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    
                    {item.speaker && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{item.speaker}</span>
                      </div>
                    )}
                  </div>
                  
                  {item.description && (
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSchedule;