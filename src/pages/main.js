import React from "react"
import { Outlet } from "react-router-dom"
import { Layout, theme } from 'antd';
import CommonAside from '../components/commonAside'
import CommonHeader from '../components/commonHeader'
import TagList from '../components/TagList'
import { useSelector } from "react-redux";
import RouterGuard from "../components/routerGuard"

const { Content } = Layout;

const Main = () => {
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    // 拿到当前展开的状态
    const collapse = useSelector(state => state.tab.isCollapse)
    return (
        <RouterGuard>
            <Layout style={{ height: '100%' }}>
                <CommonAside collapsed={collapse} />
                <Layout>
                    <CommonHeader collapsed={collapse} />
                    <Content
                        style={{
                            padding: 24,
                            minHeight: 280,
                            borderRadius: borderRadiusLG,
                            overflow: "scroll"
                        }}
                    >
                        <TagList />
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </RouterGuard>
    )
};

export default Main