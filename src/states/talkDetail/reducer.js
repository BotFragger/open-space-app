/**
 * @TODO: Define reducer for the talkDetail state
 */
import { ActionTypes } from './action';

function talkDetailReducer(talkDetail = null, action = {}) {
  switch (action.type) {
    case ActionTypes.RECEIVE_TALK_DETAIL:
      return action.payload.talkDetail;
    case ActionTypes.CLEAR_TALK_DETAIL:
      return null;
    case ActionTypes.TOGGLE_LIKE_TALK_DETAIL:
      return {
        ...talkDetail,
        likes: talkDetail.likes.includes(action.payload.userId)
          ? talkDetail.likes.filter((id) => id !== action.payload.userId)
          : talkDetail.likes.concat(action.payload.userId),
      };
    default:
      return talkDetail;
  }
}

export default talkDetailReducer;
