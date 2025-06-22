import React from "react"
import MenuConfig from '../config/index'
import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from "react-router-dom";

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
    // const [collapsed] = useState(false);
    const navifate = useNavigate()
    const linkTo = (e) => {
        navifate(e.key, {replace: true})
    }
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
                items={menus}
                onClick={linkTo}
            />
        </Sider>
    )
};

export default CommonAside