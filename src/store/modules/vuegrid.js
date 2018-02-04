import Axios from 'axios';

export default {
    namespaced: true,

    state: {
        config: {},
        rows: []
    },

    getters: {
        isRows(state) {
            return state.rows.length > 0;
        }
    },

    actions: {
        setConfig({ commit }, config) {
            commit('setConfig', config);
        },

        setList({ commit }, rows) {
            commit("setRows", rows);
        },

        getList({ state, commit }) {
            let _commit = commit;

            return new Promise((resolve, reject) => {
                if (state.config.search) {
                    Axios.get(state.config.search).then(
                        res => {
                            _commit("setRows", res.data);
                            resolve();
                        });
                } else {
                    console.log('Invalid search!');
                    resolve();
                }
            });
        }
    },

    mutations: {
        setConfig(state, config) {
            state.config.columns = config.columns;
            state.config.search = config.search;
        },

        setRows(state, rows) {
            state.rows = rows;
        }
    }
};
