<template>
    <div>
        <CRow>
            <div class="cover-spin" v-if="loadPage == true">
                <CSpinner
                class="loader-page-all"
                style="width: 8rem; height: 8rem"
                color="primary"
                grow
                />
            </div>
            
            <CCol md="12" :class="loadPage == true ? 'backgroud-load' : '' ">
                <CCard>
                    <CCardHeader>
                        <div class="title-edit-page">
                            <div @click="navigate('/admin/residencia/')">
                                <CIcon :content="freeSet.cilArrowThickToLeft" size="lg" />
                            </div>
                            <h2>Adicionar Cliente</h2>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CForm id="CriarUsuarioID" method="POST">
                            <CRow>
                                <CCol md="3">
                                    <CInput
                                        label="Nome"
                                        placeholder="Informe a Nome"
                                        id="idNome"
                                        v-model="Nome"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="3">
                                    <CInput
                                        label="Email"
                                        placeholder="Informe o Email"
                                        id="idEmail"
                                        v-model="Email"
                                        type="email"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="3">
                                    <CInput
                                        label="Cpf"
                                        placeholder="Informe o Cpf"
                                        id="idCpf"
                                        v-model="Cpf"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="3">
                                    <CInput
                                        label="Telefone"
                                        placeholder="Informe o Telefone"
                                        id="idTelefone"
                                        v-model="Telefone"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="12">
                                    <label>Residencia</label>
                                    <multiselect 
										v-model="ResidenciaSelecionada" 
                                        :options="optionsResidencia"
                                        placeholder="Informe a Residencia"
                                        selectLabel="Selecionar"
                                        deselectLabel="Remover"
										:close-on-select="true"
                                        label="Descricao"
                                        :multiple="false"
                                        track-by="Descricao"
                                    />
                                </CCol>
                            </CRow>
                        </CForm>
                    </CCardBody>
                    <CCardFooter>
                        <CRow>
                            <CCol md="1" class="btn-final-form-edit mt-3 mb-2">
                                <CButton
                                    color="success"
                                    size="lg"
                                    variant= "outline"
                                    type="button"
                                    @click="criarCliente"
                                    :disabled="loadPage"
                                >
                                    Adicionar
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import store from '../../../store/data.module';
import { freeSet } from "@coreui/icons";
import noty from "../../../store/index";

export default {
    data() {
        return {
            labelIcon: {
                labelOn: "\u2713",
                labelOff: "\u2715",
            },

            Nome: null,
            Email: null,
            Cpf: null,
            Telefone: null,

            ResidenciaSelecionada:null,
            optionsResidencia: [],

            // others
            loadPage: false,
            freeSet
        }
    },
    name: 'CriarResidencia',
    methods: {
        navigate(url) {
            this.$router.push(url);
        },
        async getCep(){
            console.log('entrou')
            if (this.Cep != null && this.Cep.length == 9) {
                this.loadPage = true;

                const url = 'https://viacep.com.br/ws/' + this.Cep.replace('-','') + '/json/';
                const result = await store.actions.getViaCep(url);
                
                this.Logradouro = result.logradouro;
                this.Complemento = result.complemento;
                this.Bairro = result.bairro;
                this.Cidade = result.localidade;
                this.Estado = result.uf;

                this.loadPage = false;
            }
        },
        validarCampos() {
            if (!this.Nome)
                return "Informe o Nome";
            if (!this.Email)
                return "Informe o Email";
            if (!this.Cpf)
                return "Informe o Cpf";
            if (!this.Telefone)
                return "Informe o Telefone";
            else
                return true;
        },
        async criarCliente() {
            this.loadPage = true;

            let valido = this.validarCampos();
            if (valido == true) {
                const data = {
                    Nome: this.Nome,
                    Email: this.Email,
                    Cpf: this.Cpf.replaceAll('.','').replace('-',''),
                    Telefone: this.Telefone,
                    IdResidencia: this.ResidenciaSelecionada.IdResidencia
                }

                const method = 'admin/cliente/criar'
                const result = await store.actions.postItem(method, data);

                if (!result.Message) {
                    noty.commit("addToaster", {
                        text: "Residência criado com sucesso!",
                        type: "Success"
                    });

                    this.$router.push('/admin/cliente');
                }
            } else {
                noty.commit("addToaster", {
                    text: valido,
                    type: "Error"
                });
            }
            
            this.loadPage = false;
        },
        async listResidencia(){
            try {

                const data = {
                    Page: 1,
                    Size: 20,
                    Search: null
                };

                const method = 'admin/residencia/'
                const result = await store.actions.postItem(method, data);

                if(result.Registers){
                    this.optionsResidencia = result.Registers;
                }
                
            } catch (error) {
                noty.commit("addToaster", {
                    text: error.Message,
                    type: "Error"
                });
            }
        }
    },
    async mounted(){
        await this.listResidencia();
    }
}
</script>

<style>
	.title-edit-page h2 {
	padding-left: 6px;
	margin-bottom: 0;
	}
	.title-edit-page svg {
	cursor: pointer;
	}
	.title-edit-page {
	display: inline-flex;
	align-items: center;
	}
	.card-tabela-header h4 {
	margin-left: 10px;
	margin-bottom: 0;
	vertical-align: middle;
	}
</style>