import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const router = new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: "smooth" });
    },
    routes: [
        {
            path: "*",
            redirect: "/login",
        },
        {
            path: "/",
            redirect: "/home",
            meta: {
                autentificado: true,
            },
        },
        /**
         * pellet
         */
        {
            path: "/pellet",
            name: "pellet",
            component: () =>
                import("../../src/Layout/Application/Pellet/index.vue"),
            meta: {
                autentificado: true,
            },
        },
        {
            path: "/pellet-configurar",
            name: "pellet-configurar",
            component: () =>
                import("../../src/Layout/Application/Pellet/Configurar.vue"),
            meta: {
                autentificado: true,
            },
        },
        {
            path: "/pellet-agregar",
            name: "pellet-agregar",
            props: true,
            component: () =>
                import("../../src/Layout/Application/Pellet/Agregar.vue"),
            meta: {
                autentificado: true,
            },
        },

        /**
         * leña
         */
        {
            path: "/lena",
            name: "lena",
            component: () =>
                import("../../src/Layout/Application/Leña/index.vue"),
            meta: {
                autentificado: true,
            },
        },
        {
            path: "/parametro",
            name: "parametro",
            component: () =>
                import("../../src/Layout/Application/Leña/Configurar.vue"),
            meta: {
                autentificado: true,
            },
        },
        {
            path: "/agregar",
            name: "agregar",
            props: true,
            component: () =>
                import("../../src/Layout/Application/Leña/Agregar.vue"),
            meta: {
                autentificado: true,
            },
        },
        /**
         * calificaciones
         */
        {
            path: "/calificaciones",
            name: "calificaciones",
            component: () =>
                import("../../src/Layout/Application/Calificaciones/index.vue"),
            meta: {
                autentificado: true,
            },
        },
        {
            path: "/calificacion-configurar",
            name: "calificacion-configurar",
            component: () =>
                import(
                    "../../src/Layout/Application/Calificaciones/Configurar.vue"
                ),
            meta: {
                autentificado: true,
            },
        },

        /**
         * usuarios
         */
        {
            path: "/usuarios",
            name: "usuarios",
            component: () =>
                import("../../src/Layout/Application/Usuarios/index.vue"),
            meta: {
                autentificado: true,
            },
        },

        /**
         * reporte precios
         */
        {
            path: "/reporte-precios",
            name: "reporte-precios",
            component: () =>
                import("../../src/Layout/Application/ReportePrecios/index.vue"),
            meta: {
                autentificado: true,
            },
        },

        /**
         * DPA
         */
        {
            path: "/DPA",
            name: "DPA",
            component: () =>
                import("../../src/Layout/Application/DPA/index.vue"),
            meta: {
                autentificado: true,
            },
        },

        /**
         * tarifa
         */
        {
            path: "/tarifa",
            name: "tarifa",
            component: () =>
                import("../../src/Layout/Application/Tarifa/index.vue"),
            meta: {
                autentificado: true,
            },
        },
        {
            path: "/agregar-tarifa",
            name: "agregar-tarifa",
            component: () =>
                import("../../src/Layout/Application/Tarifa/Agregar.vue"),
            props: true,
            meta: {
                autentificado: true,
            },
        },

        /**
         * login y principales
         */
        {
            path: "/login",
            name: "login",
            component: () => import("../../src/Components/Login.vue"),
        },

        {
            path: "/home/",
            name: "home",
            component: () => import("../../src/Layout/Application/Home.vue"),
            meta: {
                autentificado: true,
            },
        },
        {
            path: "/recuperar",
            name: "recuperar-contrasena",
            component: () => import("../Layout/Application/RecuperarPwd.vue"),
        },
        {
            path: "/restablecer",
            name: "restablecer-contrasena",
            component: () => import("../Layout/Application/RestablecerPwd.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    let autorizacion = to.matched.some((record) => record.meta.autentificado);
    if (!localStorage.getItem("token") && autorizacion) {
        next("login");
    } else if (localStorage.getItem("token") && !autorizacion) {
        next("/");
    } else {
        if (
            localStorage.getItem("tipe") == 6 &&
            to.path != "/home" &&
            to.path != "/tarifa" &&
            to.path != "/agregar-tarifa" &&
            to.path != "/"
        ) {
            next("/tarifa");
        } else {
            next();
        }
        if (
            localStorage.getItem("tipe") == 5 &&
            to.path != "/home" &&
            to.path != "/tarifa" &&
            to.path != "/calificaciones" &&
            to.path != "/lena" &&
            to.path != "/agregar" &&
            to.path != "/"
        ) {
            next("/");
        } else {
            next();
        }
        if (
            localStorage.getItem("tipe") == 4 &&
            to.path != "/home" &&
            to.path != "/calificaciones" &&
            to.path != "/tarifa" &&
            to.path != "/pellet" &&
            to.path != "/pellet-configurar" &&
            to.path != "/pellet-agregar" &&
            to.path != "/"
        ) {
            next("/");
        } else {
            next();
        }
        if (
            localStorage.getItem("tipe") == 3 &&
            to.path != "/home" &&
            to.path != "/tarifa" &&
            to.path != "/calificaciones" &&
            to.path != "/pellet" &&
            to.path != "/lena" &&
            to.path != "/"
        ) {
            next("/");
        } else {
            next();
        }
        if (
            localStorage.getItem("tipe") == 2 &&
            to.path != "/home" &&
            to.path != "/calificaciones" &&
            to.path != "/tarifa" &&
            to.path != "/pellet" &&
            to.path != "/pellet-agregar" &&
            to.path != "/lena" &&
            to.path != "/agregar" &&
            to.path != "/"
        ) {
            next("/");
        } else {
            next();
        }
    }
});

export default router;
