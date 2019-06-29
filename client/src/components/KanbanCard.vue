<template>
    <div class="margin-m padding-s background-white flex flex-row justify-content-space-between">
      <div>
        <strong><p class="lead">{{kanbanDetail.title}}</p></strong>
        <p style="margin-top: 5px;">{{kanbanDetail.description}}</p>
        <p>{{ toDateString(kanbanDetail.createdAt) }}</p>
      </div>
      <button class="button button-error button-border">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
</template>

<script>
export default {
  props: ['kanbanDetail'],
  methods: {
    toDateString (date) {
      if (date.toDate) {
        return date.toDate().toDateString()
      } else {
        return date.toDateString()
      }
    }
  }
}
</script>
