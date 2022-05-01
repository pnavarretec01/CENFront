<template>
    <b-container class="container-formulario-login">
        <b-row class="justify-content-md-cente">
            <b-col class="formularioRestablecer">
                <b-row>
                    <b-col
                        ><h3 class="c-recuperar">
                            Recuperar contraseña
                        </h3></b-col
                    >
                </b-row>
                <b-row class="txt-rec mt-5">
                    <b-col class="texto-recuperar"
                        ><p>
                            Recibirás instrucciones para obtener una nueva
                            contraseña por correo electrónico.
                        </p></b-col
                    >
                </b-row>
                <b-row class="f-usuario mt-5">
                    <b-col
                        v-if="error.confirmacion"
                        cols="12"
                        class="error-login"
                        md="12"
                    >
                        <i class="pe-7s-close"></i>{{ error.mensaje }}
                    </b-col>
                    <b-col cols="12" md="12">
                        <b-form-group
                            label="Correo electrónico"
                            label-for="input-1"
                            class="label-email-recuperar"
                        >
                            <b-form-input
                                id="input-1"
                                class="input-recuperar"
                                v-model="form.usua_correo"
                                type="email"
                                placeholder="Escriba su correo"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="r-contrasena text-center div-pwd-recuperar mt-4">
                    <b-col>
                        <b-button
                            @click="onSubmit"
                            variant="primary"
                            class="btn-enviar-recuperar float-left"
                            >Enviar</b-button
                        >
                        <b-button
                            @click="cancelarRestablecer"
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
                restablecer: false,
                form: { usua_correo: "" },
                error: {
                    mensaje: "",
                    confirmacion: false,
                },
                datosCreacionCorreo: "",
                datosConCodigo: "",
            };
        },
        methods: {
            cancelarRestablecer() {
                this.restablecer = false;
                this.$router.replace("/login");
                this.$emit("restablecerPwd", this.restablecer);
            },
            onSubmit(event) {
                event.preventDefault();
                if (!this.validarCorreo()) return false;
                axios
                    .post(this.$root.urlApi + "recuperar/contrasena", this.form)
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
                        if (res.data.status) {
                            localStorage.removeItem("token");
                            this.datosCreacionCorreo = res.data.data;
                            localStorage.setItem(
                                "usuario_correo",
                                JSON.stringify(
                                    this.datosCreacionCorreo.usua_correo
                                )
                            );
                            let datos = res.data.data;
                            localStorage.setItem(
                                "dataUser",
                                JSON.stringify(datos)
                            );
                            this.$router.push("/restablecer");
                            this.$toastr.Add({
                                msg: "¡El código de recuperación de contraseña se ha enviado exitosamente!",
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
                        } else {
                            this.error.confirmacion = true;
                            this.error.mensaje = res.data.error;
                            return false;
                        }
                    })
                    .catch((res) => {
                        this.error.confirmacion = true;
                        this.error.mensaje = res.response.data.error;
                        return false;
                    });
            },
            validarCorreo() {
                let reg =
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (
                    !this.form.usua_correo ||
                    !reg.test(this.form.usua_correo)
                ) {
                    this.error.confirmacion = true;
                    this.error.mensaje = "¡Ingrese un correo válido!";
                    return false;
                } else {
                    this.error.confirmacion = false;
                    this.error.mensaje = "";
                    return true;
                }
            },
        },
    };
</script>

<style scoped>
    @media (max-width: 360px) {
        .f-usuario{
            margin-top: 0vh !important;
        }
        .txt-rec{
            margin-top: 0vh !important;
        }
    }
    .c-recuperar {
        text-align: left;
        letter-spacing: 0.54px;
        color: #4a4a4a;
        opacity: 1;
    }
    .texto-recuperar {
        font-size: 16px;
        width: 455px;
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
        width: 118px;
        height: 41px;
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
