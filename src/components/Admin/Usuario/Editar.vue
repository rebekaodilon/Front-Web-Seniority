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
                            <div @click="navigate('/admin/usuario/' + IdUsuario)">
                                <CIcon :content="freeSet.cilArrowThickToLeft" size="lg" />
                            </div>
                            <h2>Editar Usuário</h2>
                        </div>
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
                        <CForm id="EditarUsuarioID" method="POST">
                            <CRow>
								<CCol md="6">
                                    <label for="Perfil">Perfil</label>
                                    <multiselect 
                                        v-model="PerfilSelecionado" 
                                        :options="Perfil"
                                        placeholder="Informe o perfil"
                                        selectLabel="Selecionar"
                                        deselectLabel="Remover"
                                        label="Nome"
                                        :multiple="false"
                                        :close-on-select="false"
                                        track-by="Nome"
                                        disabled
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
                                        label="Login"
                                        placeholder="Informe o login"
                                        id="idLogin"
                                        v-model="Login"
                                        type="text"
                                        autocomplete="off"
                                        disabled
                                        v-on:blur="validarLogin()"
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
                                        disabled
                                        v-on:blur="validaEmail()"
                                    />
                                </CCol>
                                <CCol md="6" v-if="PerfilSelecionado && PerfilSelecionado.Nome != 'Sistema' && PerfilSelecionado.Nome != 'Controlador'">
                                    <CInput
                                        label="Código Zoop"
                                        placeholder="Informe o código zoop"
                                        id="codigoZoop"
                                        v-model="CodigoZoop"
                                        type="text"
                                        autocomplete="off"
                                    />
                                </CCol>
                                <CCol md="6">
                                    <div>
                                        <label>Inativo?</label>
                                        <div>
                                            <CSwitch
                                                color="success"
                                                class="mt-2"
                                                v-bind="labelIcon"
                                                shape="pill"
                                                :checked.sync="Inativo"
                                            />
                                        </div>
                                    </div>
                                </CCol>
                            </CRow>
							<CRow v-if="ecommerceSelecionado">
								<CCol md="12" style="margin-top: 25px">
									<h2>E-commerce Vinculado</h2>
								</CCol>
                                <CCol md="12"  v-if="ecommerceSelecionado.length <= 0" style="margin-top: 25px">
									<h3>Nenhum e-commerce selecionado !</h3>
								</CCol>

								<CCol md="12" style="margin-top: 25px" v-for="(item,index) in ecommerceSelecionado" :key="item.IdEcommerce">
									<CRow style="align-items: center">
										<CCol md="10">
											<CRow style="align-items: center">
												<CCol md="4">
													<CInput
														label="E-commerce vinculado"
														placeholder="Nenhum e-commerce vinculado"
														type="text"
														:value="item.Ecommerce.Nome"
														autocomplete="off"
														disabled
													/>
												</CCol>

												<CCol md="4" v-if="Usuario.Perfil == 'Consultor'">
													<CInput
														label="Tabela de preço"
														placeholder="Nenhuma tabela de preço"
														type="text"
														:value="TabelaPrecos[index]"
														autocomplete="off"
														disabled
													/>
												</CCol>

												<CCol md="4" v-if="Usuario.Perfil == 'Consultor'">
													<CInput
														label="Tabela de comissão"
														placeholder="Nenhuma tabela de comissão"
														type="text"
														:value="TabelaComissoes[index]"
														autocomplete="off"
														disabled
													/>
												</CCol>

												<CCol md="4" v-if="Usuario.Perfil == 'Consultor'">
													<CInput
														label="Código Zoop"
														placeholder="Nenhum código zoop"
														type="text"
														:value="item.CodigoZoop"
														autocomplete="off"
														disabled
													/>
												</CCol>
												<CCol md="4" v-if="Usuario.Perfil == 'Consultor'">
													<CInput
														label="Tipo Comissionamento"
														placeholder="Nenhum tipo Comissionamento"
														type="text"
														:value="item.TipoComissionamento == 1 ? 'Extrato' : 'Split'"
														autocomplete="off"
														disabled
													/>
												</CCol>
												<CCol md="4" v-if="Usuario.Perfil == 'Consultor'">
													<CInput
														label="Percentual base de comissão"
														placeholder="Nenhum percentual base de comissão"
														v-money="item.TipoComissionamento == 1 ? money : percentage"
													    :value="Number(item.PercentualBaseDeComissao).toFixed(2)"
														type="text"
														autocomplete="off"
														disabled
													/>
												</CCol>
											</CRow>
										</CCol>
										<CCol md="2" style="margin-top: 12px; text-align: center">
											<CButton
												color="danger"
												class="uppercase cil-x"
												square
												@click="removerEcommerce(item, TabelaPrecos[index], TabelaComissoes[index])"
											>
												Deletar
											</CButton>
										</CCol>
									</CRow>
								</CCol>
							</CRow>
                        </CForm>
                    </CCardBody>
                    <CCardFooter>
                        <CRow>
                            <CCol md="6" class="btn-final-form-edit mt-3 mb-2">
                                <CButton
                                    color="success"
                                    size="lg"
                                    variant="outline"
                                    type="button"
                                    @click="salvarUsuario"
                                >
                                    Salvar
                                </CButton>
                            </CCol>
                            <CCol md="6" class="btn-final-form-edit mt-3 mb-2">
                                <CButton
                                    color="warning"
                                    size="lg"
                                    variant="outline"
                                    type="button"
                                    class="btn-right"
                                    @click="modalSenha = true"
                                >
                                	Alterar senha
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
        <CModal
            color="info"
            :show.sync="modalSenha"
            closeOnBackdrop: false
            size="sm"
        >
            <div>
                <CCol>
                    <CForm id="CriarDatabseID" method="POST" md="12">
                        <CRow>
                            <CCol md="12">
                                <CInput
                                    label="Senha Nova"
                                    placeholder="Informe uma nova senha"
                                    id="idSenhaNova"
                                    v-model="SenhaNova"
                                    type="password"
                                    autocomplete="off"
                                />
                                <CInput
                                    label="Confirmação de senha"
                                    placeholder="Confirme a nova senha"
                                    id="idConfirmarSenha"
                                    v-model="SenhaNovaConfirmacao"
                                    type="password"
                                    autocomplete="off"
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CCol>
            </div>
            <template #header>
                <h6 class="modal-title">Alterar senha</h6>
                <CButtonClose @click="fecharModalSenha()" class="text-white"/>
            </template>
            <template #footer>
                <CCol md="12" class="btn-final-form-edit mt-3 mb-2">
                    <CButton 
                        color="success"
                        size="lg"
                        type="button"
                        variant= "outline"
                        @click="alterarSenha()"
                        class="btn-right"
                    >
                        Salvar
                    </CButton>
                </CCol>
            </template>
        </CModal>
    </div>
