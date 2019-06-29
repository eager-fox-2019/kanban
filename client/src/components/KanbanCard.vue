<template>
    <div class="margin-m padding-s background-white flex flex-row justify-content-space-between">
      <div>
        <strong><p class="lead">{{kanbanDetail.description}}</p></strong>
        <p>{{kanbanDetail.createdAt}}</p>
      </div>
      <button class="button button-error button-border">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
</template>

<script>
export default {
  props: ['kanbanDetail']
}
</script>
