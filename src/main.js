import Vue from "vue";
import router from "./router";

import BootstrapVue from "bootstrap-vue";
import axios from "axios";

export const EventBus = new Vue();

//sweet alert 2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const options = {
    confirmButtonColor: "#41b882",
    cancelButtonColor: "#ff7674",
};
Vue.use(VueSweetalert2, options);

//funcion que levanta alerta avisando al usuario que se cerrará sesión
function logout() {
    Vue.swal({
        title: "Sesión expirada",
        text: "Su sesión ha caducado debido al tiempo de inactividad (60 minutos), inicie nuevamente",
        icon: "warning",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false,
    }).then((result) => {
        if (result.value) {
            localStorage.removeItem("token");
            localStorage.removeItem("tipe");
            localStorage.removeItem("dataUser");
            location.reload();
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("tipe");
            localStorage.removeItem("dataUser");
            location.reload();
        }
    });
}
//función que desloguea al usuario pasado el tiempo de inactividad
function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logout, 3600000);
}

//defino header por default para axios
var token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    setInterval(function () {
        if (localStorage.getItem("tokenAct")) {
            var tokenAct = localStorage.getItem("tokenAct");
        } else {
            var tokenAct = token;
        }
        axios
            .post("http://127.0.0.1:8000/usuarios/inicio/refreshToken", {
                headers: { Authorization: `Bearer ${tokenAct}` },
            })
            .then((res) => {
                localStorage.setItem("token", res.data.access_token);
                localStorage.setItem("tokenAct", res.data.access_token);
                token = res.data.access_token;
            })
            .catch((err) => {});
    }, 300000);

    // sirve para resetear tiempo de inactividad con cualquiera de esos eventos
    var time;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;
    window.ontouchstart = resetTimer;
    window.onclick = resetTimer;
    window.onkeypress = resetTimer;

    resetTimer();
}

axios.interceptors.response.use((response) => {
    if (response.data.code === 401) {
        Vue.swal({
            title: "Sesión expirada",
            text: "Su sesión ha caducado, inicie nuevamente",
            icon: "warning",
            confirmButtonText: "Aceptar",
            closeOnConfirm: false,
        }).then((result) => {
            if (result.value) {
                localStorage.removeItem("token");
                localStorage.removeItem("tipe");
                localStorage.removeItem("dataUser");
                location.reload();
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("tipe");
                localStorage.removeItem("dataUser");
                location.reload();
            }
        });
    }
    if (response.data.code === 403) {
        Vue.swal({
            title: "Sesión expirada",
            text: "Su sesión ha caducado, inicie nuevamente",
            icon: "warning",
            confirmButtonText: "Aceptar",
            closeOnConfirm: false,
        }).then((result) => {
            if (result.value) {
                localStorage.removeItem("token");
                localStorage.removeItem("pwd");
                localStorage.removeItem("user");
                localStorage.removeItem("tipe");
                localStorage.removeItem("dataUser");
                location.reload();
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("pwd");
                localStorage.removeItem("user");
                localStorage.removeItem("tipe");
                localStorage.removeItem("dataUser");
                location.reload();
            }
        });
    }
    return response;
});

import App from "./App";
import Login from "./Components/Login.vue";
import RecuperarPwd from "./Layout/Application/RecuperarPwd";
import Default from "./Layout/Wrappers/baseLayout.vue";

//datepicker
// Main JS (in UMD format)
import VueTimepicker from "vue2-timepicker";

// CSS
import "vue2-timepicker/dist/VueTimepicker.css";

//mapbox
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

Vue.use(VueMapbox, { mapboxgl: Mapbox });

//libreria fontawesome de iconos
Vue.component("font-awesome-icon", FontAwesomeIcon);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faUserSecret,
    faEye,
    faEyeSlash,
    faLock,
    faFire,
    faArrowLeft,
    faCheck,
    faTimes,
    faMapMarkerAlt,
    faStar,
    faInfo,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
    faUserSecret,
    faEye,
    faEyeSlash,
    faLock,
    faFire,
    faArrowLeft,
    faCheck,
    faTimes,
    faMapMarkerAlt,
    faStar,
    faInfo,
    faHome
);

//detecta cambio fuera de algo especificado
import vClickOutside from "v-click-outside";
Vue.use(vClickOutside);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.component("default-layout", Default);
Vue.component("login", Login);
Vue.component("recuperar", RecuperarPwd);

//v-select
import vSelect from "vue-select";
Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";

//toastr
import VueToastr from "vue-toastr";
Vue.use(VueToastr, {
    /* OverWrite Plugin Options if you need */
});

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    template: "<app/>",
    components: { Login, App, RecuperarPwd, VueTimepicker, axios },
    data: {
        urlApi: process.env.VUE_APP_SERVICE_URL,
    },
});
