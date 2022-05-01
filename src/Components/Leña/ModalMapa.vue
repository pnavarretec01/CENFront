<template>
    <b-modal
        ref="modal-mapa"
        id="modal-mapa"
        name="modal-mapa"
        header-class="headermodal"
        footer-class="footermodal"
    >
        <template #modal-header
            ><button
                type="button"
                @click="hideModal"
                class="close xCierre"
                data-dismiss="modal"
            >
                &times;
            </button></template
        >

        <div class="text-left">
            <h6 class="titulo-modal">Confirma la localización</h6>
        </div>
        <hr />

        <div class="d-block">
            <p class="form-text">
                Ajusta la localización arrastrando y soltando el marcador en el
                mapa.
            </p>
            <MglMap
                @click="clickMapa($event)"
                style="height: 350px; min-width: 100%"
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                :language="es"
                countries="cl"
                :center="location"
                :zoom="zoom"
                :marker="false"
            >
                <MglGeocoderControl
                    :language="es"
                    id="controll"
                    :accessToken="accessToken"
                    placeholder="Dirección"
                    @results="handleSearch"
                    :marker="false"
                    :flipCoordinates="true"
                    :localGeocoder="forwardGeocoder"
                    :mapboxgl="mapbox"
                    container="geocoder_container_id"
                    :collapsed="true"
                    :reverseGeocode="true"
                    country="CL"
                    v-model="datosC"
                />
                <MglGeolocateControl
                    position="top-right"
                    :trackUserLocation="true"
                    :showUserHeading="true"
                />
                <MglAttributionControl />
                <MglNavigationControl position="top-right" />

                <MglMarker
                    :draggable="true"
                    :coordinates="locationMarcador"
                    color="red"
                    @dragend="obtenerConCoordenadasDrag"
                />
            </MglMap>
            <p class="form-text mt-3">
                O bien, modifica la dirección o las coordenadas UTM, luego haz
                clic en “Actualizar”.
            </p>

            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="utmmapanorte">Dirección</label>
                    <input
                        disabled
                        type="text"
                        class="form-control"
                        id="utmmapanorte"
                        placeholder="Dirección"
                        v-model="direccion"
                    />
                </div>
                <div class="form-group col-md-6">
                    <label for="utmmapaeste">Utm Este</label>
                    <input
                        type="number"
                        class="form-control"
                        id="utmmapaeste"
                        placeholder=""
                        v-model="locationMarcador[1]"
                        @input="cambioCoordenadasInput"
                    />
                </div>
                <div class="form-group col-md-6">
                    <label for="utmmapanorte">Utm Norte</label>
                    <input
                        type="number"
                        class="form-control"
                        id="utmmapanorte"
                        placeholder=""
                        v-model="locationMarcador[0]"
                        @input="cambioCoordenadasInput"
                    />
                </div>

                <div class="form-group col-md-12">
                    <b-button
                        class="boton-actualizar btn-block"
                        @click="cargar()"
                        >Actualizar</b-button
                    >
                </div>
            </div>
        </div>
        <template #modal-footer
            ><b-row class="mt-1">
                <b-col class="d-inline-block">
                    <b-button
                        variant="primary"
                        @click="hideModal"
                        class="boton-no"
                        >Cancelar</b-button
                    ></b-col
                >
                <b-col class="ml-4d-inline-block">
                    <b-button
                        variant="primary"
                        @click="accionSi"
                        class="boton-si"
                        >Confirmar punto en mapa</b-button
                    >
                </b-col>
            </b-row></template
        >
    </b-modal>
</template>

