const NavGroup = require('../src/NavGroup')
test('navGroup', () => {
  const navGroup = new NavGroup(null, 'group1')
  navGroup
    .text('framework')
    .item('vue')
    .text('Vue')
    .link('/linkToVue.md')
    .end()
    .item('react')
    .text('React')
    .link('/linkToReact.md')

  expect(navGroup.toConfig()).toEqual({
    text: 'framework',
    items: [
      { text: 'Vue', link: '/linkToVue.md' },
      { text: 'React', link: '/linkToReact.md' }
    ]
  })
})
