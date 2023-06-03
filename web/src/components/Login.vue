<template>
  <div>
    <h3>扫码登录</h3>
    <div style="height: 300px;display: flex;align-items: center;justify-content: center;" v-loading="loading">
      <div style="width:250px;height:250px;position: relative;">
        <img :src="img" style="width: 100%;height:100%;" alt=""/>
        <div
            v-if="cover"
            style="width: 100%;height:100%;background-color:rgba(255,255,255,.8);position: absolute;top:0;line-height: 250px;color:#409eff;">
          <el-button
              type="primary"
              text
              bg
              @click="qrcode"
              v-if="statusFresh"
          >点击刷新
          </el-button>
          <el-button
              type="primary"
              text
              bg
              @click="qrcode"
              v-if="statusLogout"
          >退出登录
          </el-button>
        </div>
      </div>
    </div>
    <div> 请使用<span style="color: #1875bf">网易云音乐APP</span>扫码</div>
    <div style="margin-top: 50px;font-size: 12px;color: #676767;"> 暂不支持其他方式登录</div>
    <!--    <h1 class="animate__animated animate__bounce">An animated element</h1>-->

  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import {http} from '@/common/axios';
import {useLoginStatusStore} from '@/stores/login';
import {ElMessage} from 'element-plus';


const loading = ref(false);
const key = ref('');
const url = ref('');
const img = ref('');


const store = useLoginStatusStore();
const status = computed(() => store.status);

const statusFresh = computed(() => status.value === -1);
const statusLogout = computed(() => status.value === 1);
const cover = computed(() => (statusFresh.value || statusLogout.value));

onMounted(() => {
  load();
});

const load = () => {
  loading.value = true;
  http({
    url: '/api/login/check',
    data: {}
  }).then(data => {
    store.setStatus(data);
    // console.log(data);

    if (data !== 1) {
      qrcode();
    }

  }).catch(err => {
    console.log(err);
  }).finally(() => {
    loading.value = false;
  });
};

const qrcode = () => {
  store.setStatus(0);
  loading.value = true;
  http({
    url: '/api/login/qrcode',
    data: {}
  }).then(data => {
    key.value = data.key;
    url.value = data.qrurl;
    img.value = data.qrimg;

    store.setStatus(0);

    setTimeout(() => {
      state();
    }, 5000);

  }).catch(err => {
    console.log(err);
  }).finally(() => {
    loading.value = false;
  });
};


const state = () => {
  http({
    url: '/api/login/code-state',
    data: {
      key: key.value
    }
  }).then(data => {
    console.log(data);
    store.setStatus(data);

    if (data === 1) {
      message({message: '登录成功，请在右侧选择文件上传！', type: 'success'});
      return;
    }

    if (data !== -1 && data !== 1) {
      setTimeout(() => {
        state(key.value);
      }, 5000);
      // this.state(this.key);
    }

  }).catch(err => {
    console.log(err);
  }).finally(() => {
  });
};

const message = ({message, type}) => {
  ElMessage({
    message: message,
    type: type || 'success',
  });
};

</script>

<style scoped>

</style>