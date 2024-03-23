<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToProductList = () => {
  router.push('/about')
}
</script>

<template>
  <h1 v-on:click="goToProductList">ProductReviews</h1>
</template>
