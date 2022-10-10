<template>
  <div class="c-app flex-row">
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
        <CCol md="12" :class="loadPage == true ? 'backgroud-load' : '' ">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Cadastro de Leveis</h1>
                  <p class="text-muted">Crie os leveis da plataforma</p>
                  <CInput placeholder="Descrição" v-model="login" v-on:keyup.enter="criar()">
                  </CInput>
                  <CRow>
                    <CCol col="12" class="text-right">
                      <CButton color="primary" class="px-4" @click="criar()">Criar</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>

export default {
  data() {
    return {
      login: null,
      nome: null,
      email: null,
      sector: null,
      level: null,
      password: null,
      alertas: [],
      loadPage: false,
    };
  },
  name: "LoginComponent",
  methods: {
    validarCampos() {
      if (this.login == null || this.login == "") {
        return "Os dados de login e senha devem ser informados.";
      } 
      if (this.nome == null || this.nome == "") {
        return "Os dados de login e senha devem ser informados.";
      } 
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
    // async criar() {
    //   let valido = this.validarCampos();
    //   if (valido == true) {
    //       const data = {
    //           Login: this.login,
    //           Nome: this.nome,
    //           Email: this.email,
    //           Senha: this.password,
    //           SectorId: this.sector.Id,
    //           LevelId: this.level.Id,
    //           IdTipoUsuario: 2
    //       }

    //       const method = 'admin/cliente/criar'
    //       const result = await store.actions.postItem(method, data);

    //       if (!result.Message) {
    //           noty.commit("addToaster", {
    //               text: "Residência criado com sucesso!",
    //               type: "Success"
    //           });

    //           this.$router.push('/admin/cliente');
    //       }
    //   } else {
    //       noty.commit("addToaster", {
    //           text: valido,
    //           type: "Error"
    //       });
    //   }
    // },
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