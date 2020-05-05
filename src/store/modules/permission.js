import { constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const routeObj = { ...route }
    if (typeof routeObj.component === 'string') {
      if (routeObj.component === 'Layout') {
        routeObj.component = Layout
      } else {
        routeObj.component = () => import(`@/views/${route.component}`)
      }
    }
    if (routeObj.children) {
      routeObj.children = filterAsyncRoutes(routeObj.children, roles)
    }
    res.push(routeObj)
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, { roles, menu }) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(menu, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
