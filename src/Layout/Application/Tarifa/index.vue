<template>
    <div>
        <div>
            <strong>{{ this.fecha }}</strong>
            <b-breadcrumb class="float-right mt-3 bread">
                <b-breadcrumb-item href="#/home">
                    <font-awesome-icon icon="home" />
                    Home
                </b-breadcrumb-item>
                <b-breadcrumb-item active>Tarifa</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
        <h2 class="titulo mt-5">Tarifa eléctrica</h2>
        <b-card class="main-card mb-4">
            <h5 class="card-title">Listado de tarifa nivel nacional</h5>
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
                            v-if="
                                data.tipoUsuario != 2 &&
                                data.tipoUsuario != 3 &&
                                data.tipoUsuario != 4 &&
                                data.tipoUsuario != 5
                            "
                            class="btn boton-agregar-empresa d-inline-block ml-4 mb-2"
                            @click="agregarEmpresa"
                        >
                            + Agregar tarifa
                        </button>
                    </b-col>
                </div>
            </div>
            <Tabla
                :key="data.renderTabla"
                v-if="!data.cargando"
                :carga="data.carga"
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
    </div>
</template>

<script>
    import axios from "axios";
    import Tabla from "../../../../src/Components/Tabla.vue";
    import cargando from "../../../../src/Components/Common/Cargando.vue";
    import { saveExcel } from "@progress/kendo-vue-excel-export";
    import jsPDF from "jspdf";
    import "jspdf-autotable";
    export default {
        components: { Tabla, cargando },
        data() {
            return {
                data: {
                    exportarFiltro: 0,
                    datosFiltro: [],
                    tipoUsuario: "",
                    renderTabla: 0,
                    datos: [],
                    exportar: "",
                    tituloComponente: "",
                    cargando: true,
                    heading:
                        "Listado de puntos de venta de leña a nivel nacional",
                    btnAgregar: true,
                    btnAgregarLabel: "Agregar empresa",
                    items: [],
                    fields: [
                        {
                            key: "region.nombre",
                            label: "Región",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "comuna.nombre",
                            label: "Comuna",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "tari_mensaje",
                            label: "Mensaje",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "tari_url",
                            label: "Beneficio URL",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "tari_informacion",
                            label: "Info URL",
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
                            key: "tari_ind_act",
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
                        },
                        {
                            nombre: "eliminar",
                            icono: "trash-alt",
                            class: "btn-eliminar",
                            mensajeEliminar:
                                "¿Está seguro(a) que desea eliminar esta tarifa?",
                        },
                    ],
                    currentPage: 1,
                    perPage: 5,
                    striped: false,
                    bordered: false,
                    outlined: false,
                    small: true,
                    hover: false,
                    dark: false,
                    fixed: true,
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
                            if (item.tari_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            datosE.push({
                                region: item.region.nombre,
                                comuna: item.comuna.nombre,
                                mensaje: item.tari_mensaje,
                                beneficioUrl: item.tari_url,
                                infoUrl: item.tari_informacion,
                                modificado: item.updated_at,
                                habilitado: activo,
                            });
                        });
                        this.data.datos = datosE;
                    } else {
                        this.data.datos = this.data.items;
                        this.data.datos.forEach((item) => {
                            if (item.tari_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            datosE.push({
                                region: item.region.nombre,
                                comuna: item.comuna.nombre,
                                mensaje: item.tari_mensaje,
                                beneficioUrl: item.tari_url,
                                infoUrl: item.tari_informacion,
                                modificado: item.updated_at,
                                habilitado: activo,
                            });
                        });
                        this.data.datos = datosE;
                    }
                    saveExcel({
                        data: this.data.datos,
                        fileName: "tarifa_" + this.fecha,
                        columns: [
                            {
                                field: "region",
                                title: "Región",
                            },
                            {
                                field: "comuna",
                                title: "Comuna",
                            },
                            {
                                field: "mensaje",
                                title: "Mensaje",
                            },
                            { field: "beneficioUrl", title: "Beneficio URL" },
                            {
                                field: "infoUrl",
                                title: "Info URL",
                            },
                            {
                                field: "modificado",
                                title: "Modificado",
                            },
                            {
                                field: "habilitado",
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
                        if (item.tari_ind_act) {
                            var activo = "Activo";
                        } else {
                            activo = "Inactivo";
                        }
                        datos.push({
                            region: item.region.nombre,
                            comuna: item.comuna.nombre,
                            mensaje: item.tari_mensaje,
                            beneficioUrl: item.tari_url,
                            infoUrl: item.tari_informacion,
                            modificado: item.updated_at,
                            habitlitar: activo,
                        });
                    });
                    this.data.datos = datos;
                } else {
                    this.data.items.forEach((item) => {
                        if (item.tari_ind_act) {
                            var activo = "Activo";
                        } else {
                            activo = "Inactivo";
                        }
                        datos.push({
                            region: item.region.nombre,
                            comuna: item.comuna.nombre,
                            mensaje: item.tari_mensaje,
                            beneficioUrl: item.tari_url,
                            infoUrl: item.tari_informacion,
                            modificado: item.updated_at,
                            habitlitar: activo,
                        });
                    });
                    this.data.datos = datos;
                }
                var vm = this;
                var columns = [
                    { dataKey: "region", title: "Región" },
                    { dataKey: "comuna", title: "Comuna" },
                    { dataKey: "mensaje", title: "Mensaje" },
                    { dataKey: "beneficioUrl", title: "Beneficio URL" },
                    { dataKey: "infoUrl", title: "Info URL" },
                    { dataKey: "modificado", title: "Modificado" },
                    { dataKey: "habitlitar", title: "Habilitado" },
                ];
                var doc = new jsPDF("l", "pt", "a4");
                doc.setFontSize(12);
                doc.text("Tarifas", 40, 40);
                doc.autoTable(columns, vm.data.datos, {
                    margin: { top: 60 },
                });
                doc.save("tarifas_" + this.fecha);
                this.data.exportar = "";
                this.data.exportarFiltro = 0;
            },
            agregarEmpresa() {
                this.data.tituloComponente = "Agregar tarifa";
                this.$router.replace({
                    name: "agregar-tarifa",
                    params: {
                        editarForm: false,
                        tituloComponente: this.data.tituloComponente,
                    },
                });
            },
            obtenerTarifas() {
                axios
                    .get(this.$root.urlApi + "tarifas/listar")
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
                this.data.tituloComponente = "Editar tarifa";
                this.$router.replace({
                    name: "agregar-tarifa",
                    params: {
                        formEditar: row,
                        editarForm: true,
                        tituloComponente: this.data.tituloComponente,
                    },
                });
            },
            eliminar(data, index) {
                var id = data.tari_id;
                axios
                    .delete(this.$root.urlApi + "tarifas/eliminar", {
                        data: id,
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
                            (item) => !(item.tari_id == data.tari_id)
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
                    .put(this.$root.urlApi + "tarifas/habilitar", row)
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
            filtroUsuario() {
                this.data.tipoUsuario = localStorage.getItem("tipe");
                if (
                    localStorage.getItem("tipe") == 2 ||
                    localStorage.getItem("tipe") == 3 ||
                    localStorage.getItem("tipe") == 4 ||
                    localStorage.getItem("tipe") == 5
                ) {
                    this.data.fields = this.data.fields.filter(
                        (item) => !(item.label == "Habilitar")
                    );
                    this.data.fields = this.data.fields.filter(
                        (item) => !(item.key == "actions")
                    );
                    this.data.acciones = "";
                }
            },
        },
        created() {
            this.filtroUsuario();
            this.obtieneFecha();
            this.obtenerTarifas();
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
