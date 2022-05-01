<template>
    <div class="form-row div-validada centrar">
        <div class="col-4">
            <label for="validada">¿Información validada?</label>
            <br />
            <div
                id="validada"
                class="custom-control custom-radio custom-control-inline"
            >
                <input
                    type="radio"
                    id="radiovalidadasi"
                    name="radiovalidadasi"
                    class="custom-control-input"
                    value="1"
                    v-model="form.validada"
                    :class="error.validada"
                    @change="envioDatos"
                />
                <label class="custom-control-label" for="radiovalidadasi"
                    >Si</label
                >
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input
                    type="radio"
                    id="radiovalidadano"
                    name="customRadioInline1"
                    class="custom-control-input"
                    value="0"
                    v-model="form.validada"
                    :class="error.validada"
                    @change="envioDatos"
                />
                <label class="custom-control-label" for="radiovalidadano"
                    >No</label
                >
            </div>
            <div class="invalid-vselect" v-if="error.validada == 'is-invalid'">
                Este campo es obligatorio.
            </div>
        </div>
        <div class="col-8">
            <label for="exampleFormControlTextarea1">Observaciones</label>
            <textarea
                maxlength="240"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
                placeholder="Escribir..."
                v-model="form.observacionesGeneral"
                :class="error.observacionesGeneral"
                @input="envioDatos"
            ></textarea>
            <div
                class="invalid-feedback"
                v-if="error.observacionesGeneral == 'is-invalid'"
            >
                Este campo es obligatorio.
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["formEditar"],
        data() {
            return {
                form: {
                    validada: 1,
                    observacionesGeneral: "",
                },
                error: {
                    total: 0,
                    validada: "",
                    observacionesGeneral: "",
                },
            };
        },
        methods: {
            envioDatos() {
                this.error.total = 0;
                if (!this.form.observacionesGeneral) {
                    this.error.total++;
                    this.error.observacionesGeneral = "is-invalid";
                } else {
                    this.error.observacionesGeneral = "is-valid";
                }
                // if (this.form.validada == "") {
                //     this.error.total++;
                //     this.error.validada = "is-invalid";
                // } else {
                //     this.error.validada = "is-valid";
                // }
                if (this.error.total > 0) {
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
                    return false;
                } else {
                    this.$emit("infValidada", this.form);
                    return true;
                }
            },
            editar() {
                if (this.formEditar) {
                    this.form.validada = this.formEditar.ptv_informacion_valida;
                    this.form.observacionesGeneral =
                        this.formEditar.ptv_observacion;
                }
            },
        },
        created() {
            this.editar();
        },
    };
</script>

<style></style>
