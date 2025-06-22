import React, { useEffect, useState } from "react"
import "./index.css"
import { Button, Input, Table, Form, Modal } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { getUserData, deleteUser } from "../../api";

const User = () => {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '年纪',
            dataIndex: 'birth',
            key: 'birth',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: (val) => {
                return val ? "女" : "男";
            }
        },
        {
            title: '地址',
            dataIndex: 'addr',
            key: 'addr',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Button style={{ marginRight: "10px" }} onClick={() => handleClick("update", record)}>编辑</Button>
                    <Button type="primary" onClick={() => handleDelete(record)} danger>删除</Button>
                </div>
            ),
        },
    ];
    // 操作类型
    const [type, setType] = useState("add")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState({
        name: ""
    })

    // 新增/编辑按钮
    const handleClick = (type, item) => {
        setType(type)
        setIsModalOpen(true)
    }
    const handleDelete = (item) => {
        deleteUser({ id: item.id }).then(({ data }) => {
            console.log(data);
            if (data.code === 20000) {
                handleGetTable()
            }
        })
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    // 搜索表单按钮
    const handleFinish = (e) => {
        // 设置搜索值name
        setName({ name: e.keyword })
    }
    // 查询列表数据
    const handleGetTable = () => {
        getUserData(name).then(({ data }) => {
            const { list } = data;
            setTableData(list);
        })
    }
    // 定义table数据
    const [tableData, setTableData] = useState([])

    // dom初始化加载完成的钩子函数
    useEffect(() => {
        handleGetTable()
    }, [name])// 此处空数组[]代表首次加载 当name变化时执行
    return (
        <div>
            <div className="top">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick("add")}>新增</Button>
                <Form
                    layout="inline"
                    onFinish={handleFinish}
                >
                    <Form.Item name="keyword">
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item name="keyword">
                        <Button htmlType="submit" type="primary" icon={<SearchOutlined />}>搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table columns={columns} dataSource={tableData} rowKey={"id"} />
            <Modal
                title={type == "add" ? "新增" : "修改"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText={"取消"}
                okText={"确定"}
            >

            </Modal>
        </div>
    )
}

export default User