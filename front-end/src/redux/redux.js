import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistReducer} from 'redux-persist'


const persistConfig={
    key:'root',
    storage
}



const intialValue = {value:{id:null,name:null,email:null,access_token:"",refresh_token:""}}   
const initialAdmin = {value:{email:null,edit:{},access_token:"",refresh_token:""}}  
const tokens = {value:{ access_token:null,refresh_token:null}}

const userSlice=createSlice({
    name:"user",
    initialState:intialValue,
    reducers:{
        login:(state,action)=>{
            state.value=action.payload        
        },
        logout:(state,action)=>{
            state.value=intialValue
        }
    }
})

const tokenSlice = createSlice({
    name:"token",
    initialState:tokens,
    reducers:{
        setAccess:(state,action)=>{
            state.value.access_token=action.payload
        },
        setrefresh:(state,action)=>{
            state.value.refresh_token=action.payload
        },
        removetokens:(state,action)=>{
            state.value=tokens
        }
    }
})

const adminSlice=createSlice({
    name:"admin",
    initialState:initialAdmin,
    reducers:{
        adminlogin:(state,action)=>{
            state.value=action.payload
        },
        adminlogout:(state,action)=>{
            state.value=initialAdmin
        },
        adminsetedit:(state,action)=>{
            state.value.edit=action.payload
        },
        removeedit:(state,action)=>{
            state.value.edit=initialAdmin.value.edit
        }
    }
})


export const { login, logout } = userSlice.actions
export const { adminlogin, adminlogout, adminsetedit, removeedit }=adminSlice.actions
export const { setAccess, setrefresh } = tokenSlice.actions

const reducer=combineReducers({
    user:userSlice.reducer  ,
    admin:adminSlice.reducer,
    tokens:tokenSlice.reducer
})
const persistedReducer=persistReducer(persistConfig,reducer) 

export const store = configureStore({
    reducer:persistedReducer
})