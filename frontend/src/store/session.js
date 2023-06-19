import { csrfFetch } from './csrf';


const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
};


// export const login = (user) => async (dispatch) => {
//     console.log("Backend", user)
//     const {credential, password } = user;
//     const response = await csrfFetch('/api/session', {
//         method: 'POST',
//         // headers: { 'Content-Type': 'application/json' },
//         headers: { 'Content-Type': 'application/json; charset=utf-8' },
//         body: JSON.stringify({
//            credential,
//            password
//     }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
// };
export const login = (user) => async dispatch => {
    console.log("Backend", user);
    const {credential, password} = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            credential,
            password
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    dispatch(removeUser());
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};



export default sessionReducer;
