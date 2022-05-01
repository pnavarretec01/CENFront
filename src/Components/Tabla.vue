<template>
    <div>
        <br />
        <b-table
            :striped="data.striped"
            :bordered="data.bordered"
            :outlined="data.outlined"
            :small="data.small"
            :hover="data.hover"
            :dark="data.dark"
            :tbody-transition-props="transProps"
            :fixed="data.fixed"
            responsive
            :foot-clone="data.footClone"
            :per-page="data.perPage"
            :current-page="data.currentPage"
            :items="datos"
            :fields="data.fields"
            id="tabla-bv"
            :filter="filtro"
            empty-text="Ningún dato disponible en esta tabla"
            empty-filtered-text="0 resultados encontrados"
            show-empty
        >
            <template #top-row>
                <b-td
                    class="filtro-tabla"
                    v-for="(objeto, index) in data.fields"
                    :key="index"
                    ><input
                        v-if="objeto.filtro"
                        type="text"
                        placeholder="buscar"
                        class="form-control"
                        v-model="filtros[index]"
                        @input="accionFiltro(objeto, index)"
                /></b-td>
            </template>
            <template v-slot:empty="{ emptyText }">
                <div class="text-center">
                    <h5>{{ emptyText }}</h5>
                </div>
            </template>
            <template slot="emptyfiltered">
                <div class="text-center">
                    <h5>No se encontraron resultados</h5>
                </div>
            </template>

            <template #cell(ptv_geolocalizado)="row">
                <div v-if="row.item.ptv_geolocalizado">
                    <font-awesome-icon class="check-true" icon="check" />
                </div>
                <div v-else>
                    <font-awesome-icon class="check-false" icon="times" />
                </div>
            </template>
            <template #cell(precioVacio)="row">
                <div v-if="row.item.precioVacio">
                    <font-awesome-icon class="check-true" icon="check" />
                </div>
                <div v-else>
                    <font-awesome-icon class="check-false" icon="times" />
                </div>
            </template>
            <template #cell(ptv_informacion_valida)="row">
                <div v-if="row.item.ptv_informacion_valida">
                    <font-awesome-icon class="check-true" icon="check" />
                </div>
                <div v-else>
                    <font-awesome-icon class="check-false" icon="times" />
                </div>
            </template>
            <template #cell(ptv_ind_act)="row">
                <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        :id="row.item.ptv_id"
                        @change="
                            $emit(
                                'checkboxX',
                                row.item,
                                row.index,
                                $event.target.checked
                            )
                        "
                        v-model="row.item.ptv_ind_act"
                    />
                    <label
                        class="custom-control-label"
                        :for="row.item.ptv_id"
                    ></label>
                </div>
            </template>
            <template #cell(prod_tiene_stock)="row">
                <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        :id="row.item.prod_id"
                        @change="
                            $emit(
                                'checkboxStock',
                                row.item,
                                row.index,
                                $event.target.checked
                            )
                        "
                        v-model="row.item.prod_tiene_stock"
                    />
                    <label
                        class="custom-control-label"
                        :for="row.item.prod_id"
                    ></label>
                </div>
            </template>
            <template #cell(activo)="row">
                <b-form-checkbox
                    :value="1"
                    v-if="row.item.activo"
                    v-model.number="row.item.activo"
                    name="check-button"
                    @change="$emit('checkboxX', row.item, row.index, $event)"
                    switch
                >
                </b-form-checkbox>
                <b-form-checkbox
                    v-else
                    v-model="row.item.activo"
                    name="check-button"
                    @change="$emit('checkboxX', row.item, row.index, $event)"
                    switch
                >
                </b-form-checkbox>
            </template>
            <template #cell(tari_ind_act)="row">
                <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        :id="row.item.tari_id"
                        @change="
                            $emit(
                                'checkboxX',
                                row.item,
                                row.index,
                                $event.target.checked
                            )
                        "
                        v-model="row.item.tari_ind_act"
                    />
                    <label
                        class="custom-control-label"
                        :for="row.item.tari_id"
                    ></label>
                </div>
            </template>
            <template #cell(usua_ind_act)="row">
                <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        :id="row.item.usua_id"
                        @change="
                            $emit(
                                'checkboxX',
                                row.item,
                                row.index,
                                $event.target.checked
                            )
                        "
                        v-model="row.item.usua_ind_act"
                    />
                    <label
                        class="custom-control-label"
                        :for="row.item.usua_id"
                    ></label>
                </div>
            </template>
            <template #cell(repr_ind_act)="row">
                <b-form-checkbox
                    :value="1"
                    v-if="row.item.repr_ind_act"
                    v-model.number="row.item.repr_ind_act"
                    name="check-button"
                    @change="$emit('checkboxX', row.item, row.index, $event)"
                    switch
                >
                </b-form-checkbox>
                <b-form-checkbox
                    v-else
                    v-model="row.item.repr_ind_act"
                    name="check-button"
                    @change="$emit('checkboxX', row.item, row.index, $event)"
                    switch
                >
                </b-form-checkbox>
            </template>
            <template #cell(com_ind_acti)="row">
                <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        :id="row.item.com_id"
                        @change="
                            $emit(
                                'checkboxX',
                                row.item,
                                row.index,
                                $event.target.checked
                            )
                        "
                        v-model="row.item.com_ind_acti"
                    />
                    <label
                        class="custom-control-label"
                        :for="row.item.com_id"
                    ></label>
                </div>
            </template>
            <template #cell(cali_ind_act)="row">
                <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        :id="row.item.cali_id"
                        @change="
                            $emit(
                                'checkboxX',
                                row.item,
                                row.index,
                                $event.target.checked
                            )
                        "
                        v-model="row.item.cali_ind_act"
                    />
                    <label
                        class="custom-control-label"
                        :for="row.item.cali_id"
                    ></label>
                </div>
            </template>
            <template #cell(tpcl_ind_act)="row">
                <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        :id="row.item.tpcl_id"
                        @change="
                            $emit(
                                'checkboxX',
                                row.item,
                                row.index,
                                $event.target.checked
                            )
                        "
                        v-model="row.item.tpcl_ind_act"
                    />
                    <label
                        class="custom-control-label"
                        :for="row.item.tpcl_id"
                    ></label>
                </div>
            </template>
            <template #cell(prod_ind_act)="row">
                <b-form-checkbox
                    :value="1"
                    v-if="row.item.prod_ind_act"
                    v-model.number="row.item.prod_ind_act"
                    name="check-button"
                    @change="
                        $emit(
                            'checkboxActivoProdLena',
                            row.item,
                            row.index,
                            $event
                        )
                    "
                    switch
                >
                </b-form-checkbox>
                <b-form-checkbox
                    v-else
                    v-model="row.item.prod_ind_act"
                    name="check-button"
                    @change="
                        $emit(
                            'checkboxActivoProdLena',
                            row.item,
                            row.index,
                            $event
                        )
                    "
                    switch
                >
                </b-form-checkbox>
            </template>
            <template #cell(tpcl_cant_estrellas)="row">
                <div v-if="row.item.tpcl_cant_estrellas === 1">
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon icon="star" />
                    <font-awesome-icon icon="star" />
                    <font-awesome-icon icon="star" />
                    <font-awesome-icon icon="star" />
                </div>
                <div v-if="row.item.tpcl_cant_estrellas === 2">
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon icon="star" />
                    <font-awesome-icon icon="star" />
                    <font-awesome-icon icon="star" />
                </div>
                <div v-if="row.item.tpcl_cant_estrellas === 3">
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon icon="star" />
                    <font-awesome-icon icon="star" />
                </div>
                <div v-if="row.item.tpcl_cant_estrellas === 4">
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon icon="star" />
                </div>
                <div v-if="row.item.tpcl_cant_estrellas === 5">
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                    <font-awesome-icon class="estrella-amarilla" icon="star" />
                </div>
            </template>

            <template #cell(actions)="row">
                <div class="botones-tabla-contenedor">
                    <div v-for="(botton, index) in data.acciones" :key="index">
                        <div
                            v-if="botton.nombre == 'eliminar'"
                            :class="botton.class"
                            v-b-modal.modal-advertencia
                            :key="index"
                            @click="
                                eliminar(
                                    botton.mensajeEliminar,
                                    botton.nombre,
                                    row.item,
                                    row.index,
                                    $event.target
                                )
                            "
                        >
                            <font-awesome-icon
                                v-if="botton.icono"
                                :icon="botton.icono"
                            />
                        </div>
                        <div
                            v-if="botton.editarItemModal"
                            :class="botton.class"
                            v-b-modal.modal-agregar
                            :key="index"
                            @click="
                                $emit(
                                    botton.nombre,
                                    row.item,
                                    row.index,
                                    $event.target
                                )
                            "
                        >
                            <font-awesome-icon
                                v-if="botton.icono"
                                :icon="botton.icono"
                            />
                        </div>
                        <div
                            v-if="
                                botton.nombre == 'editar' &&
                                !botton.editarItemModal
                            "
                            :class="botton.class"
                            :key="index"
                            @click="
                                $emit(
                                    botton.nombre,
                                    row.item,
                                    row.index,
                                    $event.target
                                )
                            "
                        >
                            <font-awesome-icon
                                v-if="botton.icono"
                                :icon="botton.icono"
                            />
                        </div>
                    </div>
                </div>
            </template>
            <!-- <template #empty="scope">
                <h4>{{ scope.emptyText }}</h4>
            </template>
            <template #emptyfiltered="scope">
                <h4>{{ scope.emptyFilteredText }}</h4>
            </template> -->
        </b-table>
        <div class="paginacion-contenedor">
            <b-pagination
                v-model="data.currentPage"
                :total-rows="rows"
                :per-page="data.perPage"
                aria-controls="tabla-bv"
            ></b-pagination>
        </div>
        <modal-advertencia
            v-if="showModal"
            :mensaje="mensaje"
            @accionAdvertencia="emite"
        ></modal-advertencia>
    </div>
