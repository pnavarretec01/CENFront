<template>
    <b-container class="container-formulario-login">
        <b-row class="justify-content-md-center">
            <b-col class="">
                <b-row>
                    <b-col
                        ><h2 class="">
                            Reestablecer contraseña
                        </h2></b-col
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
                    <b-col cols="12" md="12">
                        <b-form-group
                            label="Escriba contraseña nueva"
                            label-for="input-1"
                            class="label-email-recuperar"
                        >
                            <div class="input-wrapper">
                                <b-form-input
                                    class="input-recuperar"
                                    v-model="pwd"
                                    :type="mostrarPwd"
                                    placeholder="**********"
                                    required
                                ></b-form-input>
                                <font-awesome-icon
                                    v-if="!mostrar"
                                    @click="mostrarFuncion"
                                    icon="eye"
                                    class="input-icon"
                                />
                                <font-awesome-icon
                                    v-else
                                    @click="mostrarFuncion"
                                    icon="eye-slash"
                                    class="input-icon"
                                />
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="12">
                        <b-form-group
                            label="Repita contraseña nueva"
                            label-for="input-1"
                            class="label-email-recuperar"
                        >
                            <div class="input-wrapper">
                                <b-form-input
                                    class="input-recuperar"
                                    v-model="repitePwd"
                                    :type="mostrarPwdRepite"
                                    placeholder="**********"
                                    required
                                ></b-form-input>
                                <font-awesome-icon
                                    v-if="!mostrarRepite"
                                    @click="mostrarFuncionRepite"
                                    icon="eye"
                                    class="input-icon"
                                />
                                <font-awesome-icon
                                    v-else
                                    @click="mostrarFuncionRepite"
                                    icon="eye-slash"
                                    class="input-icon"
                                />
                            </div>
                        </b-form-group>
                    </b-col>

                    <b-row class="ml-1 check-recuperar">
                        <b-col class="float-left"
                            ><input
                                v-model="cerrarSesion"
                                class="checkbox-pwd"
                                type="checkbox"
                                value=""
                            />&nbsp;Cerrar sesión para todos los inicios de
                            sesión activos, excepto el actual</b-col
                        >
                    </b-row>

                    <b-col class="mt-4" cols="12" md="12">
                        <font-awesome-icon icon="lock" /><label class="ml-1"
                            >Contraseña <strong>nueva</strong> debe cumplir con
                            lo siguiente:
                        </label>
                        <p class="indicacion-pwd">
                            - Incluir al menos un número o símbolo
                        </p>
                        <p class="indicacion-pwd">
                            - Incluir caracteres mayúsculas y minúsculas
                        </p>
                        <p class="indicacion-pwd">
                            - Debe contener al menos 8 caracteres
                        </p>
                    </b-col>
                </b-row>
                <b-row class="btn-restablecer text-center div-pwd-recuperar">
                    <b-col>
                        <b-button
                            @click="restablecer"
                            variant="primary"
                            class="btn-enviar-restablecer float-left"
                            >Reestablecer contraseña</b-button
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
                    usua_correo: "",
                    password: "",
                },
                cerrarSesion: "",
                mostrar: false,
                mostrarRepite: false,
                mostrarPwd: "password",
                mostrarPwdRepite: "password",
                pwd: "",
                repitePwd: "",
                error: {
                    mensaje: "",
                    confirmacion: false,
                },
                correoUsuario: "",
            };
        },
        methods: {
            getDatos() {
                if (localStorage.getItem("usuario_correo")) {
                    this.correoUsuario = localStorage.getItem("usuario_correo");
                    localStorage.removeItem("usuario_correo");
                    this.correoUsuario = this.correoUsuario.replace('"', "");
                    this.correoUsuario = this.correoUsuario.replace('"', "");
                    localStorage.setItem("usuario_correo", this.correoUsuario);
                }
            },
            cancelar() {
                if (localStorage.getItem("dataUser")) {
                    this.datosUsuario = localStorage.getItem("dataUser");
                }
                this.$router.replace("/recuperar");
            },
            mostrarFuncion() {
                if (this.mostrarPwd != "password") {
                    this.mostrar = false;
                    this.mostrarPwd = "password";
                } else {
                    this.mostrar = true;
                    this.mostrarPwd = "text";
                }
            },
            mostrarFuncionRepite() {
                if (this.mostrarPwdRepite != "password") {
                    this.mostrarRepite = false;
                    this.mostrarPwdRepite = "password";
                } else {
                    this.mostrarRepite = true;
                    this.mostrarPwdRepite = "text";
                }
            },
            validarContrasena() {
                let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%.*"?&])([A-Za-z\d#$@!%&*?¡"+,.:;='^|~_()¿{}[]\-]|[^ ])+$/;
                if (regex.test(this.pwd)) {
                    return true;
                } else {
                    this.error.confirmacion = true;
                    this.error.mensaje =
                        "¡Asegurese de cumplir con todas las condiciones necesarias para generar su nueva contraseña!";
                    return false;
                }
            },
            restablecer() {
                if (this.pwd.length < 8) {
                    this.error.confirmacion = false;
                    this.error.confirmacion = true;
                    this.error.mensaje =
                        "¡La contraseña debe contener al menos 8 caracteres";
                    return false;
                } else if (this.pwd != this.repitePwd) {
                    this.error.confirmacion = false;
                    this.error.confirmacion = true;
                    this.error.mensaje = "¡Las contraseñas no coindicen!";
                    return false;
                } else {
                    this.form.usua_correo = this.correoUsuario;
                    this.form.password = this.pwd;
                    if (!this.validarContrasena()) return false;
                    axios
                        .post(
                            this.$root.urlApi + "recuperar/setContrasenaNueva",
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
                            if (res.data.status) {
                                axios
                                    .post(
                                        this.$root.urlApi + "usuarios/inicio",
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
                                        if (res.data.token) {
                                            localStorage.setItem(
                                                "token",
                                                res.data.token
                                            );
                                            //defino header por default para axios
                                            axios.defaults.headers.common[
                                                "Authorization"
                                            ] =
                                                "Bearer " +
                                                localStorage.getItem("token");
                                            this.login();
                                        }
                                    })
                                    .catch(() => {
                                        this.error.confirmacion = true;
                                        this.error.mensaje =
                                            "Los datos ingresados no coinciden con nuestros registros";
                                        return false;
                                    });
                            }
                        })
                        .catch(() => {});
                }
            },
            login() {
                axios
                    .post(this.$root.urlApi + "usuarios/login", this.form)
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
                        localStorage.setItem("pwd", this.form.password);
                        localStorage.removeItem("dataUser");
                        localStorage.removeItem("pwd");
                        this.$router.push("/home");
                        localStorage.setItem(
                            "dataUser",
                            JSON.stringify(res.data.data)
                        );
                        localStorage.setItem("tipe", res.data.data.tipe_id);
                        location.reload();
                    })
                    .catch((res) => {
                        localStorage.removeItem("token");
                        this.error.confirmacion = true;
                        this.error.mensaje = res.response.data.error;
                    });
            },
        },
        created() {
            this.getDatos();
        },
    };
</script>

<style scoped>
    @media (max-width: 990px) {
        
    }
    .formularioRestablecer {
        margin-top: 85px;
    }
    .indicacion-pwd {
        color: red;
    }
    .input-wrapper {
        position: relative;
        width: 271px;
    }
    .input-icon {
        cursor: pointer;
        color: #4a4a4a 0% 0% no-repeat padding-box;
        position: absolute;
        width: 20px;
        height: 20px;
        left: 320px;
        top: 50%;
        transform: translateY(-50%);
    }
    .div-pwd-recuperar {
        width: 400px !important;
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
    .check-recuperar {
        width: 355px;
        height: 47px;
    }
    .label-email-recuperar {
        font-size: 15px;
    }
    .btn-enviar-restablecer {
        width: 200px;
        height: 43px;
        background: #008ca4 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 7px;
        opacity: 1;
    }
    .btn-cancelar-recuperar {
        width: 150px;
        height: 42px;
        background: #888888 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 7px;
        opacity: 1;
    }
</style>
