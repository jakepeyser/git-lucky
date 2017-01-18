export const getLangs = () => {
  return [
    'ActionScript',
    'C',
    'C++',
    'C#',
    'Clojure',
    'CoffeeScript',
    'CSS',
    'Go',
    'Haskell',
    'HTML',
    'Java',
    'JavaScript',
    'Objective-C',
    'MATLAB',
    'Perl',
    'PHP',
    'Python',
    'R',
    'Ruby',
    'Scala',
    'Shell',
    'TeX',
    'VimL'
  ]
};

// Parse a date string into YYYY-MM-DD
export const parseDate = (dateString) => {
  const zeroPad = (num) => `0${num}`.slice(-2);
  const date = new Date(dateString);
  return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
};
