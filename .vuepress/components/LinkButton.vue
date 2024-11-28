<template>
    <div class="info-card">
        <div class="info-header">
            <img v-if="icon" :src="icon" alt="Icon" class="info-icon" />
            <button class="info-button" @click="toggleDetails">{{ text }}</button>
            <div v-if="showDetails" class="info-details">
                <!-- 使用 CSS 样式实现换行 -->
                <!-- <p class="break-line">{{ details }}</p> -->
                <!-- 使用 v-html 渲染详细说明，允许包含 <br> 标签 -->
                <p v-html="details"></p>
                <p>{{ url }}</p>
                <button class="info-copy-button" @click="copyToClipboard(url)">
                    <p class="info-text">{{ buttonText }}</p>
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const showDetails = ref(false);

const toggleDetails = () => {
    showDetails.value = !showDetails.value;
};

const copyToClipboard = (text) => {
    if (!text) return;

    try {
        const result = navigator.clipboard.writeText(text);

        // 修改按钮文本以指示复制成功
        buttonText.value = '已复制';
        setTimeout(() => {
            buttonText.value = '复制';
        }, 1000);

        return result;
    } catch {
        // 备用复制方法，与之前的示例相同
        // ...
    }
};

// 接受传入的属性
const props = defineProps({
    icon: String,
    text: String,
    url: String,
    details: String,
});

// 初始化按钮文本
const buttonText = ref('复制');
</script>
  
<style scoped>
/* 样式可以根据需要自定义 */
.break-line {
    white-space: pre-line;
    /* 使用 pre-line 属性允许保留换行符 */
}

.info-card {
    /* border: 1px solid #ccc; */
    padding: 10px;
    margin: 10px;
}

.info-header {
    display: flex;
    align-items: center;
}

.info-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.info-text {
    flex: 1;
}

/* 按钮样式 */
.info-button {
    background-color: #007bff;
    /* color: #fff; */
    /* border: none; */
    padding: 8px 16px;
    /* 调整按钮内边距 */
    cursor: pointer;
    border-radius: 4px;
    /* 圆角边框 */
    transition: background-color 0.3s ease;
    /* 添加过渡效果 */
}

.info-button:hover {
    background-color: #0056b3;
    /* 悬停时的背景颜色 */
}

.info-details {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    /* background-color: #f9f9f9; */
}

.info-copy-button {
    background-color: #ffae00;
    /* color: #fff; */
    border: none;
    padding: 5px 10px;
    /* 调整按钮内边距 */
    cursor: pointer;
    border-radius: 4px;
}
</style>
  