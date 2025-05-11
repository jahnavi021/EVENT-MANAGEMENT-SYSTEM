import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../types';
import { formatDate } from '../utils/dateUtils';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { id, title, description, startDate, location, imageUrl, category, capacity, registeredCount } = event;
  
  // Calculate percentage of capacity filled
  const percentageFilled = Math.round((registeredCount / capacity) * 100);
  
  // Determine capacity status color
  const getCapacityStatusColor = () => {
    if (percentageFilled >= 90) return 'bg-red-500';
    if (percentageFilled >= 70) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Event Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
          {category}
        </div>
      </div>
      
      {/* Event Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{formatDate(startDate)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>
        
        {/* Capacity Indicator */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {registeredCount} / {capacity}
            </span>
            <span>{percentageFilled}% Full</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full ${getCapacityStatusColor()}`} 
              style={{ width: `${percentageFilled}%` }}
            ></div>
          </div>
        </div>
        
        {/* Action Button */}
        <Link 
          to={`/events/${id}`}
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-md transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;