
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['qwe'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    menu: [
      {
        path: '/nested',
        component: 'Layout',
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
          title: 'Nested',
          icon: 'nested'
        },
        children: [
          {
            path: 'menu1',
            component: 'nested/menu1/index', // Parent router-view
            name: 'Menu1',
            meta: { title: 'Menu1' },
            children: [
              {
                path: 'menu1-1',
                component: 'nested/menu1/menu1-1',
                name: 'Menu1-1',
                meta: { title: 'Menu1-1' }
              },
              {
                path: 'menu1-2',
                component: 'nested/menu1/menu1-2',
                name: 'Menu1-2',
                meta: { title: 'Menu1-2' },
                children: [
                  {
                    path: 'menu1-2-1',
                    component: 'nested/menu1/menu1-2/menu1-2-1',
                    name: 'Menu1-2-1',
                    meta: { title: 'Menu1-2-1' }
                  },
                  {
                    path: 'menu1-2-2',
                    component: 'nested/menu1/menu1-2/menu1-2-2',
                    name: 'Menu1-2-2',
                    meta: { title: 'Menu1-2-2' }
                  }
                ]
              },
              {
                path: 'menu1-3',
                component: 'nested/menu1/menu1-3',
                name: 'Menu1-3',
                meta: { title: 'Menu1-3' }
              }
            ]
          },
          {
            path: 'menu2',
            component: 'nested/menu2/index',
            meta: { title: 'menu2' }
          }
        ]
      },
      {
        path: 'external-link',
        component: 'Layout',
        children: [
          {
            path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
            meta: { title: 'External Link', icon: 'link' }
          }
        ]
      },
      {
        path: '/form',
        component: 'Layout',
        children: [
          {
            path: 'index',
            name: 'Form',
            component: 'form/index',
            meta: { title: 'Form', icon: 'form' }
          }
        ]
      },
      // 404 page must be placed at the end !!!
      { path: '*', redirect: '/404', hidden: true }
    ]
  },
  'editor-token': {
    roles: ['qweqw'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
