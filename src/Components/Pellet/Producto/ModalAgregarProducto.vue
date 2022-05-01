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
                    <label for="marca">Marca</label>
                    <input
                        v-model="form.prod_marca"
                        maxlength="100"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        type="text"
                        class="form-control"
                        id="marca"
                        placeholder="Escribir..."
                        :class="error.prod_marca"
                    />
                    <div
                        class="invalid-feedback"
                        v-if="error.prod_marca == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="tipo">Tipo</label>
                    <v-select
                        v-model="form.tipoProducto"
                        :class="error.tipoProducto"
                        id="tipo"
                        :options="productos"
                        label="tipr_nombre"
                        placeholder="Seleccionar"
                        @input="validarInputs"
                        ><template #no-options="">
                            No existen datos en nuestros registros.
                        </template>
                    </v-select>
                    <div
                        class="invalid-vselect"
                        v-if="error.tipoProducto == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="especie">Especie</label>
                    <input
                        v-model="form.prod_especie"
                        :class="error.prod_especie"
                        maxlength="100"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        type="text"
                        class="form-control"
                        id="especie"
                        placeholder="text"
                        @keyup="validarInputs"
                    />
                    <div
                        class="invalid-feedback"
                        v-if="error.prod_especie == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="especie">Especie Normalizada</label>
                    <v-select
                        v-model="form.especieNormalizada"
                        :class="error.especieNormalizada"
                        id="especie"
                        :options="especies"
                        label="tien_nombre"
                        placeholder="Seleccionar"
                        @input="validarInputs"
                        ><template #no-options="">
                            No existen datos en nuestros registros.
                        </template>
                    </v-select>
                    <div
                        class="invalid-vselect"
                        v-if="error.especieNormalizada == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="unidad">Unidad</label>
                    <input
                        v-model="form.prod_unidad"
                        :class="error.prod_unidad"
                        maxlength="100"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        type="text"
                        class="form-control"
                        id="unidad"
                        placeholder="text"
                        @keyup="validarInputs"
                    />
                    <div
                        class="invalid-feedback"
                        v-if="error.prod_unidad == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="unidadN">Unidad Normalizada</label>
                    <v-select
                        v-model="form.unidadNormalizada"
                        :class="error.unidadNormalizada"
                        id="unidadN"
                        :options="unidades"
                        label="tiun_nombre"
                        placeholder="Seleccionar"
                        @input="validarInputs"
                        ><template #no-options="">
                            No existen datos en nuestros registros.
                        </template>
                    </v-select>
                    <div
                        class="invalid-vselect"
                        v-if="error.unidadNormalizada == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="precio">Precio</label>
                    <input
                        maxlength="10"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        v-model="form.prod_precio"
                        type="number"
                        class="form-control"
                        id="precio"
                        placeholder="$00"
                    />
                </div>
            </div>
            <hr />
            <!-- <div class="text-center div-stock centrar">
                <div class="form-check form-check-inline">
                    <label class="form-check-label">¿Tiene stock?</label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        v-model="form.prod_tiene_stock"
                        :class="error.prod_tiene_stock"
                        @change="validarInputs"
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="1"
                    />
                    <label class="form-check-label" for="inlineRadio1"
                        >Si</label
                    >
                </div>

                <div class="form-check form-check-inline">
                    <input
                        v-model="form.prod_tiene_stock"
                        :class="error.prod_tiene_stock"
                        @change="validarInputs"
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="0"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                        >No</label
                    >
                </div>
            </div>
            <hr /> -->
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
        <modal-advertencia-producto
            :mensaje="mensaje"
            @accionAdvertencia="emite"
        ></modal-advertencia-producto>
        <modal-advertencia-producto-editar
            :mensaje="mensaje"
            @accionAdvertenciaEditar="emiteEditar"
        ></modal-advertencia-producto-editar>
    </b-modal>
</template>

