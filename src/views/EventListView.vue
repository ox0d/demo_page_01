<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

const props = defineProps(['page'])

const events = ref(null)
let totalEvents = ref(0)

onMounted(() => {
  watchEffect(() => {
    events.value = null

      EventService.getEvents(2, props.page)
        .then((response) => {
          events.value = response.data
          // console.log(events.value)
          totalEvents.value = response.headers['x-total-count']
          // console.log(totalEvents.value)
        })
        .catch((error) => {
          console.log(error)
        }
    )
  })
})

let myArray = computed(() => {
  // console.log(totalEvents.value)
    if(parseInt(totalEvents.value) != 0){
      return new Array(parseInt(totalEvents.value) - 1).fill(0)
    }
    return "Empty"
})

let hasNextPage = computed(() => {
  // console.log(props.page + " < " + totalEvents.value)
  // let totalPages = Math.ceil(totalEvents.value / 2)
  // console.log(props.page + " < " + totalPages)

  // let totalPages = totalEvents.value The logic here deppends on your need
  // so there is no right or wrong way to do it
  let totalPages = totalEvents.value - 1


  return props.page < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>

  <div class="events">
    <EventCard v-for="event in events" v-bind:key="event.id" v-bind:event="event" />
  </div>

  <div class="pagination">
    <RouterLink
    id="page-prev"
      v-bind:to="{
        name: 'event-list',
        query: {
          page: props.page - 1
        }
      }"
      rel="prev"
      v-if="props.page != 1"
      >&#60; Previous</RouterLink
    >

    <RouterLink 
    class="page-numbers"
  v-for="(pageNumber, index) in myArray" v-bind:key="index"
  
  v-bind:to="{
    name: 'event-list',
    query: {
      page: index + 1
    }
  }">{{ index + 1 }}</RouterLink>

    <RouterLink
    id="page-next"
      v-bind:to="{
        name: 'event-list',
        query: {
          page: props.page + 1
        }
      }"
      rel="next"
      v-if="hasNextPage"
      >Next &#62;</RouterLink
    >
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination{
  display: flex;
  width: 290px;
  margin-left: auto;
  margin-right: auto;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev{
  text-align: left;
}

#page-next {
  text-align: right;
}
.page-numbers {
  text-align: center;
  margin: 0 5px; /* Add some horizontal spacing between pagination numbers */
}
</style>
