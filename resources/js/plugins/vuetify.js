import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import color from 'vuetify/es5/util/colors'

import '../sass/override.sass'


Vue.use(Vuetify)

let ops = {
    //customVariables: ['~/assets/variables.scss'],
    theme: {
        options: { customProperties: true },
        dark: false,
        themes: {
            light: {
                backgrnd: color.grey.lighten4
            },
            dark: {
                primary: color.blue.darken2,
                accent: color.grey.darken3,
                secondary: color.amber.darken3,
                info: color.teal.lighten1,
                warning: color.amber.base,
                error: color.deepOrange.accent4,
                success: color.green.accent3,
                backgrnd: color.grey.darken3
            }
        }
    }
}

export default new Vuetify(ops)