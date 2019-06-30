<template>
    <nav class="navbar navbar-expand-lg">
      <div id="navbar-menu" class="mx-auto">
        <h1 class="mt-2"><span>KANFUN</span> <span> BOARD</span></h1>
      </div>
      <b-button id="add-button" v-b-modal.modal-center style="position:absolute; right: 20%;">Add New Task!</b-button>
    </nav>

</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
 #add-button {
   padding: 10px;
   font-size: 20px;
   width: 10%;
 }

</style>
