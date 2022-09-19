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
                            <div @click="navigate('/admin/usuario/')">
                                <CIcon :content="freeSet.cilArrowThickToLeft" size="lg" />
                            </div>
                            <h2>Adicionar Usuário</h2>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CForm id="CriarUsuarioID" method="POST">
                            <CRow>
								<CCol md="6">
                                    <label for="Perfil">Tipo de Usuário</label>
                                    <multiselect 
										v-model="PerfilSelecionado" 
                                        :options="Perfil"
                                        placeholder="Informe o Tipo de Usuário"
                                        selectLabel="Selecionar"
                                        deselectLabel="Remover"
										:close-on-select="true"
                                        label="Descricao"
                                        :multiple="false"
                                        track-by="Nome"
                                    />
                                </CCol>
                                <CCol md="6">
                                    <CInput
                                        label="Nome"
                                        placeholder="Informe o nome"
                                        id="idNome"
                                        v-model="Nome"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="6">
                                    <CInput
                                        label="E-mail"
                                        placeholder="Informe o e-mail"
                                        id="idEmail"
                                        v-model="Email"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="6">
                                    <CInput
                                        label="Senha"
                                        placeholder="Informe a senha"
                                        id="idSenha"
                                        v-model="Senha"
                                        type="password"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="6">
                                    <label for="Perfil">Residencia</label>
                                    <multiselect 
										v-model="ResidenciaSelecionada" 
                                        :options="Residencias"
                                        placeholder="Vincule uma Residencia ao Usuário"
                                        selectLabel="Selecionar"
                                        deselectLabel="Remover"
										:close-on-select="true"
                                        label="Descricao"
                                        :multiple="false"
                                        track-by="Nome"
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
                                    @click="criarUsuario"
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
            // usuario
            IdUsuario: null,
            Nome: null,
            Email: null,
            Senha: null,
            AlterarSenha: null,
            Inativo: null,
            PerfilSelecionado: null,
            ResidenciaSelecionada: null,
            paginaAtual: 1,
            totalPaginas: null,
            loadPage: true,
            Busca: null,
            ItensPorPagina: 10,

            // multiselect
            Perfil: [],
            Residencias: [],

            // others
            loadPage: true,
            freeSet
        }
    },
    name: 'CriarUsuario',
    methods: {
        navigate(url) {
            this.$router.push(url);
        },
		labelCustom({ Nome }) {
            return `${Nome}`;
        },
		labelCustomTabela({ label }) {
            return `${label}`;
        },
        validarCampos() {
            if (!this.PerfilSelecionado)
                return "Selecione o perfil";
			else if((this.PerfilSelecionado.Descricao == "Proprietário") && !this.ResidenciaSelecionada)
				return "Selecione uma Residencia para vincular o "+ this.PerfilSelecionado.Descricao;
            else if (!this.Nome)
                return "Informe o nome";
            else if (!this.Email)
                return "Informe o e-mail";
            else if (!this.Senha)
                return "Informe a senha";
                return true;
        },
        async criarUsuario() {
            this.loadPage = true;

            let valido = this.validarCampos();
            if (valido != true) {
                noty.commit("addToaster", {
                    text: valido,
                    type: "Error"
                });
            }
            else {
                const data = {
                    Login: this.Email,
                    Nome: this.Nome,
                    Email: this.Email,
                    Senha: this.Senha,
                    IdTipoUsuario: this.PerfilSelecionado.IdUsuarioTipo,
                    IdResidencia: this.ResidenciaSelecionada.IdResidencia,
                }

                const method = 'admin/usuario/criar'
                const result = await store.actions.postItem(method, data);

                if (result.IdUsuario) {

                    noty.commit("addToaster", {
                        text: "Usuário criado com sucesso!",
                        type: "Success"
                    });
                    this.$router.push('/admin/usuario');
                }
                else {
                    noty.commit("addToaster", {
                        text: result.Message,
                        type: "Error"
                    });
                }
            }
            
            this.loadPage = false;
        },
        async loadPerfil() {
            const method = 'admin/usuario/usuariotipo';
            const data = {
                Page: this.paginaAtual,
                Size: this.ItensPorPagina,
                Search: this.Busca
            };
                
            const result  = await store.actions.getListPost(method, data);
            
            if (!result.Message) {
                this.Perfil = result;
            } else {
                noty.commit("addToaster", {
                    text: roles.Message,
                    type: "Error"
                });
            }
        },
        async loadResidencias() {
            const method = 'admin/residencia';
            const data = {
                Page: this.paginaAtual,
                Size: this.ItensPorPagina,
                Search: this.Busca
            };
                
            const result  = await store.actions.getListPost(method, data);
            
            if (!result.Message) {
                this.Residencias = result.Registers.map((item, id) => { return {...item, id}});
            } else {
                noty.commit("addToaster", {
                    text: roles.Message,
                    type: "Error"
                });
            }
            
            this.loadPage = false;
        },
    },
    async mounted() {
        this.loadPage = true;
        await this.loadPerfil();
        await this.loadResidencias();
        this.loadPage = false;
    },
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