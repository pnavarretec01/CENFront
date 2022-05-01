<template>
    <div>
        <h5 class="card-title">Información contacto empresarial</h5>
        <div class="form-row">
            <div class="form-group col-md-12">
                <div class="form-row">
                    <div class="col-md-4 mb-3">
                        <label for="nombreCom">Nombre completo</label>
                        <input
                            type="text"
                            class="form-control"
                            id="nombreCom"
                            placeholder="Juan Perez"
                            maxlength="100"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            v-model="form.nombreCompleto"
                            :class="error.nombreCompleto"
                        />
                        <div
                            class="invalid-feedback"
                            v-if="error.nombreCompleto == 'is-invalid'"
                        >
                            Este campo es obligatorio.
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="telefono">Teléfono</label>
                        <input
                            type="number"
                            class="form-control"
                            maxlength="11"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            id="telefono"
                            placeholder="2287644"
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
                    <div class="col-md-4 mb-3">
                        <label for="correo">Correo electrónico</label>
                        <input
                            type="text"
                            class="form-control"
                            id="correo"
                            placeholder="juan.perez@correo.cl"
                            v-model="form.correo"
                            :class="error.correo"
                        />
                        <div
                            class="invalid-feedback"
                            v-if="error.correo == 'is-invalid'"
                        >
                            Ingresa un Correo válido.
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group col-md-12">
                <div class="form-row">
                    <div class="col-md-4 mb-3">
                        <label for="wsp">Whatsapp</label>
                        <input
                            type="number"
                            class="form-control"
                            id="wsp"
                            maxlength="11"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            placeholder="+56"
                            v-model="form.wsp"
                            :class="error.wsp"
                        />
                        <div
                            class="invalid-feedback"
                            v-if="error.wsp == 'is-invalid'"
                        >
                            Este campo es obligatorio.
                        </div>
                    </div>
                    <div class="col-md-8 mb-3">
                        <label for="certificaciones">Certificaciones</label>
                        <input
                            type="text"
                            class="form-control"
                            maxlength="100"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            id="certificaciones"
                            placeholder="Escriba"
                            v-model="form.certificaciones"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputRegion">Tipo de distribución</label>
                <v-select
                    :options="tiposDistribucion"
                    label="tidi_nombre"
                    placeholder="Seleccionar"
                    v-model="form.tipoDistribucion"
                    :class="error.tipoDistribucion"
                    ><template #no-options="">
                        No existen datos en nuestros registros.
                    </template>
                </v-select>
                <div
                    class="invalid-vselect"
                    v-if="error.tipoDistribucion == 'is-invalid'"
                >
                    Este campo es obligatorio.
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="inputComuna">Medios de pago</label>
                <v-select
                    :options="mediosPago"
                    label="timp_nombre"
                    placeholder="Seleccionar"
                    v-model="form.medioPago"
                    :class="error.medioPago"
                    ><template #no-options="">
                        No existen datos en nuestros registros.
                    </template>
                </v-select>
                <div
                    class="invalid-vselect"
                    v-if="error.medioPago == 'is-invalid'"
                >
                    Este campo es obligatorio.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        props: ["formEditar"],
        data() {
            return {
                mediosPago: [],
                tiposDistribucion: [],
                form: {
                    nombreCompleto: "",
                    telefono: "",
                    correo: "",
                    wsp: "",
                    certificaciones: "",
                    tipoDistribucion: "",
                    medioPago: "",
                },
                error: {
                    total: 0,
                    nombreCompleto: "",
                    telefono: "",
                    correo: "",
                    wsp: "",
                    certificaciones: "",
                    tipoDistribucion: "",
                    medioPago: "",
                    correoValid: "",
                },
            };
        },
        methods: {
            editar() {
                if (this.formEditar) {
                    this.form.nombreCompleto =
                        this.formEditar.ptv_nombre_contacto;
                    this.form.telefono = this.formEditar.ptv_telefono_contacto;
                    this.form.correo = this.formEditar.ptv_correo_contacto;
                    this.form.wsp = this.formEditar.ptv_whatsapp;
                    this.form.certificaciones =
                        this.formEditar.ptv_certificaciones;
                    this.form.tipoDistribucion = this.formEditar.distribucion;
                    this.form.medioPago = this.formEditar.medioPago;
                }
            },
            validarCorreo() {},
            envioDatos() {
                let reg =
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.error.total = 0;
                if (!this.form.nombreCompleto) {
                    this.error.total++;
                    this.error.nombreCompleto = "is-invalid";
                } else {
                    this.error.nombreCompleto = "is-valid";
                }
                if (!this.form.telefono) {
                    this.error.total++;
                    this.error.telefono = "is-invalid";
                } else {
                    this.error.telefono = "is-valid";
                }
                if (!this.form.wsp) {
                    this.error.total++;
                    this.error.wsp = "is-invalid";
                } else {
                    this.error.wsp = "is-valid";
                }

                if (!this.form.correo || !reg.test(this.form.correo)) {
                    this.error.correo = "is-invalid";
                    this.error.total++;
                } else {
                    this.error.correo = "is-valid";
                }
                if (this.form.tipoDistribucion.length < 1) {
                    this.error.total++;
                    this.error.tipoDistribucion = "is-invalid";
                } else {
                    this.error.tipoDistribucion = "valid";
                }
                if (this.form.medioPago.length < 1) {
                    this.error.total++;
                    this.error.medioPago = "is-invalid";
                } else {
                    this.error.medioPago = "valid";
                }
                if (this.error.total > 0) {
                    return false;
                } else {
                    this.$emit("infEmpresarial", this.form);
                    return true;
                }
            },
            obtenerMedioPago() {
                axios
                    .get(this.$root.urlApi + "mediosDePago")
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
                        this.mediosPago = res.data.data;
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
            obtenerTiposDistribucion() {
                axios
                    .get(this.$root.urlApi + "tiposDistribucion")
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
                        this.tiposDistribucion = res.data.data;
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
            this.obtenerMedioPago();
            this.obtenerTiposDistribucion();
            this.editar();
        },
    };
</script>

<style></style>
