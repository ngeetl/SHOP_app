import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
    'user/registerUser', //액션 고유 실별자
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/register`,
                body
            )

            return response.data; //페이로드
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser', //액션 고유 실별자
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/login`,
                body // = { email, password }
            )

            return response.data; //페이로드
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const authUser = createAsyncThunk(
    'user/authUser',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `users/auth`
            )
            
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `users/logout`
            )
            
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const addToCart = createAsyncThunk(
    'user/addToCart', //액션 고유 실별자
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/cart`,
                body // = { productId: product._id }
            )

            return response.data; //페이로드
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const removeItem = createAsyncThunk(
    'user/removeItem', //액션 고유 실별자
    async ({ productId }, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(
                `/users/item?productId=${productId}`,
                productId 
            );

            return response.data; //페이로드
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const getCartItems = createAsyncThunk(
    'user/getCartItems', //액션 고유 실별자
    async ({ cartItemIds, userCart }, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/products/${cartItemIds}?type=array`
            ); // response => product DB 상세 정보

            // cartItemIds => [2412w124, 1973e34, 7843a123]
            // userCart => [{id: 2412w124, quantity:1, date}, {...}]
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, idx) => {
                    if(cartItem.id === productDetail._id) {
                        response.data[idx].quantity = cartItem.quantity;
                    }
                })
            })
            // 페이로드로 장바구니에 담긴 product들의 상세정보를 
            // userData.cart의 quantity를 추가하여 반환하는 로직


            return response.data; //페이로드
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const removeCartItem = createAsyncThunk(
    'user/removeCartItem', //액션 고유 실별자
    async (productId, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(
                `/users/cart?productId=${productId}`,
                productId 
            );

            const userCart = response.data.userCart;
            const productInfo = response.data.productInfo;

            userCart.forEach(cartItem => {
                productInfo.forEach((productDetail, idx) => {
                    if(cartItem.id === productDetail._id) {
                        // productInfo 배열 요소를 직접적으로 바꿔줌
                        productInfo[idx].quantity = cartItem.quantity;
                    }
                })
            })

            return response.data; //페이로드
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const payProducts = createAsyncThunk(
    'user/payProducts', //액션 고유 실별자
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                '/users/payment',
                body 
            );

            return response.data; //페이로드
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)