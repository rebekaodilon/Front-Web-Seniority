<template>
    <CRow>
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <h2>Auditoria</h2>
        </CCardHeader>
        <CCardBody>
            <template v-for="(alerta, key) in alertas">
                <CAlert
                    :key="'alerta' + key"
                    :color="alerta.color"
                    closeButton
                    :show="true"
                >
                    {{alerta.message}}
                </CAlert>
            </template>
            <CRow class="card-option-table">
                <CCol md="3" class="text-left">
                    <CSelect
                        placeholder="Digite a sua busca:"
                        label="Itens por página:"
                        :value.sync="ItensPorPagina"
                        :options="[10,20,50,100]"
                    />
                </CCol>
                <CCol md="3" class="text-left">
                    <CInput
                        label="Data Inicio : "
                        v-model="dataInicio"
                        type="date"
                        autocomplete="off"
                        @keypress="(event) => keyPress(event)"
                    >
                    </CInput>
                </CCol>
                <CCol md="3" class="text-left">
                    <CInput
                        label="Data Final : "
                        v-model="dataFinal"
                        type="date"
                        autocomplete="off"
                        @keypress="(event) => keyPress(event)"
                    >
                    </CInput>
                </CCol>
                
                <CCol md="3" class="text-left">
                    <label >Usuário</label>
                    <multiselect 
                        v-model="user" 
                        :options="Users"
                        placeholder="Usuário"
                        selectLabel="Selecionar"
                        deselectLabel="Remover"
                        :close-on-select="true"
                        label="Nome"
                        :multiple="false"
                        track-by="IdUsuario"
                    />
                </CCol>
            </CRow>
          <CDataTable
                hover
                sorter
                style="margin-top: 10px"
                :items="items"
                :fields="fields"
                :pagination="false"
                :noItemsView="{ noResults: 'Sem Resultado', noItems: ' ' }"
                :loading="loadPage" 
            >
            <template #Inativo="data">
                <td class="text-center">
                    <CBadge :color="getBadge(data.item.Inativo)">
                            {{ data.item.Inativo == 1 ? "Inativo" : "Ativo" }}
                    </CBadge>
                </td>
            </template>
            <template #show_details="{item}">
                <td class="py-2 text-center">
                    <CButton
                        color="primary"
                        variant="outline"
                        class="uppercase"
                        square
                        size="sm"
                        @click="navigate('/admin/residencia/editar/'+ item.IdResidencia)"
                    >
                    Editar
                    </CButton>
                </td>
            </template>
          </CDataTable>
          <CPagination
              :activePage.sync="paginaAtual"
              :pages="totalPaginas"
              size=""
              align="center"
          />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
    import store from '../../../store/data.module';
    import moment from 'moment';
    import { freeSet } from '@coreui/icons';
    import noty from "../../../store/index";

    export default {
        data() {
            return {
                items: [],
                fields: [
                    { key: 'Id', label: '#' },
                    { key: 'Entidade', label: 'Entidade' },
                    { key: 'IdEntidade', label: 'IdEntidade' },
                    { key: 'DataHora', label: 'Data/Hora' },
                    { key: 'IdUsuario', label: 'IdUsuario' },
                    { key: 'Acao', label: 'Ação' },
                    { key: 'Sucesso', label: 'Sucesso' },
                ],
                paginaAtual: 1,
                totalPaginas: null,
                loadPage: true,
                Busca: null,
                ItensPorPagina: 10,
                freeSet,
                collapseDuration: 0,
                dataInicio: null,
                dataFinal: null,
                Users: [],
                user: null,

                alertas: []
            }
        },
        name: 'listarResidencia',
        methods: {
            getBadge (status) {
                switch (status) {
                    case 1: return 'danger'
                    case 0: return 'primary'
                    default: 'secondary'
                }
            },
            keyPress(event) {
                if (event.key === "Enter")
                    this.popularTabela();
            },
            async getUsers(){
                const method = 'admin/usuario';
                const data = {
                    Page: this.paginaAtual,
                    Size: this.ItensPorPagina,
                    Search: this.Busca,
                    RoleRestricted: 5
                };
                
                const result  = await store.actions.getListPost(method, data);

                if (result.Registers) {
                    result.Registers.forEach((item, index, array) => {
                        array[index].DataHora = moment.utc(item.DataHora, 'YYYY-MM-DD').local().format('DD/MM/YYYY');
                        array[index].IdEntidade = item.IdEntidade ? item.IdEntidade : '';
                    });

                    this.Users = result.Registers;
                }
                else {
                    noty.commit("addToaster", {
                        text: result.Message,
                        type: "Error"
                    });
                }
                
                this.loadPage = false;
            },
            async popularTabela() {
                this.loadPage = true;

                const method = 'admin/log';
                const data = {
                    Page: this.paginaAtual,
                    Size: this.ItensPorPagina,
                    Search: this.Busca,
                    Usuario: this.user ? this.user.IdUsuario : null,
                    DataInicio: this.dataInicio ? moment(this.dataInicio).format('YYYY-MM-DD 00:00:00') : null,
                    DataFinal: this.dataFinal ? moment(this.dataFinal).format('YYYY-MM-DD 23:59:59') : null
                };
                
                const result  = await store.actions.getListPost(method, data);
                
                if (result.Registers) {

                    this.items = result.Registers.map((item, id) => { return {...item, id, DataHora: moment.utc(item.DataHora).local().format('DD/MM/YYYY HH:MM:ss')}});
                    this.totalPaginas = result.TotalPages;
                }
                else {
                    noty.commit("addToaster", {
                        text: result.Message,
                        type: "Error"
                    });
                }
                
                this.loadPage = false;
            },
            navigate(route) {
                this.$router.push(route);
            },
            pageChange (val) {
                this.$router.push({ query: { page: val }});
            },
            toggleDetails (item) {
				this.$set(this.items[item.id], '_toggled', !item._toggled)
				this.collapseDuration = 350
				this.$nextTick(() => { this.collapseDuration = 0})
        	}
        },
        async mounted() {
            await this.getUsers();
            await this.popularTabela();
        },
        watch: {
            async paginaAtual() {
                await this.popularTabela();
            },
			async dataInicio(){
				await this.popularTabela();
			},
			async dataFinal(){
				await this.popularTabela();
			},
			async ItensPorPagina(){
				await this.popularTabela();
			},
			async user(){
				await this.popularTabela();
			}
        }
    }
</script>

<style scoped>
    .margin-bottom-10 {
        margin-bottom: 10px;
    }
    .margin-left {
        margin-left: 10px;
    }
</style>