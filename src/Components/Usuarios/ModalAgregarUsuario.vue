<template>
    <b-modal
        scrollable
        v-model="show"
        size="lg"
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
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input
                    type="text"
                    class="form-control"
                    id="nombre"
                    @input="validarInput"
                    placeholder="Escribe..."
                    v-model="form.nombre"
                    :class="error.nombre"
                />
                <div
                    class="invalid-feedback"
                    v-if="error.nombre == 'is-invalid'"
                >
                    Este campo es obligatorio.
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="perfil">Perfil</label>
                    <i
                        class="pe-7s-info ml-2 tooltip1"
                        id="icono-info"
                        style="
                            color: #12a99e;
                            font-size: 15px !important;
                            font-weight: 400;
                        "
                        ><div class="tooltip1text">
                            <div class="container">
                                <div class="row">
                                    <div class="col">
                                        <p>
                                            <strong>Administrador:</strong>
                                            puede ver el contenido de todas las
                                            regiones y comunas, tiene acceso a
                                            todos los módulos, puede eliminar,
                                            editar y agregar usuario.
                                        </p>
                                        <p>
                                            <strong>Observador:</strong> solo
                                            pueden ver el contenido de las
                                            regiones y comunas, no peuden
                                            editar, eliminar ni agregar
                                            usuarios.
                                        </p>
                                        <p>
                                            <strong>Pellet:</strong> pueden ver
                                            el contenido del módulo de pellet,
                                            calificaciones, puede eliminar y
                                            agregar punto de ventas, pero no
                                            usuario. Tiene acceso a todas las
                                            regiones y comunas asignadas. Puede
                                            ver todos los puntos de vebta de las
                                            regiones o comunas a las que tiene
                                            acceso.
                                        </p>
                                    </div>
                                    <div class="col">
                                        <p>
                                            <strong>Leña:</strong>
                                            puede ver el contenido del módulo de
                                            leña, calificaciones, puede eliminar
                                            y agregar puntos de venta, pero no
                                            usuarios. Tiene acceso a todas las
                                            regiones y acomunas asignadas, Puede
                                            ver todos los puntos de venta re las
                                            regiones o comunas a las que tiene
                                            acceso.
                                        </p>
                                        <p>
                                            <strong>Región:</strong> Puede ver
                                            el contenido del módulo pellet, leña
                                            y calificaciones de su región. Puede
                                            eliminar y agregar punto de ventas,
                                            pero no usuarios. Tiene acceso a
                                            todas las comunas de esa region.
                                        </p>
                                        <p>
                                            <strong>Tarifa Eléctrica:</strong>
                                            solo puede ver y modificar el módulo
                                            de tarifa eléctrica.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div></i
                    >
                    <v-select
                        :options="perfiles"
                        label="tipe_nombre"
                        id="perfil"
                        placeholder="Seleccionar"
                        @input="validarInput"
                        v-model="form.perfil"
                        :class="error.perfil"
                        ><template #no-options="">
                            No hay existen datos en nuestros registros.
                        </template>
                    </v-select>
                    <div
                        class="invalid-vselect"
                        v-if="error.perfil == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
                <div class="form-group col-md-4">
                    <label for="telefono">Teléfono</label>
                    <input
                        type="number"
                        class="form-control"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        maxLength="11"
                        id="telefono"
                        placeholder="0 0000 00000"
                        @input="validarInput"
                        v-model="form.telefono"
                        :class="error.telefono"
                    />
                    <div
                        class="invalid-feedback"
                        v-if="error.telefono == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
                <div class="form-group col-md-4">
                    <label for="correo">Correo electrónico</label>
                    <input
                        type="text"
                        class="form-control"
                        id="correo"
                        placeholder="correo.propio@mail.cl"
                        @input="validarInput"
                        v-model="form.email"
                        :class="error.email"
                    />
                    <div
                        class="invalid-feedback"
                        v-if="error.email == 'is-invalid'"
                    >
                        Ingresa un Correo válido.
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="inputRegion" class="d-inline-block"
                        >Región</label
                    >
                    <div class="form-check d-inline-block ml-5">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id="checkboxTodasRegiones"
                            v-model="checkTodasRegiones"
                            @change="todasLasRegiones"
                        />
                        <label
                            class="form-check-label"
                            for="checkboxTodasRegiones"
                            >Seleccionar todas las regiones</label
                        >
                    </div>
                    <v-select
                        multiple
                        :options="regiones"
                        label="nombre"
                        placeholder="Seleccionar"
                        @input="filtro"
                        v-model="form.region"
                        :class="error.region"
                        ><template #no-options="">
                            No existen datos en nuestros registros.
                        </template>
                    </v-select>
                    <div
                        class="invalid-vselect"
                        v-if="error.region == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
                <div class="form-group col-md-12">
                    <label for="inputComuna" class="d-inline-block"
                        >Comuna</label
                    >
                    <div class="form-check d-inline-block ml-5">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id="checkboxTodas"
                            v-model="checkTodas"
                            @change="todasLasComunas"
                        />
                        <label class="form-check-label" for="checkboxTodas"
                            >Seleccionar todas las comunas</label
                        >
                    </div>
                    <v-select
                        multiple
                        :options="filtroComunas()"
                        label="nombre"
                        placeholder="Seleccionar"
                        v-model="form.comuna"
                        :class="error.comuna"
                        @input="validarInput"
                        ><template #no-options="">
                            Selecciona una comuna.
                        </template>
                    </v-select>
                    <div
                        class="invalid-vselect"
                        v-if="error.comuna == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6 d-inline-block">
                    <label v-if="!editarItem" for="contraseña"
                        >Contraseña</label
                    >
                    <label v-else for="contraseña">Modificar contraseña</label>
                    <input
                        type="text"
                        class="form-control"
                        id="contraseña"
                        v-model="form.contrasena"
                        @input="validarInput"
                        :class="error.contrasena"
                    />
                    <small id="emailHelp" class="form-text text-muted"
                        >*Mínimo 8 caracteres, incluido al menos una letra
                        minúscula, una letra mayúscula, un dígito y un
                        símbolo.</small
                    >
                    <div
                        class="invalid-vselect"
                        v-if="error.contrasena == 'is-invalid'"
                    >
                        Este campo es obligatorio.
                    </div>
                </div>
                <div class="form-group col-md-4 d-inline-block">
                    <button
                        class="btn boton-generar"
                        @click="generarContrasena"
                    >
                        Generar contraseña
                    </button>
                </div>
            </div>
            <hr />
        </div>
        <template #modal-footer
            ><b-row class="">
                <b-col v-if="!enviandoDatos">
                    <b-button
                        variant="primary"
                        class="boton-no float-left"
                        @click="hideModal"
                        >Cancelar</b-button
                    >

                    <b-button
                        @click="accionSi"
                        variant="primary"
                        v-bind:disabled="deshabilitado"
                        class="boton-si float-right"
                        >Agregar</b-button
                    >
                </b-col>
                <div class="col-12 text-center" v-else>
                    <b-spinner
                        variant="primary"
                        style="width: 3rem; height: 3rem"
                        type="grow"
                    ></b-spinner>
                    <br />
                    <strong>Guardando...</strong>
                </div>
            </b-row></template
        >
    </b-modal>
