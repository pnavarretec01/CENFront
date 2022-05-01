<template>
    <div>
        <div>
            <strong>{{ this.fecha }}</strong>
            <b-breadcrumb class="float-right mt-3 bread">
                <b-breadcrumb-item href="#/home">
                    <font-awesome-icon icon="home" />
                    Home
                </b-breadcrumb-item>
                <b-breadcrumb-item active>Calificaciones</b-breadcrumb-item>
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
    import { saveExcel } from "@progress/kendo-vue-excel-export";
    import jsPDF from "jspdf";
    import "jspdf-autotable";
    export default {
        components: { Tabla },
        data() {
            return {
                data: {
                    exportarFiltro: 0,
                    datosFiltro: [],
                    renderTabla: 0,
                    datos: [],
                    exportar: "",
                    tituloComponente: "",
                    cargando: true,
                    heading: "Listado de calificaciones",
                    btnAgregar: true,
                    items: [],
                    fields: [
                        {
                            key: "regionPuntoVenta.nombre",
                            label: "Región",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "comunaPuntoVenta.nombre",
                            label: "Comuna",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "tipoCombustible.tico_descripcion",
                            label: "Biocombustible",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "cali_nombre_cliente",
                            label: "Usuario",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "puntoVenta.ptv_nombre",
                            label: "Empresa",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "puntoVenta.ptv_direccion",
                            label: "Dirección",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "tpcl_descripcion",
                            label: "Opinión",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "tpcl_cant_estrellas",
                            label: "Calificaciones",
                            sortable: true,
                            sortDirection: "desc",
                        },

                        {
                            key: "updated_at",
                            label: "Modificado",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "cali_ind_act",
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
                                "¿Está seguro(a) que desea eliminar esta calificación",
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
                            if (item.cali_ind_act) {
                                var itemActivo = "Activo";
                            } else {
                                itemActivo = "Inactivo";
                            }
                            if (item.regionPuntoVenta) {
                                var region = item.regionPuntoVenta.nombre;
                            }
                            if (item.comunaPuntoVenta) {
                                var comuna = item.comunaPuntoVenta.nombre;
                            }
                            if (item.tipoCombustible) {
                                var combustible =
                                    item.tipoCombustible.tico_descripcion;
                            }
                            if (item.puntoVenta) {
                                var empresa = item.puntoVenta.ptv_nombre;
                            }
                            if (item.puntoVenta) {
                                var direccion = item.puntoVenta.ptv_direccion;
                            }
                            datosE.push({
                                region: region,
                                comuna: comuna,
                                combustible: combustible,
                                usuario: item.cali_nombre_cliente,
                                empresa: empresa,
                                direccion: direccion,
                                descripcion: item.tpcl_descripcion,
                                estrellas: item.tpcl_descripcion,
                                modificado: item.updated_at,
                                activo: itemActivo,
                            });
                        });
                        this.data.datos = datosE;
                    } else {
                        this.data.datos = this.data.items;
                        this.data.datos.forEach((item) => {
                            if (item.cali_ind_act) {
                                var itemActivo = "Activo";
                            } else {
                                itemActivo = "Inactivo";
                            }
                            if (item.regionPuntoVenta) {
                                var region = item.regionPuntoVenta.nombre;
                            }
                            if (item.comunaPuntoVenta) {
                                var comuna = item.comunaPuntoVenta.nombre;
                            }
                            if (item.tipoCombustible) {
                                var combustible =
                                    item.tipoCombustible.tico_descripcion;
                            }
                            if (item.puntoVenta) {
                                var empresa = item.puntoVenta.ptv_nombre;
                            }
                            if (item.puntoVenta) {
                                var direccion = item.puntoVenta.ptv_direccion;
                            }
                            datosE.push({
                                region: region,
                                comuna: comuna,
                                combustible: combustible,
                                usuario: item.cali_nombre_cliente,
                                empresa: empresa,
                                direccion: direccion,
                                descripcion: item.tpcl_descripcion,
                                estrellas: item.tpcl_descripcion,
                                modificado: item.updated_at,
                                activo: itemActivo,
                            });
                        });
                        this.data.datos = datosE;
                    }
                    saveExcel({
                        data: this.data.datos,
                        fileName: "calificaciones" + this.fecha,
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
                                field: "combustible",
                                title: "Biocombustible",
                            },
                            { field: "usuario", title: "Usuario" },
                            {
                                field: "empresa",
                                title: "Empresa",
                            },
                            {
                                field: "direccion",
                                title: "Dirección",
                            },
                            { field: "descripcion", title: "Opinión" },
                            {
                                field: "estrellas",
                                title: "Calificaciones",
                            },
                            { field: "modificado", title: "Modificado" },
                            { field: "activo", title: "Habilitado" },
                        ],
                    });
                    this.data.exportar = "";
                } else {
                    this.generarPdf();
                }
            },
            generarPdf() {
                var datosP = [];
                if (this.data.exportarFiltro) {
                    this.data.datosFiltro.forEach((item) => {
                        if (item.cali_ind_act) {
                            var itemActivo = "Activo";
                        } else {
                            itemActivo = "Inactivo";
                        }
                        if (item.regionPuntoVenta) {
                            var region = item.regionPuntoVenta.nombre;
                        }
                        if (item.comunaPuntoVenta) {
                            var comuna = item.comunaPuntoVenta.nombre;
                        }
                        if (item.tipoCombustible) {
                            var combustible =
                                item.tipoCombustible.tico_descripcion;
                        }
                        if (item.puntoVenta) {
                            var empresa = item.puntoVenta.ptv_nombre;
                        }
                        if (item.puntoVenta) {
                            var direccion = item.puntoVenta.ptv_direccion;
                        }
                        datosP.push({
                            region: region,
                            comuna: comuna,
                            combustible: combustible,
                            usuario: item.cali_nombre_cliente,
                            empresa: empresa,
                            direccion: direccion,
                            descripcion: item.tpcl_descripcion,
                            estrellas: item.tpcl_descripcion,
                            modificado: item.updated_at,
                            activo: itemActivo,
                        });
                    });
                    this.data.datos = datosP;
                } else {
                    this.data.datos = this.data.items;
                    this.data.datos.forEach((item) => {
                        if (item.cali_ind_act) {
                            var itemActivo = "Activo";
                        } else {
                            itemActivo = "Inactivo";
                        }
                        if (item.regionPuntoVenta) {
                            var region = item.regionPuntoVenta.nombre;
                        }
                        if (item.comunaPuntoVenta) {
                            var comuna = item.comunaPuntoVenta.nombre;
                        }
                        if (item.tipoCombustible) {
                            var combustible =
                                item.tipoCombustible.tico_descripcion;
                        }
                        if (item.puntoVenta) {
                            var empresa = item.puntoVenta.ptv_nombre;
                        }
                        if (item.puntoVenta) {
                            var direccion = item.puntoVenta.ptv_direccion;
                        }
                        datosP.push({
                            region: region,
                            comuna: comuna,
                            combustible: combustible,
                            usuario: item.cali_nombre_cliente,
                            empresa: empresa,
                            direccion: direccion,
                            descripcion: item.tpcl_descripcion,
                            estrellas: item.tpcl_descripcion,
                            modificado: item.updated_at,
                            activo: itemActivo,
                        });
                    });
                    this.data.datos = datosP;
                }

                var vm = this;
                var columns = [
                    { dataKey: "region", title: "Región" },
                    { dataKey: "comuna", title: "Comuna" },
                    { dataKey: "combustible", title: "Biocombustible" },
                    { dataKey: "usuario", title: "Usuario" },
                    { dataKey: "empresa", title: "Empresa" },
                    { dataKey: "direccion", title: "Dirección" },
                    { dataKey: "descripcion", title: "Opinión" },
                    { dataKey: "estrellas", title: "Calificaciones" },
                    { dataKey: "modificado", title: "Modificado" },
                    { dataKey: "activo", title: "Habilitado" },
                ];
                var doc = new jsPDF("l", "pt", "a4");
                doc.setFontSize(12);
                //var doc =  new jsPDF( 'p', 'mm', [250, 500]);
                doc.text("Calificaciones", 40, 40);
                doc.autoTable(columns, vm.data.datos, {
                    margin: { top: 60 },
                });
                doc.save("calificaciones_" + this.fecha);
                this.data.exportar = "";
            },
            obtenerCalificaciones() {
                axios
                    .get(this.$root.urlApi + "calificaciones/listar")
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
                this.data.tituloComponente = "Editar punto de venta";
                this.$router.replace({
                    name: "agregar",
                    params: {
                        formEditar: row,
                        editarForm: true,
                        tituloComponente: this.data.tituloComponente,
                    },
                });
            },
            eliminar(data, index) {
                var id = data.cali_id;
                axios
                    .delete(this.$root.urlApi + "calificaciones/eliminar", {
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
                            (item) => !(item.cali_id == data.cali_id)
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
                var obj = {
                    habilitar: e,
                    cali_id: row.cali_id,
                };
                axios
                    .put(this.$root.urlApi + "calificaciones/habilitar", obj)
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
                if (localStorage.getItem("tipe") == 3) {
                    this.data.fields = this.data.fields.filter(
                        (item) => !(item.key == "actions")
                    );
                    this.data.acciones = "";
                    this.data.fields = this.data.fields.filter(
                        (item) => !(item.label == "Habilitar")
                    );
                }
                if (
                    localStorage.getItem("tipe") == 5 ||
                    localStorage.getItem("tipe") == 4
                ) {
                    this.data.fields = this.data.fields.filter(
                        (item) => !(item.key == "actions")
                    );
                    this.data.acciones = "";
                }
                if (localStorage.getItem("tipe") == 2) {
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
            this.obtenerCalificaciones();
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
