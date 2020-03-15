import NavItem from '../src/NavItem'
test('navItem', () => {
  const navItem = new NavItem(null, 'vue')
  navItem.text('Vue').link('/linkToVue.md')
  expect(navItem.toConfig()).toEqual({ text: 'Vue', link: '/linkToVue.md' })
})
