<template>
<section class="pet-app">
  <pet-filter></pet-filter>
  <pet-list></pet-list>
  <app-footer></app-footer>
</section>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>