<script>
    import axios from "axios";
    import {
        MglAttributionControl,
        MglMap,
        MglNavigationControl,
        MglGeolocateControl,
        MglMarker,
    } from "vue-mapbox";
    import mapboxgl from "mapbox-gl";

    import MglGeocoderControl from "vue-mapbox-geocoder";
    import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

    export default {
        name: "mapa",

        components: {
            MglAttributionControl,
            MglMap,
            MglGeocoderControl,
            MglMarker,
            MglNavigationControl,
            MglGeolocateControl,
        },
        props: {
            direccionRecibida: null,
            cerrarModal: null,
            coordenadasRecibida: null,
        },
        data() {
            return {
                es: "es-ES",
                direccion: "",
                locationNavegador: false,
                datosC: [],
                coordinates: [-70.6028528, -33.4206456],
                location: [-70.6028528, -33.4206456],
                zoom: 14,
                locationMarcador: [-70.6028528, -33.4206456],
                accessToken:
                    "pk.eyJ1IjoiaW5mb3JtYXRpY2FjbmUiLCJhIjoiY2t3MHN1aXJ6ZGp3NDJvcGc5cjU4Mmh1MCJ9.9vu-5-Nz7yacCi_lAEeFqg",
                mapStyle: "mapbox://styles/mapbox/streets-v11",
                defaultInput: "Chile",
                mapbox: mapboxgl,
            };
        },
        methods: {
            cambioCoordenadasInput() {
                this.coordinates = this.locationMarcador;
                this.location = this.locationMarcador;
            },
            obtenerConCoordenadasDrag(location) {
                this.locationMarcador = [
                    location.mapboxEvent.target._lngLat.lng,
                    location.mapboxEvent.target._lngLat.lat,
                ];
                axios
                    .get(
                        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                            location.mapboxEvent.target._lngLat.lng +
                            "," +
                            location.mapboxEvent.target._lngLat.lat +
                            ".json?limit=1&language=es&access_token=" +
                            this.accessToken
                    )
                    .then((res) => {
                        if (res.data.code == 401) {
                            this.$toastr.Add({
                                msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                timeout: 5000,
                                position: "toast-top-right",
                                type: "warning",
                                preventDuplicates: true,
                                style: {
                                    width: "750px",
                                    border: "2px solid #57CC9D",
                                    top: "50px",
                                    right: "30px",
                                },
                            });
                        }
                        document.getElementsByClassName(
                            "mapboxgl-ctrl-geocoder--input"
                        )[0].value = res.data.features[0].place_name_es;
                        this.direccion = res.data.features[0].place_name_es;
                    })
                    .catch((err) => {});
            },
            accionSi() {
                if (!this.direccion) {
                    this.$toastr.Add({
                        msg: "El campo de dirección es requerido para continuar",
                        timeout: 5000,
                        position: "toast-top-right",
                        type: "warning",
                        preventDuplicates: true,
                        style: {
                            width: "750px",
                            border: "2px solid #57CC9D",
                            top: "50px",
                            right: "30px",
                        },
                    });
                    return;
                }
                this.$refs["modal-mapa"].hide();
                var objeto = {
                    posicion: this.locationMarcador,
                    direccion: this.direccion,
                };
                this.$emit("coordenadas", objeto);
            },
            cargar() {
                if (this.locationMarcador[0] && this.locationMarcador[1]) {
                    axios
                        .get(
                            "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                                this.locationMarcador[0] +
                                "," +
                                this.locationMarcador[1] +
                                ".json?limit=1&language=es&access_token=" +
                                this.accessToken
                        )
                        .then((res) => {
                            if (res.data.features[0]) {
                                document.getElementsByClassName(
                                    "mapboxgl-ctrl-geocoder--input"
                                )[0].value = res.data.features[0].place_name_es;
                                this.direccion =
                                    res.data.features[0].place_name_es;
                            } else {
                                this.$toastr.Add({
                                    msg: "No se ha encontrado la dirección, verifique las coordenadas nuevamente.",
                                    timeout: 5000,
                                    position: "toast-top-right",
                                    type: "warning",
                                    preventDuplicates: true,
                                    style: {
                                        width: "750px",
                                        border: "2px solid #57CC9D",
                                        top: "50px",
                                        right: "30px",
                                    },
                                });
                            }
                        })
                        .catch((err) => {});
                }
                let direccionSeparada = document.getElementsByClassName(
                    "mapboxgl-ctrl-geocoder--input"
                )[0].value;
                let arr = direccionSeparada.split(" ");
                if (arr.length > 1) {
                    var direccionNueva = arr.toString();
                    var indices = [];
                    for (var i = 0; i < direccionNueva.length; i++) {
                        if (direccionNueva[i].toLowerCase() === ",")
                            indices.push(i);
                    }
                    var direccionLink = direccionNueva.replace(/,/g, "%20");
                    axios
                        .get(
                            "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                                direccionLink +
                                ".json?proximity=ip&fuzzyMatch=true&routing=true&access_token=" +
                                this.accessToken
                        )
                        .then((res) => {
                            if (res.data.code == 401) {
                                this.$toastr.Add({
                                    msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                    timeout: 5000,
                                    position: "toast-top-right",
                                    type: "warning",
                                    preventDuplicates: true,
                                    style: {
                                        width: "750px",
                                        border: "2px solid #57CC9D",
                                        top: "50px",
                                        right: "30px",
                                    },
                                });
                            }
                            document.getElementsByClassName(
                                "mapboxgl-ctrl-geocoder--input"
                            )[0].value = res.data.features[0].place_name;
                            this.locationMarcador = [
                                res.data.features[0].center[0],
                                res.data.features[0].center[1],
                            ];
                            this.direccion = res.data.features[0].place_name;
                        })
                        .catch((err) => {});
                } else {
                    axios
                        .get(
                            "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                                this.locationMarcador[0] +
                                "," +
                                this.locationMarcador[1] +
                                ".json?limit=1&language=es&access_token=" +
                                this.accessToken
                        )
                        .then((res) => {
                            if (res.data.code == 401) {
                                this.$toastr.Add({
                                    msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                    timeout: 5000,
                                    position: "toast-top-right",
                                    type: "warning",
                                    preventDuplicates: true,
                                    style: {
                                        width: "750px",
                                        border: "2px solid #57CC9D",
                                        top: "50px",
                                        right: "30px",
                                    },
                                });
                            }
                            document.getElementsByClassName(
                                "mapboxgl-ctrl-geocoder--input"
                            )[0].value = res.data.features[0].place_name_es;
                            this.direccion = res.data.features[0].place_name_es;
                        })
                        .catch((err) => {});
                }
            },
            forwardGeocoder(query) {
                let direccionSeparada = query;
                let arr = direccionSeparada.split(" ");
                if (arr.length > 1) {
                    setTimeout(() => {
                        var direccionInput = document.getElementsByClassName(
                            "mapboxgl-ctrl-geocoder--input"
                        )[0].value;
                        direccionInput = direccionSeparada.split(" ");
                        var direccionNueva = arr.toString();
                        var indices = [];
                        for (var i = 0; i < direccionNueva.length; i++) {
                            if (direccionNueva[i].toLowerCase() === ",")
                                indices.push(i);
                        }
                        var direccionLink = direccionNueva.replace(/,/g, "%20");
                        setTimeout(() => {
                            axios
                                .get(
                                    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                                        direccionLink +
                                        ".json?proximity=ip&fuzzyMatch=true&routing=true&access_token=" +
                                        this.accessToken
                                )
                                .then((res) => {
                                    if (res.data.code == 401) {
                                        this.$toastr.Add({
                                            msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                            timeout: 5000,
                                            position: "toast-top-right",
                                            type: "warning",
                                            preventDuplicates: true,
                                            style: {
                                                width: "750px",
                                                border: "2px solid #57CC9D",
                                                top: "50px",
                                                right: "30px",
                                            },
                                        });
                                    }
                                    this.locationMarcador = [
                                        res.data.features[0].center[0],
                                        res.data.features[0].center[1],
                                    ];
                                    this.direccion =
                                        res.data.features[0].place_name;
                                })
                                .catch((err) => {});
                        }, 3000);
                    }, 1000);
                }
                if (arr.length == 1) {
                    axios
                        .get(
                            "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                                query +
                                ".json?proximity=ip&fuzzyMatch=true&routing=true&access_token=" +
                                this.accessToken
                        )
                        .then((res) => {
                            if (res.data.code == 401) {
                                this.$toastr.Add({
                                    msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                    timeout: 5000,
                                    position: "toast-top-right",
                                    type: "warning",
                                    preventDuplicates: true,
                                    style: {
                                        width: "750px",
                                        border: "2px solid #57CC9D",
                                        top: "50px",
                                        right: "30px",
                                    },
                                });
                            }
                            this.locationMarcador = [
                                res.data.features[0].center[0],
                                res.data.features[0].center[1],
                            ];
                            this.direccion = res.data.features[0].place_name_es;
                        })
                        .catch((err) => {});
                }
            },
            clickMapa(e) {
                this.locationMarcador = [
                    e.mapboxEvent.lngLat.lng,
                    e.mapboxEvent.lngLat.lat,
                ];
                axios
                    .get(
                        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                            e.mapboxEvent.lngLat.lng +
                            "," +
                            e.mapboxEvent.lngLat.lat +
                            ".json?limit=1&language=es&access_token=" +
                            this.accessToken
                    )
                    .then((res) => {
                        if (res.data.code == 401) {
                            this.$toastr.Add({
                                msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                timeout: 5000,
                                position: "toast-top-right",
                                type: "warning",
                                preventDuplicates: true,
                                style: {
                                    width: "750px",
                                    border: "2px solid #57CC9D",
                                    top: "50px",
                                    right: "30px",
                                },
                            });
                        }
                        document.getElementsByClassName(
                            "mapboxgl-ctrl-geocoder--input"
                        )[0].value = res.data.features[0].place_name_es;
                        this.direccion = res.data.features[0].place_name_es;
                    })
                    .catch((err) => {});
            },
            handleSearch(event) {
                var elem =
                    document.getElementsByClassName("suggestions")[0].innerText;
                if (elem === "No results found") {
                    document.getElementsByClassName(
                        "suggestions"
                    )[0].innerText = "No se han encontrado resultados";
                }
            },
            hideModal() {
                this.$refs["modal-mapa"].hide();
            },
            aplicarDireccion() {
                if (this.direccionRecibida) {
                    let direccionSeparada = this.direccionRecibida;
                    let arr = direccionSeparada.split(" ");
                    if (arr.length > 1) {
                        setTimeout(() => {
                            var direccionNueva = arr.toString();
                            var indices = [];
                            for (var i = 0; i < direccionNueva.length; i++) {
                                if (direccionNueva[i].toLowerCase() === ",")
                                    indices.push(i);
                            }
                            var direccionLink = direccionNueva.replace(
                                /,/g,
                                "%20"
                            );
                            axios
                                .get(
                                    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                                        direccionLink +
                                        ".json?proximity=ip&fuzzyMatch=true&routing=true&access_token=" +
                                        this.accessToken
                                )
                                .then((res) => {
                                    if (res.data.code == 401) {
                                        this.$toastr.Add({
                                            msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                            timeout: 5000,
                                            position: "toast-top-right",
                                            type: "warning",
                                            preventDuplicates: true,
                                            style: {
                                                width: "750px",
                                                border: "2px solid #57CC9D",
                                                top: "50px",
                                                right: "30px",
                                            },
                                        });
                                    }
                                    this.locationMarcador = [
                                        res.data.features[0].center[0],
                                        res.data.features[0].center[1],
                                    ];
                                    this.location = [
                                        res.data.features[0].center[0],
                                        res.data.features[0].center[1],
                                    ];
                                    this.direccion =
                                        res.data.features[0].place_name;
                                    this.datosC =
                                        res.data.features[0].place_name;
                                })
                                .catch((res) => {});
                        }, 1000);
                    }
                    if (arr.length == 1) {
                        axios
                            .get(
                                "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                                    this.direccionRecibida +
                                    ".json?proximity=ip&fuzzyMatch=true&routing=true&access_token=" +
                                    this.accessToken
                            )
                            .then((res) => {
                                if (res.data.code == 401) {
                                    this.$toastr.Add({
                                        msg: "No se ha completado la acción, inicie sesión nuevamente y reintente",
                                        timeout: 5000,
                                        position: "toast-top-right",
                                        type: "warning",
                                        preventDuplicates: true,
                                        style: {
                                            width: "750px",
                                            border: "2px solid #57CC9D",
                                            top: "50px",
                                            right: "30px",
                                        },
                                    });
                                }
                                this.locationMarcador = [
                                    res.data.features[0].center[0],
                                    res.data.features[0].center[1],
                                ];
                                this.location = [
                                    res.data.features[0].center[0],
                                    res.data.features[0].center[1],
                                ];
                                this.direccion =
                                    res.data.features[0].place_name;
                                this.direccion =
                                    res.data.features[0].place_name_es;
                            })
                            .catch((err) => {});
                    }
                }
            },
            aplicarCoordenadas() {
                (this.coordinates = [
                    this.coordenadasRecibida.norte,
                    this.coordenadasRecibida.este,
                ]),
                    (this.location = [
                        this.coordenadasRecibida.norte,
                        this.coordenadasRecibida.este,
                    ]),
                    (this.locationMarcador = [
                        this.coordenadasRecibida.norte,
                        this.coordenadasRecibida.este,
                    ]);
                axios
                    .get(
                        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                            this.coordenadasRecibida.norte +
                            "," +
                            this.coordenadasRecibida.este +
                            ".json?limit=1&language=es&access_token=" +
                            this.accessToken
                    )
                    .then((res) => {
                        this.direccion = res.data.features[0].place_name_es;
                    })
                    .catch((err) => {});
            },
        },
        mounted() {
            setTimeout(function () {
                window.dispatchEvent(new Event("resize"));
            }, 50);
            if (
                this.direccionRecibida == "" &&
                this.coordenadasRecibida.norte &&
                this.coordenadasRecibida.este
            ) {
                this.aplicarCoordenadas();
            }
            if (
                this.direccionRecibida &&
                this.coordenadasRecibida.norte &&
                this.coordenadasRecibida.este
            ) {
                this.aplicarDireccion();
            }
            this.aplicarDireccion();
            document.onreadystatechange = () => {
                if (document.readyState == "complete") {
                    navigator.geolocation.getCurrentPosition((pos) => {
                        if (pos) {
                            this.location = [
                                pos.coords.longitude,
                                pos.coords.latitude,
                            ];
                            this.locationMarcador = [
                                pos.coords.longitude,
                                pos.coords.latitude,
                            ];
                            this.coordinates = [
                                pos.coords.longitude,
                                pos.coords.latitude,
                            ];
                        }
                    });
                }
            };
        },
    };
