export type ApplicationTheme = {
  bg: string;
  sectionBg: string;
  primaryTextColor: string;
  contrastTextColor: string;
  gameStarsColor: string;
  logoColor: string;
  borderColor: string;
  linkUnvisitedColor: string;
  inputPlaceholderColor: string;
  primaryButtonBgColor: string;
  drawerLinkSelectedColor: string;
  drawerBgColor: string;
  drawerLinkColor: string;
  drawerIconColor: string;
  gamePlayButtonColor: string;
  rightSwipeColor: string;
  leftSwipeColor: string;
  topCardBorderColor: string;
  topCardBackgroundRadial1: string;
  topCardBackgroundRadial2: string;
  constrast: string;
  statPanelOdd: string;
  ColoredStatPanelText: string;

  sortingPillBackgroundHighlated: string;
  sortingPillBorderHighlited: string;
  formInputText: string;
};

export const lightTheme: ApplicationTheme = {
  bg: 'var(--wd-shygray-24-light)',
  sectionBg: 'white',
  primaryTextColor: 'var(--wd-boldgray-4-light)',
  contrastTextColor: 'var(--wd-shygray-24-light)',
  gameStarsColor: 'var(--wd-brightyellow-4-light)',
  logoColor: 'var(--wd-inkyblue-4-dark)',
  borderColor: 'var(--wd-shygray-20-light)',
  linkUnvisitedColor: 'var(--wd-strangepurple-4-light)',
  inputPlaceholderColor: 'var(--wd-boldgray-4-80op-light)',
  primaryButtonBgColor: 'var(--wd-inkyblue-4-dark)',
  drawerLinkSelectedColor: 'var(--wd-inkyblue-12-10op-dark)',
  drawerBgColor: 'white',
  drawerLinkColor: 'var(--wd-inkyblue-4-dark)',
  drawerIconColor: 'var(--wd-inkyblue-4-80op-dark)',
  gamePlayButtonColor: 'var(--wd-brightyellow-4-light)',
  rightSwipeColor: 'var(--wd-rightlygreen-24-50op-light)',
  leftSwipeColor: 'var(--wd-wronglyyellow-24-light)',
  topCardBorderColor: '#78CD90',
  topCardBackgroundRadial1: 'rgba(180, 255, 105, 0.7)',
  topCardBackgroundRadial2: 'rgba(120, 205, 144, 0.7)',
  constrast: '1',
  statPanelOdd: '#F8FAFC',
  ColoredStatPanelText: 'white',
  sortingPillBackgroundHighlated: 'white',
  sortingPillBorderHighlited: '#3D4650',
  formInputText: '#6F7C8A',
};

export const darkTheme: ApplicationTheme = {
  bg: 'var(--wd-inkyblue-4-dark)',
  sectionBg: 'var(--wd-inkyblue-8-dark)',
  primaryTextColor: 'var(--wd-almostwhite-12-dark)',
  contrastTextColor: 'var(--wd-inkyblue-4-dark)',
  gameStarsColor: 'var(--wd-midnightyellow-4-dark)',
  logoColor: '#F0F0F0',
  borderColor: 'var(--wd-inkyblue-12-dark)',
  linkUnvisitedColor: 'var(--wd-strangepurple-24-dark)',
  inputPlaceholderColor: 'var(--wd-almostgray-24-dark)',
  primaryButtonBgColor: 'var(--wd-almostwhite-12-dark)',
  drawerLinkSelectedColor: 'var(--wd-almostwhite-12-10op-dark)',
  drawerBgColor: 'var(--wd-inkyblue-8-dark)',
  drawerLinkColor: 'var(--wd-almostwhite-12-dark)',
  drawerIconColor: 'var(--wd-almostwhite-12-80op-dark)',
  gamePlayButtonColor: 'var(--wd-almostwhite-12-dark)',
  rightSwipeColor: 'var(--wd-rightlygreen-24-50op-dark)',
  leftSwipeColor: 'var(--wd-wronglyyellow-24-dark)',

  topCardBorderColor: 'rgba(130, 106, 177, 1)',
  topCardBackgroundRadial1: 'rgba(172, 106, 255, 0.7)',
  topCardBackgroundRadial2: 'rgba(108, 83, 128, 0.7)',
  constrast: '0.9',
  statPanelOdd: '#2C4358',
  ColoredStatPanelText: 'white',
  sortingPillBackgroundHighlated: '#1D3246',
  sortingPillBorderHighlited: '#F0F0F0',
  formInputText: '#9BB1C8',
};
