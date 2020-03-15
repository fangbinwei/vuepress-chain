import Sidebar from '../src/Sidebar'

test('sidebar array', () => {
  const sidebar = new Sidebar(null as any, undefined)
  sidebar.sub
    .add('/')
    .add('/page-a')
    .add(['/page-b', 'Explicit link text'])
  expect(sidebar.toConfig()).toEqual([
    '/',
    '/page-a',
    ['/page-b', 'Explicit link text']
  ])
})

test('sidebar group', () => {
  const sidebar = new Sidebar(null as any, undefined)
  sidebar
    .group('group 1')
    .title('Group 1')
    .path('/foo/')
    .collapsable(false)
    .sidebarDepth(1)
    .children.add('/')
    .end()
    .end()
    .group('group 2')
    .title('Group 2')
    .path('/bar/')
    .collapsable(false)
    .sidebarDepth(1)
    .children.add('/')
    .add('/children')
  expect(sidebar.toConfig()).toEqual([
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
  ])
})
