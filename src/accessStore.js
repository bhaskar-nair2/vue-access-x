import Vue from "vue";
export const namespaced = true;

export const state = {
  role: "",
  entity: "all",
  auth: false,
  permissions: {
    all: {
      view: ["view"],
      comp: ["textAccess", "imgAccess", "buttonAccess"],
      action: ["editAccess"],
    },
    home: {
      view: [],
      comp: [],
      action: ["access1"],
    },
    bookings: {
      view: [],
      comp: [],
      action: ["access1"],
    },
    payments: {
      view: ["access1"],
      comp: [],
      action: [],
    },
  },
};

export const mutations = {
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
    Vue.$set(store.permissions, entityData.name, entityData.values);
  },
};

// * Commits are not made from the directive's global function so that we can do all validations here itself
export const actions = {
  setUserRole({ commit }, roleName) {
    commit("SET_USER_ROLE", roleName);
  },
  setAuthState({ commit }, authState) {
    commit("SET_AUTH_STATE", authState);
  },
  setCurrentEntity({ commit }, entityName) {
    commit("SET_ENTITY", entityName);
  },
  addEntity({ commit }, payload) {
    commit("ADD_ENTITY", payload);
  },
};

export const getters = {};
