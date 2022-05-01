<template>
    <b-modal
        ref="modal"
        id="modal-agregar"
        header-class="headermodal"
        footer-class="footermodal"
    >
        <template #modal-header
            ><button
                type="button"
                @click="hideModal"
                class="close xCierre"
                data-dismiss="modal"
            >
                &times;
            </button></template
        >

        <div class="text-left">
            <h6 class="titulo-modal">{{ tituloModal }}</h6>
        </div>
        <hr />
        <div class="d-block">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="tipo">Parámetro</label>
                    <v-select
                        v-bind:disabled="deshabilitarEdicion"
                        id="tipo"
                        :options="parametros"
                        label="param_descripcion"
                        placeholder="Seleccionar"
                        v-model="form.parametro"
                        :class="error.parametro"
                        ><template #no-options="">
                            No existen datos en nuestros registros.
                        </template>
                    </v-select>
                    <div
                        class="invalid-vselect"
                        v-if="error.parametro == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="especie">Valor</label>
                    <input
                        type="text"
                        class="form-control"
                        id="especie"
                        placeholder="text"
                        v-model="form.param_descripcion"
                        :class="error.param_descripcion"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        maxlength="100"
                    />
                    <div
                        class="invalid-feedback"
                        v-if="error.param_descripcion == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
            </div>
            <hr />
        </div>
        <template #modal-footer
            ><b-row class="">
                <b-col>
                    <b-button
                        variant="primary"
                        class="boton-no float-left"
                        @click="hideModal"
                        >Cancelar</b-button
                    >

                    <b-button
                        @click="accionSi"
                        variant="primary"
                        class="boton-si float-right"
                        >Agregar</b-button
                    >
                </b-col>
            </b-row></template
        >
    </b-modal>
</template>
<script>
    import axios from "axios";
    export default {
        props: {
            formEditar: null,
            tituloModal: null,
            editarItem: null,
        },
        data() {
            return {
                deshabilitarEdicion: false,
                accion: false,
                parametros: [],
                form: {
                    parametro: [],
                    param_descripcion: "",
                    tico_id: 1,
                },
                error: {
                    total: 0,
                    parametro: [],
                    param_descripcion: "",
                },
            };
        },
        methods: {
            validarInputs() {
                this.errors = [];
                this.error.total = 0;
                if (this.form.parametro.length < 1) {
                    this.error.total++;
                    this.error.parametro = "is-invalid";
                } else {
                    this.error.parametro = "valid";
                }
                if (!this.form.param_descripcion) {
                    this.error.total++;
                    this.error.param_descripcion = "is-invalid";
                } else {
                    this.error.param_descripcion = "is-valid";
                }
                if (this.error.total > 0) {
                    return false;
                } else {
                    return true;
                }
            },
            editar() {
                if (this.editarItem) {
                    this.deshabilitarEdicion = true;
                    this.form.param_descripcion = this.formEditar.nombre;
                    var objParam = {
                        param_descripcion: this.formEditar.param_descripcion,
                        param_id: this.formEditar.param_id,
                        param_tabla: this.formEditar.param_tabla,
                    };
                    this.form.parametro = objParam;
                }
            },
            obtenerTiposParametros() {
                axios
                    .get(this.$root.urlApi + "tiposParametros")
                    .then((res) => {
                        if (res.data.code == 401) {
                            this.$toastr.Add({
                                msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                timeout: 5000,
                                position: "toast-top-right",
                                type: "warning",
                                preventDuplicates: true,
                                style: {
                                    width: "750px",
                                    border: "2px solid #57CC9D",
                                    top: "50px",
                                    right: "30px",
                                },
                            });
                        }
                        this.parametros = res.data.data;
                    })
                    .catch((res) => {
                        this.$toastr.Add({
                            msg: res.response.data.error,
                            timeout: 5000,
                            position: "toast-top-right",
                            type: "warning",
                            preventDuplicates: true,
                            style: {
                                width: "750px",
                                border: "2px solid #57CC9D",
                                top: "50px",
                                right: "30px",
                            },
                        });
                    });
            },
            hideModal() {
                this.$refs["modal"].hide();
            },
            accionSi() {
                if (this.validarInputs()) {
                    this.$emit("accionAdvertencia", this.form);
                    if (this.editarItem) {
                        var obj = {
                            form: this.form,
                            tabla: this.formEditar.param_descripcion,
                            id_tupla: this.formEditar.id,
                        };
                        axios
                            .put(this.$root.urlApi + "parametros/editar", obj)
                            .then((res) => {
                        if (res.data.code == 401) {
                            this.$toastr.Add({
                                msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                timeout: 5000,
                                position: "toast-top-right",
                                type: "warning",
                                preventDuplicates: true,
                                style: {
                                    width: "750px",
                                    border: "2px solid #57CC9D",
                                    top: "50px",
                                    right: "30px",
                                },
                            });
                        }
                                this.$refs["modal"].hide();
                                this.$parent.listarParametros();
                                this.$toastr.Add({
                                    msg: "¡Sus cambios se han guardado exitosamente!",
                                    timeout: 5000,
                                    position: "toast-top-right",
                                    type: "success",
                                    preventDuplicates: false,
                                    style: {
                                        width: "750px",
                                        border: "2px solid #57CC9D",
                                        top: "50px",
                                        right: "30px",
                                    },
                                });
                            })
                            .catch((res) => {
                                this.$toastr.Add({
                                    msg: res.response.data.error,
                                    timeout: 5000,
                                    position: "toast-top-right",
                                    type: "warning",
                                    preventDuplicates: false,
                                    style: {
                                        width: "750px",
                                        border: "2px solid #57CC9D",
                                        top: "50px",
                                        right: "30px",
                                    },
                                });
                            });
                    } else {
                        axios
                            .post(
                                this.$root.urlApi +
                                    "parametros/configurarNuevo",
                                this.form
                            )
                            .then((res) => {
                        if (res.data.code == 401) {
                            this.$toastr.Add({
                                msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                timeout: 5000,
                                position: "toast-top-right",
                                type: "warning",
                                preventDuplicates: true,
                                style: {
                                    width: "750px",
                                    border: "2px solid #57CC9D",
                                    top: "50px",
                                    right: "30px",
                                },
                            });
                        }
                                this.$refs["modal"].hide();
                                this.$parent.listarParametros();
                                this.$toastr.Add({
                                    msg: "¡Sus cambios se han guardado exitosamente!",
                                    timeout: 5000,
                                    position: "toast-top-right",
                                    type: "success",
                                    preventDuplicates: false,
                                    style: {
                                        width: "750px",
                                        border: "2px solid #57CC9D",
                                        top: "50px",
                                        right: "30px",
                                    },
                                });
                            })
                            .catch((res) => {
                                this.$toastr.Add({
                                    msg: res.response.data.error,
                                    timeout: 5000,
                                    position: "toast-top-right",
                                    type: "warning",
                                    preventDuplicates: false,
                                    style: {
                                        width: "750px",
                                        border: "2px solid #57CC9D",
                                        top: "50px",
                                        right: "30px",
                                    },
                                });
                            });
                    }
                }
            },
        },
        created() {
            this.obtenerTiposParametros();
            this.editar();
        },
    };
