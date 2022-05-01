<template>
    <b-modal
        id="modal-advertencia"
        header-class="headermodal"
        footer-class="footermodal"
    >
        <template #modal-header
            ><button
                type="button"
                @click="accionNo"
                class="close xCierre"
                data-dismiss="modal"
            >
                &times;
            </button></template
        >
        <div class="body-advertencia">
            <h6 class="mensajeadvertencia">{{ mensaje }}</h6>
            <hr />
        </div>
        <template #modal-footer
            ><b-row class="">
                <b-col>
                    <b-button
                        variant="primary"
                        class="boton-si float-left"
                        @click="accionSi"
                        >Si</b-button
                    >

                    <b-button
                        @click="accionNo"
                        variant="primary"
                        class="boton-no float-right"
                        >No</b-button
                    >
                </b-col>
            </b-row></template
        >
    </b-modal>
</template>

<script>
    export default {
        data() {
            return {
                mensaje: "¿Estas seguro que deseas cerrar administración Calefacción?",
                accion: false,
            };
        },
        methods: {
            accionSi() {
                this.accion = true;
                this.$emit("accionAdvertencia", this.accion);
            },
            accionNo() {
                this.accion = false;
                this.$emit("accionAdvertencia", this.accion);
            },
        },
    };
</script>

<style scoped>
    /deep/ .modal.show .modal-dialog {
        border-radius: 25px !important;
    }
    .xCierre {
        color: #000000 !important;
    }
    .boton-si {
        --y: 50px;
        --n: 2; /*numero de inputs, en este caso 2*/
        margin-right: var(--y);
        --mitad: calc((var(--x) * var(--n)) / 2);
        /* o la suma de todos los inputs dividida entre 2*/
        --mitad-y: calc(var(--y) / 2);
        /* o  la mitad del margen de separación entre los inputs*/
        margin-left: calc(50% - (var(--mitad) + var(--mitad-y)));
        width: 116px;
        height: 34px;
        background: #57cc9d 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029 !important;
        border-radius: 4px !important;
        opacity: 1 !important;
        border: none;
        color: #fff;
    }
    .boton-no {
        box-sizing: border-box;
        margin: auto;
        /*cambia block por inline-block*/
        display: inline-block;
        --x: 150px;
        width: var(--x);
        height: 40px;
        width: 116px;
        height: 34px;
        background: #ff7850 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029 !important;
        border-radius: 4px !important;
        opacity: 1 !important;
        border: none;
        color: #fff;
    }
    /deep/.modal-content {
        box-shadow: 0px 6px 10px #00000061;
        border: none;
        background: #fff;
        -webkit-border-radius: 25px !important;
        -moz-border-radius: 25px !important;
        border-radius: 25px !important;
    }
    /deep/.modal-backdrop {
        background-color: #4040407a !important;
    }
    /deep/ #modal-advertencia {
        top: 40%;
    }
    .mensajeadvertencia {
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
    }
    .body-advertencia {
        text-align: center;
    }
    /deep/ .headermodal {
        min-height: 1px;
        padding: 5px 10px 10px 10px;
        margin: 0px 0;
        margin-left: 0px auto;
        margin-right: 0px auto;
        margin-top: 0px auto;
        margin-bottom: 0px auto;
        background: #fff;
        border: none;
        border-radius: 50px !important;
    }
    /deep/ .footermodal {
        min-height: 1px;
        padding: 0px;
        margin: -5px 0px 10px 0px;
        margin-left: 0px auto;
        margin-right: 0px auto;
        margin-top: 0px auto;
        margin-bottom: 0px auto;

        background: #fff;
        border: none;
        border-radius: 25px !important;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
