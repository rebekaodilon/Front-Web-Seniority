<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="../assets/images/9.png"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Conta</strong>
    </CDropdownHeader>
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { LOGOUT } from "../store/actions.type";
import store from "../store/index";
import token from "../helpers/token.service"

export default {
  name: 'TheHeaderDropdownAccnt',
  data() {
    return {
      isAdmin : true
    }
  },
  methods: {
    async logout() {
      await store.dispatch(LOGOUT);
      this.$router.push('/autenticacao/login');
    },
    navigate(url) {
      this.$router.push(url);
    },
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>