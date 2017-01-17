// MuiTheme to be used by the entire app
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Most component colors are derived from this palette object
export const palette = {
  primary1Color: '#005B96',
  accent1Color: '#3C4146',
  textColor: 'black',
  alternateTextColor: 'white',
  canvasColor: 'white',
  borderColor: '#3C4146',
  disabledColor: '#B3CDE0',
  errorColor: '#D9534F',
  focusColor: '#28A3E1',
  alternateFocusColor: '#28A3E1'
};

export const muiTheme = getMuiTheme({}, {
  palette
});
