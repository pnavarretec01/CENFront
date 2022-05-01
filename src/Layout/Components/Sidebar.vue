<template>
    <div
        class="app-sidebar sidebar-shadow"
        @mouseover="toggleSidebarHover('add', 'closed-sidebar-open')"
        @mouseleave="toggleSidebarHover('remove', 'closed-sidebar-open')"
    >
        <div class="app-header__logo">
            <!--  <div class="logo-src"/> -->
            <!-- <div class="header__pane ml-auto"></div> -->
            <div class="header__pane">
                <button
                    type="button"
                    class="hamburger close-sidebar-btn hamburger--elastic"
                    v-bind:class="{ 'is-active': isOpen }"
                    @click="toggleBodyClass('closed-sidebar')"
                >
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-sidebar-content">
            <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
                <sidebar-menu
                    showOneChild
                    :menu="menuTarifa"
                    v-if="tipoUsuario == 6"
                />
                <sidebar-menu
                    showOneChild
                    :menu="menuLeña"
                    v-if="tipoUsuario == 5"
                />
                <sidebar-menu
                    showOneChild
                    :menu="menuPellet"
                    v-if="tipoUsuario == 4"
                />
                <sidebar-menu
                    showOneChild
                    :menu="menuObservador"
                    v-if="tipoUsuario == 3"
                />
                <sidebar-menu
                    showOneChild
                    :menu="menuRegion"
                    v-if="tipoUsuario == 2"
                />
                <sidebar-menu
                    showOneChild
                    :menu="menu"
                    v-if="tipoUsuario == 1"
                />
            </VuePerfectScrollbar>
        </div>
    </div>
</template>

