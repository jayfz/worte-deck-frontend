export function formatSeconds(seconds: number) {
  if (seconds < 60) return `00:${padNumberByTwo(seconds)}`;

  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return `${padNumberByTwo(minutes)}:${padNumberByTwo(seconds)}`;
}

function padNumberByTwo(num: number) {
  return `${num}`.padStart(2, '0');
}