</template>

<script>
    import axios from "axios";
    export default {
        props: {
            formEditar: null,
            tituloModal: null,
            editarItem: null,
        },
        data() {
            return {
                enviandoDatos: false,
                deshabilitado: false,
                comunasTodas: [],
                checkTodas: "",
                checkTodasRegiones: "",
                show: false,
                accion: false,
                regiones: [],
                comunas: [],
                perfiles: [],
                form: {
                    nombre: "",
                    perfil: [],
                    comuna: [],
                    region: [],
                    telefono: "",
                    email: "",
                    contrasena: "",
                    idUsuario: "",
                },
                error: {
                    total: 0,
                    nombre: "",
                    perfil: [],
                    comuna: [],
                    region: [],
                    telefono: "",
                    email: "",
                    contrasena: "",
                    idUsuario: "",
                },
            };
        },

        methods: {
            todasLasRegiones() {
                if (this.checkTodasRegiones) {
                    this.form.region = this.regiones;
                } else {
                    this.form.region = [];
                }
            },
            todasLasComunas() {
                if (this.checkTodas) {
                    this.form.comuna = this.comunasTodas;
                } else {
                    this.form.comuna = [];
                }
            },
            editar() {
                if (this.editarItem) {
                    this.form.nombre = this.formEditar.usua_nombre;
                    this.form.email = this.formEditar.usua_correo;
                    this.form.telefono = this.formEditar.usua_telefono;
                    this.form.perfil = this.formEditar.tipoPerfil;
                    this.form.region = this.formEditar.region;
                    this.form.comuna = this.formEditar.comuna;
                }
            },
            generarContrasena() {
                const minus = "abcdefghijklmnñopqrstuvwxyz";
                const mayus = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

                let contraseña = "";
                for (let i = 0; i < 8; i++) {
                    let eleccion = Math.floor(Math.random() * 3 + 1);
                    if (eleccion == 1) {
                        let caracter1 = minus.charAt(
                            Math.floor(Math.random() * minus.length)
                        );
                        contraseña += caracter1;
                    } else if (eleccion == 2) {
                        const caracter2 = mayus.charAt(
                            Math.floor(Math.random() * mayus.length)
                        );
                        contraseña += caracter2;
                    } else {
                        let num = Math.floor(Math.random() * 10);
                        contraseña += num;
                    }
                }

                this.form.contrasena = contraseña + ".";

                this.validarInput();
            },
            obtenerRegiones() {
                axios
                    .get(this.$root.urlApi + "regiones/listar")
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
                        this.regiones = res.data.data;
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
            obtenerComunas() {
                axios
                    .get(this.$root.urlApi + "comunas")
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
                        this.comunas = res.data.data;
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
            obtenerTipoPerfil() {
                axios
                    .get(this.$root.urlApi + "usuarios/listarTipoPerfil")
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
                        this.perfiles = res.data.data;
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
            filtro() {
                this.validarInput();
                this.form.comuna = "";
                this.checkTodas = "";
            },
            filtroComunas() {
                var options = this.comunas;
                var array = [];
                var arrayComuna = [];
                if (this.form.region != null) {
                    this.form.region.forEach((region) => {
                        array.push(region.reg_id);
                    });
                    arrayComuna = options.filter((o) =>
                        array.includes(o.idRegion)
                    );
                }
                this.comunasTodas = arrayComuna;
                return arrayComuna;
            },
            hideModal() {
                this.$refs["modal"].hide();
            },
            validarInput() {
                let regexPwd =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%.*"?&])([A-Za-z\d#$@!%&*?¡"+,.:;='^|~_()¿{}[]\-]|[^ ])+$/;
                let reg =
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.error.total = 0;
                if (!this.form.nombre) {
                    this.error.total++;
                    this.error.nombre = "is-invalid";
                } else {
                    this.error.nombre = "is-valid";
                }
                if (!this.form.telefono) {
                    this.error.total++;
                    this.error.telefono = "is-invalid";
                } else {
                    this.error.telefono = "is-valid";
                }
                if (this.form.perfil.length < 1) {
                    this.error.total++;
                    this.error.perfil = "is-invalid";
                } else {
                    this.error.perfil = "is-valid";
                }
                if (this.form.region.length < 1) {
                    this.error.total++;
                    this.error.region = "is-invalid";
                } else {
                    this.error.region = "valid";
                }
                if (this.form.comuna.length < 1) {
                    this.error.total++;
                    this.error.comuna = "is-invalid";
                } else {
                    this.error.comuna = "is-valid";
                }
                if (!this.form.email || !reg.test(this.form.email)) {
                    this.error.email = "is-invalid";
                    this.error.total++;
                } else {
                    this.error.email = "is-valid";
                }
                if (!this.editarItem) {
                    if (
                        regexPwd.test(this.form.contrasena) &&
                        this.form.contrasena.length > 7
                    ) {
                        this.error.contrasena = "is-valid";
                    } else {
                        this.error.total++;
                        this.error.contrasena = "is-invalid";
                    }
                }
                if (this.error.total > 0) {
                    return false;
                } else {
                    return true;
                }
            },
            accionSi() {
                this.$emit("accionAgregar", this.form);
                if (!this.editarItem) {
                    if (this.validarInput()) {
                        this.enviandoDatos = true;
                        axios
                            .post(
                                this.$root.urlApi + "usuarios/agregar",
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
                                this.deshabilitado = true;
                                this.$refs["modal"].hide();
                                this.$parent.actualizaTabla();
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
                                this.enviandoDatos = false;
                            })
                            .catch((res) => {
                                this.deshabilitado = true;
                                if (res.response.data.codigo === 1000) {
                                    this.$toastr.Add({
                                        msg: res.response.data.error,
                                        timeout: 5000,
                                        position: "toast-top-right",
                                        type: "error",
                                        preventDuplicates: true,
                                        style: {
                                            width: "750px",
                                            border: "2px solid #57CC9D",
                                            top: "50px",
                                            right: "30px",
                                        },
                                    });
                                } else {
                                    this.$toastr.Add({
                                        msg: "¡Problemas en el camino!",
                                        timeout: 5000,
                                        position: "toast-top-right",
                                        type: "error",
                                        preventDuplicates: true,
                                        style: {
                                            width: "750px",
                                            border: "2px solid #57CC9D",
                                            top: "50px",
                                            right: "30px",
                                        },
                                    });
                                }
                                this.enviandoDatos = false;
                            });
                    }
                } else {
                    if (this.validarInput()) {
                        this.form.idUsuario = this.formEditar.usua_id;
                        this.enviandoDatos = true;
                        axios
                            .put(
                                this.$root.urlApi + "usuarios/editar",
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
                                this.deshabilitado = true;
                                this.$refs["modal"].hide();
                                this.$parent.actualizaTabla();
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
                                this.enviandoDatos = false;
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
                                this.enviandoDatos = false;
                            });
                    }
                }
            },
        },
        mounted() {
            this.editar();
        },
        created() {
            this.obtenerRegiones();
            this.obtenerComunas();
            this.obtenerTipoPerfil();
        },
    };
</script>

<style scoped>
    @import "../../../src/assets/tooltipPerfil.css";
    .vs__selected-options {
        min-height: 32px !important;
    }
    .vs__selected-options {
        flex-wrap: nowrap;
        max-width: calc(
            100% - 25px
        ); /* change this to `- 40px` if you're supporting a `clearable` field; I was not */
    }

    .vs__selected {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
        overflow: hidden;
    }
    @media (max-width: 991px) {
        .boton-generar {
            position: inherit !important;
            bottom: 0;
        }
    }
    .boton-generar {
        margin-top: 1.85rem;
        bottom: 0;
        color: #fff;
        background: #48759b 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 4px;
        opacity: 1;
    }
    .boton-generar:hover {
        color: white;
        -webkit-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -ms-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.1);
    }
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
    /* /deep/ #modal-agregar {
        top: 10%;
    } */
    @media (max-width: 990px) {
        /deep/ #modal-agregar {
            top: 0%;
        }
        /deep/ #modal-agregar {
            width: 85%;
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
