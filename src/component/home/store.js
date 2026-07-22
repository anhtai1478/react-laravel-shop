import { createStore } from "redux";

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

for (const id in cart) {
    total += cart[id];
}


const initialState = {
    cartItems: total,
};


function cartRedux(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_CART":
            return{
                //Lấy toàn bộ dữ liệu cũ của state và copy sang object mới.
                ...state,

                // Cập nhật danh sách cartItems với dữ liệu mới
                cartItems: action.payload,
            };
            default:
                return state;
    
    }
}
//nơi chứa toàn bộ dữ liệu (state) của ứng dụng.
const store = createStore(cartRedux);

export default store;