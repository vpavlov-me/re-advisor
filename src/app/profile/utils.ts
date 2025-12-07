export const getFullName = (profile: { first_name?: string | null; last_name?: string | null } | null): string => {
  if (!profile) return 'User';
  const firstName = profile.first_name || '';
  const lastName = profile.last_name || '';
  return `${firstName} ${lastName}`.trim() || 'User';
};

export const getInitials = (firstName?: string | null, lastName?: string | null): string => {
  const first = firstName?.charAt(0) || '';
  const last = lastName?.charAt(0) || '';
  return `${first}${last}`.toUpperCase() || 'U';
};

export const formatPeriod = (startDate?: string, endDate?: string, isCurrent?: boolean): string => {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const startYear = start.getFullYear();
  
  if (isCurrent || !endDate) {
    return `${startYear} - Present`;
  }
  
  const end = new Date(endDate);
  const endYear = end.getFullYear();
  
  return `${startYear} - ${endYear}`;
};
