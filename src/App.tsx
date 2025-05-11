import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/HomePage';
import EventListPage from './pages/EventListPage';
import EventDetailsPage from './pages/EventDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import ManageEvents from './pages/dashboard/ManageEvents';
import CreateEvent from './pages/dashboard/CreateEvent';
import EditEvent from './pages/dashboard/EditEvent';
import AttendeesList from './pages/dashboard/AttendeesList';
import Analytics from './pages/dashboard/Analytics';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <EventProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventListPage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/checkout/:eventId" element={<CheckoutPage />} />
            </Route>

            {/* Dashboard Routes - Protected */}
            <Route 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/dashboard/events" element={<ManageEvents />} />
              <Route path="/dashboard/events/create" element={<CreateEvent />} />
              <Route path="/dashboard/events/:id/edit" element={<EditEvent />} />
              <Route path="/dashboard/events/:id/attendees" element={<AttendeesList />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </EventProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;