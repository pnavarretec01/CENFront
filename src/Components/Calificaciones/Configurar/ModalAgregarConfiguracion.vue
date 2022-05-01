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
                <div class="form-group col-md-12">
                    <label for="estrellas">Tipo de calificación</label>
                    <select
                        class="form-control"
                        id="estrellas"
                        v-model="form.estrellas"
                        :class="error.estrellas"
                        @change="validarInput"
                    >
                        <option value="" selected disabled>Seleccionar</option>
                        <option value="1">1 Estrella</option>
                        <option value="2">2 Estrellas</option>
                        <option value="3">3 Estrellas</option>
                        <option value="4">4 Estrellas</option>
                        <option value="5">5 Estrellas</option>
                    </select>
                    <div
                        class="invalid-feedback"
                        v-if="error.estrellas == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
                <div class="form-group col-md-12">
                    <label for="opinion">Opinión</label>
                    <input
                        type="text"
                        class="form-control"
                        id="opinion"
                        maxlength="100"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        placeholder="Escribe..."
                        v-model="form.opinion"
                        :class="error.opinion"
                        @input="validarInput"
                    />
                    <div
                        class="invalid-feedback"
                        v-if="error.opinion == 'is-invalid'"
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
                accion: false,
                parametros: [],
                form: {
                    estrellas: "",
                    opinion: "",
                    tpcl_ind_act: 1,
                },
                error: {
                    total: 0,
                    estrellas: "",
                    opinion: "",
                    tpcl_ind_act: 1,
                },
            };
        },

        methods: {
            hideModal() {
                this.$refs["modal"].hide();
            },
            validarInput() {
                this.error.total = 0;
                if (!this.form.estrellas) {
                    this.error.total++;
                    this.error.estrellas = "is-invalid";
                } else {
                    this.error.estrellas = "is-valid";
                }
                if (!this.form.opinion) {
                    this.error.total++;
                    this.error.opinion = "is-invalid";
                } else {
                    this.error.opinion = "is-valid";
                }
                if (this.error.total > 0) {
                    return false;
                } else {
                    return true;
                }
            },
            accionSi() {
                if (this.validarInput()) {
                    axios
                        .post(
                            this.$root.urlApi +
                                "parametrosCalificaciones/agregar",
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
                            this.$parent.actualizaTabla();
                            this.$toastr.Add({
                                msg: "¡Se ha creado exitosamente!",
                                timeout: 5000,
                                position: "toast-top-right",
                                type: "success",
                                preventDuplicates: true,
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
                                preventDuplicates: true,
                                style: {
                                    width: "750px",
                                    border: "2px solid #57CC9D",
                                    top: "50px",
                                    right: "30px",
                                },
                            });
                        });
                }
            },
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
        top: 25%;
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
