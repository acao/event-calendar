const BLACK = '#111';
const PRIMARY = 'tomato';
const SECONDARY = '#7FDBFF';
const TERTIARY = '#FFDC00';

const BORDER = '#ddd';

module.exports = {
  background: '#f1f1f1',
  brand: PRIMARY,
  secondary: SECONDARY,
  black: BLACK,
  focus: '#f1f1f1',
  text: BLACK,
  border: BORDER,
  header: {
    background: 'tomato',
    text: BLACK,
  },
  footer: {
    'developer-link': {
      color: BLACK,
    },
    background: '#dcdcdc',
  },
  calendar: {
    today: {
      background: '#ffffffbb',
      text: BLACK,
      border: 'tomato',
    },
    day: {
      background: '#ffffffbb',
      text: BLACK,
      border: BORDER,
    },
    past: {
      background: '#ffffff73',
      text: BLACK,
      border: BORDER,
    },
    empty: {
      background: 'transparent',
      border: BORDER,
    },
    weekdays: {
      background: 'white',
      border: BORDER,
    },
    event: {
      background: '#1fe5bdDD',
      text: 'white',
    },
    'past-event': {
      background: '#666',
      text: 'white',
    },
    modal: {
      text: 'black',
      separator: '#666',
      background: 'white',
    },
    'type-action': {
      text: 'white',
      background: BLACK,
    },
    'type-meeting': {
      text: BLACK,
      background: PRIMARY,
    },
    'type-training': {
      text: BLACK,
      background: SECONDARY,
    },
    'type-other': {
      background: TERTIARY,
      text: BLACK,
    },
  },
};
