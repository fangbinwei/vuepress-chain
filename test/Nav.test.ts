/* eslint-disable prettier/prettier */
import Nav from '../src/Nav'
import Config from '../src/Config'

const config = new Config()
test('nav without group', () => {
  const nav = new Nav(config, 'recently')
  nav.text('recently').link('/guide/')
  expect(nav.toConfig()).toEqual({
    text: 'recently',
    link: '/guide/'
  })
})

test('nav with group', () => {
  const nav = new Nav(config, 'frontEnd')
  nav
    .text('frontEnd')
      .group('group1')
        .text('group1')
        .item('vue')
          .text('Vue')
          .link('/linkToVue.md')
          .end()
        .item('react')
          .text('React')
          .link('/linkToReact.md')
          .end()
        .end()
      .group('group2')
        .text('group2')
        .item('cli')
          .text('Cli')
          .link('/linkToCli.md')
  expect(nav.toConfig()).toEqual({
    text: 'frontEnd',
    items: [
      {
        text: 'group1',
        items: [
          {
            text: 'Vue',
            link: '/linkToVue.md'
          },
          {
            text: 'React',
            link: '/linkToReact.md'
          }
        ]
      },
      {
        text: 'group2',
        items: [
          {
            text: 'Cli',
            link: '/linkToCli.md'
          }
        ]
      }
    ]
  })
})
