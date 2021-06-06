const state = () => {
    token: "";
    isAuthenticated: false
};

const getters = {
    isAuthenticated: (state) => {
        return state.isAuthenticated;
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
};

export default {
    state,
    getters,
    actions,
    mutations
};