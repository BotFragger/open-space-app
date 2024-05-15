/**
 * @TODO: Define all the actions (creator) for the talkDetail state
 */
import api from '../../utils/api';

const ActionTypes = {
  RECEIVE_TALK_DETAIL: 'RECEIVE_TALK_DETAIL',
  CLEAR_TALK_DETAIL: 'CLEAR_TALK_DETAIL',
  TOGGLE_LIKE_TALK_DETAIL: 'TOGGLE_LIKE_TALK_DETAIL',
};

function receiveTalkDetailActionCreator(talkDetail) {
  return {
    type: ActionTypes.RECEIVE_TALK_DETAIL,
    talkDetail,
  };
}

function clearTalkDetailActionCreator() {
  return {
    type: ActionTypes.CLEAR_TALK_DETAIL,
  };
}

function toggleLikeTalkDetailActionCreator(userId) {
  return {
    type: ActionTypes.TOGGLE_LIKE_TALK_DETAIL,
    payload: {
      userId,
    },
  };
}

function asyncReceiveTalkDetail(talkId) {
  return async (dispatch) => {
    dispatch(clearTalkDetailActionCreator());
    try {
      const talkDetail = await api.getTalkDetail(talkId);
      dispatch(receiveTalkDetailActionCreator(talkDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleLikeTalkDetail() {
  return async (dispatch, getState) => {
    const { talkDetail, authUser } = getState();
    dispatch(toggleLikeTalkDetailActionCreator(authUser.id));

    try {
      await api.toggleLikeTalk(talkDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionTypes,
  receiveTalkDetailActionCreator,
  clearTalkDetailActionCreator,
  toggleLikeTalkDetailActionCreator,
  asyncReceiveTalkDetail,
  asyncToggleLikeTalkDetail,
};
