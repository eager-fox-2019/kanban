<template>
  <div>
    <b-col>
      <div>
        <b-card
          :header="status"
          :header-bg-variant="color"
          header-text-variant="white"
          align="center"
        >
          <slot></slot>
        </b-card>
      </div>
    </b-col>
  </div>
</template>

<script>
export default {
  props: ['status', 'color', 'model'],
  components: {
    
  },
  data: function(){
    return {}
  }
}
</script>
