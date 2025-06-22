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