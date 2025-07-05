import React from "react";
import PropTypes from "prop-types";

class ReactChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '我是子组件的name数据'
        };
    }

    handleAlert = () => {
        // 拿到父组件传入子组件的属性
        alert(this.props.fatherData)
    }

    handleAlertAll = () => {
        // this.props.father 为整个父组件，包括其state和函数方法
        alert(this.props.father.state.value)
    }

    handleToFa = (data) => {
        // 调用父组件的方法并传参的方式，将子组件的数据传递给父组件
        this.props.father.handleFromChild(data)
    }
    render() {
        return (
            <div>
                <h2>父子组件之间的通信</h2>

                <p>{this.props.fatherDefData}</p>

                <button onClick={this.handleAlert}>父组件传入的值</button>
                <br />

                <button onClick={this.handleAlertAll}>拿到整个父组件</button>
                <br />

                <button onClick={this.handleToFa.bind(this, "我是子组件来的值")}>传值给父组件</button>
            </div>
        );
    }
}

// 设置属性默认值
ReactChild.defaultProps = {
    fatherData: "当父组件没有传入值时，我是子组件里的默认值",
    fatherDefData: "当父组件没有传入值时，我是子组件里的默认值",
}

// 限制父组件传入属性的数据类型
ReactChild.propTypes = {
    fatherData: PropTypes.string,
    fatherDefData: PropTypes.string,
}

export default ReactChild;