<script>
    import { SidebarMenu } from "vue-sidebar-menu";
    import VuePerfectScrollbar from "vue-perfect-scrollbar";
    import home from "../../Components/Common/IconosSidebar/home.svg";
    import leña from "../../Components/Common/IconosSidebar/leña.svg";
    import pellet from "../../Components/Common/IconosSidebar/pellet.svg";
    import tarifa from "../../Components/Common/IconosSidebar/tarifa.svg";
    import calificaciones from "../../Components/Common/IconosSidebar/calificaciones.svg";
    import dpa from "../../Components/Common/IconosSidebar/dpa.svg";
    import reporte from "../../Components/Common/IconosSidebar/reporte.svg";
    import usuarios from "../../Components/Common/IconosSidebar/usuarios.svg";

    export default {
        components: {
            SidebarMenu,
            VuePerfectScrollbar,
        },
        data() {
            return {
                isOpen: false,
                sidebarActive: false,
                tipoUsuario: "",
                menu: [
                    {
                        icon: {
                            element: "",
                            attributes: "",
                            class: "home-icon",
                        },
                        title: "Home",
                        href: "/home/",
                    },
                    {
                        title: "Leña",
                        href: "/lena",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "leña-icon",
                        },
                        child: [
                            {
                                href: "/agregar",
                                title: "Agregar",
                            },
                            {
                                href: "/parametro",
                                title: "Configurar",
                            },
                        ],
                    },
                    {
                        title: "Pellet",
                        href: "/pellet",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "pellet-icon",
                        },
                        child: [
                            {
                                href: "/pellet-agregar",
                                title: "Agregar",
                            },
                            {
                                href: "/pellet-configurar",
                                title: "Configurar",
                            },
                        ],
                    },
                    {
                        title: "Tarifa eléctrica",
                        href: "/tarifa",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "tarifa-icon",
                        },
                        child: [
                            {
                                href: "/agregar-tarifa",
                                title: "Agregar",
                            },
                        ],
                    },
                    {
                        title: "Calificaciones",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "calificaciones-icon",
                        },
                        href: "/calificaciones",
                        child: [
                            {
                                href: "/calificacion-configurar",
                                title: "Configurar",
                            },
                        ],
                    },
                    {
                        title: "Usuarios",
                        href: "/usuarios",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "usuarios-icon",
                        },
                    },
                    {
                        title: "DPA",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "dpa-icon",
                        },
                        href: "/DPA",
                    },
                    {
                        title: "Reporte de precios",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "reporte-icon",
                        },
                        href: "/reporte-precios",
                    },
                ],
                menuTarifa: [
                    {
                        icon: {
                            element: "",
                            attributes: "",
                            class: "home-icon",
                        },
                        title: "Home",
                        href: "/home",
                    },
                    {
                        title: "Tarifa eléctrica",
                        href: "/tarifa",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "tarifa-icon",
                        },
                    },
                ],
                menuLeña: [
                    {
                        icon: {
                            element: "",
                            attributes: "",
                            class: "home-icon",
                        },
                        title: "Home",
                        href: "/home",
                    },
                    {
                        title: "Leña",
                        href: "/lena",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "leña-icon",
                        },
                        child: [
                            {
                                href: "/agregar",
                                title: "Agregar",
                            },
                        ],
                    },
                    {
                        title: "Tarifa eléctrica",
                        href: "/tarifa",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "tarifa-icon",
                        },
                    },
                    {
                        title: "Calificaciones",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "calificaciones-icon",
                        },
                        href: "/calificaciones",
                    },
                ],
                menuPellet: [
                    {
                        icon: {
                            element: "",
                            attributes: "",
                            class: "home-icon",
                        },
                        title: "Home",
                        href: "/home",
                    },
                    {
                        title: "Pellet",
                        href: "/pellet",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "pellet-icon",
                        },
                        child: [
                            {
                                href: "/pellet-agregar",
                                title: "Agregar",
                            },
                        ],
                    },
                    {
                        title: "Tarifa eléctrica",
                        href: "/tarifa",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "tarifa-icon",
                        },
                    },
                    {
                        title: "Calificaciones",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "calificaciones-icon",
                        },
                        href: "/calificaciones",
                    },
                ],
                menuRegion: [
                    {
                        icon: {
                            element: "",
                            attributes: "",
                            class: "home-icon",
                        },
                        title: "Home",
                        href: "/home",
                    },
                    {
                        title: "Leña",
                        href: "/lena",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "leña-icon",
                        },
                        child: [
                            {
                                href: "/agregar",
                                title: "Agregar",
                            },
                        ],
                    },
                    {
                        title: "Pellet",
                        href: "/pellet",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "pellet-icon",
                        },
                        child: [
                            {
                                href: "/pellet-agregar",
                                title: "Agregar",
                            },
                        ],
                    },
                    {
                        title: "Tarifa eléctrica",
                        href: "/tarifa",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "tarifa-icon",
                        },
                    },
                    {
                        title: "Calificaciones",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "calificaciones-icon",
                        },
                        href: "/calificaciones",
                    },
                ],
                menuObservador: [
                    {
                        icon: {
                            element: "",
                            attributes: "",
                            class: "home-icon",
                        },
                        title: "Home",
                        href: "/home/",
                    },
                    {
                        title: "Leña",
                        href: "/lena",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "leña-icon",
                        },
                    },
                    {
                        title: "Pellet",
                        href: "/pellet",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "pellet-icon",
                        },
                    },
                    {
                        title: "Tarifa eléctrica",
                        href: "/tarifa",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "tarifa-icon",
                        },
                    },
                    {
                        title: "Calificaciones",
                        icon: {
                            element: "",
                            attributes: "",
                            class: "calificaciones-icon",
                        },
                        href: "/calificaciones",
                    },
                ],
                collapsed: true,
                windowWidth: 0,
            };
        },
        props: {
            sidebarbg: String,
        },
        methods: {
            validaTipoUsuario() {
                this.tipoUsuario = localStorage.getItem("tipe");
            },
            toggleBodyClass(className) {
                const el = document.body;
                this.isOpen = !this.isOpen;

                if (this.isOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
            toggleSidebarHover(add, className) {
                const el = document.body;
                this.sidebarActive = !this.sidebarActive;
                this.windowWidth = document.documentElement.clientWidth;

                // if (this.windowWidth > '1980') {
                //     if (add === 'add') {
                //         el.classList.add(className);
                //     } else {
                //         el.classList.remove(className);
                //     }
                // }
            },
            getWindowWidth() {
                const el = document.body;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth < "1350") {
                    el.classList.add("closed-sidebar", "closed-sidebar-md");
                } else {
                    el.classList.remove("closed-sidebar", "closed-sidebar-md");
                }
            },
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener("resize", this.getWindowWidth);

                //Init
                this.getWindowWidth();
            });
        },
        created() {
            this.validaTipoUsuario();
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.getWindowWidth);
        },
    };
</script>
