# Vue-Access

An access control plugin for vuejs (2.x) applications.

## Installation

In your `main.js` file

```js
import Vue from "vue";
import store from "./store";

import access from "./access";

Vue.use(access, { store, entityBased = false });
```

Aditionally, you get the default styles that Vue-Access provides for initial setup

```js
import "@/styles/access-styles.css";
```

The default styles can be easily overriden. Please chack the default classes for details.

## Usage

You can add the `v-access` directive with the associated binding argument to any component as shown under. Every binding argument has a unique functionality.

```html
<input type="button" @click="someFunction" v-access:action="'buttonAccess'" />

<div v-access:comp="'imgAccess'">
  <img src="https://picsum.photos/id/237/200/300" />
</div>

<section v-access:auth>
  <img id="userImage" src="https://picsum.photos/300" />
  <p>{{userData}}</p>
</section>
```

Please notice the extra `''` surrounding each value

> Does not work on `<template>` tags

## Arguments

There are 4 possible arguments which can be added to the `v-access` directive

- `view`
  : Will not render the component if the access is false.
  Cannot be overridden.
- `component`
  : Hides the component if access is false.
  Can be overridden by classes.
- `action`
  : Disables pointer events and colors the component in grey.
  Can be overridden by classes.
- `auth`
  : Takes no value. Hides the component auth is false.
  Add the `.invert` modifier to invert auth access.
  Can be overridden by classes.

You can add any of these (even multiple) to any component/DOM element.

## Store Setup

`vue-access` will create a store for you called `access`. It will hold the details of the User's permissions from the backend. Ideally, you should populate this as soon as the user logs in.

This is the structure the access store follows:

```js
export const state = {
  roleName: "",
  currentEntity: "",
  auth: false,
  permissions: {
    all: {
      view: [],
      comp: [],
      action: [],
    },
    dashboard: {
      view: [],
      comp: [],
      action: [],
    },
  },
};
```

By default the store will only have the `all` object in the permission. We have added the `dashboard` object just to explain the concept better.

- `roleName`
  : Every user can have a role name (admin, support, etc) which per say has no control in the access, but can be used for error messages and so.
- `currentEntity`
  : Used to define the current entity/page the user is on.
- `auth`:
  : Defines the auth state of the user, used with the `auth` argument.
- `permissions`
  : The permissions object this the primary focus here. It defines the access given to the user. The permissions are divided by entities. Think of entities to be pages like _Dashboard_ or _Profile_ etc. Tho, for smaller applications it makes more sense to have a single parent then divide it into entities.
  - `all`
    : Used when one needs to store all the user permissions under a single entity, ideal for smaller applications OR grouped permissions.
  - `entity`
    : The entity name (like `dashboard` in this case) under which various permissions are nested. We can have multiple entities like this. Imagine `settings`, `bookings`, `invoices`, etc. Please read the `Entity Based` section for more details.

> Please make sure that when you populate the access store it retains the same structure as shown above.

## Permissions Values

Every entity has 3 possible access levels:

- `view`
- `component`
- `action`

The values provided in these access levels can be:

1. Component based: Unique name per component. ex `editInvoiceButton`
2. Group based: Multiple components grouped under the same name. ex `editButtons`
3. A mix of both

While rendering, Vue Access will see if the access value defined in the DOM exists in the entity's access level.

## Entity Based

If you wish to use v-access with multiple entities you will need to set `entityBased = true` when regestring in the `main.js` file.

```js
Vue.use(access, { store, router, entityBased = true });
```

Once activated, Vue Access will look through entities to find if the user has access to the component.

To set the current entity, simply use the `$setCurrentEntity` global function. Personally, I use it in the vue router's `beforeEach` guard with route's meta as the entity name.

## Global Functions

- `$setRole`
- `$setAuth`
- `$setCurrentEntity`
- `$addEntity`

## Default Classes

The default classes are provided to get you started with `vue access`

```css
.v-access-disabled-action {
  pointer-events: none;
  color: #505050;
  background-color: #808080;
}

.v-access-disabled-component {
  display: none;
}

.v-access-disabled-auth {
  display: none;
}
```

To override default classes, just define them as an option in `Vue.use` in your `main.js` file

```js
Vue.use(access, {
  store,
  router,
  overrideClasses: {
    actionClass: "my-disabled-action",
    componentClass: "my-disabled-component",
    authClass: "my-disabled-auth",
  },
});
```

> There is no class option for the `view` argument as it does not use classes and insted completely stops the rendering of a component

## Road Map

- Define custom class for a component
- Block the original function of a blocked `action` element.
- Define a way to execute specific function if the user clicks a blocked `action` element (Perhaps to show a notification?). Should block the original function.
- Finish website with examples. (Does anyone know how to make those editable code windows?)

## Like this library

[Buy me a coffee?](https://www.buymeacoffee.com/bhaskarnair2)
