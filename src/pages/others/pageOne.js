import React from "react";
import ReactForm from "../../components/ReactForm"
import TodoList from "../../components/TodoList"
import ReactChild from "../../components/ReactChild"

class pageOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "默认值"
        };
        this.child = React.createRef();// 主要用于 class 组件。而函数组件通常使用 useRef
    }

    setInputValue = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    getInputValue = () => {
        alert(this.state.value)
    }

    setAnotherValue = () => {
        this.setState({
            value: "设置一个其他的值"
        })
    }

    handleFromChild = (data) => {
        alert(`父组件获取到了子组件的值：${data}`)
    }

    handleGetFa = () => {
        console.log(this.child.current, "子组件")
        alert(this.child.current.state.name)
    }
    
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                {/* react中 当绑定了value值时，其值就由onChange绑定的事件来管理 */}
                {/* MVVM */}
                <input value={this.state.value} onChange={this.setInputValue} />
                <button onClick={this.getInputValue}>获取当前表单值</button>
                <button onClick={this.setAnotherValue}>设置一个其他的值</button>

                {/* 只是设置默认值 defaultValue */}
                <input defaultValue={this.state.value} onChange={this.setInputValue} />

                {/* ReactForm */}
                <ReactForm />

                {/* TodoList */}
                <TodoList />

                {/* ReactChild */}
                <ReactChild ref={this.child} fatherData={"我是父组件的数据嘻嘻"} father={this} />

                <button onClick={this.handleGetFa}>获取子组件</button>
            </div>
        );
    }
}

export default pageOne;