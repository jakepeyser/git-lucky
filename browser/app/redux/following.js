import axios from 'axios';

// ---------------------> TAGS <---------------------
const RECEIVE_FOLLOWING = 'RECEIVE_FOLLOWING';

// ----------------> ACTION CREATORS <----------------
const receiveFollowing = following => ({
  type: RECEIVE_FOLLOWING,
  following
});

// --------------------> THUNKS <--------------------

export const fetchFollowing = () => dispatch => {
  axios.get('/api/user/following')
    .then(res => {
      dispatch(receiveFollowing(res.data))
    })
    .catch(err => {
      console.error('Unable to fetch following users', err);
    });
};

// --------------------> REDUCER <--------------------
export default function user(state = [], action) {
  switch (action.type) {
    case RECEIVE_FOLLOWING:
      return action.following;
    default:
      return state;
  }
}
