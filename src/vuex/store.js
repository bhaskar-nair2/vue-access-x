const shvl = require('shvl');

module.exports = {
  namespaced: true,
  state: {
    role: '',
    entity: 'all',
    auth: false,
    permissions: {
      all: {
        view: ['view'],
        comp: ['textAccess', 'imgAccess', 'buttonAccess'],
        action: ['editAccess'],
      },
      home: {
        view: [],
        comp: [],
        action: ['access1'],
      },
      bookings: {
        view: [],
        comp: [],
        action: ['access1'],
      },
      payments: {
        view: ['access1'],
        comp: [],
        action: [],
      },
    },
  },
  mutations: {
    SET_USER_ROLE(store, role) {
      store.role = role;
    },
    SET_AUTH_STATE(store, authState) {
      store.auth = authState;
    },
    SET_ENTITY(store, entityName) {
      store.entity = entityName;
    },
    ADD_ENTITY(store, entityData) {
      shvl.set(store.permissions, entityData.name, entityData.values);
    },
  },
  actions: {
    setUserRole({ commit }, roleName) {
      commit('SET_USER_ROLE', roleName);
    },
    setAuthState({ commit }, authState) {
      commit('SET_AUTH_STATE', authState);
    },
    setCurrentEntity({ commit }, entityName) {
      commit('SET_ENTITY', entityName);
    },
    addEntity({ commit }, payload) {
      commit('ADD_ENTITY', payload);
    },
  },
  getters: {},
};
