<template>
         <div class="card">
            <header class="card-header">
                <p class="card-header-title" >
                {{ eachTask.title }}{{eachTask.id}}
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </a>
            </header>
            <div class="card-content">
                <div class="content">
                    <p>{{eachTask.description}}</p>
                </div>
            </div>
            <footer class="card-footer">
                <a v-if="kan.status == 'Back-Log'" @click="nexxxt('Back-Log')" href="#" class="card-footer-item">Detail</a>
                <a v-if="kan.status == 'To-Do'" @click="nexxxt('To-Do')" href="#" class="card-footer-item">Detail</a>
                <a v-if="kan.status == 'Doing'" @click="nexxxt('Doing')" href="#" class="card-footer-item">Detail</a>
                
            </footer>
    </div>
</template>

<script>
export default {
    name : 'CardOuter',
    props : ['eachTask', 'kan'],
    data(){
        return{

        }
    },
    methods : {
        nexxxt(thx){
            this.$emit('goNext', thx)
        }
    }
}
</script>

<style>

</style>
