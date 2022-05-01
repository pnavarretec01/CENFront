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
                            <formulario-recuperar-contrasena></formulario-recuperar-contrasena>
                        </b-col>
                    </b-row>
                </div>
            </div>
            <span class="fas fa-times"></span>
        </div>
    </div>
</template>

<script>
    import logo from "../../assets/static/media/logo.png";
    import FormularioRecuperarContrasena from "../../Components/Login/FormularioRecuperarContrasena.vue";
    export default {
        components: { FormularioRecuperarContrasena },
        data() {
            return {
                logoImagen: logo,
            };
        },
    };
</script>

<style lang="scss">
    @import "./../../assets/Application/login/base.scss";
    @media (max-width: 375px) {
        .div-cont-form-rec {
            margin-top: 0vh !important;
        }
    }

    .divLogo-recuperar {
        margin-bottom: 2rem;
    }
    @media (max-width: 990px) {
        .divLogo-recuperar {
            margin-bottom: 0px;
        }
    }
</style>
