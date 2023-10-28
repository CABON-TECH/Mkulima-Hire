export function formatDateDifference(date: string) {
  const currentDate = new Date().valueOf();
  const targetDate = new Date(date).valueOf();
  const timeDifference = currentDate - targetDate;

  const intervals = [
    { label: 'second', ms: 1000 },
    { label: 'minute', ms: 60000 },
    { label: 'hour', ms: 3600000 },
    { label: 'day', ms: 86400000 },
    { label: 'week', ms: 604800000 },
    { label: 'month', ms: 2592000000 },
    { label: 'year', ms: 31536000000 },
  ];

  for (let i = intervals.length - 1; i >= 0; i--) {
    const interval = intervals[i];
    const difference = Math.floor(timeDifference / interval.ms);

    if (difference >= 1) {
      const plural = difference > 1 ? 's' : '';
      return `${difference} ${interval.label}${plural}`;
    }
  }

  return 'Just now';
}

export const capitalize = (title: string) => {
  const words = title.split(' ');
  const capitalizedWords = words?.map((word) => {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  });
  return capitalizedWords?.join(' ');
};

export function truncateString(inputString: string) {
  if (inputString.length > 30) {
    return inputString.substring(0, 30) + ' ...';
  }

  return inputString;
}
