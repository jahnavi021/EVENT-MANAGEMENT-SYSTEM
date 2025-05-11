import { Event } from '../types';

// Mock events data
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year. Meet industry leaders, attend workshops, and network with professionals from around the world.',
    startDate: '2025-04-15T09:00:00Z',
    endDate: '2025-04-17T18:00:00Z',
    location: 'Convention Center, New York, NY',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizerId: '1',
    organizerName: 'Tech Events Inc.',
    category: 'Technology',
    status: 'published',
    capacity: 1000,
    registeredCount: 450,
    ticketTypes: [
      {
        id: '101',
        name: 'Early Bird',
        description: 'Limited availability at discounted price',
        price: 299.99,
        quantity: 200,
        sold: 200
      },
      {
        id: '102',
        name: 'Regular',
        description: 'Standard conference pass with access to all sessions',
        price: 499.99,
        quantity: 600,
        sold: 250
      },
      {
        id: '103',
        name: 'VIP',
        description: 'Premium pass with exclusive networking events and premium seating',
        price: 999.99,
        quantity: 200,
        sold: 0
      }
    ],
    scheduleItems: [
      {
        id: '1001',
        title: 'Registration & Breakfast',
        startTime: '2025-04-15T08:00:00Z',
        endTime: '2025-04-15T09:00:00Z',
        location: 'Main Hall'
      },
      {
        id: '1002',
        title: 'Keynote: Future of AI',
        description: 'An inspiring talk about where AI is headed in the next decade',
        startTime: '2025-04-15T09:30:00Z',
        endTime: '2025-04-15T10:30:00Z',
        location: 'Main Stage',
        speaker: 'Dr. Jane Smith, AI Research Lead'
      },
      {
        id: '1003',
        title: 'Workshop: Blockchain Development',
        description: 'Hands-on session building decentralized applications',
        startTime: '2025-04-15T11:00:00Z',
        endTime: '2025-04-15T13:00:00Z',
        location: 'Workshop Room A',
        speaker: 'Mike Johnson, Blockchain Expert'
      }
    ]
  },
  {
    id: '2',
    title: 'Wedding Expo 2025',
    description: 'Everything you need for your perfect wedding day. Meet vendors, see fashion shows, and get inspired for your special day.',
    startDate: '2025-05-20T10:00:00Z',
    endDate: '2025-05-21T17:00:00Z',
    location: 'Grand Hotel, Chicago, IL',
    imageUrl: 'https://images.pexels.com/photos/1779415/pexels-photo-1779415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizerId: '2',
    organizerName: 'Weddings & More',
    category: 'Wedding',
    status: 'published',
    capacity: 500,
    registeredCount: 325,
    ticketTypes: [
      {
        id: '201',
        name: 'General Admission',
        description: 'Access to all exhibits and fashion shows',
        price: 25.00,
        quantity: 400,
        sold: 300
      },
      {
        id: '202',
        name: 'VIP Package',
        description: 'Priority access, goody bag, and champagne reception',
        price: 75.00,
        quantity: 100,
        sold: 25
      }
    ],
    scheduleItems: [
      {
        id: '2001',
        title: 'Doors Open',
        startTime: '2025-05-20T10:00:00Z',
        endTime: '2025-05-20T10:30:00Z',
        location: 'Main Entrance'
      },
      {
        id: '2002',
        title: 'Bridal Fashion Show',
        description: 'Latest wedding dress trends for 2025',
        startTime: '2025-05-20T11:00:00Z',
        endTime: '2025-05-20T12:00:00Z',
        location: 'Center Stage',
        speaker: 'Hosted by Emma White'
      },
      {
        id: '2003',
        title: 'Cake Tasting Session',
        description: 'Sample delicious wedding cakes from top bakers',
        startTime: '2025-05-20T14:00:00Z',
        endTime: '2025-05-20T15:30:00Z',
        location: 'Culinary Pavilion'
      }
    ]
  },
  {
    id: '3',
    title: 'Business Leadership Summit',
    description: 'A premier gathering for business leaders to discuss strategies, innovations, and future trends in business management.',
    startDate: '2025-06-10T08:30:00Z',
    endDate: '2025-06-12T17:00:00Z',
    location: 'Business Center, San Francisco, CA',
    imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizerId: '1',
    organizerName: 'Tech Events Inc.',
    category: 'Business',
    status: 'published',
    capacity: 750,
    registeredCount: 200,
    ticketTypes: [
      {
        id: '301',
        name: 'Executive Pass',
        description: 'Full access to all summit sessions and executive networking events',
        price: 899.99,
        quantity: 500,
        sold: 180
      },
      {
        id: '302',
        name: 'Team Package',
        description: 'Access for a team of 5 people at a discounted rate',
        price: 3499.99,
        quantity: 50,
        sold: 4
      }
    ],
    scheduleItems: [
      {
        id: '3001',
        title: 'Registration & Networking Breakfast',
        startTime: '2025-06-10T08:30:00Z',
        endTime: '2025-06-10T09:30:00Z',
        location: 'Main Hall'
      },
      {
        id: '3002',
        title: 'Opening Keynote: Business Transformation in the Digital Age',
        startTime: '2025-06-10T10:00:00Z',
        endTime: '2025-06-10T11:00:00Z',
        location: 'Grand Ballroom',
        speaker: 'Sarah Johnson, CEO of Future Industries'
      },
      {
        id: '3003',
        title: 'Panel Discussion: Navigating Global Economic Challenges',
        startTime: '2025-06-10T11:30:00Z',
        endTime: '2025-06-10T13:00:00Z',
        location: 'Grand Ballroom',
        speaker: 'Various Industry Leaders'
      }
    ]
  },
  {
    id: '4',
    title: 'Music Festival 2025',
    description: 'Three days of amazing music across multiple stages featuring top artists from around the world.',
    startDate: '2025-07-25T14:00:00Z',
    endDate: '2025-07-27T23:00:00Z',
    location: 'Riverside Park, Austin, TX',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizerId: '3',
    organizerName: 'Festival Productions',
    category: 'Music',
    status: 'published',
    capacity: 5000,
    registeredCount: 2750,
    ticketTypes: [
      {
        id: '401',
        name: 'Single Day Pass',
        description: 'Access to all stages for one day',
        price: 99.99,
        quantity: 2000,
        sold: 1500
      },
      {
        id: '402',
        name: 'Weekend Pass',
        description: 'Access to all stages for all three days',
        price: 249.99,
        quantity: 2500,
        sold: 1000
      },
      {
        id: '403',
        name: 'VIP Experience',
        description: 'Premium viewing areas, exclusive lounges, and complimentary food and drinks',
        price: 599.99,
        quantity: 500,
        sold: 250
      }
    ],
    scheduleItems: [
      {
        id: '4001',
        title: 'Gates Open',
        startTime: '2025-07-25T14:00:00Z',
        endTime: '2025-07-25T15:00:00Z',
        location: 'Main Entrance'
      },
      {
        id: '4002',
        title: 'The Rockers - Main Stage',
        startTime: '2025-07-25T18:00:00Z',
        endTime: '2025-07-25T19:30:00Z',
        location: 'Main Stage'
      },
      {
        id: '4003',
        title: 'DJ Beats - Electronic Stage',
        startTime: '2025-07-25T20:00:00Z',
        endTime: '2025-07-25T22:00:00Z',
        location: 'Electronic Stage'
      },
      {
        id: '4004',
        title: 'Headliner: World Famous Band',
        startTime: '2025-07-25T21:30:00Z',
        endTime: '2025-07-25T23:00:00Z',
        location: 'Main Stage'
      }
    ]
  }
];