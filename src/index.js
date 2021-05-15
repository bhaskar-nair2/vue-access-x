const shvl = require('shvl')
const accessStore = require('./vuex/store')

const Access = {
  install (Vue, { store, entityBased = false, overrideClasses = {} }) {
    if (!store) {
      throw new Error('Access requires vuex to work')
    }

    store.registerModule('access', accessStore)

    const accessState = store.state.access

    const classes = {
      actionClass: overrideClasses.actionClass || 'v-access-disabled-action',
      componentClass:
        overrideClasses.componentClass || 'v-access-disabled-component',
      authClass: overrideClasses.authClass || 'v-access-disabled-auth'
    }

    // * Main Function for `access` directive
    const accessValidator = function (el, binding) {
      const entity = entityBased ? accessState.currentEntity : 'all'
      const type = binding.arg
      const accessId = binding.value
      const { invert } = binding.modifiers

      const permission = shvl.get(accessState, `permissions.${entity}`)

      let allowed = false

      switch (type) {
        case 'action':
        case 'acts':
          allowed = permission.action.includes(accessId)
          if (!allowed) {
            el.className += ` ${classes.actionClass}`
          }
          break
        case 'components':
        case 'comp':
          allowed = permission.comp.includes(accessId)
          if (!allowed) {
            el.className += ` ${classes.componentClass}`
          }
          break
        // ! Should block rendering of the given component, no classes
        case 'view':
          allowed = permission.view.includes(accessId)
          if (!allowed) {
            el.innerHTML = ''
            el.outerHTML = ''
          }
          break
        case 'auth':
          allowed = accessState.auth
          if (!allowed && !invert) {
            el.className += ` ${classes.authClass}`
          } else if (allowed && invert) {
            el.className += ` ${classes.authClass}`
          }
          break
        default:
          break
      }
    }

    // takes the unique access string and checks with the roles value
    Vue.directive('access', {
      inserted: accessValidator,
      update: accessValidator
    })

    // TODO
    // const utils = {
    //   failFunc: function() {},
    //   passFunc: function() {},
    // };

    // TODO
    // Set class for the particular entity
    // Vue.directive("access-class", {
    //   bind(el, binding) {
    //     classes.actionClass = binding.value;
    //   },
    // });

    // TODO
    // Emit function if interacted with even tho access is false
    // Vue.directive("access-func", {
    //   bind(el, binding) {
    //     if (typeof binding.value !== "function") {
    //       throw new Error(
    //         "Directive access-func only takes a function as an argument"
    //       );
    //     } else {
    //       utils.failFunc = binding.value;
    //     }
    //   },
    // });

    // * Instance Functions for actions in vuex
    Vue.prototype.$setRole = function (roleName) {
      store.dispatch('access/setUserRole', roleName)
    }
    Vue.prototype.$setAuth = function (authState) {
      store.dispatch('access/setAuthState', authState)
    }
    Vue.prototype.$setCurrentEntity = function (entityName) {
      if (entityBased === false) console.warn('Settting entity while entityBased is false: vue access')
      store.dispatch('access/setCurrentEntity', entityName)
    }
    Vue.prototype.$addEntity = function (entityData) {
      store.dispatch('access/addEntity', entityData)
    }
  }
}

export default Access