<script>
    import axios from "axios";
    import ModalAdvertenciaProducto from "../../Common/ModalAdvertenciaProducto.vue";
    import ModalAdvertenciaProductoEditar from "../../Common/ModalAdvertenciaProductoEditar.vue";
    export default {
        components: {
            ModalAdvertenciaProducto,
            ModalAdvertenciaProductoEditar,
        },
        props: {
            formEditar: null,
            tituloModal: null,
            editarItem: null,
            conId: null,
        },
        data() {
            return {
                mensaje:
                    "Ya existe un producto con estos parámetros. ¿Desea duplicarlo?",
                accion: false,
                productos: [],
                unidades: [],
                especies: [],
                formDuplicado: {},
                formDuplicadoEditar: {},
                form: {
                    editar: false,
                    especieNormalizada: [],
                    prod_especie: "",
                    unidadNormalizada: [],
                    prod_unidad: "",
                    prod_tiene_stock: 1,
                    prod_precio: "",
                    tipoProducto: [],
                    prod_id: 1,
                    prod_ind_act: 1,
                    tien_id: 1,
                    tipoCombustible: {
                        tico_descripcion: "Pellet",
                        tico_id: 2,
                        tico_ind_act: 1,
                    },
                    tipr_id: 1,
                    tiun_id: 1,
                    prod_marca: "",
                    ptv_id: "",
                    confirmacion: 0,
                },
                error: {
                    total: 0,
                    editar: false,
                    especieNormalizada: [],
                    prod_especie: "",
                    unidadNormalizada: [],
                    prod_unidad: "",
                    prod_tiene_stock: "",
                    prod_precio: "",
                    tipoProducto: [],
                    prod_id: 1,
                    prod_ind_act: 1,
                    tien_id: 1,
                    tipoCombustible: {
                        tico_descripcion: "Pellet",
                        tico_id: 2,
                        tico_ind_act: 1,
                    },
                    tipr_id: 1,
                    tiun_id: 1,
                    prod_marca: "",
                    ptv_id: "",
                },
            };
        },

        methods: {
            emite(e) {
                this.form.confirmacion = e;
                this.formDuplicado.confirmacion = e;
                axios
                    .post(
                        this.$root.urlApi + "productos/agregar",
                        this.formDuplicado
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
                        this.$parent.actualizaTabla();
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
            emiteEditar(e) {
                this.form.confirmacion = e;
                this.formDuplicadoEditar.confirmacion = e;
                axios
                    .put(
                        this.$root.urlApi + "productos/editar",
                        this.formDuplicadoEditar
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
                        localStorage.setItem("productoIdEditar", "");
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
                        this.$parent.actualizaTabla();
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
            validarInputs() {
                this.errors = [];
                this.error.total = 0;
                if (this.form.tipoProducto.length < 1) {
                    this.error.total++;
                    this.error.tipoProducto = "is-invalid";
                } else {
                    this.error.tipoProducto = "valid";
                }
                if (!this.form.prod_especie) {
                    this.error.total++;
                    this.error.prod_especie = "is-invalid";
                } else {
                    this.error.prod_especie = "is-valid";
                }
                if (this.form.especieNormalizada.length < 1) {
                    this.error.total++;
                    this.error.especieNormalizada = "is-invalid";
                } else {
                    this.error.especieNormalizada = "valid";
                }
                if (!this.form.prod_unidad) {
                    this.error.total++;
                    this.error.prod_unidad = "is-invalid";
                } else {
                    this.error.prod_unidad = "is-valid";
                }
                if (!this.form.prod_marca) {
                    this.error.total++;
                    this.error.prod_marca = "is-invalid";
                } else {
                    this.error.prod_marca = "is-valid";
                }
                if (this.form.unidadNormalizada.length < 1) {
                    this.error.total++;
                    this.error.unidadNormalizada = "is-invalid";
                } else {
                    this.error.unidadNormalizada = "valid";
                }
                if (this.form.prod_tiene_stock === "") {
                    this.error.total++;
                    this.error.prod_tiene_stock = "is-invalid";
                } else {
                    this.error.prod_tiene_stock = "is-valid";
                }

                if (this.error.total > 0) {
                    return false;
                } else {
                    return true;
                }
            },
            accionSi() {
                if (!this.conId) {
                    if (this.validarInputs()) {
                        this.form.editar = this.editarItem;
                        this.form.tipr_id = this.form.tipoProducto.tipr_id;
                        this.form.tiun_id = this.form.unidadNormalizada.tiun_id;
                        this.form.tien_id =
                            this.form.especieNormalizada.tien_id;
                        if (!this.editarItem) {
                            this.form.prod_id = Math.random()
                                .toString(36)
                                .replace(/[^a-z]+/g, "")
                                .substr(0, 5);
                        }
                        //this.$refs["modal"].hide();
                        this.$emit("guardarProducto", this.form);
                    }
                } else {
                    if (!this.form.prod_id && !this.editarItem) {
                        if (this.validarInputs()) {
                            this.form.editar = this.editarItem;
                            this.form.tipr_id = this.form.tipoProducto.tipr_id;
                            this.form.tiun_id =
                                this.form.unidadNormalizada.tiun_id;
                            this.form.tien_id =
                                this.form.especieNormalizada.tien_id;
                            this.form.editar = false;
                            this.formDuplicado = this.form;
                            axios
                                .post(
                                    this.$root.urlApi + "productos/agregar",
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
                                    this.$parent.actualizaTabla();
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
                                    if (res.response.data.codigo == 6000) {
                                        this.$bvModal.show(
                                            "modal-advertencia-producto"
                                        );
                                    }
                                });
                        }
                    } else {
                        if (this.validarInputs()) {
                            this.form.prod_id =
                                localStorage.getItem("productoIdEditar");
                            this.form.editar = this.editarItem;
                            this.form.tipr_id = this.form.tipoProducto.tipr_id;
                            this.form.tiun_id =
                                this.form.unidadNormalizada.tiun_id;
                            this.form.tien_id =
                                this.form.especieNormalizada.tien_id;
                            this.form.editar = true;
                            this.formDuplicadoEditar = this.form;
                            axios
                                .put(
                                    this.$root.urlApi + "productos/editar",
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
                                    localStorage.setItem(
                                        "productoIdEditar",
                                        ""
                                    );
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
                                    this.$parent.actualizaTabla();
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
                                    if (res.response.data.codigo == 6000) {
                                        this.$bvModal.show(
                                            "modal-advertencia-producto-editar"
                                        );
                                    }
                                });
                        }
                    }
                }
            },
            editar() {
                if (this.formEditar) {
                    this.form.ptv_id = this.formEditar.ptv_id;
                    this.form.prod_id = this.formEditar.prod_id;
                }
                if (this.editarItem) {
                    this.vieneId = this.formEditar.prod_id;
                    this.form.tipoProducto = this.formEditar.tipoProducto;
                    this.form.unidadNormalizada =
                        this.formEditar.unidadNormalizada;
                    this.form.especieNormalizada =
                        this.formEditar.especieNormalizada;
                    this.form.prod_especie = this.formEditar.prod_especie;
                    this.form.prod_marca = this.formEditar.prod_marca;
                    this.form.prod_unidad = this.formEditar.prod_unidad;
                    this.form.prod_precio = this.formEditar.prod_precio;
                    this.form.prod_tiene_stock =
                        this.formEditar.prod_tiene_stock;
                    this.form.prod_id = this.formEditar.prod_id;
                }
            },
            obtenerProductos() {
                let idPellet = {
                    tico_id: 2,
                };
                axios
                    .post(this.$root.urlApi + "TipoProducto", idPellet)
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
                        this.productos = res.data.data;
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
            obtenerUnidad() {
                let idPellet = {
                    tico_id: 2,
                };
                axios
                    .post(
                        this.$root.urlApi + "unidadNormalizada/listarActivo",
                        idPellet
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
                        this.unidades = res.data.data;
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
            obtenerEspecies() {
                let idPellet = {
                    tico_id: 2,
                };
                axios
                    .post(
                        this.$root.urlApi + "especieNormalizada/listarActivo",
                        idPellet
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
                        this.especies = res.data.data;
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

            hideModal() {
                this.$refs["modal"].hide();
            },
        },
        created() {
            if (this.formEditar) {
                this.form.ptv_id = this.formEditar.ptv_id;
            }
            this.obtenerProductos();
            this.obtenerUnidad();
            this.obtenerEspecies();
            this.editar();
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
        top: 15%;
    }
    @media (max-width: 990px) {
        /deep/ #modal-agregar {
            top: 0%;
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
