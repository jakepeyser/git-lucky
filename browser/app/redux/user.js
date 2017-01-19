import axios from 'axios';

// ---------------------> TAGS <---------------------
const RECEIVE_USER = 'RECEIVE_USER';

// ----------------> ACTION CREATORS <----------------
const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

// --------------------> THUNKS <--------------------

export const fetchUser = (done) => dispatch => {
  axios.get('/api/user')
    .then(res => {
      dispatch(receiveUser(res.data))
      if (done) done();
    })
    .catch(err => {
      console.error('Unable to fetch user', err);
      if (done) done(err);
    });
};

// --------------------> REDUCER <--------------------
export default function user(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    default:
      return state;
  }
}
