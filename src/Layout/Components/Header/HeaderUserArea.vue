<template>
    <div class="d-flex">
        <div class="centrado ml-5">
            <div class="linea-pre-user"></div>
        </div>
        <div
            class="header-btn-lg pr-0 boton-usuario"
            @click="abrirVentanaUsuario"
        >
            <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                        <img
                            width="42"
                            class="rounded-circle"
                            src="@/assets/images/avatars/usuario.png"
                            alt=""
                        />
                    </div>
                    <div class="widget-content-left ml-3 header-user-info mr-5">
                        <div class="widget-heading">Hola</div>
                        <div class="nombre-usuario">{{ nombreUsuario }}</div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div
                class="ventana-usuario"
                v-if="ventanaAbierta"
                v-click-outside="clickExterno"
            >
                <div class="card" style="width: 22rem">
                    <div class="headercard-usaurio">
                        <div
                            class="flecha-ventanausuario"
                            @click="cerrarVentana"
                        >
                            x
                        </div>
                        <div class="col-12">
                            <div class="col-4 float-left pr-0">
                                <img
                                    width="42"
                                    class="rounded-circle"
                                    src="@/assets/images/avatars/usuario.png"
                                    alt=""
                                />
                            </div>
                            <div class="col-8 float-right pl-0">
                                <h5 class="nombre-usuario-ventana">
                                    {{ nombreUsuario }}
                                </h5>
                                <h5
                                    class="cargo-usuario-ventana"
                                    v-if="cargoUsuario == 1"
                                >
                                    Administrador
                                </h5>
                                <h5
                                    class="cargo-usuario-ventana"
                                    v-if="cargoUsuario == 2"
                                >
                                    Regional
                                </h5>
                                <h5
                                    class="cargo-usuario-ventana"
                                    v-if="cargoUsuario == 3"
                                >
                                    Observador
                                </h5>
                                <h5
                                    class="cargo-usuario-ventana"
                                    v-if="cargoUsuario == 4"
                                >
                                    Pellet
                                </h5>
                                <h5
                                    class="cargo-usuario-ventana"
                                    v-if="cargoUsuario == 5"
                                >
                                    Leña
                                </h5>
                                <h5
                                    class="cargo-usuario-ventana"
                                    v-if="cargoUsuario == 6"
                                >
                                    Tarifa Eléctrica
                                </h5>
                                <b-button
                                    v-b-modal.modal-advertencia
                                    @click="showModal = true"
                                    class="btn-cierre"
                                    >Cerrar sesión</b-button
                                >
                            </div>
                        </div>
                    </div>
                    <div class="card-body body-ventana-usuario">
                        <datos></datos>
                    </div>
                </div>
            </div>
        </transition>
        <modal-advertencia
            v-if="showModal"
            :advertenciaCierre="advertenciaCierre"
            @accionAdvertencia="accion($event)"
        ></modal-advertencia>
    </div>
</template>

<script>
    import axios from "axios";
    import datos from "../../../Components/NavBar/DatosNavBar.vue";
    import modalAdvertencia from "../../../Components/Common/ModalAdvertencia.vue";
    export default {
        components: { datos, modalAdvertencia },
        data: () => ({
            cargoUsuario: "",
            ventanaAbierta: false,
            nombreUsuario: "",
            datosUauario: "",
            showModal: false,
            advertenciaCierre:
                "¿Estás seguro que deseas cerrar Bo Calefacción?",
        }),

        methods: {
            accion(e) {
                if (e) {
                    // axios
                    //     .post(this.$root.urlApi + "usuarios/logout")
                    //     .then(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("tipe");
                    localStorage.removeItem("dataUser");
                    location.reload();
                    // })
                    // .catch((res) => {
                    //     this.data.cargando = false;
                    //     this.$toastr.Add({
                    //         msg: res.response.data.error,
                    //         timeout: 5000,
                    //         position: "toast-top-right",
                    //         type: "warning",
                    //         preventDuplicates: true,
                    //         style: {
                    //             width: "750px",
                    //             border: "2px solid #57CC9D",
                    //             top: "50px",
                    //             right: "30px",
                    //         },
                    //     });
                    // });
                } else {
                    this.showModal = false;
                }
            },

            /**
             * funcion que sirve para detectar click fuera del div de la venta
             * de usuario
             */
            clickExterno() {
                this.ventanaAbierta = false;
            },
            abrirVentanaUsuario() {
                if (!this.ventanaAbierta) {
                    this.ventanaAbierta = true;
                } else if (this.ventanaAbierta === true) {
                    this.ventanaAbierta = false;
                }
            },
            cerrarVentana() {
                this.ventanaAbierta = false;
            },
            obtenerUsuario() {
                var usuario = JSON.parse(localStorage.getItem("dataUser"));
                this.nombreUsuario = usuario.usua_nombre;
                this.datosUauario = usuario;
                this.cargoUsuario = localStorage.getItem("tipe");
            },
        },
        mounted() {
            this.obtenerUsuario();
        },
    };
</script>
<style scoped>
    @import "./../../../assets/Application/navBar/estilos.css";
</style>
