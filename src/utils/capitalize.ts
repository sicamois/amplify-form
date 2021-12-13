export const capitalize = (aString: string) => {
  const capitalizedString =
    aString.charAt(0).toUpperCase() + aString.slice(1).toLowerCase();
  const returnString = capitalizedString.replace('_', ' ');
  return returnString;
};
