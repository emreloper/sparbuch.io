export const createNumberFormat = () => {
  return new Intl.NumberFormat(window.navigator.language, {});
};
