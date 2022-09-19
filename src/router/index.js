import Vue from 'vue'
import Router from 'vue-router'
//import { component } from 'vue/types/umd'
import loginmodule from '../store/auth.module'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views

// autenticação
const Login = () => import('@/views/Autenticacao/Login')
const RecuperarSenha = () => import('@/views/Autenticacao/RecuperarSenha')
const Cadastro = () => import('@/views/Autenticacao/Cadastro')

// home
const Home = () => import('@/views/Home')

// usuarios
const ListarUsuario = () => import('@/views/Admin/Usuario/Listar')
const CriarUsuario = () => import('@/views/Admin/Usuario/Criar')
const EditarUsuario = () => import('@/views/Admin/Usuario/Editar')

// residencias
const ListarResidencia = () => import('@/views/Admin/Residencia/Listar')
const CriarResidencia = () => import('@/views/Admin/Residencia/Criar')
const EditarResidencia = () => import('@/views/Admin/Residencia/Editar')

// clientes
const ListarCliente = () => import('@/views/Admin/Cliente/Listar')
const CriarCliente = () => import('@/views/Admin/Cliente/Criar')
const EditarCliente = () => import('@/views/Admin/Cliente/Editar')

// placas
const ListarPlaca = () => import('@/views/Admin/Placa/Listar')
const CriarPlaca = () => import('@/views/Admin/Placa/Criar')
const EditarPlaca = () => import('@/views/Admin/Placa/Editar')

// placas
const ListarRelatorio = () => import('@/views/Admin/Relatorio/Listar')

Vue.use(Router)

function configRoutes () {
  return [
    {
      path: '/autenticacao',
      redirect: '/autenticacao/login',
      name: 'Autenticacao',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'cadastro',
          name: 'Cadastro',
          component: Cadastro
        },
        {
          path: 'recuperar-senha',
          name: 'Recuperar Senha',
          component: RecuperarSenha
        }
      ]
    },
    {
      path: '',
      name: '',
      meta: {
        requiresAuth: true
      },
      component: TheContainer,
      children: [
        {
          path: '',
          name: 'Home Page',
          component: Home
        },
        {
          path: 'admin',
          name: 'Area Administrativa',
          //redirect: '/admin',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'usuario',
              redirect: '/usuario',
              name: 'Usuários',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  name: 'Listar Usuários',
                  component: ListarUsuario
                },
                {
                  path: 'criar',
                  name: 'Criar Usuário',
                  component: CriarUsuario
                },
                {
                  path: 'editar/:id',
                  name: 'Editar User',
                  component: EditarUsuario
                }
              ]
            },
            {
              path: 'residencia',
              redirect: '/residencia',
              name: 'Residencias',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  name: 'Listar Residencias',
                  component: ListarResidencia
                },
                {
                  path: 'criar',
                  name: 'Criar Residencia',
                  component: CriarResidencia
                },
                {
                  path: 'editar/:id',
                  name: 'Editar Residencia',
                  component: EditarResidencia
                }
              ]
            },
            {
              path: 'placa',
              redirect: '/placa',
              name: 'Placas',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  name: 'Listar Placas',
                  component: ListarPlaca
                },
                {
                  path: 'criar',
                  name: 'Criar Placa',
                  component: CriarPlaca
                },
                {
                  path: 'editar/:id',
                  name: 'Editar Placa',
                  component: EditarPlaca
                }
              ]
            },
            {
              path: 'cliente',
              redirect: '/cliente',
              name: 'Clientes',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  name: 'Listar Clientes',
                  component: ListarCliente
                },
                {
                  path: 'criar',
                  name: 'Criar Cliente',
                  component: CriarCliente
                },
                {
                  path: 'editar/:id',
                  name: 'Editar Cliente',
                  component: EditarCliente
                }
              ]
            },
            {
              path: 'relatorio',
              redirect: '/relatorio',
              name: 'Relatorio',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  name: 'Listar Relatorio',
                  component: ListarRelatorio
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
});

router.beforeEach((to, from, next) => {
    
  const isAuthenticated = loginmodule.actions.isAuthenticate();

  if (to.matched.some(route => route.meta.requiresAuth)) {
      if (!isAuthenticated) {
          next("/autenticacao/login");
      } else {
          next();
      }
  } else {
      next();
  }
});

export default router