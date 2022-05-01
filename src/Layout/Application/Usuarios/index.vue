<template>
    <div>
        <div>
            <strong>{{ this.fecha }}</strong>
            <b-breadcrumb class="float-right mt-3 bread">
                <b-breadcrumb-item href="#/home">
                    <font-awesome-icon icon="home" />
                    Home
                </b-breadcrumb-item>
                <b-breadcrumb-item active>Usuarios</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
        <h2 class="titulo mt-5">Usuarios</h2>
        <b-card class="main-card mb-4">
            <h5 class="card-title">Listado de usuarios a nivel nacional</h5>
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
                            v-b-modal.modal-agregar
                            @click="agregarUsuarioModal"
                            class="btn boton-agregar-empresa d-inline-block ml-4 mb-2"
                        >
                            + Agregar nuevo usuario
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
        <modalAgregar
            :key="data.render"
            :formEditar="data.recibido"
            :editarItem="data.editarItem"
            :tituloModal="data.tituloModal"
        ></modalAgregar>
    </div>
</template>

<script>
    import axios from "axios";
    import { saveExcel } from "@progress/kendo-vue-excel-export";
    import Tabla from "../../../../src/Components/Tabla.vue";
    import modalAgregar from "../../../../src/Components/Usuarios/ModalAgregarUsuario.vue";
    import cargando from "../../../../src/Components/Common/Cargando.vue";
    import jsPDF from "jspdf";
    import "jspdf-autotable";
    export default {
        components: { Tabla, modalAgregar, cargando },
        data() {
            return {
                data: {
                    exportarFiltro: 0,
                    datosFiltro: [],
                    renderTabla: 0,
                    exportar: "",
                    editarItem: false,
                    render: 0,
                    tituloModal: "",
                    recibido: [],
                    showModal: false,
                    formEdit: "",
                    cargando: true,
                    btnAgregar: true,
                    btnAgregarLabel: "Agregar empresa",
                    items: [],
                    fields: [
                        {
                            key: "usua_nombre",
                            label: "Nombre",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "usua_correo",
                            label: "E-mail",
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
                            key: "usua_ind_act",
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
                                "¿Está seguro(a) que desea eliminar este usuario?",
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
                            if (item.usua_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            datosE.push({
                                usua_nombre: item.usua_nombre,
                                usua_correo: item.usua_correo,
                                updated_at: item.updated_at,
                                itemActivo: activo,
                            });
                        });
                        this.data.datos = datosE;
                    } else {
                        this.data.datos = this.data.items;
                        this.data.datos.forEach((item) => {
                            if (item.usua_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            datosE.push({
                                usua_nombre: item.usua_nombre,
                                usua_correo: item.usua_correo,
                                updated_at: item.updated_at,
                                itemActivo: activo,
                            });
                        });
                        this.data.datos = datosE;
                    }
                    saveExcel({
                        data: this.data.datos,
                        fileName: "usuarios_" + this.fecha,
                        columns: [
                            { field: "usua_nombre", title: "Nombre" },
                            { field: "usua_correo", title: "E-mail" },
                            {
                                field: "updated_at",
                                title: "Modificado",
                            },
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
                            if (item.usua_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            datos.push({
                                usua_nombre: item.usua_nombre,
                                usua_correo: item.usua_correo,
                                updated_at: item.updated_at,
                                itemActivo: activo,
                            });
                        });
                        this.data.datos = datos;
                    } else {
                        this.data.datos = this.data.items;
                        this.data.datos.forEach((item) => {
                            if (item.usua_ind_act) {
                                var activo = "Activo";
                            } else {
                                activo = "Inactivo";
                            }
                            datos.push({
                                usua_nombre: item.usua_nombre,
                                usua_correo: item.usua_correo,
                                updated_at: item.updated_at,
                                itemActivo: activo,
                            });
                        });
                        this.data.datos = datos;
                    }
                    var vm = this;
                    var columns = [
                        { dataKey: "usua_nombre", title: "Nombre" },
                        { dataKey: "usua_correo", title: "E-mail" },
                        {
                            dataKey: "updated_at",
                            title: "Modificado",
                        },
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
                    doc.save("usuarios_" + this.fecha);
                    this.data.exportar = "";
                }
            },
            actualizaTabla() {
                this.data.cargando = true;
                this.obtenerUsuarios();
            },
            agregarUsuarioModal() {
                this.data.editarItem = false;
                this.data.tituloModal = "Agregar Usuario";
                this.data.render += 1;
            },
            agregar(e) {
                this.data.recibido = e;
            },
            obtenerUsuarios() {
                axios
                    .get(this.$root.urlApi + "usuarios/listar")
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
            editar(row, index, e) {
                this.data.editarItem = true;
                this.data.tituloModal = "Editar usuario";
                this.data.recibido = row;
                this.data.render += 1;
            },
            eliminar(data, index) {
                var id = data.usua_id;
                axios
                    .delete(this.$root.urlApi + "usuarios/eliminar", {
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
                            (item) => !(item.usua_id == data.usua_id)
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
                    .put(this.$root.urlApi + "usuarios/habilitar", row)
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
            this.obtenerUsuarios();
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
