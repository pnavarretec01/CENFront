<template>
    <div class="div-contenedor">
        <div class="body d-md-flex align-items-center justify-content-between">
            <div class="div-cont-form-rec box-1 mt-md-0 mt-5">
                <img :src="logoImagen" />
                <div class="mt-3">
                    <div class="centrar">
                        <h3>Calefacción</h3>
                    </div>
                    <div class="centrar">
                        <h3>en Línea</h3>
                    </div>
                </div>
            </div>
            <div class="box-2 d-flex flex-column h-100">
                <div class="div-cont-form-rec mt-5">
                    <b-row class="row-formulario">
                        <b-col>
                            <formulario-login
                                @restablecerPwd="restablecer = $event"
                            ></formulario-login>
                        </b-col>
                    </b-row>
                </div>
            </div>
            <span class="fas fa-times"></span>
        </div>
    </div>
</template>

<script>
    import FormularioLogin from "../Components/Login/FormularioLogin.vue";
    import logo from "../assets/static/media/logo.png";
    export default {
        components: { FormularioLogin },
        data() {
            return {
                logoImagen: logo,
                restablecer: false,
            };
        },
        methods: {
            restablecerFunc(e) {
                this.restablecer = e;
            },
        },
    };
</script>

<style lang="scss">
    @import "./../assets/Application/login/base.scss";
    @media (max-width: 375px) {
        .div-cont-form-rec {
            margin-top: 0vh !important;
        }
    }
</style>
