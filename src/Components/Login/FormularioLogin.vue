<template>
    <b-container class="container-formulario-login">
        <b-row class="justify-content-md-center">
            <b-col class="formulario">
                <b-row>
                    <b-col><h2 class="">Bienvenido/a</h2></b-col>
                </b-row>
                <b-row class="f-usuario formulario-login">
                    <b-col
                        v-if="error.confirmacion"
                        cols="12"
                        class="error-login"
                        md="12"
                    >
                        <i class="pe-7s-close"></i>{{ error.mensaje }}
                    </b-col>
                    <b-col cols="12" md="12">
                        <b-form-group label="Usuario" label-for="input-1">
                            <b-form-input
                                class="input-login"
                                id="input-1"
                                v-model="form.usua_correo"
                                type="email"
                                placeholder="Usuario"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="12">
                        <b-form-group label="Contraseña" label-for="input-2">
                            <div class="input-wrapper">
                                <b-form-input
                                    class="input-login"
                                    id="input-2"
                                    :type="mostrarPwd"
                                    v-model="form.password"
                                    placeholder="********"
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
                </b-row>
                <b-row class="">
                    <b-col class="float-left"
                        ><input
                            v-model="recordar"
                            class="checkbox-pwd"
                            type="checkbox"
                            value=""
                        />&nbsp;Recordarme</b-col
                    >
                    <b-col
                        class="float-right r-contrasena"
                        @click="restablecerContrasena"
                        >Restablecer contraseña</b-col
                    >
                </b-row>
                <b-col class="col text-center mt-5">
                    <b-button
                        @click="onSubmit"
                        class="boton-login"
                        variant="primary"
                        >Ingresar</b-button
                    >
                </b-col>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                mostrarPwd: "password",
                mostrar: false,
                recordar: "",
                restablecer: false,
                pwd: "",
                form: {
                    usua_correo: "",
                    password: "",
                },
                error: {
                    mensaje: "",
                    confirmacion: false,
                },
            };
        },
        methods: {
            mostrarFuncion() {
                if (this.mostrarPwd != "password") {
                    this.mostrar = false;
                    this.mostrarPwd = "password";
                } else {
                    this.mostrar = true;
                    this.mostrarPwd = "text";
                }
            },
            restablecerContrasena() {
                this.$router.replace("/recuperar");
                this.restablecer = true;
                this.$emit("restablecerPwd", this.restablecer);
            },
            onSubmit(event) {
                event.preventDefault();
                if (!this.validarCorreo()) return false;
                if (!this.validaContrasena()) return false;
                localStorage.removeItem("token");
                axios
                    .post(this.$root.urlApi + "usuarios/inicio", this.form)
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
                            localStorage.setItem("token", res.data.token);
                            //defino header por default para axios
                            axios.defaults.headers.common["Authorization"] =
                                "Bearer " + localStorage.getItem("token");
                            this.login();
                        }
                    })
                    .catch((res) => {
                        localStorage.removeItem("token");
                        this.error.confirmacion = true;
                        this.error.mensaje = res.response.data.error;
                    });
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
                        this.recordarUsuario();
                        localStorage.removeItem("productoIdEditar");
                        localStorage.setItem(
                            "dataUser",
                            JSON.stringify(res.data.data)
                        );
                        localStorage.setItem("tipe", res.data.data.tipe_id);
                        this.$router.push("/home");
                        location.reload();
                    })
                    .catch((res) => {
                        localStorage.removeItem("token");
                        this.error.confirmacion = true;
                        this.error.mensaje = res.response.data.error;
                    });
            },
            recordarUsuario() {
                if (this.recordar) {
                    localStorage.setItem("recordar", "1");
                    localStorage.removeItem("user");
                    localStorage.setItem("user", this.form.usua_correo);
                    localStorage.setItem("pwd", this.form.password);
                }
            },
            traerDatos() {
                let rec = localStorage.getItem("recordar");
                if (rec === "1") {
                    this.form.usua_correo = localStorage.getItem("user");
                    this.form.password = localStorage.getItem("pwd");
                }
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
            validaContrasena() {
                if (!this.form.password) {
                    this.error.confirmacion = true;
                    this.error.mensaje = "¡La contraseña es requerida!";
                    return false;
                } else if (this.form.password.length <= 5) {
                    this.error.confirmacion = true;
                    this.error.mensaje =
                        "¡La contraseña debe tener un mínimo de 6 caracteres!";
                    return false;
                } else {
                    this.error.confirmacion = false;
                    return true;
                }
            },
        },
        created() {
            localStorage.removeItem("token");
            localStorage.removeItem("tipe");
            this.traerDatos();
        },
    };
</script>

<style>
    .input-icon {
        cursor: pointer;
        color: #4a4a4a 0% 0% no-repeat padding-box;
        position: absolute;
        width: 20px;
        height: 20px;
        left: 91%;
        top: 50%;
        transform: translateY(-50%);
    }
    @media (min-width: 990px) {
        .input-icon {
            left: 91%;
        }
    }
    .input-wrapper {
        position: relative;
    }
    .checkbox-pwd {
        cursor: pointer !important;
    }
    .div-boton-entrar {
        width: 148px;
    }
    .boton-login {
        background-color: #003e8d !important;
        border-radius: 4px !important;
        opacity: 1 !important;
        width: 148px;
        height: 42px;
    }
    .boton-login:active {
        background-color: #2e5587a8 !important;
    }
    .input-login {
        width: 355px;
        height: 47px;
        border: 1px solid #5b5b5b;
        border-radius: 4px;
        opacity: 1;
    }
    .formulario-login {
        max-width: 480px;
    }
</style>
