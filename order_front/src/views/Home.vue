    <template>
    <div>
        <!-- 加上你的 Navigation -->
        

        <div class="container text-center mt-5">
        <h1>首頁</h1>

        <button 
            class="btn btn-outline-secondary mt-3" 
            @click="goToOrderList">
            查看所有訂單
        </button>
        </div>

        <!-- 建立訂單 Modal -->
        <div 
        class="modal fade" 
        id="orderModal" 
        tabindex="-1"
        >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

            <div class="modal-header" style="background:#c7c7c7; color:white;">
                <h5 class="modal-title">建立訂單</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
                <div v-if="loading" class="text-center py-3">
                <div class="spinner-border"></div>
                <p class="mt-2">載入中...</p>
                </div>

                <div v-else-if="error" class="text-danger text-center">
                {{ error }}
                </div>

                <div v-else-if="order">
                <p><strong>訂單編號：</strong>{{ order.id }}</p>
                <p><strong>金額：</strong>{{ order.totalAmount }} 元</p>
                <p><strong>時間：</strong>{{ order.orderTime }}</p>
                </div>

                <div v-else class="text-center">
                尚無訂單資料。
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-outline-secondary" data-bs-dismiss="modal">關閉</button>
                <button class="btn btn-primary" @click="confirmCreateOrder">確認建立</button>
            </div>

            </div>
        </div>
        </div>

    </div>
    </template>

    <script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import * as bootstrap from "bootstrap"
    import Navigation from './Navigation.vue'
    import { eventBus } from '@/utils/eventBus'

    const router = useRouter()
    const order = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // ⭐ 取得最新訂單
    const fetchOrder = async () => {
    loading.value = true
    error.value = null
    order.value = null

    try {
        const res = await axios.get('http://localhost:8080/api/orders/latest')
        order.value = res.data
    } catch (err) {
        error.value = "讀取訂單資料時發生錯誤"
        console.error(err)
    } finally {
        loading.value = false
    }
    }

    // ⭐ 打開 Modal
    const openModal = () => {
    const modal = new bootstrap.Modal(document.getElementById("orderModal"))
    modal.show()
    }

    // ⭐ Navigation.vue 呼叫本頁
    eventBus.on('openCreateOrder', async () => {
    await fetchOrder()
    openModal()
    })

    const confirmCreateOrder = () => {
    alert("示範：訂單已建立，可串接 POST API")
    }

    const goToOrderList = () => {
    router.push('/orders')
    }
    </script>