</template>

<script>
    import modalAdvertencia from "../Components/Common/ModalEliminar.vue";
    import Switch from "../../src/Components/Switch.vue";
    import { library } from "@fortawesome/fontawesome-svg-core";
    import {
        faTrashAlt,
        faPencilAlt,
        faEyeSlash,
    } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    library.add(faTrashAlt, faPencilAlt, faEyeSlash);
    export default {
        props: {
            data: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        data() {
            return {
                filtro: "",
                roww: "",
                indexx: "",
                tupla: "",
                mensaje: "",
                eliminarItem: false,
                showModal: false,
                advertenciaModal:
                    "¿Estás seguro que deseas cerrar Bo Calefacción?",
                check: true,
                activo: this.data.items.activo,
                id: "",
                checkSi: true,
                checkNo: false,
                advertenciaCierre: "agregar",
                transProps: {
                    name: "flip-list",
                },
                filtros: [],
                datos: this.data.items,
            };
        },
        methods: {
            eliminar(mensajeEliminar, row, index, e) {
                this.mensaje = mensajeEliminar;
                this.showModal = true;
                this.roww = row;
                this.indexx = index;
                this.tupla = e;
            },
            emite() {
                this.$emit(this.roww, this.indexx, this.tupla);
            },
            accionFiltro(objeto, index) {
                this.datos = this.data.items;
                this.data.fields.forEach((dat, index) => {
                    if (objeto.key != dat.key && dat.filtro && this.filtros) {
                        if (this.filtros[index]) {
                            this.datos = this.datos.filter((dato) => {
                                dato[dat.key]
                                    .toLowerCase()
                                    .includes(
                                        this.filtros[index].toLowerCase()
                                    );
                            });
                            this.filtro = "";
                        } else {
                            this.filtro = "1";
                        }
                    }
                });
                var aux = [];
                this.datos.forEach((dato) => {
                    if (
                        !objeto.key.includes(".") &&
                        dato[objeto.key]
                            .toLowerCase()
                            .includes(this.filtros[index].toLowerCase())
                    ) {
                        aux.push(dato);
                        this.filtro = "";
                    } else if (objeto.key.includes(".")) {
                        var obj = objeto.key.split(".");
                        if (
                            dato[obj[0]][obj[1]]
                                .toLowerCase()
                                .includes(this.filtros[index].toLowerCase())
                        ) {
                            aux.push(dato);
                        }
                    }
                });
                this.datos = aux;
                var exportFiltro = 1;
                this.$emit("datosFiltro", this.datos);
                this.$emit("exportarFiltro", exportFiltro);
            },
        },
        components: {
            modalAdvertencia,
            "app-switch": Switch,
            "font-awesome-icon": FontAwesomeIcon,
        },
        computed: {
            rows() {
                return this.datos.length;
            },
        },
        created() {
            // this.data.fields.forEach(element => {
            //     this.filtros.push('');
            // });
        },
    };
</script>

<style>
    @media (max-width: 1100px) {
        .paginacion-contenedor {
            margin-top: 15px;
        }
    }
    .estrella-amarilla {
        color: #ffa200;
    }
    .check-false {
        color: #b53636;
    }
    .check-true {
        color: #48759b;
    }
    .boton-agregar {
        border: none;
        background: #eb6919 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 4px;
        opacity: 1;
    }
    .select-exportar {
        width: 315px;
        height: 34px;
        background: #ffffff 0% 0% no-repeat padding-box;
        border: 1px solid #5b5b5b;
        border-radius: 4px;
        opacity: 1;
    }
    .paginacion-contenedor {
        display: flex;
        justify-content: center;
    }
    .page-link {
        color: black !important;
        font-size: 16px;
        font-weight: 600;
    }
    input:focus,
    select:focus,
    select,
    input.form-control:focus {
        outline: none !important;
        outline-width: 0 !important;
        box-shadow: none;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
    }
    .form-control:focus {
        border: 1px solid red;
        outline: none;
    }
    th {
        background-color: #48759b;
        border: 1px solid white;
        color: white;
    }
    .filtro-tabla {
        background-color: #fcdbc7;
    }
    .b-table-top-row {
        border-bottom: none;
    }
    .btn-eliminar {
        border: 2px solid #e84a4a;
        border-radius: 4px;
        opacity: 1;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 10px;
        padding-right: 10px;
        color: #e84a4a;
        border-radius: 3px;
        margin-left: 5px;
        cursor: pointer;
    }
    .btn-editar {
        border: 2px solid #33a2b5;
        border-radius: 4px;
        opacity: 1;
        color: #33a2b5;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 5px;
        cursor: pointer;
    }
    .botones-tabla-contenedor {
        display: flex;
        justify-content: center;
    }

    .page-item.active .page-link {
        background-color: #48759b !important;
        color: #fff !important;
    }

    tr {
        border-bottom: 1.1px solid #48759b;
    }
    .card-title {
        font-weight: 600;
    }
    .btn-primary {
        background: #eb6919 !important;
    }
</style>
