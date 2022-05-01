<template>
    <div>
        <div class="form-group">
            <label for="exampleFormControlInput1">Nombre</label>
            <input type="text" class="form-control" v-model="nombre" disabled />
            <br />
            <label for="exampleFormControlInput1">Teléfono</label>
            <input
                type="text"
                class="form-control"
                v-model="telefono"
                disabled
            />
            <br />
            <label for="exampleFormControlInput1">E-mail</label>
            <input type="text" class="form-control" v-model="correo" disabled />
            <br />
            <label for="region">Región</label>
            <select multiple class="form-control" id="region" disabled>
                <option v-for="(region, index) in regiones" :key="index">
                    {{ region.reg_nombre }}
                </option>
            </select>
            <br />
            <label for="comuna">Comuna</label>
            <select multiple class="form-control" id="comuna" disabled>
                <option v-for="(comuna, index) in comunas" :key="index">
                    {{ comuna.com_nombre }}
                </option>
            </select>
            <br />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                datosUauario: "",
                nombre: "",
                correo: "",
                telefono: "",
                regiones: {},
                comunas: {},
            };
        },
        methods: {
            obtenerUsuario() {
                var usuario = JSON.parse(localStorage.getItem("dataUser"));
                this.datosUauario = usuario;
                this.nombre = usuario.usua_nombre;
                this.correo = usuario.usua_correo;
                this.telefono = usuario.usua_telefono;
                this.regiones = usuario.regiones;
                this.comunas = usuario.comunas;
            },
        },
        mounted() {
            this.obtenerUsuario();
        },
    };
</script>

<style></style>
