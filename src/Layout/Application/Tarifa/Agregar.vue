<template>
    <div class="container-flex">
        <div>
            <strong>{{ this.fecha }}</strong>
            <b-breadcrumb class="float-right mt-3 bread">
                <b-breadcrumb-item href="#/home">
                    <font-awesome-icon icon="home" />
                    Home
                </b-breadcrumb-item>
                <b-breadcrumb-item href="#/tarifa">Tarifa</b-breadcrumb-item>
                <b-breadcrumb-item active>Agregar</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
        <h2 class="titulo mt-5 mb-5 d-inline-block">Tarifa Eléctrica</h2>
        <h4 class="titulo subtitulo ml-4 mt-5 mb-5 d-inline-block">
            {{ data.subTitulo }}
        </h4>
        <div class="row">
            <div class="col-12 text-right">
                <b-col>
                    <button class="btn btn-volver" @click="volver">
                        Volver
                    </button>
                </b-col>
            </div>
        </div>

        <b-card class="main-card mb-4 mt-4">
            <formAgregar
                ref="formAgregar"
                @formAgregar="form = $event"
                :formEditar="this.formEdit"
            ></formAgregar>
        </b-card>
        <div class="row mb-4">
            <div class="col-12 text-center" v-if="data.enviando == false">
                <button class="btn btn-cancelar d-inline-block" @click="volver">
                    Cancelar
                </button>

                <button
                    class="btn btn-aceptar d-inline-block ml-5"
                    @click="enviarDatos"
                >
                    Aceptar
                </button>
            </div>
            <div class="col-12 text-center" v-else>
                <b-spinner
                    variant="primary"
                    style="width: 3rem; height: 3rem"
                    type="grow"
                ></b-spinner>
                <br />
                <strong>Guardando...</strong>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import formAgregar from "../../../../src/Components/Tarifa/FormAgregar.vue";

    export default {
        components: {
            formAgregar,
        },
        props: ["formEditar", "editarForm", "tituloComponente"],
        data() {
            return {
                data: {
                    enviando: false,
                    subTitulo: "Agregar tarifa",
                    form: [],
                    formEdit: "",
                },
            };
        },
        methods: {
            asignarTitulo() {
                if (this.tituloComponente)
                    this.data.subTitulo = this.tituloComponente;
            },
            editar() {
                this.formEdit = this.formEditar;
            },
            enviarDatos() {
                if (this.editarForm) {
                    if (this.$refs.formAgregar.envioDatos()) {
                        this.data.enviando = true;
                        var obj = {
                            form: this.form,
                            tari_id: this.formEditar.tari_id,
                        };
                        axios
                            .put(this.$root.urlApi + "tarifas/editar", obj)
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
                                this.data.enviando = false;
                                this.$router.replace("/tarifa");
                                this.$toastr.Add({
                                    msg: "¡Sus cambios se han guardado exitosamente!",
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
                                this.data.enviando = false;
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
                } else {
                    if (this.$refs.formAgregar.envioDatos()) {
                        this.data.enviando = true;
                        axios
                            .post(
                                this.$root.urlApi + "tarifas/guardar",
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
                                this.data.enviando = false;
                                this.$router.replace("/tarifa");
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
                                this.data.enviando = false;
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
                }
            },
            volver() {
                this.$router.replace("tarifa");
            },
            obtieneFecha() {
                let date = new Date();
                let day = `0${date.getDate()}`.slice(-2);
                let month = `0${date.getMonth() + 1}`.slice(-2);
                let year = date.getFullYear();
                this.fecha = `${day}/${month}/${year}`;
            },
        },
        created() {
            this.asignarTitulo();
            this.obtieneFecha();
            this.editar();
        },
    };
</script>

<style>
    .subtitulo {
        text-align: left;
        font: normal normal medium 27px/33px Roboto;
        letter-spacing: 0.54px;
        color: #008ca4;
        opacity: 1;
    }
    .div-volver {
        top: 180px;
        position: absolute;
        right: 45px;
    }
    .btn-cancelar {
        width: 124px;
        background: #d8d8d8 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 4px;
        opacity: 1;
        color: #787878;
    }
    .btn-cancelar:hover {
        color: #787878;
        -webkit-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -ms-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.1);
    }
    .btn-aceptar {
        width: 124px;
        background: #eb6919 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 4px;
        opacity: 1;
        color: #fff;
    }
    .btn-aceptar:hover {
        color: white;
        -webkit-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -ms-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.1);
    }
    .btn-volver {
        width: 127px;
        background: #005fcb 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 4px;
        opacity: 1;
        color: #fff;
    }
    .btn-volver:hover {
        color: white;
        -webkit-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -ms-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.1);
    }
    .div-validada {
        padding: 10px;
        height: 70%;
        background: #faeee7 0% 0% no-repeat padding-box;
        opacity: 1;
    }
    .check-false {
        color: #b53636;
    }
    .check-true {
        color: #48759b;
    }
    .boton-agregar-productos {
        color: #fff;
        border: none !important;
        background: #008ca4 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029 !important;
        border-radius: 4px !important;
        opacity: 1 !important;
    }
    .boton-agregar-productos:hover {
        color: white;
        -webkit-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -ms-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.1);
    }
    .select-exportar {
        background: #ffffff 0% 0% no-repeat padding-box;
        border: 1px solid #5b5b5b;
        border-radius: 4px;
        opacity: 1;
    }
    .paginacion-contenedor {
        display: flex;
        justify-content: center;
    }
    .page-link {
        color: black !important;
        font-size: 16px;
        font-weight: 600;
    }
    input:focus,
    select:focus,
    select,
    input.form-control:focus {
        outline: none !important;
        outline-width: 0 !important;
        box-shadow: none;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
    }
    .form-control:focus {
        border: 1px solid red;
        outline: none;
    }
    th {
        background-color: #48759b;
        border: 1px solid white;
        color: white;
    }
    .filtro-tabla {
        background-color: #fcdbc7;
    }
    .b-table-top-row {
        border-bottom: none;
    }
    .btn-eliminar {
        border: 2px solid #e84a4a;
        border-radius: 4px;
        opacity: 1;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 10px;
        padding-right: 10px;
        color: #e84a4a;
        border-radius: 3px;
        margin-left: 5px;
        cursor: pointer;
    }
    .btn-editar {
        border: 2px solid #33a2b5;
        border-radius: 4px;
        opacity: 1;
        color: #33a2b5;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 5px;
        cursor: pointer;
    }
    .botones-tabla-contenedor {
        display: flex;
        justify-content: center;
    }

    .page-item.active .page-link {
        background-color: #48759b !important;
        color: #fff !important;
    }

    tr {
        border-bottom: 1.1px solid #48759b;
    }
    .card-title {
        font-weight: 600;
    }
    .btn-primary {
        background: #eb6919 !important;
    }
    .titulo {
        margin-bottom: 20px;
        font-weight: 600;
    }
</style>
