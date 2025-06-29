# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### react的生命周期,试用hooks模拟

1.mount  挂载 
useEffect(()=>{},[])

2.update  状态更新，响应变更
useEffect(()=>{},[data]) // 浏览器绘制后[异步执行]
useLayoutEffect(()=>{},[data]) // DOM更新后[同步执行]，试用需要根据DOM元素做调整[视觉效果]的场景,

3.unmount 注销/卸载 组件从DOM中移除
useEffect(()=>{
    // 卸载动作
},[])

### react的事件创建和合成事件的方式

1.初始化注册事件(初始化)

// React 内部维护的[事件类型映射]
{
  click: {
    dependencies: ['click'],
    phasedRegistrationNames: {
      bubbled: 'onClick',
      captured: 'onClickCapture'
    }
  },
  change: {
    dependencies: ['change', 'click', 'focusin', ...],
    // ...
  }
  // 其他支持的事件类型...
}

2.收集事件，注册事件(渲染)

React 不会在每个 DOM 节点上直接绑定事件

而是在 document 或 root 节点上[绑定“统一”的事件监听器]

根据事件类型，React 只在根节点上绑定[实际需要的原生事件]

3.触发事件(运行)

原生触发，事件冒泡并捕获后，以此对事件进行收集并代理依次处理

有利于性能优化，以及兼容性处理


### v17版本不再将事件放在document上，而是放在app上的原因
对比总结
维度	       React 16（document）	                  React 17+（根容器）
事件委托目标	document	                             ReactDOM.render 的根 DOM 节点（如 #root）
多版本兼容性	不同版本事件会互相干扰	                   事件系统隔离，互不影响
全局事件影响	可能误触发非 React 事件（如 jQuery）	     仅影响当前 React 树
冒泡控制	    e.stopPropagation() 无法阻止跨版本事件	  能有效阻止当前 React 树内的事件

### react做一套自己的事件系统的优点？

1.性能优化：仅在根结点绑定事件监听，减少内存占用
2.功能扩展：支持非原生事件，批量事件处理
3.管理内存：闲时自动释放内存
4.兼容各浏览器和平台：处理各平台原生方法需要兼容的问题

### HOC是什么，主要应用场景有哪些？

HOC即高阶组件，类似于高阶函数，其参数为一个函数

1.属性代理

2.反向继承

特性	        反向继承	                    属性代理
访问组件内部	 可以访问 state、方法、生命周期	  只能通过 props 交互
渲染控制	    完全控制，可以阻止渲染	         只能包装渲染结果
性能影响	    较大（继承整个组件）	           较小（只是包装）
使用复杂度	   高	                          低
适用场景	    需要深度控制组件	              大多数常规增强场景


HOC 仍然在以下场景有优势：

需要渲染劫持时

需要修改组件树结构时

在类组件中复用逻辑时

### 对hook的理解，它在做什么？
1.性能提升，解决高阶组件嵌套问题
2.生命周期函数的逻辑难以理解的问题
3.降低学习成本，解决类组件难以理解的问题

特性	    Hooks	                类组件
状态管理	useState, useReducer	 this.state, setState
生命周期	useEffect 统一处理	     分散在各个生命周期方法中
代码组织	按逻辑关注点组织	        按生命周期阶段组织
复用性	  自定义 Hook 高度复用	   HOC/render props 较复杂
学习曲线	较低（无需理解类、this）	 较高（需掌握类、生命周期）
性能优化	useMemo, useCallback	 shouldComponentUpdate

useRef: 获取dom
useReducer: redux数据状态管理
useContext: 获取上下文
useMemo：记忆计算结果
useCallback：记忆回调函数
useLayoutEffect：[同步执行，阻塞进程]，需要获取挂载成功的dom元素的数据并做相关的[视觉逻辑处理]

### redux遵循的三原则
1.单一数据源 存储在统一的store中
2.状态只读 不能直接修改状态，需要触发action修改
3.使用纯函数进行修改 执行reducer中的action

步骤：发布订阅模式
1.触发 Action：组件 dispatch(action)

2.执行 Reducer：Redux 调用 reducer(previousState, action)
action本质是同步的，可以使用中间件，在完成异步处理后再使用dispatch调用真正的action

3.生成新状态：Reducer 返回新状态，Store 更新

4.通知订阅者：所有订阅 Store 的组件获取新状态并重新渲染
