<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <div class="cover-spin" v-if="loadPage == true">
        <CSpinner
          class="loader-page-all"
          style="width: 8rem; height: 8rem"
          color="primary"
          grow
        />
      </div>
      <CCol :class="loadPage == true ? 'backgroud-load' : '' ">
        <CCardGroup>
          <CCard class="p-4 card-login">
            <CCardBody>
              <CForm>
                <h1>Recuperar a senha</h1>
                <CInput
                  type="email"
                  placeholder="E-mail"
                  autocomplete="username email"
                  v-model="email"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user" />
                  </template>
                </CInput>
                <CInput
                  placeholder="Confirmar E-mail"
                  type="email"
                  autocomplete="curent-password"
                  v-model="confirmEmail"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user" />
                  </template>
                </CInput>
                <CRow>
                  <CCol col="12" class="text-left">
                    <CButton color="primary" block class="px-4" @click="esqueceuSenha()">Redefinir</CButton>
                  </CCol>
                  <CCol col="12" class="text-left">
                    <CButton
                      color="link"
                      class="px-0"
                      @click="navigate('/autenticacao/login')"
                    >Voltar para o login?</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-sm-down-none card-login"
            body-wrapper
          >
            <h3>SRSystem - Backoffice</h3>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import loginstore from "../../store/auth.module";
import noty from "../../store/index";

export default {
  data() {
    return {
      email: null,
      confirmEmail: null,
      loadPage: false,
    };
  },
  name: "RecuperarSenhaComponent",
  methods: {
    async esqueceuSenha() {
      this.loadPage = true;
      const data = {
        Email: this.email,
      };
      
      if (this.email === this.confirmEmail &&
          this.email != null &&
          this.confirmEmail != null) {
        
        let result = await loginstore.actions.recuperarSenha(data);
        if (result.Message) {
            this.loadPage = false;
            noty.commit("addToaster", {
                text: result.Message,
                type: "Error"
            });
        }
        else {
            this.loadPage = false;
            noty.commit("addToaster", {
                text: result.Sucesso,
                type: "Success"
            });
        }
      } 
      else {
        this.loadPage = false;
        noty.commit("addToaster", {
            text: "O E-mail e a confirmação devem ser preenchidos corretamento.",
            type: "Warning"
        });
      }
    },
    navigate(route) {
      this.$router.push(route);
    },
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