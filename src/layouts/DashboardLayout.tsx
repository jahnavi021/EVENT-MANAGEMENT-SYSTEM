import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart, 
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { 
      title: 'Dashboard', 
      path: '/dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      title: 'Events', 
      path: '/dashboard/events', 
      icon: <Calendar className="w-5 h-5" />,
      subItems: [
        { title: 'All Events', path: '/dashboard/events' },
        { title: 'Create Event', path: '/dashboard/events/create' }
      ]
    },
    { 
      title: 'Analytics', 
      path: '/dashboard/analytics', 
      icon: <BarChart className="w-5 h-5" /> 
    }
  ];

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (title: string) => {
    if (expandedItem === title) {
      setExpandedItem(null);
    } else {
      setExpandedItem(title);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-800">EventHub</span>
            </Link>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center px-6 py-4 border-b">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <Users className="h-6 w-6 text-gray-500" />
              )}
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-grow py-4 px-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isExpanded = expandedItem === item.title;
                const isSubItemActive = item.subItems?.some(subItem => location.pathname === subItem.path);
                
                return (
                  <li key={item.title}>
                    {hasSubItems ? (
                      <div>
                        <button
                          onClick={() => toggleExpand(item.title)}
                          className={`
                            flex items-center justify-between w-full px-4 py-2 rounded-md text-sm
                            ${isActive || isSubItemActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}
                          `}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-3">{item.title}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <ul className="pl-10 mt-1 space-y-1">
                            {item.subItems?.map((subItem) => {
                              const isSubActive = location.pathname === subItem.path;
                              
                              return (
                                <li key={subItem.title}>
                                  <Link
                                    to={subItem.path}
                                    className={`
                                      block px-4 py-2 rounded-md text-sm
                                      ${isSubActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}
                                    `}
                                  >
                                    {subItem.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`
                          flex items-center px-4 py-2 rounded-md text-sm
                          ${isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}
                        `}
                      >
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-lg font-semibold text-gray-800">Dashboard</span>
            <div className="w-6"></div> {/* Empty div for centering */}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;