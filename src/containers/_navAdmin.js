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
        name: 'Residencias',
        to: '/admin/residencia/',
        icon: 'cil-building',
        _class: 'ocultarUsuarioProprietario'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Usuários',
        to: '/admin/usuario/',
        icon: 'cib-superuser',
        _class: 'ocultarUsuarioProprietario'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Placas',
        to: '/admin/placa/',
        icon: 'cil-storage',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Clientes',
        to: '/admin/cliente/',
        icon: 'cil-user',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Relatorio de Auditoria',
        to: '/admin/relatorio/',
        icon: 'cil-settings',
      }
    ]
  }
];


export default [
  {
    _name: 'CSidebarNav',
    _children: navAdmin
  }
]