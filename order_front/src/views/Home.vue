<template>
    <div class="container text-center mt-5">
    <h1>首頁</h1>

    <!-- 按鈕 -->
    <button 
        class="btn btn-primary mt-3" 
        data-bs-toggle="modal" 
        data-bs-target="#orderModal"
        @click="fetchOrder">
        產生訂單
    </button>

    <!-- 浮空視窗 Modal -->
    <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="orderModalLabel">建立訂單</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div v-if="loading">載入中...</div>
            <div v-else-if="error" class="text-danger">{{ error }}</div>
            <div v-else-if="order">
                <p><strong>訂單編號：</strong>{{ order.id }}</p>
                <p><strong>金額：</strong>{{ order.totalAmount }} 元</p>
                <p><strong>時間：</strong>{{ order.orderTime }}</p>
            </div>
            <div v-else>尚無訂單資料。</div>
            </div>
            <div div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-success">確認建立</button>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const order = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchOrder = async () => {
    loading.value = true
    error.value = null
    order.value = null
    try {
    // 範例：呼叫後端 API
    const response = await axios.get('http://localhost:8080/api/orders/latest')
    order.value = response.data
    } catch (err) {
    error.value = '讀取訂單資料時發生錯誤'
    console.error(err)
    } finally {
    loading.value = false
    }
}
</script>
