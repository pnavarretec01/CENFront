<template>
    <div class="container-flex">
        <div>
            <strong>{{ this.data.fecha }}</strong>
            <b-breadcrumb class="float-right mt-3 bread">
                <b-breadcrumb-item href="#/home">
                    <font-awesome-icon icon="home" />
                    Home
                </b-breadcrumb-item>
                <b-breadcrumb-item href="#/lena">Leña</b-breadcrumb-item>
                <b-breadcrumb-item active>Agregar</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
        <h2 class="titulo mt-5 mb-5 d-inline-block">Leña</h2>
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
                @infPVenta="formPuntoVenta = $event"
                :formEditar="formEditar"
            ></formAgregar>
            <formAgregarContacto
                ref="formAgregarContacto"
                @infEmpresarial="formContacto = $event"
                :formEditar="formEditar"
            ></formAgregarContacto>
            <horarios
                ref="formHorarios"
                @horarios="horarios = $event"
                :formEditar="formEditar"
            ></horarios>
            <h5 class="card-title">Stock</h5>
            <div class="form-row mb-5">
                <label class="d-inline-block">¿Tiene stock?</label>
                <label class="d-inline-block ml-3" v-if="data.items!=''"
                    ><strong>Si</strong></label
                >
                <label class="d-inline-block ml-3" v-else
                    ><strong>No</strong></label
                >
            </div>
            <h5 class="card-title">Productos</h5>
            <div class="row">
                <div class="col-12 text-right">
                    <b-col>
                        <button
                            class="btn boton-agregar-productos"
                            @click="agregarConfModal"
                            v-b-modal.modal-agregar
                        >
                            + Agregar productos
                        </button>
                    </b-col>
                </div>
            </div>
            <Tabla
                :key="data.renderTabla"
                v-if="!data.cargando"
                :data="data"
                @checkboxStock="checkboxStock"
                @checkboxActivoProdLena="checkboxActivoProdLena"
                @editar="editar"
                @eliminar="eliminar"
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
            <validada
                ref="formValidada"
                @infValidada="formValidada = $event"
                :formEditar="formEditar"
            ></validada>
        </b-card>
        <div class="row mb-4">
            <div class="col-12 text-center" v-if="!data.envioBoton">
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
        <modalAgregarProducto
            :key="data.renderModal"
            :formEditar="data.recibido"
            :editarItem="data.editarItem"
            :tituloModal="data.tituloModal"
            :conId="data.conId"
            @guardarProducto="guardarProducto($event)"
        ></modalAgregarProducto>
        <modal-advertencia
            :mensaje="data.mensaje"
            @accionAdvertencia="emite"
        ></modal-advertencia>
        <modal-advertencia-editar
            :mensaje="data.mensaje"
            @accionAdvertencia="emiteEditar"
        ></modal-advertencia-editar>
    </div>
</template>

