<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
            {{title.toUpperCase()}}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
            <!-- content should be here -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : ['title', 'content']
}
</script>

<style>

</style>
