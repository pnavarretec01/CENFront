# Manual de instalación

En este documento se explica como instalar el proyecto Front End de Calefacción en línea.

## Tabla de contenido

-   [Requerimientos](#requerimientos-previos).
-   [Repositorio](#repositorio).
-   [Instalación](#instalación).
-   [Configuración](#configuración).
-   [Actualización de repositorio](#actualización-de-repositorio).

## Requerimientos previos:

-   Node.js. Recomendada: 14.18
-   Npm. Recomendada: 6.14
-   Git

### Archivo .conf

Archivo Configuración Apache

```
<VirtualHost *:80>
  ServerName bel.paipai.cne.cl
  ServerAdmin soporte@cne.cl
  DocumentRoot /var/www/html/bel-ciudadano/dist/bel
  <Directory /var/www/html/bel-ciudadano/dist/bel>
        AllowOverride All
        Require all granted
        Options -Indexes +FollowSymLinks
  </Directory>
</VirtualHost>
```

## Repositorio:

Clonar en el directorio designado el repositorio:

```sh
git clone -b developer/patricio https://pnavarretec@bitbucket.org/desarrollocneti/calefaccionenlinea-frontoffice.git
```

## Instalación:

Clonar en el directorio designado el repositorio:

```sh
cd adv-app-cne-calefaccionenlinea-web                                                       # entra al directorio del proyecto
cp .env.example .env                                                                        # copia la base del archivo .env
npm install                                                                                 # instala dependencias de NodeJS
```

## Configuración

En el archivo `.env` debes cambiar el siguiente parámetro, que corresponde a la URL base donde se consumen las APIS:

-   `VUE_APP_SERVICE_URL`: URL proyecto Backend.

Situado en la carpeta contenedora del proyecto, ejecutar el siguiente comando:

```sh
npm run build
```

Esto generará una carpeta llamada `dist`, contendrá los archivos necesarios para ejecutar tu proyecto.<br>

Mover todos los archivos de la carpeta `dist` a una carpeta `public` creada en el mismo directorio justo a `adv-app-cne-calefaccionenlinea-web `

## Actualización de repositorio:

```sh
cd adv-app-cne-calefaccionenlinea-web                                                       # entra al directorio del proyecto
git pull origin developer/patricio                                                          # hacemos pull con nuevos cambios en la rama del repositorio 
npm install                                                                                 # instala dependencias de NodeJS
```
Situado en la carpeta contenedora del proyecto, ejecutar el siguiente comando:

```sh
npm run build
```

Esto generará una carpeta llamada `dist`, contendrá los archivos necesarios para ejecutar tu proyecto, esta carpeta la reemplazaremos por la que ya se encuentra con la versión antigua de nuestro proyecto.<br>