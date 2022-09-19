<template>
    <CRow>
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <h2>Placas</h2>
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
                <CCol md="12 mb-4" class="text-left">
                    <CButton size="" class="btn-outline-primary uppercase" @click="navigate('/admin/placa/criar')">
                        Adicionar novo <CIcon :content="freeSet.cilPlus" size="lg" style="margin:0!important" />
                    </CButton>
                </CCol>
                <CCol md="6" class="text-left form-inline">
                    <CInput
                        label="Buscar : "
                        :horizontal="true"
                        placeholder="Digite a sua busca"
                        v-model="Busca"
                        type="text"
                        autocomplete="off"
                        @keypress="(event) => keyPress(event)"
                    >
                        <template #append>
                            <CButton class="btn btn-outline-primary uppercase" @click="popularTabela()"><CIcon :content="freeSet.cilSearch"/></CButton>
                        </template>
                    </CInput>
                    <CInputFile type="file"
                        v-model="imagem"
                        @change="recognition($event)"
                        id="imageid"
                        accept="image/png, image/jpeg">
                    </CInputFile>
                </CCol>
                <CCol md="6" class="select-page-div form-inline justify-content-sm-end">
                    <CSelect
                        label="Itens por página:"
                        :value.sync="ItensPorPagina"
                        :options="[10,20,50,100]"
                    />
                </CCol>
            </CRow>
          <CDataTable
            hover
            sorter
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
            <template #ecommerce="data">
                <td class="text-center">
                    <span :key="key" v-for="(ecommerce, key) in data.item.ListaEcommerce">
                        <CBadge  color="secondary">
                            {{ ecommerce.nome }}
                        </CBadge>
                    </span>
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
                        @click="navigate('/admin/placa/editar/'+ item.IdPlaca)"
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
                    { key: 'IdPlaca', label: '#' },
                    { key: 'Numero', label: 'Número da Placa' },
                    { key: 'ResidenciaDescricao', label: 'Residencia' },
                    { 
						key: 'show_details', 
						label: '', 
						_style: 'width:6%', 
						sorter: false, 
						filter: false
                	}
                ],
                paginaAtual: 1,
                totalPaginas: null,
                loadPage: true,
                Busca: null,
                ItensPorPagina: 10,
                freeSet,
                collapseDuration: 0,
                imagem:null,
                base64:null,

                alertas: []
            }
        },
        name: 'listarPlacas',
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
            async popularTabela() {
                this.loadPage = true;

                const method = 'admin/placa';
                const data = {
                    Page: this.paginaAtual,
                    Size: this.ItensPorPagina,
                    Search: this.Busca
                };
                
                const result  = await store.actions.getListPost(method, data);
                
                if (result.Registers) {
                    this.items = result.Registers.map((item, id) => { return {...item, id}});
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
        	},
            async recognition(element){
                var base64 = await this.encodeImageFileAsURL(element);
                console.log(base64);
                const method = 'admin/placa/recognition';
                const data = {
                    Image: base64.split(",")[1]+'==',
                };
                
                await store.actions.getListPost(method, data);
            },
            async encodeImageFileAsURL(element) {
                const toBase64 = file => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                })
                return toBase64(element[0]).then(res => {
                    return res;
                })
            }
        },
        async mounted() {
            await this.popularTabela();
        },
        watch: {
            async paginaAtual() {
                await this.popularTabela();
            },
			async ItensPorPagina(){
				await this.popularTabela();
			},
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