</script>

<style scoped>
    .titulo-modal {
        font: normal normal medium 25px/30px Roboto;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
        font-weight: 600;
    }
    .div-stock {
        background: #faeee7 0% 0% no-repeat padding-box;
        opacity: 1;
        height: 60px;
    }
    /deep/ .modal.show .modal-dialog {
        border-radius: 25px !important;
    }
    .xCierre {
        color: #000000 !important;
    }
    .boton-no {
        --y: 50px;
        --n: 2; /*numero de inputs, en este caso 2*/
        margin-right: var(--y);
        --mitad: calc((var(--x) * var(--n)) / 2);
        /* o la suma de todos los inputs dividida entre 2*/
        --mitad-y: calc(var(--y) / 2);
        /* o  la mitad del margen de separación entre los inputs*/
        margin-left: calc(50% - (var(--mitad) + var(--mitad-y)));
        width: 116px;
        height: 34px;
        background: #d8d8d8 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029 !important;
        border-radius: 4px !important;
        opacity: 1 !important;
        border: none;
        color: #787878;
    }
    .boton-si {
        box-sizing: border-box;
        margin: auto;
        /*cambia block por inline-block*/
        display: inline-block;
        --x: 150px;
        width: var(--x);
        height: 40px;
        width: 116px;
        height: 34px;
        background: #12a99e 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029 !important;
        border-radius: 4px !important;
        opacity: 1 !important;
        border: none;
        color: #fff;
    }
    /deep/.modal-content {
        box-shadow: 0px 6px 10px #00000061;
        border: none;
        background: #fff;
        -webkit-border-radius: 25px !important;
        -moz-border-radius: 25px !important;
        border-radius: 25px !important;
    }
    /deep/.modal-backdrop {
        background-color: #4040407a !important;
    }
    /deep/ #modal-agregar {
        top: 35%;
    }
    @media (max-width: 990px) {
        /deep/ #modal-agregar {
            top: 10%;
        }
    }
    .mensajeadvertencia {
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
    }
    /deep/ .headermodal {
        min-height: 1px;
        padding: 5px 10px 10px 10px;
        margin: 0px 0;
        margin-left: 0px auto;
        margin-right: 0px auto;
        margin-top: 0px auto;
        margin-bottom: 0px auto;
        background: #fff;
        border: none;
        border-radius: 50px !important;
    }
    /deep/ .footermodal {
        min-height: 1px;
        padding: 0px;
        margin: -5px 0px 10px 0px;
        margin-left: 0px auto;
        margin-right: 0px auto;
        margin-top: 0px auto;
        margin-bottom: 0px auto;

        background: #fff;
        border: none;
        border-radius: 25px !important;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
