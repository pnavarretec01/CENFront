<template>
    <div>
        <div>
            <strong>{{ this.fecha }}</strong>
            <b-breadcrumb class="float-right mt-3 bread">
                <b-breadcrumb-item href="#/home">
                    <font-awesome-icon icon="home" />
                    Home
                </b-breadcrumb-item>
                <b-breadcrumb-item active>DPA</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
        <h2 class="titulo mt-5">División Política Administrativa</h2>
        <b-card class="main-card mb-4">
            <h5 class="card-title">Listado a nivel nacional</h5>
            <Tabla
                v-if="!data.cargando"
                :carga="data.carga"
                :data="data"
                @checkboxX="checkboxX"
            ></Tabla>
            <div class="text-center" v-else>
                <b-spinner
                    variant="primary"
                    style="width: 3rem; height: 3rem"
                    type="grow"
                ></b-spinner>
                <br />
                <strong>Cargando...</strong>
            </div>
        </b-card>
    </div>
</template>

<script>
    import axios from "axios";
    import Tabla from "../../../../src/Components/Tabla.vue";
    export default {
        components: { Tabla },
        data() {
            return {
                data: {
                    formEdit: "",
                    cargando: true,
                    btnAgregar: true,
                    btnAgregarLabel: "Agregar empresa",
                    items: [],
                    fields: [
                        {
                            key: "reg_nombre",
                            label: "Región",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "com_nombre",
                            label: "Comuna",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "updated_at",
                            label: "Modificado",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "com_ind_acti",
                            label: "Habilitar",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                    ],

                    currentPage: 1,
                    perPage: 9,
                    striped: false,
                    bordered: false,
                    outlined: false,
                    small: false,
                    hover: false,
                    dark: false,
                    fixed: true,
                    footClone: false,
                },
            };
        },
        methods: {
            obtenerComunas() {
                axios
                    .get(this.$root.urlApi + "comunas/comunasRegion")
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
                        this.data.items = res.data.data;
                        this.data.cargando = false;
                    })
                    .catch((res) => {
                        this.data.cargando = false;
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
            obtieneFecha() {
                let date = new Date();
                let day = `0${date.getDate()}`.slice(-2);
                let month = `0${date.getMonth() + 1}`.slice(-2);
                let year = date.getFullYear();
                this.fecha = `${day}/${month}/${year}`;
            },
            checkboxX(row, index, e) {
                axios
                    .put(this.$root.urlApi + "comunas/habilitar", row)
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
                        this.$toastr.Add({
                            msg: "¡Sus cambios se han guardado exitosamente!",
                            timeout: 5000,
                            position: "toast-top-right",
                            type: "success",
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
            },
        },
        created() {
            this.obtieneFecha();
            this.obtenerComunas();
        },
    };
</script>

<style>
    .boton-agregar-empresa {
        color: #fff;
        border: none !important;
        background: #eb6919 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029 !important;
        border-radius: 4px !important;
        opacity: 1 !important;
        height: 34px;
    }
    .boton-agregar-empresa:hover {
        color: white;
        -webkit-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -ms-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.1);
    }
    .titulo {
        margin-bottom: 20px;
        font-weight: 600;
    }
</style>
