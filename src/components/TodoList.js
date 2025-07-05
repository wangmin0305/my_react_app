import React from "react";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTxt: "",
            todoList: [
                {
                    title: "录制vuejs",
                    checked: false
                },
                {
                    title: "录制reactjs",
                    checked: true
                },
                {
                    title: "录制js",
                    checked: false
                },
                {
                    title: "录制css",
                    checked: false
                },
            ]
        };
    }

    handleSetVal = (e) => {
        this.setState({
            addTxt: e.target.value
        })
    }

    add = () => {
        if (!this.state.addTxt.trim()) return alert("请输入待办事项");

        const data = this.state.todoList;

        data.push({
            title: this.state.addTxt,
            checked: false
        })

        this.setState({
            todoList: data,
            addTxt: ""
        })
        console.log(this.state.addTxt, "add")
    }

    hadnleOnkeyup=(e)=>{
        if (e.keyCode === 13) {
            this.add()
        }
    }

    handleChangeCheck = (key) => {
        const data = this.state.todoList;

        data[key].checked = !data[key].checked;

        this.setState({
            todoList: data
        })
    }

    handleDel = (key) => {
        const data = this.state.todoList;

        data.splice(key, 1);

        this.setState({
            todoList: data
        })
    }

    componentDidMount() {
        // 初始化
    }

    render() {
        return (
            <>
                <h2>TodoList</h2>
                <input value={this.state.addTxt} onChange={this.handleSetVal}  onKeyUp={this.hadnleOnkeyup}/> <button onClick={this.add}>增加</button>
                <h2>未完成列表</h2>
                <ul>
                    {
                        this.state.todoList.map((item, key) => {
                            if (!item.checked) {
                                return (
                                    <li key={key}>
                                        <input type="checkbox" checked={item.checked} onChange={this.handleChangeCheck.bind(this, key)} />{item.title}---<button onClick={this.handleDel.bind(this, key)}>删除</button>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <h2>已完成列表</h2>
                <ul>
                    {
                        this.state.todoList.map((item, key) => {
                            if (item.checked) {
                                return (
                                    <li key={key}>
                                        <input type="checkbox" checked={item.checked} onChange={this.handleChangeCheck.bind(this, key)} />{item.title}---<button onClick={this.handleDel.bind(this, key)}>删除</button>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </>
        );
    }
}

export default TodoList;