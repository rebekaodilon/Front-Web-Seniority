const navControlador = [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavTitle',
        _children: ['Administrativo'],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Ecommerces',
        to: '/admin/ecommerce/',
        icon: 'cil-building',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Usuários',
        to: '/admin/usuario/',
        icon: 'cib-superuser',
      }
    ]
  }
];


export default [
  {
    _name: 'CSidebarNav',
    _children: navControlador
  }
]