import React from "react"
import { Outlet } from "react-router-dom"
import { Layout, theme } from 'antd';
import CommonAside from '../components/commonAside'
import CommonHeader from '../components/commonHeader'
import { useSelector } from "react-redux";

const { Content } = Layout;

const Main = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // 拿到当前展开的状态
    const collapse = useSelector(state => state.tab.isCollapse)
    return (
        <Layout style={{ height: '100%' }}>
            <CommonAside collapsed={collapse} />
            <Layout>
                <CommonHeader collapsed={collapse} />
                <Content
                    style={{
                        padding: 24,
                        minHeight: 280,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
};

export default Main