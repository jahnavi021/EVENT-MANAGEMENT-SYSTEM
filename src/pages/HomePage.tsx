import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import { Calendar, CheckCircle, Clock, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  const { events, loading } = useEvents();
  
  // Get upcoming events (limit to 4)
  const upcomingEvents = events
    .filter(event => new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Create, Manage & Attend <br className="hidden md:block" /> Amazing Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            The all-in-one platform for event organizers and attendees to connect and create memorable experiences.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link 
              to="/events" 
              className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
            >
              Browse Events
            </Link>
            <Link 
              to="/register" 
              className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-purple-700 transition duration-300"
            >
              Create Your Event
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
            <Link 
              to="/events" 
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
            >
              View All Events
              <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose EventHub?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes event management simple with powerful tools for organizers and a seamless experience for attendees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Calendar className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Event Creation</h3>
              <p className="text-gray-600">
                Create and customize events in minutes with our intuitive event builder.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Streamlined Registration</h3>
              <p className="text-gray-600">
                Simplified registration process with customizable forms and ticket types.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Clock className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Keep your attendees informed with real-time notifications and updates.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Attendee Management</h3>
              <p className="text-gray-600">
                Easily track registrations, send reminders, and manage check-ins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to host your next event?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of event organizers who trust EventHub for their event management needs.
                </p>
                <Link 
                  to="/register" 
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
                >
                  Get Started Free
                </Link>
              </div>
              <div className="md:w-1/2 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Event" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;