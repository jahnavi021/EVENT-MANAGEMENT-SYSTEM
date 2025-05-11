export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short', 
    day: 'numeric', 
    year: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatTime = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  return new Date(dateString).toLocaleTimeString('en-US', options);
};

export const formatDateTime = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  return new Date(dateString).toLocaleString('en-US', options);
};

export const getDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Same day event
  if (start.toDateString() === end.toDateString()) {
    return `${formatDate(startDate)} · ${formatTime(startDate)} - ${formatTime(endDate)}`;
  }
  
  // Multi-day event
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};