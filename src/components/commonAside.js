import React from "react"
import MenuConfig from '../config/index'
import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import { setTagList } from "../store/reducers/tab"
const { Sider } = Layout;
//动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

//处理表单数据
const menus = MenuConfig.map(item => {
    const child = {
        key: item.path,
        icon: iconToElement(item.icon),
        label: item.label
    }
    if (item.children) {
        child.children = item.children.map(childItem => {
            return {
                key: childItem.path,
                icon: iconToElement(childItem.icon),
                label: childItem.label
            }
        })
    }
    return child
})


const CommonAside = ({ collapsed }) => {
    const navifate = useNavigate()
    const dispatch = useDispatch()
    const setTag = (val) => {
        dispatch(setTagList(val))
    }
    const linkTo = (e) => {
        console.log(e)
        navifate(e.key, { replace: true })
        // 获取当前页面
        let data;
        MenuConfig.forEach(item => {
            if (item.path === e.keyPath[e.keyPath.length - 1]) {
                data = item
                if (e.keyPath.length > 1) {
                    data = item.children.find(child => {
                        return child.path === e.key
                    })
                }
            }
        })
        setTag({
            path: data.path,
            name: data.name,
            label: data.label
        })
    }
    const action = useLocation(); // 获取当前路由

    return (
        <Sider trigger={null} collapsed={collapsed} >
            <h3 style={{
                color: 'White',
                textAlign: 'center'
            }}>{collapsed ? "后台" : "测试系统"}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                selectedKeys={[action.pathname]} // 设置当前路由为默认选中的菜单项
                items={menus}
                onClick={linkTo}
            />
        </Sider>
    )
};

export default CommonAside