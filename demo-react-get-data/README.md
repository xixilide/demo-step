### 1.搭建react 基本开发环境
    webpack
    - es6 模块，打包成一个bundle.js
    - 负责开发环境的基础设施 dev-server(启动服务器)
    - 负责编译出产品代码

    Babel：
    - 提供Es6 ->Es5
    - React 的jsx用babel 来编译成JS

## React state与props学习笔记
组件的状态与属性
组件本质上是状态机，输入确定，输出一定确定。组件把状态与结果一一对应起来，组件中有state与prop（状态与属性）。

- 属性(props)是由父组件传递给子组件的；
- 状态(state)是子组件内部维护的数据，当状态发生变化的同时，组件也会进行更新。当状态发生转换时会触发不同的钩子函数，从而让开发者有机会做出相应。
### this.props.children
this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点。

state
组件在运行时需要修改的数据就是状态，this.state 是会随着用户互动而产生变化的特性。组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI。
state工作原理
常用的通知 React 数据变化的方法是调用 setState(data, callback)。这个方法会合并（merge） data 到 this.state，并重新渲染组件。渲染完成后，调用可选的 callback 回调。大部分情况下不需要提供 callback，因为 React 会负责把界面更新到最新状态。

- getInitialState
- object getInitialState()
      getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。在组件挂载之前调用一次。返回值将会作为 this.state 的初始值。

- setState
- setState(object nextState[, function callback])
      合并 nextState 和当前 state。这是在事件处理函数中和请求回调函数中触发 UI 更新的主要方法。另外，也支持可选的回调函数，该函数在 setState 执行完毕并且组件重新渲染完成之后调用。this.setState 方法用于修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。

- replaceState
- replaceState(object nextState[, function callback])
     类似于 setState()，但是删除之前所有已存在的 state 键，这些键都不在 nextState 中。

##### 哪些组件应该有 State？
大部分组件的工作应该是从 props 里取数据并渲染出来。但是，有时需要对用户输入、服务器请求或者时间变化等作出响应，这时才需要使用 State。

尝试把尽可能多的组件无状态化。这样做能隔离 state，把它放到最合理的地方，也能减少冗余，同时易于解释程序运作过程。

常用的模式是创建多个只负责渲染数据的无状态（stateless）组件，在它们的上层创建一个有状态（stateful）组件并把它的状态通过 props 传给子级。这个有状态的组件封装了所有用户的交互逻辑，而这些无状态组件则负责声明式地渲染数据。


文／左栈（简书作者）
原文链接：http://www.jianshu.com/p/571ebbaced0f
著作权归作者所有，转载请联系作者获得授权，并标注“简书作者”。
