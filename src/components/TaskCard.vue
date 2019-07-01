<template>
    <div>
      <div>
        <b-card
          :header="title"
          align="center"
        >
          <b-card-text>{{ description }}</b-card-text>
          <slot></slot>
        </b-card>
      </div>
    </div>
</template>

<script>
export default {
  props: ['title', 'description'],
  data: function(){
    return {}
  }
}
</script>

<style>

</style>
