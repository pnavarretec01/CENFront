<template>
    <div>
        <h5 class="card-title">Horarios de atención</h5>

        <div class="form-row">
            <div class="col-md-3 mb-3">
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                        >Lunes</label
                    >
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Inicio</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_lunes_inicio"
                        ></vue-timepicker>
                    </div>
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Cierre</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_lunes_cierre"
                        ></vue-timepicker>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3 linea-hor">
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                        >Martes</label
                    >
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Inicio</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_martes_inicio"
                        ></vue-timepicker>
                    </div>
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Cierre</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_martes_cierre"
                        ></vue-timepicker>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3 linea-hor">
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                        >Miércoles</label
                    >
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Inicio</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_miercoles_inicio"
                        ></vue-timepicker>
                    </div>
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Cierre</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_miercoles_cierre"
                        ></vue-timepicker>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3 linea-hor">
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                        >Jueves</label
                    >
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Inicio</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_jueves_inicio"
                        ></vue-timepicker>
                    </div>
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Cierre</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_jueves_cierre"
                        ></vue-timepicker>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-3 mb-3">
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                        >Viernes</label
                    >
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Inicio</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_viernes_inicio"
                        ></vue-timepicker>
                    </div>
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Cierre</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_viernes_cierre"
                        ></vue-timepicker>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3 linea-hor">
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                        >Sábado</label
                    >
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Inicio</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_sabado_inicio"
                        ></vue-timepicker>
                    </div>
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Cierre</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_sabado_cierre"
                        ></vue-timepicker>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3 linea-hor">
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                        >Domingo</label
                    >
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Inicio</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_domingo_inicio"
                        ></vue-timepicker>
                    </div>
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Cierre</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_domingo_cierre"
                        ></vue-timepicker>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3 linea-hor">
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                        >Festivos</label
                    >
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Inicio</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_festivo_inicio"
                        ></vue-timepicker>
                    </div>
                    <div class="col-6">
                        <label class="form-check-label" for="horainicio"
                            >Horario Cierre</label
                        ><br />
                        <vue-timepicker
                            format="HH:mm:ss"
                            id="horainicio"
                            :minute-interval="10"
                            :second-interval="10"
                            @input="envioDatos"
                            v-model="horarios.hrat_festivo_cierre"
                        ></vue-timepicker>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <label for="exampleFormControlTextarea1"
                    >Descripción horarios de atención</label
                >
                <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    maxlength="100"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    rows="3"
                    placeholder="Observaciones"
                    @input="envioDatos"
                    v-model="horarios.hrat_descripcion_horario"
                ></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    import VueTimepicker from "vue2-timepicker";
    export default {
        components: {
            VueTimepicker,
        },
        props: ["formEditar"],
        data() {
            return {
                horarios: {
                    hrat_lunes_inicio: "",
                    hrat_lunes_cierre: "",
                    hrat_martes_inicio: "",
                    hrat_martes_cierre: "",
                    hrat_miercoles_inicio: "",
                    hrat_miercoles_cierre: "",
                    hrat_jueves_inicio: "",
                    hrat_jueves_cierre: "",
                    hrat_viernes_inicio: "",
                    hrat_viernes_cierre: "",
                    hrat_sabado_inicio: "",
                    hrat_sabado_cierre: "",
                    hrat_domingo_inicio: "",
                    hrat_domingo_cierre: "",
                    hrat_festivo_inicio: "",
                    hrat_festivo_cierre: "",
                    hrat_descripcion_horario: "",
                },
                stock: false,
            };
        },

        methods: {
            envioDatos() {
                this.$emit("horarios", this.horarios);
            },
            editar() {
                if (this.formEditar && this.formEditar.horarios) {
                    this.stock = this.formEditar["precioVacio"];
                    this.horarios.hrat_descripcion_horario =
                        this.formEditar.horarios.hrat_descripcion_horario;

                    if (this.formEditar.horarios.hrat_lunes_inicio) {
                        this.horarios.hrat_lunes_inicio =
                            this.formEditar.horarios.hrat_lunes_inicio;
                    } else {
                        this.horarios.hrat_lunes_inicio = "";
                    }
                    if (this.formEditar.horarios.hrat_lunes_cierre) {
                        this.horarios.hrat_lunes_cierre =
                            this.formEditar.horarios.hrat_lunes_cierre;
                    } else {
                        this.horarios.hrat_lunes_cierre = "";
                    }

                    if (this.formEditar.horarios.hrat_martes_inicio) {
                        this.horarios.hrat_martes_inicio =
                            this.formEditar.horarios.hrat_martes_inicio;
                    } else {
                        this.horarios.hrat_martes_inicio = "";
                    }
                    if (this.formEditar.horarios.hrat_martes_cierre) {
                        this.horarios.hrat_martes_cierre =
                            this.formEditar.horarios.hrat_martes_cierre;
                    } else {
                        this.horarios.hrat_martes_cierre = "";
                    }

                    if (this.formEditar.horarios.hrat_miercoles_inicio) {
                        this.horarios.hrat_miercoles_inicio =
                            this.formEditar.horarios.hrat_miercoles_inicio;
                    } else {
                        this.horarios.hrat_miercoles_inicio = "";
                    }
                    if (this.formEditar.horarios.hrat_miercoles_cierre) {
                        this.horarios.hrat_miercoles_cierre =
                            this.formEditar.horarios.hrat_miercoles_cierre;
                    } else {
                        this.horarios.hrat_miercoles_cierre = "";
                    }

                    if (this.formEditar.horarios.hrat_jueves_inicio) {
                        this.horarios.hrat_jueves_inicio =
                            this.formEditar.horarios.hrat_jueves_inicio;
                    } else {
                        this.horarios.hrat_jueves_inicio = "";
                    }
                    if (this.formEditar.horarios.hrat_jueves_cierre) {
                        this.horarios.hrat_jueves_cierre =
                            this.formEditar.horarios.hrat_jueves_cierre;
                    } else {
                        this.horarios.hrat_jueves_cierre = "";
                    }

                    if (this.formEditar.horarios.hrat_viernes_inicio) {
                        this.horarios.hrat_viernes_inicio =
                            this.formEditar.horarios.hrat_viernes_inicio;
                    } else {
                        this.horarios.hrat_viernes_inicio = "";
                    }
                    if (this.formEditar.horarios.hrat_viernes_cierre) {
                        this.horarios.hrat_viernes_cierre =
                            this.formEditar.horarios.hrat_viernes_cierre;
                    } else {
                        this.horarios.hrat_viernes_cierre = "";
                    }

                    if (this.formEditar.horarios.hrat_sabado_inicio) {
                        this.horarios.hrat_sabado_inicio =
                            this.formEditar.horarios.hrat_sabado_inicio;
                    } else {
                        this.horarios.hrat_sabado_inicio = "";
                    }
                    if (this.formEditar.horarios.hrat_sabado_cierre) {
                        this.horarios.hrat_sabado_cierre =
                            this.formEditar.horarios.hrat_sabado_cierre;
                    } else {
                        this.horarios.hrat_sabado_cierre = "";
                    }

                    if (this.formEditar.horarios.hrat_domingo_inicio) {
                        this.horarios.hrat_domingo_inicio =
                            this.formEditar.horarios.hrat_domingo_inicio;
                    } else {
                        this.horarios.hrat_domingo_inicio = "";
                    }
                    if (this.formEditar.horarios.hrat_domingo_cierre) {
                        this.horarios.hrat_domingo_cierre =
                            this.formEditar.horarios.hrat_domingo_cierre;
                    } else {
                        this.horarios.hrat_domingo_cierre = "";
                    }

                    if (this.formEditar.horarios.hrat_festivo_inicio) {
                        this.horarios.hrat_festivo_inicio =
                            this.formEditar.horarios.hrat_festivo_inicio;
                    } else {
                        this.horarios.hrat_festivo_inicio = "";
                    }
                    if (this.formEditar.horarios.hrat_festivo_cierre) {
                        this.horarios.hrat_festivo_cierre =
                            this.formEditar.horarios.hrat_festivo_fin;
                    } else {
                        this.horarios.hrat_festivo_cierre = "";
                    }
                }
            },
        },
        created() {
            this.editar();
        },
    };
</script>

<style>
    .vs__selected-options {
        min-height: 32px !important;
    }
    .vue__time-picker input.display-time {
        width: 95px;
        background: #ffffff 0% 0% no-repeat padding-box;
        border: 1px solid #5b5b5b;
        border-radius: 4px;
        opacity: 1;
    }
    .linea-hor {
        border-left: 1px solid #bcbcbc80;
        height: 90%;
    }
    .vue__time-picker .controls,
    .vue__time-picker .controls > * {
        right: 30px;
    }
</style>
