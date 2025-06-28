import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { getMenu } from "../api";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const onFinish = values => {
        console.log('Success:', values);
        getMenu(values).then(({ data: { code, data } }) => {
            console.log(data)
            if (code === -999) return message.error(data?.message);
            localStorage.setItem("token", data.token)
            navigate("/home")
        }).catch(err => {
            console.log(err)
        })
    };

    const onFinishFailed = errorInfo => {
        message.warning("用户名或密码不能为空！")
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className='login-card'
        >
            <div className="login_title">系统登录</div>

            <Form.Item
                label="用户"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null} className="login-button">
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
};
export default Login;