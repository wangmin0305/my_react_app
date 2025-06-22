import Mock from "mockjs";
import homeApi from "./mockServeData/home"
import userApi from "./mockServeData/user"

Mock.mock(/home\/getData/, homeApi.getStatisticalData)

Mock.mock(/user\/getUserData/, userApi.getUserList)

Mock.mock(/user\/deleteUser/, userApi.deleteUser)