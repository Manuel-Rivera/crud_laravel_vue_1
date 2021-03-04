<template>
<v-container fluid >
<v-row class="mt-5">
    <v-col cols="12" sm="4" v-for="(item, index) in items" :key="index">
        <v-card>
           <v-sheet
            class="v-sheet--offset mx-auto"
            :color="item.color"
            elevation="12"
            max-width="calc(100% - 32px)"
        >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>
        </v-card>
    </v-col>
</v-row>

<v-row>
    <v-col cols="12">
        <v-card>
            <v-container fluid>
            <!-- Busqueda matricula y botones -->
            <v-row justify="space-between" class="ma-2">
                <v-col cols="12" md="6" lg="3" class="d-flex flex-row flex-wrap">
                   <v-text-field
                   class="flex-wrap"
                   solo
                   label="Buscar matricula"
                   append-icon="mdi-magnify"
                   hide-details
                   v-model="SearchMatricula"
                   ></v-text-field>
                 </v-col>
                 <v-col>
                    <v-btn
                        color="primary"
                        class="ma-2 white--text flex-wrap"
                         @click.stop="adSearch = !adSearch"
                        >
                        Avanzada
                        <v-icon
                        right
                        dark
                        v-if="adSearch"
                        >
                        mdi-close
                        </v-icon>
                        <v-icon
                        right
                        dark
                        v-else
                        >
                        mdi-magnify
                        </v-icon>

                    </v-btn>
                 </v-col>
                <v-col  class="d-flex flex-row flex-wrap justify-end">
                        <v-btn
                        color="blue-grey"
                        class="ma-2 white--text"
                        @click="csvDialog=true"
                        >
                        CSV
                        <v-icon
                        right
                        dark
                        >
                        mdi-plus
                        </v-icon>
                        </v-btn>
                         <v-btn
                        color="accent"
                        class="ma-2 white--text"
                        @click="addItem()"
                        >
                        Agregar
                        <v-icon
                        right
                        dark
                        >
                        mdi-plus
                        </v-icon>
                        </v-btn>
                </v-col>
            </v-row >
            <!-- Busqueda avanzada -->
            <v-row class="ma-1" v-show="adSearch">
                <v-col cols="12">
                        <v-card class="d-flex flex-col flex-wrap elevation-2" >

                             <v-text-field
                            class="ma-3"
                            dense
                            outlined
                            label="Buscar nombre"
                            append-icon="mdi-magnify"
                            hide-details
                            v-model="SearchNombre"
                            ></v-text-field>

                            <v-text-field
                            class="ma-3"
                            dense
                            outlined
                            label="Buscar apellido materno"
                            append-icon="mdi-magnify"
                            hide-details
                            v-model="SearchApMa"
                            ></v-text-field>

                            <v-text-field
                            class="ma-3"
                            dense
                            outlined
                            label="Buscar apellido paterno"
                            append-icon="mdi-magnify"
                            hide-details
                            v-model="SearchApPa"
                            ></v-text-field>

                            <v-text-field
                            class="ma-3"
                            dense
                            outlined
                            label="Buscar edad"
                            append-icon="mdi-magnify"
                            hide-details
                            v-model="SearchEdad"
                            ></v-text-field>
                        </v-card>
                </v-col>
            </v-row>
            <!-- Data table -->
            <v-row class="ma-1">
                <v-col cols="12">
                    <v-data-table :headers="headers" :items="desserts" class="elevation-2">
                        <!-- <template  v-slot:item.actions="{ item }"> -->
                        <template  v-slot:[`item.actions`]="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                            small
                                @click="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
            <!-- Dialog agregar y editar -->
            <v-row justify="center">
                <v-dialog
                persistent
                v-model="diagEditAdd"
                max-width="600px"
                >
                     <v-card>
                            <v-card-title>
                            <span class="headline">Perfil de ususario</span>
                            </v-card-title>
                            <v-card-text>
                            <v-container>
                                <v-row>
                                <!-- matricula y edad-->
                                <v-col cols="12" class="d-flex flex-row flex-wrap">
                                    <v-text-field
                                    label="Matricula"
                                    required
                                    v-model="copyItem.matricula"
                                    ></v-text-field>
                                    <v-spacer></v-spacer>
                                    <v-text-field
                                    type="number"
                                    label="Edad"
                                    required
                                    v-model="copyItem.edad"
                                    ></v-text-field>
                                </v-col>
                                <!-- nombre -->
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    label="Nombre"
                                    required
                                    v-model="copyItem.nombre"
                                    ></v-text-field>
                                </v-col>
                                <!-- apma -->
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    required
                                    label="Apellido materno"
                                    v-model="copyItem.apma"
                                    ></v-text-field>
                                </v-col>
                                <!-- appa -->
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    label="Apellido paterno"
                                    v-model="copyItem.appa"
                                    required
                                    ></v-text-field>
                                </v-col>

                                </v-row>
                            </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="diagEditAdd = false"
                            >
                                Cerrar
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="saveItem"
                            >
                                Guardar
                            </v-btn>
                            </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
            <!-- Dialog eliminiar -->
            <v-row justify="center">
                <v-dialog
                v-model="diagDelete"
                max-width="300px"
                >
                     <v-card>
                            <v-card-title>
                            <span class="headline">Eliminar ususario</span>
                            </v-card-title>
                            <v-card-text>
                                <h3>
                                    {{itemToDelete.matricula}}
                                    {{itemToDelete.nombre}}
                                    {{itemToDelete.apma}}
                                    {{itemToDelete.appa}}
                                    {{itemToDelete.edad}}
                                </h3>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="diagDelete = false"
                            >
                                Cerrar
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="confirmDeleteItem"
                            >
                                Confirmar
                            </v-btn>
                            </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
            <!-- Diag CSV -->
            <v-row justify="center">
                    <v-dialog
                    v-model="csvDialog"
                    hide-overlay
                    transition="dialog-bottom-transition"
                    >
                    <v-card>
                        <v-toolbar
                        dark
                        color="primary"
                        >
                        <v-btn
                            icon
                            dark
                            @click="csvDialog = false"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Settings</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn
                            dark
                            text
                            @click="dialog = false"
                            >
                            Save
                            </v-btn>
                        </v-toolbar-items>
                        </v-toolbar>
                        <v-row class="ma-2">
                            <v-col cols="12" md="6" lg="4" class="d-flex flex-row flex-wrap">
                               <v-file-input
                                hide-details
                                accept="image/*"
                                label="File input"
                                ></v-file-input>
                                <v-btn
                                color="primary"
                                class="ma-2 white--text flex-wrap"
                                @click.stop="adSearch = !adSearch"
                                >
                                Subir
                                <v-icon
                                right
                                dark
                                >
                                mdi-upload
                                </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <!-- Data table -->
                        <v-row class="ma-1">
                            <v-col cols="12">
                                <v-data-table :headers="headers" :items="desserts" class="elevation-2">
                                    <!-- <template  v-slot:item.actions="{ item }"> -->
                                    <template  v-slot:[`item.actions`]="{ item }">
                                        <v-icon
                                            small
                                            class="mr-2"
                                            @click="editItem(item)"
                                        >
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon
                                        small
                                            @click="deleteItem(item)"
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-card>
                    </v-dialog>
            </v-row>
          </v-container>
        </v-card>
    </v-col>