</script>

<style scoped>
    .titulo-modal {
        font: normal normal medium 25px/30px Roboto;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
        font-weight: 600;
    }
    .div-stock {
        background: #faeee7 0% 0% no-repeat padding-box;
        opacity: 1;
        height: 60px;
    }
    /deep/ .modal.show .modal-dialog {
        border-radius: 25px !important;
    }
    .xCierre {
        color: #000000 !important;
    }
    .boton-no {
        font-size: 14px;
        font-weight: 600;
        width: 116px;
        height: 34px;
        background: #d8d8d8 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029 !important;
        border-radius: 4px !important;
        opacity: 1 !important;
        border: none;
        color: #787878;
    }
    .boton-si {
        height: 40px;
        width: 233px;
        font-size: 14px;
        font-weight: 600;
        height: 34px;
        background: #12a99e 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029 !important;
        border-radius: 4px !important;
        opacity: 1 !important;
        border: none;
        color: #fff;
    }
    .boton-actualizar {
        font-size: 14px;
        font-weight: 600;
        height: 34px;
        background: #005fcb 0% 0% no-repeat padding-box !important;
        box-shadow: 0px 3px 6px #00000029 !important;
        border-radius: 4px !important;
        opacity: 1 !important;
        border: none;
        color: #fff;
    }
    @media (max-width: 400px) {
        .boton-no {
            font-size: 11px;
            font-weight: 600;
            width: 76px;
            height: 34px;
        }
        .boton-si {
            font-size: 11px;
            height: 40px;
            width: 163px;
            font-weight: 600;
            height: 34px;
        }
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
    /deep/ #modal-mapa {
        top: 2%;
    }
    @media (max-width: 990px) {
        /deep/ #modal-mapa {
            top: 0%;
        }
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
        margin: -5px 0px 40px 0px;
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
