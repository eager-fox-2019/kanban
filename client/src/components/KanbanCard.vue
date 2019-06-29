<template>
    <div class="kanbanCard margin-m padding-s background-white flex flex-row justify-content-space-between">
      <div>
        <strong><p class="lead">{{kanbanDetail.title}}</p></strong>
        <p style="margin-top: 5px;">{{kanbanDetail.description}}</p>
        <p>{{ toDateString(kanbanDetail.createdAt) }}</p>
      </div>
      <button @click="deleteCard" class="button button-error button-border">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
</template>

<script>
export default {
  props: ['kanbanDetail', 'index', 'group'],
  methods: {
    deleteCard () {
      this.$modal.show('dialog', {
        title: 'Are you sure?',
        text: 'Delete this: ' + this.kanbanDetail.title,
        buttons: [
          {
            title: 'Yes',
            handler: () => {
              this.$emit('deleted', this.index, this.group)
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Close'
          }
        ]
      })
    },
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

<style>
.kanbanCard {
  cursor: move
}
</style>
