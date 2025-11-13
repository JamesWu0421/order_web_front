    <template>
    <div class="container mt-4">
        <h3>使用者訂單查詢</h3>

        <!-- 輸入 User ID 查詢 -->
        <div class="input-group mb-3">
        <input
            v-model="userId"
            type="number"
            class="form-control"
            placeholder="輸入使用者 ID"
        />
        <button @click="fetchOrders" class="btn btn-primary">查詢</button>
        </div>

        <!-- 訂單列表 (條列式) -->
        <ul class="list-group" v-if="orders.length">
        <li 
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="order in orders"
            :key="order.id"
            @click="openModal(order)"
            style="cursor: pointer;"
        >
            <div>
            <strong>訂單編號:</strong> {{ order.id }} |
            <strong>狀態:</strong> {{ order.orderStatus }} |
            <strong>總金額:</strong> {{ order.totalAmount }} 元
            </div>
            <span class="badge bg-primary rounded-pill">查看</span>
        </li>
        </ul>

        <p v-else-if="searched">沒有找到任何訂單。</p>

        <!-- Modal 顯示訂單明細 -->
        <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="orderModalLabel">
                訂單明細 - 訂單編號 {{ selectedOrder?.id || '' }}
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div v-if="detailsLoading">載入中...</div>
                <div v-else-if="detailsError" class="text-danger">{{ detailsError }}</div>
                <div v-else-if="orderDetails.length > 0">
                <ul class="list-group">
                <li 
                class="list-group-item d-flex justify-content-between"
                v-for="item in orderDetails"
                :key="item.id"
                >
                        <span>座位編號: {{ item.seatId }}</span>
                        <span>票種: {{ item.ticketType }}</span>
                        <span>票價: {{ item.ticketPrice }} 元</span>
                        <span>狀態: {{ item.status }}</span>
                        </li>
                    </ul>
                </div>
                <div v-else>尚無訂單明細資料。</div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                </div>
            </div>
            </div>
        </div>

        </div>
    </template>

    <script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import * as bootstrap from 'bootstrap'

    const userId = ref('')
    const orders = ref([])
    const searched = ref(false)

    const selectedOrder = ref(null)
    const orderDetails = ref([])
    const detailsLoading = ref(false)
    const detailsError = ref(null)

    // 查詢指定使用者的訂單
    const fetchOrders = async () => {
        searched.value = false
        orders.value = []
        try {
            const res = await axios.get(`http://localhost:8080/api/orders/by-user/${userId.value}`)
        orders.value = res.data
        } catch (err) {
        console.error('查詢訂單錯誤', err)
        } finally {
        searched.value = true
        }
    }

    // 點擊列表列，打開 modal 並讀取明細
        const openModal = async (order) => {
        selectedOrder.value = order
        orderDetails.value = []
        detailsError.value = null
        detailsLoading.value = true

        const modalEl = document.getElementById('orderModal')
        const modal = new bootstrap.Modal(modalEl)
        modal.show()

        try {
            const res = await axios.get(`http://localhost:8080/api/order-details/order/${order.id}`)
            // 對應資料庫欄位
            orderDetails.value = res.data.map(item => ({
            id: item.id,
            seatId: item.seatId,
            ticketType: item.ticketType,
            ticketPrice: item.ticketPrice,
            status: item.status
            }))
        } catch (err) {
            
            detailsError.value = '讀取訂單明細時發生錯誤'
            console.error(err)
        } finally {
            detailsLoading.value = false
        }
        }
        </script>

        <style scoped>
        .list-group-item:hover {
        background-color: #f2f2f2;
        }
        </style>
