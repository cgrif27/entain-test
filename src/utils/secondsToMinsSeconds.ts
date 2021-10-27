export const secondsToMinsSeconds = (secs: number): string => {
  let mins = Math.floor(secs / 60);
  secs = secs % 60;
  mins = mins % 60;

  if (mins > 0) return `${mins}m ${secs}s`;
  else if (mins < -1) return `${mins}m ${Math.abs(secs)}s`;
  else return `${secs}s`;
};
