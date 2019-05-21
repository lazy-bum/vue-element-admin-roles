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
    const tmp = { ...route }
    if (typeof tmp.component === 'string') {
      if (tmp.component === 'Layout') {
        tmp.component = Layout
      } else {
        tmp.component = () => import(`@/views/${tmp.component}.vue`)
      }
    }
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children, roles)
    }
    res.push(tmp)
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
      console.log(accessedRoutes)
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
