<template>
    <div class="app-header header-shadow">
        <!-- <div class="logo-src" /> -->
        <div class="app-header__content">
            <div class="app-header-left centrar">
                <logo></logo>
            </div>
            <div class="app-header-right">
                <UserArea />
            </div>
        </div>
        <div class="app-header__mobile-menu">
            <div>
                <button
                    type="button"
                    class="hamburger close-sidebar-btn hamburger--elastic"
                    v-bind:class="{ 'is-active': isOpen }"
                    @click="toggleMobile('closed-sidebar-open')"
                >
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-header__menu">
            <span>
                <b-button
                    class="btn-icon btn-icon-only"
                    size="sm"
                    v-bind:class="{ active: isOpenMobileMenu }"
                    @click="toggleMobile2('header-menu-open')"
                >
                    <div class="btn-icon-wrapper">
                        <font-awesome-icon icon="ellipsis-v" style="color: white !important;"/>
                    </div>
                </b-button>
            </span>
        </div>
    </div>
</template>

<script>
    //import SearchBox from './Header/SearchBox';
    import logo from "../../Components/Common/Logo.vue";
    import UserArea from "./Header/HeaderUserArea";

    import { library } from "@fortawesome/fontawesome-svg-core";
    import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

    library.add(faEllipsisV);
    export default {
        name: "Header",
        components: {
            logo,
            UserArea,
            "font-awesome-icon": FontAwesomeIcon,
        },

        data() {
            return {
                isOpen: false,
                isOpenMobileMenu: false,
            };
        },
        props: {},
        methods: {
            toggleMobile(className) {
                const el = document.body;
                this.isOpen = !this.isOpen;

                if (this.isOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },

            toggleMobile2(className) {
                const el = document.body;
                this.isOpenMobileMenu = !this.isOpenMobileMenu;

                if (this.isOpenMobileMenu) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
        },
    };
</script>
<style scoped>
    .btn-icon-only {
        background-color: #003e8d !important;
        border: none;
    }
    .btn-icon-only:hover {
        background-color: #003d8da8 !important;
        border: none;
    }
    .centrar {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    }
</style>
