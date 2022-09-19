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
                            <h2>Adicionar Residência</h2>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CForm id="CriarUsuarioID" method="POST">
                            <CRow>
                                <CCol md="6">
                                    <CInput
                                        label="Descricao"
                                        placeholder="Informe a Descricao"
                                        id="idDescricao"
                                        v-model="Descricao"
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
                                        v-mask="'(##) #####-####'"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="3">
                                    <CInput
                                        label="Cep"
                                        placeholder="Informe o Cep"
                                        id="idCep"
                                        v-model="Cep"
                                        type="text"
                                        v-mask="'#####-###'"
                                        autocomplete="off"
                                        @blur="getCep"
                                    />
                                </CCol>
                                <CCol md="12">
                                    <CInput
                                        label="Logradouro"
                                        placeholder="Informe o Logradouro"
                                        id="idLogradouro"
                                        v-model="Logradouro"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="3">
                                    <CInput
                                        label="Número"
                                        placeholder="Informe o Numero"
                                        id="idNumero"
                                        v-model="Numero"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="3">
                                    <CInput
                                        label="Bairro"
                                        placeholder="Informe o Bairro"
                                        id="idBairro"
                                        v-model="Bairro"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="3">
                                    <CInput
                                        label="Cidade"
                                        placeholder="Informe a Cidade"
                                        id="idCidade"
                                        v-model="Cidade"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="3">
                                    <CSelect
                                        label="Estado"
                                        placeholder="Informe o Estado"
                                        id="Estado"
                                        v-model="Estado"
                                        type="text"
                                        autocomplete="off"
                                        :options="['AC','AL','AP','AM','BA','CE','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO','DF']"
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
                                    @click="criarResidencia"
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

            Descricao: null,
            Telefone: null,
            Cep: null,
            Logradouro: null,
            Numero: null,
            Bairro: null,
            Cidade: null,
            Estado: null,

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
            if (!this.Descricao)
                return "Informe a Descrição";
            if (!this.Telefone)
                return "Informe o Telefone";
            if (!this.Cep)
                return "Informe o Cep";
            if (!this.Logradouro)
                return "Informe o Logradouro";
            if (!this.Numero)
                return "Informe o Número";
            if (!this.Bairro)
                return "Informe o Bairro";
            if (!this.Cidade)
                return "Informe a Cidade";
            if (!this.Estado)
                return "Selecione o Estado";
            else
                return true;
        },
        async criarResidencia() {
            this.loadPage = true;

            let valido = this.validarCampos();
            if (valido == true) {
                const data = {
                    Descricao: this.Descricao,
                    Telefone: this.Telefone.replace(/[^\w\s]/gi, '').replace(' ',''),
                    Cep: this.Cep.replace('-',''),
                    Logradouro: this.Logradouro,
                    Numero: this.Numero,
                    Bairro: this.Bairro,
                    Cidade: this.Cidade,
                    Estado: this.Estado
                }
                const method = 'admin/residencia/criar'
                const result = await store.actions.postItem(method, data);

                if (!result.Message) {
                    noty.commit("addToaster", {
                        text: "Residência criado com sucesso!",
                        type: "Success"
                    });

                    this.$router.push('/admin/residencia');
                }
            } else {
                noty.commit("addToaster", {
                    text: valido,
                    type: "Error"
                });
            }
            
            this.loadPage = false;
        }
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