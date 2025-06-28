import http from "./axios"

export const getData = () => {
    return http.request({
        url: "/home/getData",
        method: "get"
    })
}

export const getUserData = (params) => {
    return http.request({
        url: "/user/getUserData",
        method: "get",
        params
    })
}

export const deleteUser = (params) => {
    return http.request({
        url: "/user/deleteUser",
        method: "post",
        data: params
    })
}

export const createUser = (params) => {
    return http.request({
        url: "/user/createUser",
        method: "post",
        data: params
    })
}

export const updateUser = (params) => {
    return http.request({
        url: "/user/updateUser",
        method: "post",
        data: params
    })
}

export const getMenu = (params) => {
    return http.request({
        url: "/permission/getMenu",
        method: "post",
        data: params
    })
}