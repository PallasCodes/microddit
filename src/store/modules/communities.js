const state = () => {
	communities: []
};

const getters = {
	communities: (state) => {
		return state.communities
	}
};

const actions = {};

const mutations = {
	setCommunities: (state, communities) => {
		state.communities = communities
	},
	addCommunitie: (state, communitie) => {
		state.communities.push(communitie)
	},
	removeCommunitie: (state, communitie) => {
		state.communities = state.communities.filter(communitie => comm => comm.id !== communitie.id)
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};