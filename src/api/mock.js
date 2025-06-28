import Mock from "mockjs";
import homeApi from "./mockServeData/home"
import userApi from "./mockServeData/user"
import permissionApi from "./mockServeData/permission"

Mock.mock(/home\/getData/, homeApi.getStatisticalData)

Mock.mock(/user\/getUserData/, userApi.getUserList)

Mock.mock(/user\/deleteUser/, userApi.deleteUser)

Mock.mock(/user\/createUser/, userApi.createUser)

Mock.mock(/user\/updateUser/, userApi.updateUser)

Mock.mock(/permission\/getMenu/, permissionApi.getMenu)