const state = () => {
    token: "";
    isAuthenticated: false
};

const getters = {
    isAuthenticated: (state) => {
        return state.isAuthenticated;
    },
    token(state) {
        return state.token
    }
};

const actions = {};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
        state.isAuthenticated = true;
    },
    logout: (state) => {
        state.token = ''
        state.isAuthenticated = false
    },
    autoLogin: (state) => {
        if (localStorage.getItem('token')) {
            state.token = localStorage.getItem('token')
            state.isAuthenticated = true
        } else {
            state.token = ''
            state.isAuthenticated = false
        }
    },
    setUsername: (state, username) => {
        state.username = username
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};