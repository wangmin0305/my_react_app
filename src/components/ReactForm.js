import React from "react";

class ReactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "名字",
            sex: "1",
            city: "深圳",
            cityList: ["深圳", "长沙", "北京"]
        };
    }

    submitForm = (e) => {
        e.preventDefault()
        // 提交表单
        console.log("表单提交", this.state)
    }

    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleSex = (e) => {
        this.setState({
            sex: e.target.value
        })
    }
    handleCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    render() {
        return (
            <>
                <h2>ReactForm</h2>
                <form onSubmit={this.submitForm}>
                    姓名：
                    <input type="text" value={this.state.name} onChange={this.handleName} />
                    <br />

                    性别：
                    <input type="radio" value="1" checked={this.state.sex === "1"} onChange={this.handleSex} />男
                    <input type="radio" value="2" checked={this.state.sex === "2"} onChange={this.handleSex} />女
                    <br />

                    居住城市：
                    <select value={this.state.city} onChange={this.handleCity}>
                        {
                            this.state.cityList.map((item, index) => {
                                return (
                                    <option key={index}>{item}</option>
                                )
                            })
                        }
                    </select>
                    <br />

                    <input type="submit" defaultValue="提交表单" />
                </form>
            </>
        );
    }
}

export default ReactForm;