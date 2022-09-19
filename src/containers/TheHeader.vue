<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <!-- <img src="../assets/img/bizseller_logo_horizontal.png"       
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size"
        :height="35" 
        viewBox="0 0 556 134"
      /> -->
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <span>Olá, {{login}}</span>
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import token from '../helpers/token.service'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  data () {
    return { 
      login: null
    }
  },
  methods: {
    getUser() {
      const usuario = token.getUser();
      this.login = usuario.Login;
    }
  },
  mounted() {
    this.getUser();
  }
}
</script>
