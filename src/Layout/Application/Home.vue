<template>
    <div>
        <div>
            <div>
                <strong>{{ this.fecha }}</strong>
            </div>
            <div class="mt-5">
                <h2 class="titulo">Bienvenido/a al portal de administración de Calefacción en Línea</h2>
            </div>
        </div>
        <div class="mt-5">
            <!-- <cards></cards> -->
            <b-card class="main-card mb-4">
                <h5 class="titulo-contenedor-home">
                    Seleccione un módulo
                </h5>
                <card-home></card-home>
            </b-card>
        </div>
    </div>
</template>

<script>
    import CardHome from "../../Components/Home/CardHome.vue";
    export default {
        components: { CardHome },
        data() {
            return {
                fecha: "",
            };
        },
        methods: {
            obtieneFecha() {
                let date = new Date();
                let day = `0${date.getDate()}`.slice(-2);
                let month = `0${date.getMonth() + 1}`.slice(-2);
                let year = date.getFullYear();
                this.fecha = `${day}/${month}/${year}`;
            },
        },
        created() {
            this.obtieneFecha();
        },
    };
</script>
<style scoped>
    .contenedor-header {
        background: #f8fafb 0% 0% no-repeat padding-box;
        opacity: 0.8;
        
    }
    .titulo-contenedor-home {
        font: normal normal medium 18px/22px Roboto;
        text-align: left;
        font-size: 18px;
        letter-spacing: 0.36px;
        color: #4a4a4a;
        opacity: 1;
        font-weight: 600;
    }
    .wrapper {
        background-color: #fff;
        box-sizing: border-box;
        padding: 2%;
    }
</style>
