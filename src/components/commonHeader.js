import React from "react";
import { Layout, Button, Avatar, Dropdown } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import '../App.css'
import { useDispatch } from "react-redux"
// 拿到暴露出来的修改展开方法collapseMenu
import { collapseMenu } from "../store/reducers/tab"

const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
    const dispatch = useDispatch()
    // 退出事件
    const logout = () => { }
    
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    个人中心
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={() => logout} target="_blank" rel="noopener noreferrer">
                    退出
                </a>
            )
        }
    ];
    return (
        <Header className="common-header">
            <Button
                type="text"
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor: '#fff'
                }}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => dispatch(collapseMenu())}
            />
            <Dropdown menu={{ items }}>
                <Avatar src={<img src={require('../assets/user.png')} alt="user" />} />
            </Dropdown>
        </Header>
    )
}

export default CommonHeader