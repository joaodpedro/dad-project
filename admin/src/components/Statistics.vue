<template>
    <div class="statistics">
        <h1>{{ msg }}</h1>
        {{ this.$root.$data['loggedUser'].name}}
    </div>
</template>

<script>
export default {
    name: 'Statistics',
    data () {
        return {
            msg: 'Statistics Page'
        }
    }
}
</script>

<style>
</style>
