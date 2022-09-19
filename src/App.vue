<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
    import "vuejs-noty/dist/vuejs-noty.css";
    export default {
         name: 'App',
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
  @import 'assets/scss/style';
</style>
<style>
    .backgroud-load{
        opacity: 0.3;
    }
    .loader-page-all{
        opacity: 0.6 !important;
        position: absolute;
        left: 51%;
        top: 30%;
        z-index: 99999;
    }
    input{
        height: 40px !important;
    }
    select{
        height: 40px !important;
    }
    .foto-lista{
        height: 100%;
        max-height: 110px !important;
    }
    .c-sidebar-brand{
        background: #fff !important;
    }
    .vs__dropdown-toggle{
        padding-bottom: 5px !important;
        padding-top: 3px !important;
    }
    .toast {
        color: #fff;
    }
    .card-option-table{
        margin-bottom: 15px;
        margin-top: 15px;
    }
    .select-page-div label{ 
        margin-right: 5px;
    }

    thead tr {
        background-color: white !important;
    }
    .btn-outline-primary:focus, .btn-outline-primary.focus,
    .btn-outline-primary:not(:disabled):not(.disabled):active:focus, .btn-outline-primary:not(:disabled):not(.disabled).active:focus{
        box-shadow: 0 0 0 0.2rem rgb(29 115 35 / 50%) !important;
    }
    .btn-info{
      color: #fff;
      background-color: #f1634a;
      border-color: #f1634a;
    }

    .btn-info:hover{
      color: #fff;
      background-color: #dd5c45;
      border-color: #dd5c45;
    }

    .badge-primary{
      color: #fff;
      background-color: #ea8024;
      border-color: #ea8024;
    }
    .c-switch-dark .c-switch-input:checked + .c-switch-slider {
        background-color: #f1634a;
        border-color: #f1634a;
    }

    .uppercase{
        text-transform: uppercase;
    }
</style>
