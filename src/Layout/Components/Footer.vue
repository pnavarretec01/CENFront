<template>
    <div class="app-footer">
        <div class="app-footer__inner text-center">
            <div class="ml-5 div-logos">
                <img width="80vh" class="gobierno" :src="logoGobierno" />
                <img class="ml-5 cne"  width="80vh" :src="logoCne" />
            </div>
            <div class="leyenda-footer">
                © 2021 Comisión Nacional de Energía - Gobierno de Chile
            </div>
            <div>
                <h5 class="adevcom-footer">Adevcom 2022</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import { library } from "@fortawesome/fontawesome-svg-core";
    import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
    import logoGobierno from "../../assets/static/media/logo_gobierno.png";
    import logoCne from "../../assets/static/media/logo_cne.png";

    library.add(faEllipsisV);
    export default {
        data() {
            return {
                logoGobierno: logoGobierno,
                logoCne: logoCne,
            };
        },
        name: "Footer",
        components: {},
    };
</script>
<style scoped>
    @media (max-width: 1600px) {
        .leyenda-footer {
            margin-left: 40% !important;
        }
    }
    @media (max-width: 640px) {
        .cne {
           left: 0px !important;
        }
        .gobierno {
            left: 0px !important;
        }
        .div-logos{
            left: -10px !important;
        }
        .leyenda-footer {
            font-size: 12px !important;
            display: none !important;
        }
        .adevcom-footer {
            font-size: 12px !important;
            margin-left: 17rem !important;
        }
    }
    .adevcom-footer {
        margin-top: 6px;
        letter-spacing: 0.32px;
        color: #ffffff;
        opacity: 1;
        font-size: 14px;
    }
    .div-logos {
        display: block;
        transition: translate(0, -50%);
        position: absolute;
    }
    .leyenda-footer {
        font-size: 14px;
        margin-left: 40% !important;
        display: block;
        margin: auto;
    }
</style>
