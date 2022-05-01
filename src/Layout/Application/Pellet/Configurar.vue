<template>
    <div>
        <div>
            <strong>{{ this.fecha }}</strong>
            <b-breadcrumb class="float-right mt-3 bread">
                <b-breadcrumb-item href="#/home">
                    <font-awesome-icon icon="home" />
                    Home
                </b-breadcrumb-item>
                <b-breadcrumb-item href="#/pellet">Pellet</b-breadcrumb-item>
                <b-breadcrumb-item active>Configurar</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
        <h2 class="titulo mt-5">Pellet</h2>
        <b-card class="main-card mb-4">
            <h5 class="card-title">
                Listado de parámetros configurado para pellet
            </h5>
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
                            class="btn boton-agregar-configuracion d-inline-block ml-4 mb-2"
                            @click="agregarConfModal"
                            v-b-modal.modal-agregar
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
                @exportarFiltro="data.exportarFiltro = $event"
                @datosFiltro="data.datosFiltro = $event"
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
    import ModalAgregarConfiguracion from "../../../Components/Pellet/Configurar/ModalAgregarConfiguracion.vue";
    import cargando from "../../../../src/Components/Common/Cargando.vue";
    import { saveExcel } from "@progress/kendo-vue-excel-export";
    import jsPDF from "jspdf";
    import "jspdf-autotable";
    export default {
        components: { Tabla, ModalAgregarConfiguracion, cargando },
        data() {
            return {
                data: {
                    exportarFiltro: 0,
                    datosFiltro: [],
                    datos: [],
                    exportar: "",
                    render: 0,
                    renderTabla: 0,
                    tituloModal: "",
                    recibido: [],
                    editarItem: true,
                    cargando: true,
                    heading: "Listado de parámetros configurado para Pellet",
                    btnAgregar: true,
                    btnAgregarLabel: "Agregar configuración",
                    items: [],
                    fields: [
                        {
                            key: "param_descripcion",
                            label: "Parámetro",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "nombre",
                            label: "Valor",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "activo",
                            label: "Habilitar",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        { key: "actions", label: "Acciones" },
                    ],
                    acciones: [
                        {
                            nombre: "editar",
                            class: "btn-editar",
                            icono: "pencil-alt",
                            editarItemModal: true,
                        },
                        {
                            nombre: "eliminar",
                            icono: "trash-alt",
                            class: "btn-eliminar",
                            mensajeEliminar:
                                "¿Está seguro(a) que desea eliminar este parámetro?",
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
                    if (this.data.exportarFiltro) {
                        this.data.datos = this.data.datosFiltro;
                        this.data.datos.forEach((item) => {
                            if (item.activo) {
                                var itemActivo = "Activo";
                            } else {
                                itemActivo = "Inactivo";
                            }
                        });
                    } else {
                        this.data.datos = this.data.items;
                        this.data.datos.forEach((item) => {
                            if (item.activo) {
                                var itemActivo = "Activo";
                            } else {
                                itemActivo = "Inactivo";
                            }
                        });
                    }
                    saveExcel({
                        data: this.data.datos,
                        fileName: "ParametrosPellet_" + this.fecha,
                        columns: [
                            {
                                field: "param_descripcion",
                                title: "Parámetro",
                            },
                            {
                                field: "nombre",
                                title: "Valor",
                            },
                            {
                                field: "itemActivo",
                                title: "Habilitado",
                            },
                        ],
                    });
                    this.data.exportar = "";
                } else {
                    this.generarPdf();
                }
            },
            generarPdf() {
                var datos = [];
                if (this.data.exportarFiltro) {
                    this.data.datosFiltro.forEach((item) => {
                        if (item.activo) {
                            var itemActivo = "Activo";
                        } else {
                            itemActivo = "Inactivo";
                        }
                        datos.push({
                            parametro: item.param_descripcion,
                            valor: item.nombre,
                            activo: itemActivo,
                        });
                    });
                    this.data.datos = datos;
                } else {
                    this.data.items.forEach((item) => {
                        if (item.activo) {
                            var itemActivo = "Activo";
                        } else {
                            itemActivo = "Inactivo";
                        }
                        datos.push({
                            parametro: item.param_descripcion,
                            valor: item.nombre,
                            activo: itemActivo,
                        });
                    });
                    this.data.datos = datos;
                }
                var vm = this;
                var columns = [
                    { dataKey: "parametro", title: "Parámetro" },
                    { dataKey: "valor", title: "Valor" },
                    { dataKey: "activo", title: "Habilitado" },
                ];
                var doc = new jsPDF("p", "pt");
                doc.text("Parámetros Pellet", 40, 40);
                doc.autoTable(columns, vm.data.datos, {
                    margin: { top: 60 },
                });
                doc.save("parametrosPellet_" + this.fecha);
                this.data.exportar = "";
            },
            agregarConfModal() {
                this.data.editarItem = false;
                this.data.tituloModal = "Agregar Configuración";
                this.data.render += 1;
            },
            listarParametros() {
                axios
                    .post(this.$root.urlApi + "parametros/listar", {
                        params: { tico_id: 2 },
                    })
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
                        this.data.cargando = true;
                        this.data.cargando = false;
                        this.data.renderTabla += 1;
                        this.data.items = res.data.data.data;
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
                var id = data.id;
                var dataa = {
                    id: id,
                    tico_id: 2,
                    tabla: data.param_tabla,
                };
                axios
                    .delete(this.$root.urlApi + "parametros/eliminar", {
                        data: dataa,
                    })
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
                            (item) =>
                                !(
                                    item.id == data.id &&
                                    item.param_id == data.param_id
                                )
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
                axios
                    .post(this.$root.urlApi + "parametros/habilitar", row)
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
            this.listarParametros();
        },
    };
</script>

<style>
    .vs__selected-options {
        min-height: 32px !important;
    }
    .boton-agregar-configuracion {
        width: 200px;
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
    .titulo {
        margin-bottom: 20px;
        font-weight: 600;
    }
</style>
