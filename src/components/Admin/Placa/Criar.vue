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
                            <div @click="navigate('/admin/placa/')">
                                <CIcon :content="freeSet.cilArrowThickToLeft" size="lg" />
                            </div>
                            <h2>Adicionar Placa</h2>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CForm id="CriarUsuarioID" method="POST">
                            <CRow>
                                <CCol md="3">
                                    <CInput
                                        label="Número da placa"
                                        placeholder="Informe o Número da Placa"
                                        id="idDescricao"
                                        v-model="Numero"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="9">
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
                                    @click="criarPlaca"
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
            Numero: null,
            ResidenciaSelecionada: null,
            optionsResidencia: [],

            // others
            loadPage: false,
            freeSet
        }
    },
    name: 'criarPlaca',
    methods: {
        navigate(url) {
            this.$router.push(url);
        },
        validarCampos() {
            if (!this.Numero)
                return "Informe a Descrição";
            if(!this.ResidenciaSelecionada)
                return "Informe a Residencia"
            else
                return true;
        },
        async criarPlaca() {
            this.loadPage = true;

            let valido = this.validarCampos();
            if (valido == true) {
                const data = {
                    Numero: this.Numero,
                    IdResidencia: this.ResidenciaSelecionada.IdResidencia
                }
                const method = 'admin/placa/criar'
                const result = await store.actions.postItem(method, data);

                if (!result.Message) {
                    noty.commit("addToaster", {
                        text: "Placa criada com sucesso!",
                        type: "Success"
                    });

                    this.$router.push('/admin/placa');
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