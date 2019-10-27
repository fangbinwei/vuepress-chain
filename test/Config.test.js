/* eslint-disable prettier/prettier */
const Config = require('../src/Config.js')
test('sidebar array', () => {
  const config = new Config()
  config
    .sidebar()
    .sub.add('/')
    .add('/page-a')
    .add(['/page-b', 'Explicit link text'])
  expect(config.toConfig()).toEqual({
    sidebar: ['/', '/page-a', ['/page-b', 'Explicit link text']]
  })
})

test('sidebar group', () => {
  const config = new Config()
  config
    .sidebar()
      .group('group 1')
        .title('Group 1')
        .path('/foo/')
        .collapsable(false)
        .sidebarDepth(1)
        .children
          .add('/')
          .end()
        .end()
      .group('group 2')
        .title('Group 2')
        .path('/bar/')
        .collapsable(false)
        .sidebarDepth(1)
        .children
          .add('/')
          .add('/children')
  expect(config.toConfig()).toEqual({
    sidebar: [
      {
        title: 'Group 1',
        path: '/foo/',
        collapsable: false,
        sidebarDepth: 1,
        children: ['/']
      },
      {
        title: 'Group 2',
        path: '/bar/',
        collapsable: false,
        sidebarDepth: 1,
        children: ['/', '/children']
      }
    ]
  })
})

test('multi-sidebar', () => {
  const config = new Config()
  config
    .sidebar('/foo/')
      .sub
        .add('')
        .add('one')
        .add('two')
        .end()
      .end()
    .sidebar('/bar/')
      .sub
        .add('')
        .add('three')
        .add('four')
        .end()
      .end()
    .sidebar('/')
      .sub
        .add('')
        .add('contact')
        .add('about')

  expect(config.toConfig()).toEqual({
    sidebar: {
      '/foo/': [
        '' /* /foo/ */,
        'one' /* /foo/one.html */,
        'two' /* /foo/two.html */
      ],

      '/bar/': [
        '' /* /bar/ */,
        'three' /* /bar/three.html */,
        'four' /* /bar/four.html */
      ],

      // fallback
      '/': [
        '' /* / */,
        'contact' /* /contact.html */,
        'about' /* /about.html */
      ]
    }
  })
})

test('multi-sidebar with group', () => {
  const config = new Config()
  config
    .sidebar('/web/')
      .group('VueGroupName')
        .title('Vue')
        .sidebarDepth(0)
        .collapsable(false)
        .children
          .add('vue/render.md')
          .end()
        .end()
      .group('ReactGroupName')
        .title('React')
        .sidebarDepth(1)
        .collapsable(false)
        .children
          .add('react/render.md')
  config
    .sidebar('/server/')
      .group('nodejsGroupName')
        .path('/')
        .title('nodejs')
        .sidebarDepth(0)
        .collapsable(false)
        .children
          .add('nodejs/koa.md')

  expect(config.toConfig()).toEqual({
    sidebar: {
      '/web/': [
        {
          title: 'Vue',
          sidebarDepth: 0,
          collapsable: false,
          children: ['vue/render.md']
        },
        {
          title: 'React',
          collapsable: false,
          sidebarDepth: 1,
          children: ['react/render.md']
        }
      ],
      '/server/': [
        {
          title: 'nodejs',
          path: '/',
          sidebarDepth: 0,
          collapsable: false,
          children: ['nodejs/koa.md']
        }
      ]
    }
  })
})