<script>
    import axios from "axios";
    import modalAgregarProducto from "../../../../src/Components/Leña/Producto/ModalAgregarProducto.vue";
    import Tabla from "../../../../src/Components/Tabla.vue";
    import formAgregar from "../../../../src/Components/Leña/FormAgregar.vue";
    import formAgregarContacto from "../../../../src/Components/Leña/FormAgregarContacto.vue";
    import horarios from "../../../../src/Components/Leña/Horarios.vue";
    import validada from "../../../../src/Components/Leña/BajoTabla.vue";
    import ModalAdvertencia from "../../../Components/Common/ModalAdvertenciaProductoLocal.vue";
    import ModalAdvertenciaEditar from "../../../Components/Common/ModalAdvertenciaProductoLocalEditar.vue";
    export default {
        components: {
            Tabla,
            formAgregar,
            formAgregarContacto,
            horarios,
            validada,
            modalAgregarProducto,
            ModalAdvertencia,
            ModalAdvertenciaEditar,
        },
        props: ["formEditar", "editarForm", "tituloComponente"],
        data() {
            return {
                data: {
                    repetido: false,
                    dataLocal: [],
                    mensaje:
                        "Ya existe un producto con estos parámetros. ¿Desea duplicarlo?",
                    envioBoton: false,
                    productoNuevo: [],
                    conId: "",
                    tituloModal: "",
                    cargando: true,
                    renderTabla: 0,
                    renderModal: 0,
                    subTitulo: "Agregar punto de venta",
                    idCombustible: 1,
                    informacionEnvio: [],
                    horarios: [],
                    formContacto: [],
                    formPuntoVenta: [],
                    formValidada: [],
                    heading: "Listado de parámetros configurado para leña",
                    btnAgregar: true,
                    btnAgregarLabel: "Agregar productos",
                    items: [],
                    fields: [
                        {
                            key: "tipoProducto.tipr_nombre",
                            label: "Tipo",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "prod_especie",
                            label: "Especie",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "especieNormalizada.tien_nombre",
                            label: "Especie Normalizada",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "prod_unidad",
                            label: "Unidad",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "unidadNormalizada.tiun_nombre",
                            label: "Unidad Normalizada",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "prod_precio",
                            label: "Precio",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "prod_tiene_stock",
                            label: "Stock",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        // {
                        //     key: "prod_ind_act",
                        //     label: "Habilitar Existencia",
                        //     sortable: true,
                        //     sortDirection: "desc",
                        //     filtro: false,
                        // },
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
                                "¿Está seguro(a) que desea eliminar este producto?",
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
            emite(e) {
                if (e) {
                    this.data.cargando = true;
                    this.data.productoNuevo.push(this.data.dataLocal);
                    this.data.items.push(this.data.dataLocal);
                    this.data.cargando = false;
                    this.$bvModal.hide("modal-agregar");
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
                }
            },
            emiteEditar(e) {
                if (e) {
                    let verificar = this.data.items.find(
                        (x) => x.prod_id == this.data.dataLocal.prod_id
                    );
                    verificar.prod_precio = this.data.dataLocal.prod_precio;
                    verificar.editar = this.data.dataLocal.editar;
                    verificar.especieNormalizada =
                        this.data.dataLocal.especieNormalizada;
                    verificar.prod_especie = this.data.dataLocal.prod_especie;
                    verificar.prod_id = this.data.dataLocal.prod_id;
                    verificar.prod_ind_act = this.data.dataLocal.prod_ind_act;
                    verificar.prod_marca = this.data.dataLocal.prod_marca;
                    verificar.prod_tiene_stock =
                        this.data.dataLocal.prod_tiene_stock;
                    verificar.prod_unidad = this.data.dataLocal.prod_unidad;
                    verificar.tien_id = this.data.dataLocal.tien_id;
                    verificar.tipoCombustible =
                        this.data.dataLocal.tipoCombustible;
                    verificar.tipoProducto = this.data.dataLocal.tipoProducto;
                    verificar.tipr_id = this.data.dataLocal.tipr_id;
                    verificar.tiun_id = verificar.unidadNormalizada =
                        this.data.dataLocal.unidadNormalizada;
                    let verificar1 = this.data.productoNuevo.find(
                        (x) => x.prod_id == this.data.dataLocal.prod_id
                    );
                    verificar1.prod_precio = this.data.dataLocal.prod_precio;
                    verificar1.editar = this.data.dataLocal.editar;
                    verificar1.especieNormalizada =
                        this.data.dataLocal.especieNormalizada;
                    verificar1.prod_especie = this.data.dataLocal.prod_especie;
                    verificar1.prod_id = this.data.dataLocal.prod_id;
                    verificar1.prod_ind_act = this.data.dataLocal.prod_ind_act;
                    verificar1.prod_marca = this.data.dataLocal.prod_marca;
                    verificar1.prod_tiene_stock =
                        this.data.dataLocal.prod_tiene_stock;
                    verificar1.prod_unidad = this.data.dataLocal.prod_unidad;
                    verificar1.tien_id = this.data.dataLocal.tien_id;
                    verificar1.tipoCombustible =
                        this.data.dataLocal.tipoCombustible;
                    verificar1.tipoProducto = this.data.dataLocal.tipoProducto;
                    verificar1.tipr_id = this.data.dataLocal.tipr_id;
                    verificar1.tiun_id = verificar1.unidadNormalizada =
                        this.data.dataLocal.unidadNormalizada;
                    this.$bvModal.hide("modal-agregar");
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
                }
            },
            actualizaTabla() {
                this.data.cargando = true;
                this.obtenerProductos();
            },
            guardarProducto(e) {
                this.data.repetido = false;
                if (!e.editar) {
                    this.data.items.forEach((item) => {
                        if (item) {
                            if (
                                item.tipoCombustible.tico_id ==
                                    e.tipoCombustible.tico_id &&
                                item.especieNormalizada.tien_id ==
                                    e.especieNormalizada.tien_id &&
                                item.prod_especie == e.prod_especie &&
                                item.prod_unidad == e.prod_unidad &&
                                item.unidadNormalizada.tiun_id ==
                                    e.unidadNormalizada.tiun_id
                            ) {
                                this.data.repetido = true;
                            }
                        }
                    });
                    if (this.data.repetido) {
                        this.$bvModal.show("modal-advertencia-producto-local");
                        this.$toastr.Add({
                            msg: "Ya existe un producto con estos parámetros",
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
                        this.data.dataLocal = e;
                    } else {
                        this.data.cargando = true;
                        this.data.productoNuevo.push(e);
                        this.data.items.push(e);
                        this.data.cargando = false;
                        this.$bvModal.hide("modal-agregar");
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
                    }
                } else {
                    this.data.repetido = false;
                    this.data.items.forEach((item) => {
                        if (item) {
                            if (
                                item.tipoCombustible.tico_id ==
                                    e.tipoCombustible.tico_id &&
                                item.especieNormalizada.tien_id ==
                                    e.especieNormalizada.tien_id &&
                                item.prod_especie == e.prod_especie &&
                                item.prod_unidad == e.prod_unidad &&
                                item.unidadNormalizada.tiun_id ==
                                    e.unidadNormalizada.tiun_id &&
                                item.prod_id != e.prod_id
                            ) {
                                this.data.repetido = true;
                            }
                        }
                    });
                    if (this.data.repetido) {
                        this.$bvModal.show(
                            "modal-advertencia-producto-local-editar"
                        );
                        this.$toastr.Add({
                            msg: "Ya existe un producto con estos parámetros",
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
                        this.data.dataLocal = e;
                    } else {
                        let verificar = this.data.items.find(
                            (x) => x.prod_id == e.prod_id
                        );
                        verificar.prod_precio = e.prod_precio;
                        verificar.editar = e.editar;
                        verificar.especieNormalizada = e.especieNormalizada;
                        verificar.prod_especie = e.prod_especie;
                        verificar.prod_id = e.prod_id;
                        verificar.prod_ind_act = e.prod_ind_act;
                        verificar.prod_marca = e.prod_marca;
                        verificar.prod_tiene_stock = e.prod_tiene_stock;
                        verificar.prod_unidad = e.prod_unidad;
                        verificar.tien_id = e.tien_id;
                        verificar.tipoCombustible = e.tipoCombustible;
                        verificar.tipoProducto = e.tipoProducto;
                        verificar.tipr_id = e.tipr_id;
                        verificar.tiun_id = verificar.unidadNormalizada =
                            e.unidadNormalizada;
                        let verificar1 = this.data.productoNuevo.find(
                            (x) => x.prod_id == e.prod_id
                        );
                        verificar1.prod_precio = e.prod_precio;
                        verificar1.editar = e.editar;
                        verificar1.especieNormalizada = e.especieNormalizada;
                        verificar1.prod_especie = e.prod_especie;
                        verificar1.prod_id = e.prod_id;
                        verificar1.prod_ind_act = e.prod_ind_act;
                        verificar1.prod_marca = e.prod_marca;
                        verificar1.prod_tiene_stock = e.prod_tiene_stock;
                        verificar1.prod_unidad = e.prod_unidad;
                        verificar1.tien_id = e.tien_id;
                        verificar1.tipoCombustible = e.tipoCombustible;
                        verificar1.tipoProducto = e.tipoProducto;
                        verificar1.tipr_id = e.tipr_id;
                        verificar1.tiun_id = verificar1.unidadNormalizada =
                            e.unidadNormalizada;
                        this.$bvModal.hide("modal-agregar");
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
                    }
                }
            },
            agregarConfModal() {
                this.data.editarItem = false;
                this.data.recibido = this.formEditar;
                this.data.tituloModal = "Agregar Producto";
                this.data.renderModal += 1;
            },
            asignarTitulo() {
                if (this.tituloComponente)
                    this.data.subTitulo = this.tituloComponente;
            },
            obtenerProductos() {
                if (this.editarForm) {
                    axios
                        .post(
                            this.$root.urlApi + "productos/listar",
                            this.formEditar
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
                } else {
                    this.data.cargando = false;
                }
            },
            enviarDatos() {
                if (this.editarForm) {
                    this.$refs.formAgregar.envioDatos();
                    this.$refs.formAgregarContacto.envioDatos();
                    this.$refs.formHorarios.envioDatos();
                    this.$refs.formValidada.envioDatos();
                    if (
                        !this.$refs.formAgregar.envioDatos() ||
                        !this.$refs.formAgregarContacto.envioDatos() ||
                        !this.$refs.formValidada.envioDatos()
                    ) {
                        this.$toastr.Add({
                            msg: "¡Asegurate de completar todos los campos necesarios!",
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
                        return;
                    } else {
                        this.data.envioBoton = true;
                        var objeto = {
                            idCombustible: 1,
                            ptv_id: this.formEditar.ptv_id,
                            formPuntoVenta: this.formPuntoVenta,
                            formContacto: this.formContacto,
                            horarios: this.horarios,
                            validada: this.formValidada,
                        };
                        axios
                            .put(
                                this.$root.urlApi + "puntosVenta/editar",
                                objeto
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
                                if (objeto.formPuntoVenta.objetoImagen) {
                                    objeto.formPuntoVenta.objetoImagen.append(
                                        "idPtv",
                                        res.data.data.PuntoVenta.ptv_id
                                    );
                                    objeto.formPuntoVenta.objetoImagen.append(
                                        "imagenAntigua",
                                        res.data.data.PuntoVenta
                                            .ptv_nombre_imagen
                                    );
                                    this.editarImagen(
                                        objeto.formPuntoVenta.objetoImagen
                                    );
                                }
                                this.data.envioBoton = false;
                                this.$router.push("lena");
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
                                this.data.envioBoton = false;
                            });
                    }
                } else {
                    this.$refs.formAgregar.envioDatos();
                    this.$refs.formAgregarContacto.envioDatos();
                    this.$refs.formHorarios.envioDatos();
                    this.$refs.formValidada.envioDatos();
                    if (
                        !this.$refs.formAgregar.envioDatos() ||
                        !this.$refs.formAgregarContacto.envioDatos() ||
                        !this.$refs.formValidada.envioDatos()
                    ) {
                        this.$toastr.Add({
                            msg: "¡Asegurate de completar todos los campos necesarios!",
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
                        return;
                    } else {
                        this.data.cargando = false;
                        var obj = {
                            idCombustible: 1,
                            formPuntoVenta: this.formPuntoVenta,
                            formContacto: this.formContacto,
                            horarios: this.horarios,
                            validada: this.formValidada,
                            productos: this.data.productoNuevo,
                        };
                        axios
                            .post(
                                this.$root.urlApi + "puntosVenta/guardar",
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
                                this.$router.push("lena");
                                if (obj.formPuntoVenta.objetoImagen) {
                                    obj.formPuntoVenta.objetoImagen.append(
                                        "idPtv",
                                        res.data.data.PuntoVenta.ptv_id
                                    );
                                    this.guardarImagen(
                                        obj.formPuntoVenta.objetoImagen
                                    );
                                }
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
                                this.data.cargando = false;
                                this.data.envioBoton = false;
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
                                this.data.envioBoton = false;
                            });
                    }
                }
            },
            guardarImagen(imagen) {
                axios
                    .post(
                        this.$root.urlApi +
                            "puntosVenta/guardarImagenPuntoVenta",
                        imagen
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
                    })
                    .catch((res) => {});
            },
            editarImagen(imagen) {
                axios
                    .post(
                        this.$root.urlApi +
                            "puntosVenta/editarImagenPuntoVenta",
                        imagen
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
                    })
                    .catch((res) => {});
            },

            volver() {
                this.$router.replace("lena");
            },
            obtieneFecha() {
                let date = new Date();
                let day = `0${date.getDate()}`.slice(-2);
                let month = `0${date.getMonth() + 1}`.slice(-2);
                let year = date.getFullYear();
                this.data.fecha = `${day}/${month}/${year}`;
            },
            editar(row, index, e) {
                localStorage.setItem("productoIdEditar", row.prod_id);
                this.data.editarItem = true;
                this.data.recibido = row;
                this.data.tituloModal = "Editar Producto";
                this.data.renderModal += 1;
            },
            eliminar(data, index) {
                if (typeof data.prod_id == "string") {
                    this.data.items = this.data.items.filter(
                        (item) => !(item.prod_id == data.prod_id)
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
                }
                if (typeof data.prod_id == "number") {
                    var id = data.prod_id;
                    axios
                        .delete(this.$root.urlApi + "productos/eliminar", {
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
                                (item) => !(item.prod_id == data.prod_id)
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
                }
            },
            checkboxStock(row, index, e) {
                if (typeof row.prod_id == "number") {
                    axios
                        .post(
                            this.$root.urlApi + "productos/habilitarStock",
                            row
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
                } else {
                    let verificar = this.data.items.find(
                        (x) => x.prod_id == row.prod_id
                    );
                    verificar.prod_tiene_stock = e.prod_tiene_stock;
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
                }
            },
            checkboxActivoProdLena(row, index, e) {
                if (typeof row.prod_id == "number") {
                    axios
                        .post(this.$root.urlApi + "productos/habilitar", row)
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
                } else {
                    let verificar = this.data.items.find(
                        (x) => x.prod_id == row.prod_id
                    );
                    verificar.prod_ind_act = e.prod_ind_act;
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
                }
            },
        },
        created() {
            this.data.conId = this.editarForm;
            this.obtenerProductos();
            this.asignarTitulo();
            this.obtieneFecha();
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
