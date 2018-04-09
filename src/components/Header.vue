<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand" active-class="active">Daffodil</router-link>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/calendar" activeClass="active" tag="li"><a>Calendar</a></router-link>                 
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  
}
</script>

<style scoped>
@import url(https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css);
</style>
