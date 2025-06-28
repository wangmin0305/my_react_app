import { createSlice } from "@reduxjs/toolkit";
import { valid } from "mockjs";

const tabSlice = createSlice({
    name: "tab",
    initialState: {
        isCollapse: false,
        tagList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
            }
        ]
    },
    reducers: {
        collapseMenu: state => {
            state.isCollapse = !state.isCollapse
        },
        setTagList: (state, { payload: val }) => {
            if (val.name !== "home") {
                const res = state.tagList.findIndex(item => item.name === val.name)
                res == -1 && state.tagList.push(val)
            }
        },
        removeTag: (state, { payload: val }) => {
            state.tagList.splice(val, 1)
        }
    }
})

export const { collapseMenu, setTagList, removeTag } = tabSlice.actions
export default tabSlice.reducer