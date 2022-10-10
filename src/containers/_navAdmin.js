const navAdmin = [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavTitle',
        _children: ['Administrativo'],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Setores',
        to: '/admin/cadastro-setor/',
        icon: 'cil-building',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Leveis',
        to: '/admin/cadastro-level/',
        icon: 'cil-building',
      },
    ]
  }
];


export default [
  {
    _name: 'CSidebarNav',
    _children: navAdmin
  }
]