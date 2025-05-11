export interface User {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'attendee';
  profileImage?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  organizerId: string;
  organizerName: string;
  category: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  capacity: number;
  registeredCount: number;
  ticketTypes: TicketType[];
  scheduleItems: ScheduleItem[];
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
}

export interface ScheduleItem {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  speaker?: string;
}

export interface Attendee {
  id: string;
  userId: string;
  eventId: string;
  name: string;
  email: string;
  ticketTypeId: string;
  ticketTypeName: string;
  registrationDate: string;
  checkInStatus: boolean;
  checkInTime?: string;
}

export interface AnalyticsData {
  totalEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  eventBreakdown: {
    eventId: string;
    eventName: string;
    attendeeCount: number;
    revenue: number;
  }[];
  registrationTrend: {
    date: string;
    count: number;
  }[];
}