import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  name: null,
  email: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        const { id, name, email } = action.payload.user;
        draft.id = id;
        draft.name = name;
        draft.email = email;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.id = null;
        draft.name = null;
        draft.email = null;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        const { name, email } = action.payload.user;
        draft.name = name;
        draft.email = email;
        break;
      }
      default:
    }
  });
}
