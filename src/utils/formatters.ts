export function formatSeconds(seconds: number) {
  if (seconds < 60) return `00:${padNumberByTwo(seconds)}`;

  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return `${padNumberByTwo(minutes)}:${padNumberByTwo(seconds)}`;
}

function padNumberByTwo(num: number) {
  return `${num}`.padStart(2, '0');
}

export function formatSecondsToShortString(seconds: number) {
  if (seconds < 60) return `${seconds} secs`;

  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  if (minutes < 60) return `${minutes} mins`;

  const hours = Math.floor(minutes / 60);

  return `${hours} hrs`;
}

export function formatDate(date: string) {
  return new Date(date).toDateString().split(' ').slice(1).join(' ');
}