</template>

<script>
import store from '../../../store/data.module';
import noty from "../../../store/index";
import { freeSet } from "@coreui/icons";
import {VMoney} from 'v-money';

export default {
    data() {
        return {
            labelIcon: {
                labelOn: "\u2713",
                labelOff: "\u2715",
            },
            // Usuario
			Usuario: null,
            IdUsuario: null,
            Login: null,
            Nome: null,
            Email: null,
            Senha: null,
            AlterarSenha: null,
            Inativo: null,
            IdPerfil: null,
            PerfilSelecionado: null,

            CodigoZoop: null,
			
			TabelaComissoes: [],
			TabelaPrecos: [],
			ecommerceSelecionado: null,
			listaEcommerce: [],

            freeSet,
            
            // multiselect
            Perfil: [],

            // others
            loadPage: true,
            
            // alert properties
            alertas: [],

            // alterar senha
            SenhaNova: null,
            SenhaNovaConfirmacao: null,
            modalSenha: null,
            percentage: {
                decimal: ',',
                thousands: '',
                prefix: '',
                suffix: '%',
                precision: 2,
                masked: false
            },
			money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                suffix: '',
                precision: 2,
                masked: false
            }
        }
    },
    directives: {
        percentage: VMoney,
        money: VMoney,
    },
    name: 'editarUsuario',
    methods: {
        convertPercent(value){
			return (Number(value).toFixed(2)).replace('.', ',')+'%';
		},
		async removerEcommerce(item, preco, comissao){
			this.loadPage = true;

			this.ecommerceSelecionado = this.ecommerceSelecionado.filter(f => f.IdEcommerce != item.IdEcommerce);
			this.TabelaPrecos = this.TabelaPrecos.filter(f => f != preco);
			this.TabelaComissoes = this.TabelaComissoes.filter(f => f != comissao);

			const data = {
				IdEcommerce: item.IdEcommerce,
				IdUsuario: this.IdUsuario
			}
			
			const method = 'admin/usuario-ecommerce'
			await store.actions.deleteItem(method, data);

			noty.commit("addToaster", {
				text: "E-commerce removido com sucesso !",
				type: "Success"
			});

			this.loadPage = false;
		},
        fecharModalSenha() {
            this.modalSenha = false;
            this.SenhaNova = "";
            this.SenhaNovaConfirmacao = "";
        },
		mostrarTabelas(perfil){
			if(perfil.toLocaleLowerCase() == 'cliente' || perfil.toLocaleLowerCase() == 'sistema' || perfil.toLocaleLowerCase() == 'ecommerce')
				return false
			else
				return true
		},
        navigate(url) {
            this.$router.push(url);
        },
		isMultiple(){
			if (!this.PerfilSelecionado)
				return false;

			if (this.PerfilSelecionado.Nome == 'Consultor')
				return true;
			else
				return false;
		},
		validarCampoEcommerce(perfil){
			if(!perfil)
				return false
	
			if(perfil.Nome == "Sistema" || perfil.Nome == "Cliente"){
				this.ecommerceSelecionado = null;
				return true;
			}
			return false;
		},
		labelCustom({ Nome }) {
            return `Nome: ${Nome}`;
        },
		labelCustomTabela({ label }) {
            return `Nome: ${label}`;
        },
        async alterarSenha() {
            if (!this.SenhaNova || !this.SenhaNovaConfirmacao) {
                noty.commit("addToaster", {
                    text: "Insira uma senha válida",
                    type: "Warning"
                });
                return;
            }
            if (this.SenhaNova != this.SenhaNovaConfirmacao && this.SenhaNovaConfirmacao != "") {
                noty.commit("addToaster", {
                    text: "As senhas não coincidem",
                    type: "Warning"
                });
                return;
            }
            if (this.SenhaNova.length < 6 || this.SenhaNovaConfirmacao.length < 6) {
                noty.commit("addToaster", {
                    text: "A senha deve conter 6 caracteres ou mais",
                    type: "Warning"
                });
                return;
            }
            else {
                const data = {
                    IdUsuario: this.IdUsuario,
                    SenhaNova: this.SenhaNova
                };

                const method = 'auth/alterar-senha-admin';
                const result = await store.actions.postItem(method, data);
                this.fecharModalSenha();

                if (result.IdUsuario) {
                    noty.commit("addToaster", {
                        text: "Senha alterada com sucesso!",
                        type: "Success"
                    });
                }
                else {
                    let message = 'Ocorreu um erro com a alteração da senha.';
                    if (result.Message) {
                        message = result.Message;
                    }
                    noty.commit("addToaster", {
                        text: message,
                        type: "Error"
                    });
                }
            }
        },
        validarCampos() {
            if (!this.PerfilSelecionado)
                return "Selecione o perfil";
			else if((this.PerfilSelecionado.Nome == "Ecommerce" || this.PerfilSelecionado.Nome == "Consultor") && !this.ecommerceSelecionado)
				return "Selecione um e-commerce para vincular o "+ this.PerfilSelecionado.Nome;
			else if (!this.Login)
                return "Informe o login";
            else if (!this.Nome)
                return "Informe o nome";
            else if (!this.Email)
                return "Informe o e-mail";
            else if((this.PerfilSelecionado.Nome != "Sistema" && this.PerfilSelecionado.Nome != "Controlador") && !this.CodigoZoop)
                return "Informe o código zoop";
            else
                return true;
        },
        async validaEmail(){
            const method = 'auth/cadastrar';
            const data = {
                Login: this.Email,
            };

            let result = await store.actions.postItem(method, data);

            if(result.Message == "Valor do campo Login inválido. Já existe um registro com este valor. Por favor informe outro valor."){
                noty.commit("addToaster", {
                    text: "Email já cadastrado.",
                    type: "Error"
                });
                this.Email = "";
            }else
                this.validarFormatoEmail();
        },
        validarFormatoEmail(Email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(this.Email)) {
                return true;
            }
            else {
                noty.commit("addToaster", {
                    text: "E-mail inválido.",
                    type: "Error"
                });
            }
        },
        async salvarUsuario() {
            this.loadPage = true;
            let valido = this.validarCampos();
            let emailValido = this.validarFormatoEmail();

            if (valido != true) {
                noty.commit("addToaster", {
                    text: valido,
                    type: "Error"
                });
            }
            else if (emailValido != true) {
                noty.commit("addToaster", {
                    text: emailValido,
                    type: "Error"
                });
            }
            else {

                const data = {
                    IdUsuario: this.IdUsuario,
                    Login: this.Login,
                    Nome: this.Nome,
                    Email: this.Email,
                    AlterarSenha: this.AlterarSenha ? 1 : 0,
                    Inativo: this.Inativo ? 1 : 0,
                    IdPerfil: this.PerfilSelecionado.IdPerfil,
                };
                
                const method = 'admin/usuario/criar/' + this.IdUsuario;
                const result = await store.actions.postItem(method, data);

                const dataZoop = {
                    IdUsuario: this.IdUsuario,
                    CodigoZoop: this.CodigoZoop
                };

                const methodZoop = 'admin/usuario-ecommerce/atualizar-codigo-zoop';
                await store.actions.postItem(methodZoop, dataZoop);

                if (result.IdUsuario) {
                    noty.commit("addToaster", {
                        text: "Usuário salvo com sucesso!",
                        type: "Success"
                    });
                    this.$router.push('/admin/usuario/'+this.IdUsuario);
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
            const method = 'admin/usuario/roles';
            const roles = await store.actions.getItem(method);
            
            if (roles.Message) {
                noty.commit("addToaster", {
                    text: roles.Message,
                    type: "Error"
                });
            }
            else {
                this.Perfil = roles.filter(f => f.Nome != 'Cliente');
            }
        },
        async loadUsuario() {
            const id = this.$route.params.id;
            const method = 'admin/usuario/' + id;
            const result = await store.actions.getItem(method);

            if (result.Message) {
                noty.commit("addToaster", {
                    text: result.Message,
                    type: "Error"
                });
            }else {
				this.Usuario = result;
				this.IdUsuario = result.IdUsuario;
                this.Login = result.Login;
                this.Nome = result.Nome;
                this.Email = result.Email;
                this.Senha = result.Senha;
                this.AlterarSenha = result.AlterarSenha == 0 ? false : true;
                this.Inativo = result.Inativo == 0 ? false : true;
                this.PerfilSelecionado = { IdPerfil: result.IdPerfil, Nome: result.Perfil }
				if(result.EcommerceUsuario){
					let TabelaDePreco = null;
					let TabelaDeComissao = null;
					let listaPreco = null;
					let listaComissao = null;
					for (let index = 0; index < result.EcommerceUsuario.length; index++) {
						var ecommerceUsuario = result.EcommerceUsuario[index];

						listaPreco = await this.listTabelaPreco(ecommerceUsuario.Ecommerce.Guid);
						listaComissao = await this.listTabelaComissao(ecommerceUsuario.Ecommerce.Guid);

						TabelaDePreco = ecommerceUsuario.IdTabelaPreco ? listaPreco.find(f => f.IdTabelaPreco == ecommerceUsuario.IdTabelaPreco) : null;
						TabelaDeComissao = ecommerceUsuario.IdTabelaComissao ? listaComissao.find(f => f.IdTabelaComissao == ecommerceUsuario.IdTabelaComissao) : null;

						let precoData = TabelaDePreco ? TabelaDePreco.Descricao : null;
						if(precoData)
							this.TabelaPrecos.push(precoData);

						let comissaoData = TabelaDeComissao ? TabelaDeComissao.Descricao : null;
						if(comissaoData)
							this.TabelaComissoes.push(comissaoData);
					};
				}
				this.ecommerceSelecionado = result.EcommerceUsuario ? result.EcommerceUsuario : null;
                
                if(this.Perfil != 'Sistema' && this.Perfil != 'Controlador')
                    this.CodigoZoop = this.ecommerceSelecionado ? (this.ecommerceSelecionado.length > 0 ? this.ecommerceSelecionado[0].CodigoZoop : '') : null;

			}
        },
        async validarEmail() {
            const method = 'admin/usuario/validar-campo-unico';
            const data = {
                id: this.IdUsuario,
                campo: "Email",
                valor: this.Email
            };

            const result = await store.actions.postItem(method, data);
            if (result.Message) {
                noty.commit("addToaster", {
                    text: result.Message,
                    type: "Error"
                });
            }
        },
        async validarLogin() {
            const method = 'admin/usuario/validar-campo-unico';
            const data = {
                id: this.IdUsuario,
                campo: "Login",
                valor: this.Login
            };

            const result = await store.actions.postItem(method, data);
            if (result.Message) {
                noty.commit("addToaster", {
                    text: result.Message,
                    type: "Error"
                });
            }
        },
		async listarEcommerce(){
			const method = 'admin/ecommerce';

			const data = {
				"Page": 1,
				"Size": 99999,
				"Search":"",
			}
			
			const result  = await store.actions.postItem(method, data);
			
			this.listaEcommerce = result.Registers;
		},
		async listTabelaPreco(tokenEcommerce) {
			this.loadPage = true;
			const method = 'ecommerce/tabelapreco';

			const data = {
				"Page": 1,
				"Size": 9999,
				"Search": null
			}
			
            const result  = await store.actions.postByEcommerceToken(method, data, tokenEcommerce);
			if (!result.Message) {
				return result.Registers;
			}
			else {
				noty.commit("addToaster", {
					text: result.Message,
					type: "Error"
				});
			}
		},
		async listTabelaComissao(tokenEcommerce) {
			this.loadPage = true;
			const method = 'ecommerce/tabelacomissao';

			const data = {
				"Page": 1,
				"Size": 9999,
				"Search": null
			}
			
            const result  = await store.actions.postByEcommerceToken(method, data, tokenEcommerce);

			if (!result.Message) {
				return result.Registers;
			}
			else {
				noty.commit("addToaster", {
					text: result.Message,
					type: "Error"
				});
			}
		},
    },
    async mounted() {
        this.loadPage = true;
        await this.loadPerfil();
		await this.listarEcommerce();
        await this.loadUsuario();
		this.loadPage = false;
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
.btn-final-form-edit .btn-left {
  float: left;
}
.btn-final-form-edit .btn-right {
  float: right;
}
</style>