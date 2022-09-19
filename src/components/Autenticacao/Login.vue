<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <div class="cover-spin" v-if="loadPage == true">
          <CSpinner
            class="loader-page-all"
            style="width: 8rem; height: 8rem"
            color="primary"
            grow
          />
        </div>
        <CCol md="8" :class="loadPage == true ? 'backgroud-load' : '' ">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Logue com sua conta</p>
                  <CInput placeholder="Login" autocomplete="username email" v-model="email" v-on:keyup.enter="login()">
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput
                    placeholder="Senha"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                    v-on:keyup.enter="login()"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" @click="navigate('/autenticacao/cadastro')">Cadastrar</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="primary" class="px-4" @click="login()">Login</CButton>
                    </CCol>
                    <CCol col="12" class="text-right">
                      <CButton
                        color="link"
                        class="px-0"
                        @click="navigate('/autenticacao/recuperar-senha')"
                      >Esqueceu a senha?</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Login</h2>
                <p>Entre com seus dados de acesso para logar no sistema.</p>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { LOGIN } from "../../store/actions.type";
import store from "../../store/index";

export default {
  data() {
    return {
      email: null,
      password: null,
      alertas: [],
      loadPage: false,
    };
  },
  name: "LoginComponent",
  methods: {
    validarCampos() {
      if (this.email == null || this.email == "") {
        return "Os dados de login e senha devem ser informados.";
      } 
      else if (this.password == null || this.password == "") {
        return "Os dados de login e senha devem ser informados.";
      }
      else {
        return true;
      }
    },
    async login() {
      this.loadPage = true;

      const data = {
        Login: this.email,
        Senha: this.password,
      };
      
      let valido = this.validarCampos();
      
      if (valido != true) {
        this.loadPage = false;
        store.commit("addToaster", {
            text: valido,
            type: "Error"
        });
      } 
      else {
        let result = await store.dispatch(LOGIN, { data });

        if (result.Message) {
          store.commit("addToaster", {
              text: result.Message,
              type: "Error"
          });
          this.loadPage = false;
        } 
        else {
          this.loadPage = false;
          this.$router.push("/");
        }
      }
    },
    navigate(route) {
      this.$router.push(route);
    }
  },
};
</script>

<style>
.bg-primary {
    background-color: rgba(60, 75, 100)!important;
}
.btn-primary {
    background-color: rgba(60, 75, 100)!important;
    border-color: rgba(60, 75, 100)!important;
}
.btn-link{
  color: rgba(60, 75, 100)!important;
}
.btn:focus, .btn.focus{
  box-shadow: 0 0 0 0.1rem rgba(60, 75, 100,0.8) !important;
}
</style>