<template>
  <div>
    <el-container>
      <el-aside width="40%">
        <Login></Login>
      </el-aside>
      <el-main>
        <Upload></Upload>
      </el-main>
    </el-container>


  </div>
</template>

<script>
import Login from './components/Login.vue';
import Upload from './components/Upload.vue';

export default {
  name: 'App',
  components: {
    Login, Upload
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/*:root {*/
/*  --el-color-primary: green;*/
/*}*/
</style>
