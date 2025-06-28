import React, { useEffect, useState } from "react"
import "./index.css"
import { Button, Input, Table, Form, Modal, Popconfirm, message, InputNumber, Select, DatePicker } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { getUserData, deleteUser, createUser, updateUser } from "../../api";
import dayjs from "dayjs";

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
                    <Popconfirm title="确定删除该项？" okText="确定" cancelText="取消" onConfirm={() => handleDelete(record)}>
                        <Button type="primary" danger>删除</Button>
                    </Popconfirm>
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

    const [form] = Form.useForm()

    // 新增/编辑按钮
    const handleClick = (type, item) => {
        // 设置当前是新增或编辑
        setType(type)
        // 设置弹窗是否展示
        setIsModalOpen(true)
        if (type == "add") {
            form.resetFields()
        }
        if (type == "update") {
            // 深拷贝
            const data = JSON.parse(JSON.stringify(item))
            data.birth = dayjs(data.birth)
            form.setFieldsValue(data)
        }
    }
    const handleDelete = ({ id }) => {
        deleteUser({ id }).then(({ data }) => {
            console.log(data);
            // 删除成功提示并刷新列表
            message.success(data.message, [3])
            handleGetTable()
        })
    }
    // 确定新增或编辑
    const handleOk = () => {
        // 表单校验
        form.validateFields().then((res) => {
            // 处理日期格式
            res.birth = dayjs(res.birth).format("YYYY-MM-DD");
            if (type == "add") {
                createUser(res).then(({ data }) => {
                    message.success(data.data.message, [3])
                    // 成功后关闭弹窗 刷新接口
                    setIsModalOpen(false)
                    handleGetTable()
                })
            }
            if (type == "update") {
                updateUser(res).then(({ data }) => {
                    message.success(data.data.message, [3])
                    // 成功后关闭弹窗 刷新接口
                    setIsModalOpen(false)
                    handleGetTable()
                })
            }
        }).catch(err => {
            console.log(err, "err")
        })

    }
    // 取消新增或编辑
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    // 搜索表单按钮
    const handleFinish = (e) => {
        // 设置搜索值name 当name变化时会执行搜素
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
                title={type === "add" ? "新增用户" : "修改用户"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText={"取消"}
                okText={"确定"}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    {/* 编辑需要传id值 */}
                    {
                        type == "update" && <Form.Item
                            hidden
                            name="id"
                        >
                            <Input />
                        </Form.Item>
                    }
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="年纪"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }, { type: "number", message: "必须是数字" }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="性别"
                        name="sex"
                        rules={[{ required: true, message: 'Please select your sex!' }]}
                    >
                        <Select
                            options={[
                                { value: 0, label: '女' },
                                { value: 1, label: '男' }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="出生日期"
                        name="birth"
                        rules={[{ required: true, message: 'Please select your birth!' }]}
                    >
                        <DatePicker placeholder="请选择" />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="addr"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input placeholder="请填写地址" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default User