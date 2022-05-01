<template>
    <div>
        <div>
            <strong>{{ this.fecha }}</strong>
            <b-breadcrumb class="float-right mt-3 bread">
                <b-breadcrumb-item href="#/home">
                    <font-awesome-icon icon="home" />
                    Home
                </b-breadcrumb-item>
                <b-breadcrumb-item href="#/calificaciones"
                    >Calificaciones</b-breadcrumb-item
                >
                <b-breadcrumb-item active>Configurar</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
        <h2 class="titulo mt-5">Calificaciones</h2>
        <b-card class="main-card mb-4">
            <h5 class="card-title">Listado de calificaciones</h5>
            <div class="row">
                <div class="col-12 text-right">
                    <b-col>
                        <select
                            class="form-control select-exportar d-inline-block"
                            @change="exportarExcel"
                            v-model="data.exportar"
                        >
                            <option selected disabled value="">
                                Seleccionar tipo de archivo a exportar
                            </option>
                            <option value="pdf">PDF</option>
                            <option value="excel">EXCEL</option>
                        </select>

                        <button
                            class="btn boton-agregar-empresa ml-3 mb-2"
                            @click="agregarConfModal"
                            v-b-modal.modal-agregar
                            v-if="
                                data.tipoUsuario != 2 ||
                                data.tipoUsuario != 3 ||
                                data.tipoUsuario != 4 ||
                                data.tipoUsuario != 5 ||
                                data.tipoUsuario != 6
                            "
                        >
                            + {{ data.btnAgregarLabel }}
                        </button>
                    </b-col>
                </div>
            </div>

            <Tabla
                :key="data.renderTabla"
                v-if="!data.cargando"
                :data="data"
                @checkboxX="checkboxX"
                @editar="editar"
                @eliminar="eliminar"
                @datosFiltro="data.datosFiltro = $event"
                @exportarFiltro="data.exportarFiltro = $event"
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
        <modal-agregar-configuracion
            :key="data.render"
            :formEditar="data.recibido"
            :editarItem="data.editarItem"
            :tituloModal="data.tituloModal"
        ></modal-agregar-configuracion>
    </div>
</template>

