<template>

  <div>
    <div style="margin-bottom: 30px;">
      <el-link :icon="Star" type="danger" @click="goStar"> 去 Github 点亮小星星，支持一下 ^_^</el-link>
    </div>

    <el-upload
        class="upload-demo"
        ref="uploadRef"
        drag
        :auto-upload="false"
        :limit="1"
        :on-change="change"
        :on-exceed="exceed"
        :on-remove="remove"
        :http-request="upload"
        accept="audio/*"
    >
      <!--      style="color: #d2297a;"-->
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        拖动文件至此或 <em>点击选择</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          仅允许上传音频格式文件( audio/* )，最大 50MB
        </div>
      </template>
    </el-upload>

    <div style="margin-top: 30px;">
      <el-popover
          :disabled="store.status === 1"
          trigger="hover"
          :content="''"
          title="请先扫码完成登录"
          placement="bottom"
          :width="160"
      >
        <template #reference>
          <el-button type="primary" @click="submitUpload" :class="shake ? 'animate__animated animate__shakeX':''">
            点击提交
            <el-icon class="el-icon--right">
              <Upload/>
            </el-icon>
          </el-button>
        </template>
      </el-popover>
      <el-button text type="info" @click="centerDialogVisible = true">
        反馈
        <el-icon class="el-icon--right">
          <Edit/>
        </el-icon>
      </el-button>

    </div>


    <el-dialog v-model="centerDialogVisible" title="反馈" width="30%" center>
      <el-input
          v-model="textarea"
          :rows="5"
          type="textarea"
          placeholder="请输入反馈内容"
          :maxlength="200"
          :minlength="5"
          show-word-limit
      />
      <template #footer>
      <span class="dialog-footer">
<!--        <el-button @click="centerDialogVisible = false">取消</el-button>-->
        <el-button type="primary" @click="feedback">
          提交反馈
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useLoginStatusStore} from '@/stores/login';
import {ElLoading, ElMessage, ElNotification} from 'element-plus';
import {http} from '@/common/axios';
import {Edit, Star} from '@element-plus/icons-vue';

const store = useLoginStatusStore();
const fileList = ref([]);

const loginStatus = computed(() => store.status);

const uploadRef = ref();
const uploading = ref(false);
const shake = ref(false);

// 反馈
const centerDialogVisible = ref(false);
const textarea = ref('');

const feedback = () => {
  console.log(textarea.value);
  if (!textarea.value) {
    return;
  }

  http({
    url: '/api/feedback',
    data: {
      comment: textarea.value,
    },
  }).then(data => {
    notify({message: data, type: 'success'});
    centerDialogVisible.value = false;
  }).catch(err => {
    message({message: err, type: 'error'});
  }).finally(() => {
    // loading.value = false;
  });

};

const submitUpload = () => {
  if (loginStatus.value !== 1) {
    console.log(`请登录`);
    shake.value = true;

    setTimeout(() => {
      shake.value = false;
    }, 400);
    return;
  }


  console.log(fileList.value);

  if (fileList.value.length <= 0) {
    message({message: '请选择文件', type: 'error'});
    return;
  }

  uploadRef.value.submit();
};

const change = (file, b) => {
  fileList.value.push(file);
};

const remove = (file, b) => {
  fileList.value = fileList.value.filter(v => {
    return v.uid !== file.uid;
  });

  console.log(fileList.value);

};

const upload = (option) => {
  const formData = new FormData();
  formData.append('file', option.file);
  const loadingInstance1 = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: '鉴于服务器性能，上传时间可能略长，请勿刷新页面，耐心等待...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  http({
    url: '/api/upload/one',
    data: formData,
    header: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(data => {
    console.log(data);
    notify({message: data, type: 'success'});
    uploadRef.value.clearFiles();
    fileList.value = [];
  }).catch(err => {
    console.log(err);
    message({message: err, type: 'error'});
  }).finally(() => {
    // loading.value = false;
    loadingInstance1.close();
  });
};

const goStar = () => {
  console.log('new');
  window.open('https://github.com/lulu-ls/cloud-uploader');
};

const exceed = () => {
  message({message: '目前仅支持单个文件上传', type: 'error'});
};

const notify = ({title, message, type}) => {
  ElNotification({
    title: title || '提示',
    message: message,
    type: type || 'info',
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