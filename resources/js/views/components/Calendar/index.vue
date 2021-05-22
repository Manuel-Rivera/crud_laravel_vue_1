<template>
    <v-container  fluid>
            <v-row class="fill-height">
                <v-col>
                <v-sheet max-width="1200" class="mx-auto">
                    <v-calendar
                    locale="es"
                    v-model="value"
                    color="accent"
                    type="week"
                    interval-width="30"
                    interval-height="35"
                    :weekdays="[1, 2, 3, 4, 5, 6]"
                    :events="eventos()"
                    :event-color="getEventColor"
                    :event-ripple="false"
                    :first-interval= 7
                    :interval-count= 13
                    @mousedown:event="startDrag"
                    @mousedown:time="startTime"
                    @mousemove:time="mouseMove"
                     @mouseup:time="endDrag"
                     @mouseleave.native="cancelDrag"
                    >
                     <!--
                       @mouseup:time="endDrag"
                    @mouseleave.native="cancelDrag" -->
                    <template v-slot:event="{ event, timed, eventSummary }">
                        <div
                        class="v-event-draggable"
                        v-html="eventSummary()"
                        ></div>
                        <div
                        v-if="timed"
                        class="v-event-drag-bottom"
                        @mousedown.stop="extendBottom(event)"
                        ></div>
                    </template>
                    </v-calendar>
                </v-sheet>
                </v-col>
            </v-row>
            <!-- {{events}} -->
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      value: '',
    //   events: [
    //        { "name": "Calculo II", "color": "#2196F3", "start": 1621281600000, "end": 1621284300000, "timed": true },
    //        { "name": "Administración", "color": "#757575", "start": 1621281600000, "end": 1621284300000, "timed": true },
    //     //     { "name": "Conference", "color": "#4CAF50", "start": 1621281600000, "end": 1621284300000, "timed": true }

    //   ],
      grupos:{
          "calculoI":[
            { "name": "Calculo I", "color": "#2196F3", "start": 1621354500000, "end": 1621354600000, "timed": true },
            { "name": "Calculo I", "color": "red", "start": 1621282700000, "end": 1621285600000, "timed": true },
            { "name": "Calculo I", "color": "#757575", "start": 1621281600000, "end": 1621284300000, "timed": true },
          ],
          "calculoII":[
            { "name": "Calculo II", "color": "red", "start": 1621291700000, "end": 1621294400000, "timed": true },
            { "name": "Calculo II", "color": "#757575", "start": 1621291700000, "end": 1621294400000, "timed": true },
            { "name": "Calculo II", "color": "#757575", "start": 1621291700000, "end": 1621294400000, "timed": true },
          ]
      },
      colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      dragEvent: [],
      dragStart: null,
      createEvent: null,
      createStart: null,
      extendOriginal: null,
    }),
    methods: {
      eventos(){
        let grupos=new Array();
       for (let property in this.grupos){
          this.grupos[property].map(e=>{grupos.push(e)})
       }
       return grupos;
      },
      startDrag (k) {
          //console.log(k);
          //console.log(k.event.name);
          let dragGrupo=new Array();
          for (let property in this.grupos){
             this.grupos[property].map(e=>{
               e.name==k.event.name? dragGrupo.push(e):null;
               })
          }

          dragGrupo.forEach(element => {
          let {timed}=element
          if (element,timed){
            this.dragEvent.push(element)
            this.dragTime = null
            this.extendOriginal = null
          }
          // let {event,timed}=element;
          // console.log(event);
            // if (event && timed) {
            //   this.dragEvent = event
            //   this.dragTime = null
            //   this.extendOriginal = null
            // }
          });
          //console.log(this.dragEvent);
        // { event, timed }
        //   console.log(event);
        // if (event && timed) {
        //   this.dragEvent = event
        //   this.dragTime = null
        //   this.extendOriginal = null
        // }
      },
      startTime (tms) {
        const mouse = this.toTime(tms)
        let {dragEvent}=this
        dragEvent.forEach((event)=>{
          //console.log({...event,dragTime:(mouse-event.start)});
          Object.assign(event,{dragTime:(mouse-event.start)});
        });
        // dragEvent:{
        //   dragTime:mouse-dragEvent.start
        // }
        // console.log(dragEvent);
        // if (dragEvent && this.dragTime === null) {
        //   //const start = dragEvent[0].start

        //   this.dragTime = mouse - start

        // }
        // else {
        //   this.createStart = this.roundTime(mouse)
        //   this.createEvent = {
        //     name: `Event #${this.events.length}`,
        //     color: this.rndElement(this.colors),
        //     start: this.createStart,?
        //     end: this.createStart,
        //     timed: true,
        //   }

        //   this.events.push(this.createEvent)
        // }
      },
      extendBottom (event) {
        this.createEvent = event
        this.createStart = event.start
        this.extendOriginal = event.end
      },
      mouseMove (tms) {
        this.dragEvent.forEach((event)=>{
          const mouse = this.toTime(tms)

          if (event !== null) {
            const start = event.start
            const end = event.end
            const duration = end - start
            const newStartTime = mouse - event.dragTime
            const newStart = this.roundTime(newStartTime)
            const newEnd = newStart + duration

            event.start = newStart
             event.end = newEnd
          }else if (this.createEvent && this.createStart !== null) {
            const mouseRounded = this.roundTime(mouse, false)
            const min = Math.min(mouseRounded, this.createStart)
            const max = Math.max(mouseRounded, this.createStart)

            this.createEvent.start = min
           this.createEvent.end = max
         }

        })

        // if (this.dragEvent && this.dragTime !== null) {
        //   const start = this.dragEvent.start
        //   const end = this.dragEvent.end
        //   const duration = end - start
        //   const newStartTime = mouse - this.dragTime
        //   const newStart = this.roundTime(newStartTime)
        //   const newEnd = newStart + duration

        //   this.dragEvent.start = newStart
        //   this.dragEvent.end = newEnd
        // } else if (this.createEvent && this.createStart !== null) {
        //   const mouseRounded = this.roundTime(mouse, false)
        //   const min = Math.min(mouseRounded, this.createStart)
        //   const max = Math.max(mouseRounded, this.createStart)

        //   this.createEvent.start = min
        //   this.createEvent.end = max
        // }
      },
      endDrag () {

        this.dragTime = null
        this.dragEvent = []
        this.createEvent = null
        this.createStart = null
        this.extendOriginal = null
      },
      cancelDrag () {
        if (this.createEvent) {
          if (this.extendOriginal) {
            this.createEvent.end = this.extendOriginal
          } else {
            const i = this.events.indexOf(this.createEvent)
            if (i !== -1) {
              this.events.splice(i, 1)
            }
          }
        }

        this.createEvent = null
        this.createStart = null
        this.dragTime = null
        this.dragEvent = []
      },
      roundTime (time, down = true) {
        const roundTo = 15 // minutes
        const roundDownTime = roundTo * 60 * 1000

        return down
          ? time - time % roundDownTime
          : time + (roundDownTime - (time % roundDownTime))
      },
      toTime (tms) {

        return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
      },
      getEventColor (event) {
        const rgb = parseInt(event.color.substring(1), 16)
        const r = (rgb >> 16) & 0xFF
        const g = (rgb >> 8) & 0xFF
        const b = (rgb >> 0) & 0xFF

        return event === this.dragEvent
          ? `rgba(${r}, ${g}, ${b}, 0.7)`
          : event === this.createEvent
            ? `rgba(${r}, ${g}, ${b}, 0.7)`
            : event.color
      },
      getEvents ({ start, end }) {
        //   @change="getEvents"



        const events = []

        const min = new Date(`${start.date}T00:00:00`).getTime()
        const max = new Date(`${end.date}T23:59:59`).getTime()
        const days = (max - min) / 86400000
        let eventCount = this.rnd(days, days + 20)
        eventCount=0;

        for (let i = 0; i < eventCount; i++) {
          const timed = this.rnd(0, 3) !== 0
          const firstTimestamp = this.rnd(min, max)
          const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
          const start = firstTimestamp - (firstTimestamp % 900000)
          const end = start + secondTimestamp

          events.push({
            name: this.rndElement(this.names),
            color: this.rndElement(this.colors),
            start,
            end,
            timed,
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      rndElement (arr) {
        return arr[this.rnd(0, arr.length - 1)]
      },
    },
  }
</script>

<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
  }

  &:hover::after {
    display: block;
  }
}
</style>
