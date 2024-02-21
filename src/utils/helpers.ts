export async function sleep(miliseconds: number) {
  return await new Promise((resolve) => setTimeout(resolve, miliseconds));
}

export function doesUserPrefferDarkTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
