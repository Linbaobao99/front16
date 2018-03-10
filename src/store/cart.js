import Vue from 'vue'
export default {
    state: {
        //定义状态,相当于data数据
        cart: JSON.parse(localStorage.getItem('cart')) || {}// 数据结构预览: { 153: 5, 154: 10, 155: 12 }, ID为key, 数量为value
    },
    getters: {
        total(state) {
            //values先拿到对象里面的val数量,然后reduce将他们相加
            return Object.values(state.cart).reduce((sum, v) => sum += v, 0)
        }
    },
    mutations: {
        modify(state, data) {
            let { id, num } = data;
            // state.cart[id] = num;
            Vue.set(state.cart, id, num)
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        del(state, id) {
            //第一个为删除的对象
            Vue.delete(state.cart, id);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    }
}