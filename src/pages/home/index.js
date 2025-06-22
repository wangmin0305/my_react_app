import React, { useEffect, useState } from "react"
import { Col, Row, Card, Avatar, Table } from "antd"
import * as Icon from '@ant-design/icons';
import "./home.css"
import { getData } from "../../api";
import MyEcharts from "../../components/Echarts"

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'TodayBuy',
        dataIndex: 'todayBuy',
        key: 'todayBuy',
    },
    {
        title: 'MonthBuy',
        dataIndex: 'monthBuy',
        key: 'monthBuy',
    },
    {
        title: 'TotalBuy',
        key: 'totalBuy',
        dataIndex: 'totalBuy'
    },
];

const countData = [
    {
        name: "手机",
        value: "399",
        icon: "MenuFoldOutlined"
    },
    {
        name: "三星",
        icon: "MenuFoldOutlined"
    },
    {
        name: "手机",
        icon: "MenuFoldOutlined"
    },
    {
        name: "手机",
        icon: "MenuFoldOutlined"
    },
    {
        name: "手机",
        icon: "MenuFoldOutlined"
    },
    {
        name: "手机",
        icon: "MenuFoldOutlined"
    }
]

const Home = () => {
    const img = require("../../assets/user.png")
    // 定义table数据
    const [tableData, setTableData] = useState([])

    const [echartData, setEchartData] = useState({})
    // dom初始化加载完成的钩子函数
    useEffect(() => {
        getData().then(({ data }) => {
            console.log(data, "data")
            const { tableData, orderData, userData, videoData } = data.data
            // 设置tableData的值
            setTableData(tableData)
            // echarts 数据处理
            const order = orderData
            const xData = order.date
            // series组装
            const array = Object.keys(order.data[0])
            const series = []
            array.forEach(key => {
                series.push({
                    name: key,
                    data: order.data.map(item => item[key]),
                    type: "line"
                })
            });
            // 设置echartData的值
            setEchartData({
                order: {
                    xData,
                    series
                },
                user: {
                    xData: userData.map(item => item.date),
                    series: [
                        {
                            name: "新增用户",
                            data: userData.map(item => item.new),
                            type: "bar"
                        },
                        {
                            name: "活跃用户",
                            data: userData.map(item => item.active),
                            type: "bar"
                        }
                    ]
                },
                video: {
                    series: [
                        {
                            data: videoData,
                            type: "pie"
                        }
                    ]
                }
            })
        })
    }, [])// 此处空数组[]代表首次加载

    // 动态创建icon
    const iconToElement = (name) => React.createElement(Icon[name])

    return (
        <Row className="home-content">
            <Col span={8} className="home-right">
                <Card className="home-avator" title="Card title" hoverable={true} style={{ heigth: 200 }}>
                    <Card.Meta
                        avatar={<Avatar src={img} />}
                        title="Card title"
                        description={
                            <>
                                <p>This is the description</p>
                                <p>This is the description</p>
                            </>
                        }
                    />
                </Card>
                <Card className="home-table" hoverable={true}>
                    <Table columns={columns} dataSource={tableData} pagination={false} rowKey={"name"} />
                </Card>
            </Col>
            <Col span={16}>
                <div className="num">
                    <Row>
                        {
                            countData.map((item, index) => {
                                return (
                                    <Col span={8} key={index}>
                                        <Card className="num-content">
                                            <div className="icon">
                                                {iconToElement(item.icon)}
                                            </div>
                                            <div className="title">
                                                <p>
                                                    ¥{item.value || "0"}
                                                </p>
                                                <p>
                                                    {item.name}
                                                </p>
                                            </div>
                                        </Card>
                                    </Col>

                                )
                            })
                        }
                    </Row>
                </div>
                {echartData.order && <MyEcharts chartData={echartData.order} style={{ height: '280px' }} />}
                <div className="graph">
                    {echartData.user && <MyEcharts chartData={echartData.user} style={{ height: '240px', width: "50%" }} />}
                    {echartData.video && <MyEcharts chartData={echartData.video} isAxisChart={false} style={{ height: '200px', width: "50%" }} />}
                </div>
            </Col>
        </Row>
    )
}

export default Home