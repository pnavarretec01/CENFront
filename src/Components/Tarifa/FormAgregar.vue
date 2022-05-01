<template>
    <div>
        <h5 class="card-title">
            Información General para ingresar nueva tarifa eléctrica
        </h5>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputRegion">Región</label>
                <v-select
                    :options="regiones"
                    label="nombre"
                    placeholder="Seleccionar"
                    @input="filtro($event)"
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
            <div class="form-group col-md-6">
                <label for="inputComuna">Comuna</label>
                <v-select
                    :options="filtroComunas()"
                    label="nombre"
                    placeholder="Seleccionar"
                    v-model="form.comuna"
                    :class="error.comuna"
                    @input="envioDatos"
                    ><template #no-options="">
                        Selecciona una región.
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
            <div class="form-group col-md-6">
                <label for="beneficio">Beneficio URL</label>
                <input
                    type="text"
                    class="form-control"
                    maxlength="200"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    id="beneficio"
                    placeholder="Escriba"
                    v-model="form.beneficio"
                    :class="error.beneficio"
                    @input="envioDatos"
                />
                <div
                    class="invalid-feedback"
                    v-if="error.beneficio == 'is-invalid'"
                >
                    Este campo es obligatorio.
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="info">Información URL</label>
                <input
                    type="text"
                    maxlength="200"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    class="form-control"
                    id="info"
                    placeholder="Escriba"
                    v-model="form.informacion"
                    :class="error.informacion"
                    @input="envioDatos"
                />
                <div
                    class="invalid-feedback"
                    v-if="error.informacion == 'is-invalid'"
                >
                    Este campo es obligatorio.
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="mensaje">Mensaje tarifario</label>
                <textarea
                    class="form-control"
                    id="mensaje"
                    maxlength="200"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    rows="3"
                    placeholder="Escriba aquí"
                    v-model="form.mensaje"
                    :class="error.mensaje"
                    @input="envioDatos"
                ></textarea>
                <div
                    class="invalid-feedback"
                    v-if="error.mensaje == 'is-invalid'"
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
        components: {},
        props: {
            formEditar: null,
        },
        data() {
            return {
                regiones: [],
                comunas: [],
                comunaSelect: "",
                form: {
                    comuna: [],
                    region: [],
                    beneficio: "",
                    informacion: "",
                    mensaje: "",
                },
                error: {
                    total: 0,
                    comuna: "",
                    region: "",
                    beneficio: "",
                    informacion: "",
                    mensaje: "",
                },
            };
        },

        methods: {
            editar() {
                if (this.formEditar) {
                    this.form.beneficio = this.formEditar.tari_url;
                    this.form.informacion = this.formEditar.tari_informacion;
                    this.form.mensaje = this.formEditar.tari_mensaje;
                    this.form.comuna = this.formEditar.comuna;
                    this.form.region = this.formEditar.region;
                }
            },
            obtenerRegiones() {
                axios
                    .get(this.$root.urlApi + "regiones")
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
            filtro(e) {
                this.form.comuna = "";
            },
            filtroComunas() {
                var options = this.comunas;
                if (this.form.region != null) {
                    var datos = options.filter(
                        (o) => o.idRegion == this.form.region.id
                    );
                    return datos;
                }
                return [];
            },
            envioDatos() {
                this.error.total = 0;
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
                    this.error.comuna = "valid";
                }
                if (!this.form.beneficio) {
                    this.error.total++;
                    this.error.beneficio = "is-invalid";
                } else {
                    this.error.beneficio = "is-valid";
                }
                if (!this.form.informacion) {
                    this.error.total++;
                    this.error.informacion = "is-invalid";
                } else {
                    this.error.informacion = "is-valid";
                }
                if (!this.form.mensaje) {
                    this.error.total++;
                    this.error.mensaje = "is-invalid";
                } else {
                    this.error.mensaje = "is-valid";
                }

                if (this.error.total > 0) {
                    return false;
                } else {
                    this.$emit("formAgregar", this.form);
                    return true;
                }
            },
        },
        created() {
            this.editar();
            this.obtenerRegiones();
            this.obtenerComunas();
        },
    };
</script>

<style>
    @media (max-width: 990px) {
        .boton-geolocalizar {
            position: inherit !important;
            bottom: 0;
        }
    }
    .boton-geolocalizar {
        position: absolute;
        bottom: 0;
        color: #fff;
        background: #48759b 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 4px;
        opacity: 1;
    }
    .boton-geolocalizar:hover {
        color: white;
        -webkit-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -ms-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.1);
    }
    .vs__selected-options {
        min-height: 32px !important;
    }
</style>
