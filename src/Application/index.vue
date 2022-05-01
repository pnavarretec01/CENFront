<template>
    <div>
        <h2 class="titulo">Pellet</h2>
        <Tabla
            :data="data"
            @editar="editar"
            @eliminar="eliminar"
            @aca="aca"
        ></Tabla>
    </div>
</template>

<script>
    import Tabla from "../Components/Tabla.vue";
    export default {
        components: { Tabla },
        data() {
            return {
                data: {
                    heading:
                        "Listado de distribuidores de pellet a nivel nacional",
                    btnAgregar: true,
                    btnAgregarLabel: "Agregar empresa",
                    items: [
                        {
                            region: "Tarapacá",
                            comuna: "Iquique",
                            direccion: "Manuel Bulnes 1569",
                            geolocalizado: true,
                            precio: true,
                            validado: true,
                            modificado: "29/06/2021 08:30hrs",
                            habilitar: true,
                        },
                        {
                            region: "Tarapacá",
                            comuna: "Iquique",
                            direccion: "Manuel Bulnes 1569",
                            geolocalizado: true,
                            precio: false,
                            validado: true,
                            modificado: "29/06/2021 08:30hrs",
                            habilitar: true,
                        },
                    ],
                    fields: [
                        {
                            key: "region",
                            label: "Región",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "comuna",
                            label: "Comuna",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "direccion",
                            label: "Dirección",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "check",
                            valor: "geolocalizado",
                            label: "¿Geolocalizado?",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        {
                            key: "precio",
                            valor: "precio",
                            label: "Precios",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        {
                            key: "validado",
                            label: "Validado",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        {
                            key: "modificado",
                            label: "Modificado",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: true,
                        },
                        {
                            key: "habilitar",
                            label: "Habilitar",
                            sortable: true,
                            sortDirection: "desc",
                            filtro: false,
                        },
                        { key: "actions", label: "Actions" },
                    ],
                    acciones: [
                        {
                            nombre: "editar",
                            class: "btn-editar",
                            icono: "pencil-alt",
                        },
                        {
                            nombre: "aca",
                            class: "btn-aca",
                            icono: "pencil-alt",
                        },
                        {
                            nombre: "eliminar",
                            icono: "trash-alt",
                            class: "btn-eliminar",
                        },
                    ],
                    currentPage: 1,
                    perPage: 5,
                    striped: false,
                    bordered: false,
                    outlined: false,
                    small: false,
                    hover: false,
                    dark: false,
                    fixed: false,
                    footClone: false,
                },
            };
        },
        methods: {
            aca() {},
            editar(row, index, e) {},
            eliminar(row, index, e) {},
        },
    };
</script>

<style>
    .titulo {
        margin-bottom: 20px;
        font-weight: 600;
    }
</style>
