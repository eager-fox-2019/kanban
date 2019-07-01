<template>
         <div class="card">
            <header class="card-header">
                <p class="card-header-title" >
                {{ eachTask.status }}
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
                <a href="#" class="card-footer-item">Detail</a>
            </footer>
    </div>
</template>

<script>
export default {
    name : 'CardOuter',
    props : ['eachTask'],
    data(){
        return{

        }
    }
}
</script>

<style>

</style>
