const navEcommerce = [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavTitle",
        _children: ["E-commerce"],
      },

      {
        _name: "CSidebarNavItem",
        name: "Categorias",
        to: "/ecommerce/categoria/",
        icon: "cil-tags",
      },
      {
        _name: "CSidebarNavItem",
        name: "Clientes",
        to: "/ecommerce/cliente/",
        icon: "cil-user",
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Consultores',
        to: '/ecommerce/consultor/',
        icon: 'cil-people',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Produtos',
        to: '/ecommerce/produto/',
        icon: 'cil-tag',
        _name: "CSidebarNavItem",
        name: "Produtos",
        to: "/ecommerce/produto/",
        icon: "cil-tag",
      },
      {
        _name: "CSidebarNavItem",
        name: "Variações",
        to: "/ecommerce/variacao/",
        icon: "cil-casino",
      },
      {
        _name: "CSidebarNavItem",
        name: "Tabelas de Preços",
        to: "/ecommerce/tabelaprecos/",
        icon: "cil-cash",
      },
      {
        _name: "CSidebarNavItem",
        name: "Tabelas de Comissão",
        to: "/ecommerce/tabelacomissao/",
        icon: "cil-bar-chart",
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Extrato de Comissão',
        to: '/ecommerce/extratocomissao/',
        icon: 'cil-description',
      },
      {
        _name: "CSidebarNavItem",
        name: "Pedidos",
        to: "/ecommerce/pedido/",
        icon: "cil-description",
      },
      {
        _name: "CSidebarNavItem",
        name: "Estoque",
        to: "/ecommerce/estoque/",
        icon: "cil-storage",
      },
      {
        _name: "CSidebarNavItem",
        name: "Configurações do Ecommerce",
        to: "/ecommerce/configuracoes-ecommerce/",
        icon: "cil-settings",
      },
      {
        _name: "CSidebarNavItem",
        name: "Log de Integração",
        to: "/ecommerce/integracaolog/",
        icon: "cil-folder-open",
      },
    ],
  },
];

export default [
  {
    _name: "CSidebarNav",
    _children: navEcommerce,
  },
];
