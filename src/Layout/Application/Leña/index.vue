<template>
    <div>
        <div>
            <strong>{{ this.fecha }}</strong>
            <b-breadcrumb class="float-right mt-3 bread">
                <b-breadcrumb-item href="#/home">
                    <font-awesome-icon icon="home" />
                    Home
                </b-breadcrumb-item>
                <b-breadcrumb-item active>Leña</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
        <h2 class="titulo mt-5">Leña</h2>
        <b-card class="main-card mb-4">
            <h5 class="card-title">
                Listado de puntos de venta de leña a nivel nacional
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
                            v-if="data.tipoUsuario != 3"
                            class="btn boton-agregar-empresa d-inline-block ml-4 mb-2"
                            @click="agregarEmpresa"
                        >
                            + Agregar empresa
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
            <div v-if="!data.cargando">
                <b-alert show variant="warning" class="mt-2"
                    >* Si la comuna está deshabilitada no puede activar el punto
                    de venta, contacte con el administrador.</b-alert
                >
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
                    items: [],
                    fields: [
                        {
                            key: "regiones.nombre",
                            label: "Región",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "comunas.nombre",
                            label: "Comuna",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "ptv_nombre",
                            label: "Nombre empresa",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "ptv_direccion",
                            label: "Dirección",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "ptv_geolocalizado",
                            label: "¿Geolocalizado?",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        {
                            key: "precioVacio",
                            label: "¿Productos?",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        {
                            key: "ptv_informacion_valida",
                            label: "Validado",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        {
                            key: "updated_at",
                            label: "Modificado",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "ptv_ind_act",
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
                                "¿Está seguro(a) que desea eliminar este punto de venta?",
                        },
                    ],
                    currentPage: 1,
                    perPage: 5,
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
            exportarExcel() {
                if (this.data.exportar == "excel") {
                    var datosE = [];
                    if (this.data.exportarFiltro) {
                        this.data.datos = this.data.datosFiltro;
                        this.data.datos.forEach((item) => {
                            if (item.ptv_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            if (item.precioVacio) {
                                var precio = "Activo";
                            } else {
                                precio = "Inactivo";
                            }
                            if (item.ptv_geolocalizado) {
                                var geo = "Activo";
                            } else {
                                geo = "Inactivo";
                            }
                            if (item.ptv_informacion_valida) {
                                var validada = "Activo";
                            } else {
                                validada = "Inactivo";
                            }
                            datosE.push({
                                nombre: item.ptv_nombre,
                                region: item.regiones.nombre,
                                comuna: item.comunas.nombre,
                                direccion: item.ptv_direccion,
                                geolozalicado: geo,
                                precio: precio,
                                validada: validada,
                                reseteo: item.updated_at,
                                activo: activo,
                            });
                        });
                        this.data.datos = datosE;
                    } else {
                        this.data.datos = this.data.items;
                        this.data.datos.forEach((item) => {
                            if (item.ptv_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            if (item.precioVacio) {
                                var precio = "Activo";
                            } else {
                                precio = "Inactivo";
                            }
                            if (item.ptv_geolocalizado) {
                                var geo = "Activo";
                            } else {
                                geo = "Inactivo";
                            }
                            if (item.ptv_informacion_valida) {
                                var validada = "Activo";
                            } else {
                                validada = "Inactivo";
                            }
                            datosE.push({
                                nombre: item.ptv_nombre,
                                region: item.regiones.nombre,
                                comuna: item.comunas.nombre,
                                direccion: item.ptv_direccion,
                                geolozalicado: geo,
                                precio: precio,
                                validada: validada,
                                reseteo: item.updated_at,
                                activo: activo,
                            });
                        });
                        this.data.datos = datosE;
                    }
                    saveExcel({
                        data: this.data.datos,
                        fileName: "puntoventa_leña_" + this.fecha,
                        columns: [
                            {
                                field: "nombre",
                                title: "Nombre empresa",
                            },
                            {
                                field: "region",
                                title: "Región",
                            },
                            {
                                field: "comuna",
                                title: "Comuna",
                            },
                            {
                                field: "direccion",
                                title: "Dirección",
                            },
                            {
                                field: "geolozalicado",
                                title: "¿Geolocalizado?",
                            },
                            {
                                field: "precio",
                                title: "¿Productos?",
                            },
                            {
                                field: "validada",
                                title: "Validado",
                            },
                            {
                                field: "reseteo",
                                title: "Modificado",
                            },
                            {
                                field: "activo",
                                title: "Habilitar",
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
                        if (item.precioVacio) {
                            var precios = "Activo";
                        } else {
                            precios = "Inactivo";
                        }
                        if (item.ptv_geolocalizado) {
                            var geoloc = "Activo";
                        } else {
                            geoloc = "Inactivo";
                        }
                        if (item.ptv_informacion_valida) {
                            var validado = "Activo";
                        } else {
                            validado = "Inactivo";
                        }
                        if (item.ptv_ind_act) {
                            var modific = "Activo";
                        } else {
                            modific = "Inactivo";
                        }
                        datos.push({
                            nombreEmpresa: item.ptv_nombre,
                            region: item.regiones.nombre,
                            comuna: item.comunas.nombre,
                            direccion: item.ptv_direccion,
                            geolocalizado: geoloc,
                            productos: precios,
                            validado: validado,
                            habilitar: modific,
                            modificado: item.updated_at,
                        });
                    });
                    this.data.datos = datos;
                } else {
                    this.data.items.forEach((item) => {
                        if (item.precioVacio) {
                            var precios = "Activo";
                        } else {
                            precios = "Inactivo";
                        }
                        if (item.ptv_geolocalizado) {
                            var geoloc = "Activo";
                        } else {
                            geoloc = "Inactivo";
                        }
                        if (item.ptv_informacion_valida) {
                            var validado = "Activo";
                        } else {
                            validado = "Inactivo";
                        }
                        if (item.ptv_ind_act) {
                            var modific = "Activo";
                        } else {
                            modific = "Inactivo";
                        }
                        datos.push({
                            nombreEmpresa: item.ptv_nombre,
                            region: item.regiones.nombre,
                            comuna: item.comunas.nombre,
                            direccion: item.ptv_direccion,
                            geolocalizado: geoloc,
                            productos: precios,
                            validado: validado,
                            habilitar: modific,
                            modificado: item.updated_at,
                        });
                    });
                    this.data.datos = datos;
                }

                var vm = this;
                var columns = [
                    { dataKey: "nombreEmpresa", title: "Nombre empresa" },
                    { dataKey: "region", title: "Región" },
                    { dataKey: "comuna", title: "Comuna" },
                    { dataKey: "direccion", title: "Dirección" },
                    { dataKey: "geolocalizado", title: "Geolocalizado" },
                    { dataKey: "productos", title: "Productos" },
                    { dataKey: "validado", title: "Validado" },
                    { dataKey: "modificado", title: "Modificado" },
                    { dataKey: "habilitar", title: "Habilitar" },
                ];
                var doc = new jsPDF("l", "pt", "a4");
                doc.setFontSize(12);
                doc.text("Puntos de venta Leña", 40, 40);
                doc.autoTable(columns, vm.data.datos, {
                    margin: { top: 60 },
                });
                doc.save("puntos_VentaLeña_" + this.fecha);
                this.data.exportar = "";
            },
            agregarEmpresa() {
                this.data.tituloComponente = "Agregar punto de venta";
                this.$router.replace({
                    name: "agregar",
                    params: {
                        tituloComponente: this.data.tituloComponente,
                        editarForm: false,
                    },
                });
            },
            obtenerLeña() {
                let lena = {
                    tico_id: "1",
                };
                axios
                    .post(this.$root.urlApi + "puntosVenta/porId", lena)
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
            obtenerLeñaPorUsuario() {
                let lena = {
                    tico_id: "1",
                };
                axios
                    .post(this.$root.urlApi + "puntosVenta/porIdUsuario", lena)
                    .then((res) => {
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
                var id = data.ptv_id;
                axios
                    .delete(this.$root.urlApi + "puntosVenta/eliminar", {
                        data: id,
                    })
                    .then((res) => {
                        this.data.items = this.data.items.filter(
                            (item) => !(item.ptv_id == data.ptv_id)
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
                var accion = e;
                var obj = {
                    habilitar: e,
                    ptv_id: row.ptv_id,
                };
                axios
                    .put(this.$root.urlApi + "puntosVenta/habilitar", obj)
                    .then((res) => {
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
                        let pv = this.data.items.find(
                            (x) => x.ptv_id == row.ptv_id
                        );
                        pv.ptv_ind_act = !accion;
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
                if (localStorage.getItem("tipe") == 3) {
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
            if (
                localStorage.getItem("tipe") == 2 ||
                localStorage.getItem("tipe") == 3 ||
                localStorage.getItem("tipe") == 4 ||
                localStorage.getItem("tipe") == 5 ||
                localStorage.getItem("tipe") == 6
            ) {
                this.obtenerLeñaPorUsuario();
            } else {
                this.obtenerLeña();
            }
            this.filtroUsuario();
            this.obtieneFecha();
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