</v-row>


</v-container>
</template>
<script>
import axios from 'axios'

export default {
    name:"Crud",
    data:()=>({
      //graphics
      items:[{
            color:"primary"
        },{
            color:"green"
        },{
            color:"warning"
      }],
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
      //Table
      headers: [
        {
          text: 'Matricula',
          align: 'start',
          sortable: false,
          value: 'matricula',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellido Materno', value: 'apma' },
        { text: 'Apellido Paterno', value: 'appa' },
        { text: 'Edad', value: 'edad' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      alldesserts:[],
      desserts:[],
      //Busqueda avanzada
      adSearch:false,
      //Tipos de busqueda
      SearchMatricula:"",
      SearchNombre:"",
      SearchApMa:"",
      SearchApPa:"",
      SearchEdad:"",
      //Dialog
      diagEditAdd:false,
      diagDelete:false,
      itemToDelete:"",
      //Dialog-data
      copyItem:"",
      //Tipo de accion editar o crear esto para el metodo gurdar
      typeAction:"",
      //Diag CSV
        csvDialog: false,
        notifications: false,
        sound: true,
        widgets: false,
    }),
    created() {
        this.initialize()
    },
    computed:{
    },
    methods: {
        //Data-table
        async initialize(){
        let res;
        try {
            res=await axios.get('/alumnos');
        } catch (error) {
            console.log(error);
        }

        this.alldesserts = [
          {
            matricula: "159",
            name: 'Frozen Yogurt',
            apma: 6.0,
            appa: 24,
            edad: 4.0,
          },
          {
            matricula: "237",
            name: 'Ice cream sandwich',
            apma: 9.0,
            appa: 37,
            edad: 4.3,
          },
          {
            matricula: "262",
            name: 'Eclair',
            apma: 16.0,
            appa: 23,
            edad: 6.0,
          },
          {
            matricula: "305",
            name: 'Cupcake',
            apma: 3.7,
            appa: 67,
            edad: 4.3,
          },
          {
            matricula: "356",
            name: 'Gingerbread',
            apma: 16.0,
            appa: 49,
            edad: 3.9,
          },
          {
            matricula: "375",
            name: 'Jelly bean',
            apma: 0.0,
            appa: 94,
            edad: 0.0,
          },
          {
            matricula: "392",
            name: 'Lollipop',
            apma: 0.2,
            appa: 98,
            edad: 0,
          },
          {
            matricula: "408",
            name: 'Honeycomb',
            apma: 3.2,
            appa: 87,
            edad: 6.5,
          },
          {
            matricula: "452",
            name: 'Donut',
            apma: 25.0,
            appa: 51,
            edad: 4.9,
          },
          {
            matricula: "518",
            name: 'KitKat',
            apma: 26.0,
            appa: 65,
            edad: 7,
          },
        ]
        this.alldesserts=Array.from(res.data);
        this.desserts=Array.from(this.alldesserts);
        },editItem(item){
            this.typeAction="edit"
            this.diagEditAdd=true;
            this.copyItem=Object.assign({},item);
        },deleteItem(item){
            this.itemToDelete=Object.assign({},item);
            this.diagDelete=true;
        }, async confirmDeleteItem(){
            console.log(this.itemToDelete);
             try {
                await axios.delete('/alumnos/'+this.itemToDelete.id)
                this.alldesserts.filter(ele=>{
                      ele.id==this.itemToDelete.id? this.alldesserts.splice(this.alldesserts.indexOf(ele),1): null;
                   })
                this.desserts= Array.from(this.alldesserts);
            } catch (error) {
                console.log(error);
            }
            this.diagDelete=false;
        },addItem(){
            this.typeAction="add"
            this.diagEditAdd=true;
            let newitem ={
                matricula:"",
                nombre:"",
                apma:"",
                appa:"",
                edad:""
            }
            this.copyItem=Object.assign({},newitem);
        },async saveItem(){
            if(this.typeAction=="add"){
                try {
                    //Es importante quitar la ultima diagonal en post
                    await axios.post('/alumnos',this.copyItem)
                    this.initialize();
                } catch (error) {
                    console.log(error);
                }
                //Se tiene que realizar de nuevo toda la peticion ya que post no recibe ip despues de crear por lo que s necesario recargar todo
            }else if( this.typeAction="edit"){
                try {
                    await axios.put('/alumnos/'+this.copyItem.id,this.copyItem)
                    this.initialize();
                    // this.alldesserts.filter(ele=>{
                    //     if(ele.id==this.copyItem.id){
                    //         this.alldesserts.splice(this.alldesserts.indexOf(ele),1);
                    //         this.alldesserts.push(this.copyItem);
                    //         this.desserts= Array.from(this.alldesserts);
                    //     }
                    //ele.id==this.copyItem.id? this.alldesserts.splice(this.alldesserts.indexOf(ele),1): null;
                    //})
                } catch (error) {
                    console.log(error)
                }
            }
            this.typeAction="";
            this.diagEditAdd=false;
        },
        searchFilter(){
           this.desserts = this.alldesserts.filter(ele=>{
                       //ele.matricula.includes(word)
                    return (ele.matricula.indexOf(this.SearchMatricula.toLowerCase()) ||
                    ele.nombre.toLowerCase().indexOf(this.SearchNombre.toLowerCase()) ||
                    ele.apma.toLowerCase().indexOf(this.SearchApMa.toLowerCase()) ||
                    ele.appa.toLowerCase().indexOf(this.SearchApPa.toLowerCase()) ||
                    ele.edad.toString().indexOf(this.SearchEdad.toLowerCase()))
                     > -1
                    ? ele : null;
                 })
        }
    },
    watch:{
      SearchNombre(){
        this.searchFilter();
      },
      SearchMatricula(){
        this.searchFilter();
      },
      SearchApMa(){
        this.searchFilter();
      },
      SearchApPa(){
        this.searchFilter();
      },
      SearchEdad(){
        this.searchFilter();
      },
      adSearch(){
          if(this.adSearch==false){
              this.SearchNombre="";
              this.SearchMatricula="";
              this.SearchApMa="";
              this.SearchApPa="";
              this.SearchEdad="";
          }
      }
    }
}
</script>

<style lang="sass">
 //.v-main__wrap
 //     background: rgb(245, 241, 241)
.v-main__wrap > .container
     background: var(--v-backgrnd-base)


.v-sheet--offset
    top: -12px
    position: relative

</style>
