<template>
    <div class="centrar">
        <img class="float-left" width="50vh" :src="logo" />
        <h6 class="float-right ml-2 mt-2">Calefacción en Línea</h6>
    </div>
</template>

<script>
import logo from "../../assets/static/media/logo.png";
    export default {
        data() {
            return {
                logo: logo,
            }
        },
    };
</script>

<style></style>
