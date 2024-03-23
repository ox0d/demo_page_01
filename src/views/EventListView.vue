<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

const props = defineProps(['page'])

const events = ref(null)
let totalPages = ref(0)

onMounted(() => {
  watchEffect(() => {
    events.value = null

    EventService.getEvents(2, props.page)
      .then((response) => {
        events.value = response.data
        totalPages.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log(error)
      })
  })
})

let hasNextPage = computed(() => {
  return props.page < totalPages.value - 1
})

</script>

<template>
  <h1>Events For Good</h1>
  <!-- <h1>{{ props.page }}</h1> -->

  <div class="events">
    <EventCard v-for="event in events" v-bind:key="event.id" v-bind:event="event" />
  </div>

  <div class="pagination">
    <RouterLink id="page-prev" v-if="props.page != 1" :to="{name: 'event-list', query: { page: props.page - 1}}">&lt; Previous</RouterLink>

    <RouterLink id="page-next" v-if="hasNextPage" :to="{ name: 'event-list', query: { page: props.page + 1 } }">Next &gt;</RouterLink>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
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

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
