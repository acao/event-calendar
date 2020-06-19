const BLACK = '#111';

const BORDER = '#ddd';

module.exports = {
  background: '#f1f1f1',
  brand: '#1fe5bd',
  secondary: '#41a7b3',
  focus: '#1fe5bd',
  text: BLACK,
  border: BORDER,
  calendar: {
    today: {
      background: '#ffffffbb',
      text: 'tomato',
      border: BORDER,
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
      background: '#ffffff22',
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
      background: 'black',
    },
    'type-meeting': {
      text: 'white',
      background: 'tomato',
    },
    'type-training': {
      text: 'white',
      background: 'green',
    },
    'type-other': {
      background: '#1fe5bdDD',
      text: 'white',
    },
  },
};
