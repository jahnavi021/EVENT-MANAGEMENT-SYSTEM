import React, { createContext, useState, useContext, useEffect } from 'react';
import { Event, TicketType, ScheduleItem, Attendee, AnalyticsData } from '../types';
import { mockEvents } from '../data/mockData';

interface EventContextType {
  events: Event[];
  loading: boolean;
  createEvent: (eventData: Omit<Event, 'id' | 'registeredCount'>) => Promise<Event>;
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;
  getEventById: (id: string) => Event | undefined;
  getEventsByOrganizer: (organizerId: string) => Event[];
  registerForEvent: (eventId: string, ticketTypeId: string, attendeeData: { name: string; email: string }) => Promise<void>;
  getEventAttendees: (eventId: string) => Promise<Attendee[]>;
  getAnalytics: (organizerId: string) => Promise<AnalyticsData>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  // Load initial data
  useEffect(() => {
    // In a real app, you would fetch events from your Spring Boot API
    setEvents(mockEvents);
    
    // Generate mock attendees
    const mockAttendees: Attendee[] = [];
    mockEvents.forEach(event => {
      for (let i = 0; i < Math.floor(Math.random() * 30); i++) {
        const ticketType = event.ticketTypes[Math.floor(Math.random() * event.ticketTypes.length)];
        mockAttendees.push({
          id: Math.random().toString(36).substr(2, 9),
          userId: Math.random().toString(36).substr(2, 9),
          eventId: event.id,
          name: `Attendee ${i}`,
          email: `attendee${i}@example.com`,
          ticketTypeId: ticketType.id,
          ticketTypeName: ticketType.name,
          registrationDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          checkInStatus: Math.random() > 0.5,
          checkInTime: Math.random() > 0.5 ? new Date().toISOString() : undefined
        });
      }
    });
    setAttendees(mockAttendees);
    
    setLoading(false);
  }, []);

  const createEvent = async (eventData: Omit<Event, 'id' | 'registeredCount'>): Promise<Event> => {
    // In a real app, this would be an API call to your Spring Boot backend
    const newEvent: Event = {
      ...eventData,
      id: Math.random().toString(36).substr(2, 9),
      registeredCount: 0
    };
    
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
    // In a real app, this would be an API call to your Spring Boot backend
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, ...eventData } : event
    );
    
    setEvents(updatedEvents);
    const updatedEvent = updatedEvents.find(e => e.id === id);
    
    if (!updatedEvent) {
      throw new Error('Event not found');
    }
    
    return updatedEvent;
  };

  const deleteEvent = async (id: string): Promise<void> => {
    // In a real app, this would be an API call to your Spring Boot backend
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const getEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };

  const getEventsByOrganizer = (organizerId: string): Event[] => {
    return events.filter(event => event.organizerId === organizerId);
  };

  const registerForEvent = async (
    eventId: string, 
    ticketTypeId: string, 
    attendeeData: { name: string; email: string }
  ): Promise<void> => {
    // In a real app, this would be an API call to your Spring Boot backend
    
    // Update ticket counts
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        const updatedTicketTypes = event.ticketTypes.map(ticket => {
          if (ticket.id === ticketTypeId) {
            return { ...ticket, sold: ticket.sold + 1 };
          }
          return ticket;
        });
        
        return {
          ...event,
          ticketTypes: updatedTicketTypes,
          registeredCount: event.registeredCount + 1
        };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    
    // Add attendee
    const event = events.find(e => e.id === eventId);
    const ticketType = event?.ticketTypes.find(t => t.id === ticketTypeId);
    
    if (!event || !ticketType) {
      throw new Error('Event or ticket type not found');
    }
    
    const newAttendee: Attendee = {
      id: Math.random().toString(36).substr(2, 9),
      userId: Math.random().toString(36).substr(2, 9),
      eventId,
      name: attendeeData.name,
      email: attendeeData.email,
      ticketTypeId,
      ticketTypeName: ticketType.name,
      registrationDate: new Date().toISOString(),
      checkInStatus: false
    };
    
    setAttendees(prev => [...prev, newAttendee]);
  };

  const getEventAttendees = async (eventId: string): Promise<Attendee[]> => {
    // In a real app, this would be an API call to your Spring Boot backend
    return attendees.filter(attendee => attendee.eventId === eventId);
  };

  const getAnalytics = async (organizerId: string): Promise<AnalyticsData> => {
    // In a real app, this would be an API call to your Spring Boot backend
    const organizerEvents = events.filter(event => event.organizerId === organizerId);
    
    // Calculate total revenue
    let totalRevenue = 0;
    const eventBreakdown = organizerEvents.map(event => {
      let eventRevenue = 0;
      event.ticketTypes.forEach(ticket => {
        eventRevenue += ticket.price * ticket.sold;
      });
      
      totalRevenue += eventRevenue;
      
      return {
        eventId: event.id,
        eventName: event.title,
        attendeeCount: event.registeredCount,
        revenue: eventRevenue
      };
    });
    
    // Generate mock registration trend data
    const today = new Date();
    const registrationTrend = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      registrationTrend.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 20)
      });
    }
    
    return {
      totalEvents: organizerEvents.length,
      totalAttendees: organizerEvents.reduce((sum, event) => sum + event.registeredCount, 0),
      totalRevenue,
      eventBreakdown,
      registrationTrend
    };
  };

  return (
    <EventContext.Provider value={{
      events,
      loading,
      createEvent,
      updateEvent,
      deleteEvent,
      getEventById,
      getEventsByOrganizer,
      registerForEvent,
      getEventAttendees,
      getAnalytics
    }}>
      {children}
    </EventContext.Provider>
  );
};