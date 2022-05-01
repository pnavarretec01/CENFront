<template>
    <div id="app">
        <transition name="fade" mode="out-in" v-if="!auth">
            <router-view></router-view>
        </transition>
        <component :is="layout" v-if="auth">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </component>
    </div>
</template>

<script>
    import Login from "./Components/Login.vue";
    const default_layout = "default";
    import axios from "axios";

    export default {
        data() {
            return {
                usuario: "",
                auth: false,
                apiUrl: process.env.VUE_APP_SERVICE_VARIABLE,
                form: {
                    usua_correo: "leña@gmail.com",
                    password: "Prueba1.",
                },
            };
        },
        components: { Login },
        computed: {
            layout() {
                return (this.$route.meta.layout || default_layout) + "-layout";
            },
        },
        created() {
            if (!localStorage.getItem("token")) {
                this.auth = false;
            } else {
                this.auth = true;
            }
        },
    };
</script>

<style lang="scss">
    @media screen and (min-width: 640px) {
        .mapboxgl-ctrl-geocoder {
            width: 25rem !important;
        }
    }
    .mapboxgl-ctrl-attrib.mapboxgl-compact {
        display: none !important;
    }
    .mapboxgl-ctrl-bottom-left {
        display: none !important;
    }
    @import "assets/base.scss";
</style>
