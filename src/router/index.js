import Vue from "vue";
import Router from "vue-router";
//import { component } from 'vue/types/umd'
import loginmodule from "../store/auth.module";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views

// autenticação
const Login = () => import("@/views/Autenticacao/Login");
const RecuperarSenha = () => import("@/views/Autenticacao/RecuperarSenha");
const Cadastro = () => import("@/views/Autenticacao/Cadastro");
const CadastroSetor = () => import("@/views/Admin/Setor/Cadastro");
const CadastroLevel = () => import("@/views/Admin/Level/Cadastro");

// home
const Home = () => import("@/views/Home");

Vue.use(Router);

function configRoutes() {
  return [
    {
      path: "/autenticacao",
      redirect: "/autenticacao/login",
      name: "Autenticacao",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "login",
          name: "Login",
          component: Login,
        },
        {
          path: "cadastro",
          name: "Cadastro",
          component: Cadastro,
        },
        {
          path: "recuperar-senha",
          name: "Recuperar Senha",
          component: RecuperarSenha,
        },
      ],
    },
    {
      path: "",
      name: "",
      meta: {
        requiresAuth: true,
      },
      component: TheContainer,
      children: [
        {
          path: "",
          name: "Home Page",
          component: Home,
        },
        {
          path: "admin",
          name: "Area Administrativa",
          //redirect: '/admin',
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "cadastro-setor",
              name: "CadastroSetor",
              component: CadastroSetor,
            },
            {
              path: "cadastro-level",
              name: "CadastroLevel",
              component: CadastroLevel,
            },
          ],
        },
      ],
    },
  ];
}

const router = new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = loginmodule.actions.isAuthenticate();

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/autenticacao/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