<script>
    import axios from "axios";
    import Tabla from "../../../../src/Components/Tabla.vue";
    import ModalAgregarConfiguracion from "../../../Components/Calificaciones/Configurar/ModalAgregarConfiguracion.vue";
    import jsPDF from "jspdf";
    import "jspdf-autotable";
    import { saveExcel } from "@progress/kendo-vue-excel-export";
    export default {
        components: { Tabla, ModalAgregarConfiguracion },
        data() {
            return {
                data: {
                    exportarFiltro: 0,
                    datosFiltro: [],
                    exportar: "",
                    tipoUsuario: "",
                    render: 0,
                    renderTabla: 0,
                    tituloModal: "",
                    recibido: [],
                    editarItem: true,
                    cargando: true,
                    heading: "Listado de parámetros configurado para leña",
                    btnAgregar: true,
                    btnAgregarLabel: "Agregar nuevo tipo de calificación",
                    items: [],
                    fields: [
                        {
                            key: "tpcl_cant_estrellas",
                            label: "Calificacion",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        {
                            key: "tpcl_descripcion",
                            label: "Opinión",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "tpcl_ind_act",
                            label: "Habilitar",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        { key: "actions", label: "Acciones" },
                    ],
                    acciones: [
                        {
                            nombre: "eliminar",
                            icono: "trash-alt",
                            class: "btn-eliminar",
                            mensajeEliminar:
                                "¿Está seguro(a) que desea eliminar este tipo de calificación?",
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
                    fixed: false,
                    footClone: false,
                },
            };
        },
        methods: {
            exportarExcel() {
                if (this.data.exportar == "excel") {
                    var datosE = [];
                    if (this.data.exportarFiltro) {
                        this.data.datos = this.data.datosFiltro;
                        this.data.datos.forEach((item) => {
                            if (item.tpcl_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            datosE.push({
                                descripcion: item.tpcl_descripcion,
                                calificacion: item.tpcl_cant_estrellas,
                                itemActivo: activo
                            });
                        });
                        this.data.datos = datosE;
                    } else {
                        this.data.datos = this.data.items;
                        this.data.datos.forEach((item) => {
                            if (item.tpcl_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            datosE.push({
                                descripcion: item.tpcl_descripcion,
                                calificacion: item.tpcl_cant_estrellas,
                                itemActivo: activo
                            });
                        });
                        this.data.datos = datosE;
                    }
                    saveExcel({
                        data: this.data.datos,
                        fileName: "parametros_calificaciones_" + this.fecha,
                        columns: [
                            { field: "calificacion", title: "Calificación" },
                            { field: "descripcion", title: "Opinión" },
                            {
                                field: "itemActivo",
                                title: "Habilitado",
                            },
                        ],
                    });
                    this.data.exportar = "";
                } else {
                    var datos = [];
                    if (this.data.exportarFiltro) {
                        this.data.datos = this.data.datosFiltro;
                        this.data.datos.forEach((item) => {
                           if (item.tpcl_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            datos.push({
                                descripcion: item.tpcl_descripcion,
                                calificacion: item.tpcl_cant_estrellas,
                                itemActivo: activo
                            });
                        });
                        this.data.datos = datos;
                    } else {
                        this.data.datos = this.data.items;
                        this.data.datos.forEach((item) => {
                            if (item.tpcl_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            datos.push({
                                descripcion: item.tpcl_descripcion,
                                calificacion: item.tpcl_cant_estrellas,
                                itemActivo: activo
                            });
                        });
                        this.data.datos = datos;
                    }
                    var vm = this;
                    var columns = [
                        { dataKey: "calificacion", title: "Calificación" },
                        { dataKey: "descripcion", title: "Opinión" },
                        {
                            dataKey: "itemActivo",
                            title: "Habilitado",
                        },
                    ];
                    var doc = new jsPDF("l", "pt", "a4");
                    doc.setFontSize(12);
                    doc.text("Usuarios", 40, 40);
                    doc.autoTable(columns, vm.data.datos, {
                        margin: { top: 60 },
                    });
                    doc.save("parametros_calificaciones_" + this.fecha);
                    this.data.exportar = "";
                }
            },
            actualizaTabla() {
                this.data.cargando = true;
                this.listarParametros();
            },
            agregarConfModal() {
                this.data.editarItem = false;
                this.data.tituloModal = "Agregar Parámetros para calificación";
                this.data.render += 1;
            },
            listarParametros() {
                axios
                    .get(this.$root.urlApi + "parametrosCalificaciones/listar")
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
                        this.data.items = res.data.data.data;
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
            editar(row, index, e) {
                this.data.editarItem = true;
                this.data.tituloModal = "Editar Configuración";
                this.data.recibido = row;
                this.data.render += 1;
            },
            eliminar(data, index) {
                var id = data.tpcl_id;
                axios
                    .delete(
                        this.$root.urlApi + "parametrosCalificaciones/eliminar",
                        {
                            data: id,
                        }
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
                        this.data.items = this.data.items.filter(
                            (item) => !(item.tpcl_id == data.tpcl_id)
                        );
                        this.data.renderTabla += 1;
                        this.$toastr.Add({
                            msg: "¡Se ha eliminado exitosamente!",
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
            checkboxX(row, index, e) {
                var obj = {
                    habilitar: e,
                    tpcl_id: row.tpcl_id,
                };
                axios
                    .put(
                        this.$root.urlApi +
                            "parametrosCalificaciones/habilitar",
                        obj
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
        },
        created() {
            this.data.tipoUsuario = localStorage.getItem("tipe");
            this.obtieneFecha();
            this.listarParametros();
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
    .vs__selected-options {
        min-height: 32px !important;
    }
    .boton-agregar-configuracion {
        width: 300px;
        background: #eb6919 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 4px;
        opacity: 1;
        color: #fff;
    }
    .boton-agregar-configuracion:hover {
        color: #fff;
        -webkit-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -ms-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.1);
    }
</style>
