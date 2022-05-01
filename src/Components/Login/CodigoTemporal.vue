<template>
    <b-container class="container-formulario-login">
        <b-row class="justify-content-md-center">
            <b-col class="formularioRestablecer">
                <b-row>
                    <b-col><h3 class="c-temporal">Código temporal</h3></b-col>
                </b-row>
                <b-row class="txt-rec mt-5">
                    <b-col class="texto-recuperar"
                        ><p>
                            Ingresa el código temporal que recibiste por correo
                            electrónico para reestablecer contraseña.
                        </p></b-col
                    >
                </b-row>
                <b-row class="f-usuario">
                    <b-col
                        v-if="error.confirmacion"
                        cols="12"
                        class="error-login"
                        md="12"
                    >
                        <i class="pe-7s-close"></i>{{ error.mensaje }}
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group
                            label="Código"
                            label-for="input-1"
                            class="label-email-recuperar"
                        >
                            <b-form-input
                                id="input-1"
                                class="input-recuperar"
                                v-model="form.codigo"
                                type="text"
                                placeholder="Klh78"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="r-contrasena text-center div-pwd-recuperar mt-5">
                    <b-col>
                        <b-button
                            @click="enviarCodigo"
                            variant="primary"
                            class="btn-enviar-recuperar float-left"
                            >Enviar código</b-button
                        >
                        <b-button
                            @click="cancelar"
                            variant="primary"
                            class="btn-cancelar-recuperar float-right"
                            >Cancelar</b-button
                        >
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                form: {
                    codigo: "",
                },
                error: {
                    mensaje: "",
                    confirmacion: false,
                },
                datosUsuario: "",
                codigoTemp: true,
            };
        },
        methods: {
            asignacionDatosUsuario() {
                if (localStorage.getItem("dataUser")) {
                    this.datosUsuario = localStorage.getItem("dataUser");
                    this.datosUsuario = JSON.parse(this.datosUsuario);
                }
            },
            cancelar() {
                this.$router.replace("/recuperar");
            },
            enviarCodigo() {
                let datos = {
                    id: this.datosUsuario.usua_id,
                    codigo: this.form.codigo,
                };
                axios
                    .post(this.$root.urlApi + "recuperar/codigo", datos)
                    .then(() => {
                        this.error.confirmacion = false;
                        this.codigoTemp = false;
                        this.$emit("codigoTemp", this.codigoTemp);
                        this.$toastr.Add({
                            msg: "¡ El código de recuperación fue validado exitosamente !",
                            timeout: 5000,
                            position: "toast-top-right",
                            type: "success",
                            preventDuplicates: true,
                            style: {
                                backgroundColor: "green",
                                width: "750px",
                                border: "2px solid #57CC9D",
                            },
                        });
                    })
                    .catch(() => {
                        this.error.confirmacion = true;
                        this.error.mensaje =
                            "El código no coincide con nuestros registros, verifícalo e intenta nuevamente";
                    });
            },
        },
        created() {
            this.asignacionDatosUsuario();
        },
    };
</script>

<style scoped>
    @media (max-width: 360px) {
        .f-usuario {
            margin-top: 0vh !important;
        }
        .txt-rec {
            margin-top: 0vh !important;
        }
    }
    .c-temporal {
        text-align: left;
        letter-spacing: 0.54px;
        color: #4a4a4a;
        opacity: 1;
    }
    .texto-recuperar {
        width: 355px;
        height: 47px;
    }
    .div-pwd-recuperar {
        width: 355px !important;
    }
    .formulario {
        bottom: 213px;
    }
    .input-recuperar {
        width: 355px;
        height: 47px;
        border: 1px solid #5b5b5b;
        border-radius: 4px;
        opacity: 1;
    }
    .label-email-recuperar {
        font-size: 15px;
    }
    .btn-enviar-recuperar {
        width: 138px;
        height: 43px;
        background: #008ca4 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 7px;
        opacity: 1;
    }
    .btn-cancelar-recuperar {
        width: 154px;
        height: 42px;
        background: #888888 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 7px;
        opacity: 1;
    }
</style>
