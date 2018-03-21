<template>
  <div class="row select-dish">
    
    <!-- We pass the model as property to the Sidebar component -->
    <sidebar :model="this.model"/>
    <dishes />
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Dishes from '@/components/Dishes'

  export default {
    props: ['model'],
    components: {
      'sidebar': Sidebar,
      'dishes': Dishes
    }
  }
</script>
