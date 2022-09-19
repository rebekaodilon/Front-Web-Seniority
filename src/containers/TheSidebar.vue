<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <!-- <img
        src="../assets/img/bizseller_logo_horizontal.png"
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      />
      <img
        src="../assets/img/bizseller_logo_vertical.png"
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      /> -->
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="menu" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import navAdmin from './_navAdmin'

export default {
	name: 'TheSidebar',
	navAdmin,
	computed: {
		show () {
			return this.$store.state.sidebarShow 
		},
		minimize () {
			return this.$store.state.sidebarMinimize 
		}
	},
  	data() {
   		return {
			menu: []
    	}
  	},
	methods: {
		changeMenu(){
			this.menu = navAdmin;
		},
    async ocultarMenu(){
      const user = JSON.parse(window.localStorage.getItem('user'));
      const tipoUsuario = user.IdTipoUsuario;
      let elemento = null;
      let classeElemento = null;
      if(tipoUsuario == 2)
        classeElemento = "ocultarUsuarioProprietario";

      if(classeElemento)
      {
        const elemento = document.getElementsByClassName(classeElemento);
        const teste = Array.from(elemento)
        console.log(teste);
      }
    }
	},
	async mounted() {
		this.changeMenu();
		await this.ocultarMenu();
	}
}
</script>
