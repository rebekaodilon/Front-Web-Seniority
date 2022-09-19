import token from '../helpers/token.service'
const navAdmin = [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Home',
        to: '/',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Administrativo']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Usuário',
        to: '/admin/usuario/'
      }
    ]
  }
];

function getNav() {
  return navAdmin;
}

export default [
  {
    _name: 'CSidebarNav',
    _children: getNav()
  }
]