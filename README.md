# vue-element-template-pc

> PC后台模板，加入了一些自己平时积累下来的通用且业务性不强的公共方法与组件。

<iframe width="560" height="315" src="https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/assets/about.mp4?raw=true" frameborder="0" allowfullscreen></iframe>

## 参考项目
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

## 相关命令

```bash
# 下载项目
git clone https://github.com/zhaoluting/vue-element-template-pc.git

# 安装依赖
npm install

# 本地启动项目，开启3000端口，并热更新
npm run dev

# 打包输出代码和资源文件
npm run build

# 生产构建打包并查看分析报告
npm run build --report

# 使用eslint检测src下代码的规范情况
npm run lint
```

## 结构  
├── build                      // 构建相关      
├── config                     // 配置相关  
├── src                        // 源代码  
│   ├── api                    // 所有请求  
│   ├── assets                 // 主题 字体等静态资源  
│   ├── components             // 全局公用组件  
│   ├── directive              // 全局指令  
│   ├── icons                  // 项目所有 svg icons  
│   ├── lang                   // 国际化 language  
│   ├── mock                   // 项目mock 模拟数据  
│   ├── router                 // 路由  
│   ├── store                  // 全局 store管理  
│   ├── styles                 // 全局样式  
│   ├── utils                  // 全局公用方法  
│       ├── filter             // 全局 filter  
│       ├── globalMap          // 全局数据配置  
│   ├── views                  // view  
│   ├── App.vue                // 入口页面  
│   ├── main.js                // 入口 加载组件 初始化等  
│   └── permission.js          // 权限管理  
├── static                     // 第三方不打包资源  
├── .babelrc                   // babel-loader 配置  
├── eslintrc.js                // eslint 配置项  
├── .gitignore                 // git 忽略项  
├── favicon.ico                // favicon图标  
├── index.html                 // html模板  
└── package.json               // package.json  

## 重要文件
- [全局公用方法](https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/utils/index.js)
- [全局filter](https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/utils/filter.js)
- [全局数据配置](https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/utils/globalMap.js)

- [icon组件:http://www.iconfont.cn/中下载图标至src/icons/svg即可使用](https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/components/SvgIcon/index.vue)
- [codeMirror组件](https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/components/codeMirror/index.vue)
- [formSchema组件](https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/components/form-schema/index.vue)
- [columns数组生成表格组件](https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/components/column-table)
- [一些简单小组件](https://github.com/zhaoluting/vue-element-template-pc/tree/master/src/components/simple-components)


## 常用插件集合
### [moment.js - 时间处理](http://momentjs.cn/)
```
<!--安装-->
npm install moment --save

<!--引入-->
import moment from 'moment';

<!--实例-->
moment().format('YYYY-MM-DD');
```

### [vue-codemirror - 代码编辑器](https://www.npmjs.com/package/vue-codemirror)
基于 Codemirror，适用于 Vue 的 Web 代码编辑器。

- 安装
```
npm install vue-codemirror --save
```
- [点击查看实例](https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/components/codeMirror/index.vue)

### [clipboard.js - 剪贴板工具](https://github.com/zenorocha/clipboard.js)
```
<!--安装-->
npm install clipboard --save

<!-- 简单用法 -->
<el-button @click="copyHandle" class="copyText" :data-clipboard-text="copySelect">
  复制语句
</el-button>

<!-- 引入 -->
import Clipboard from 'clipboard';

<!-- js函数 -->
// 点击复制语句
copyHandle() {
  const clipboard = new Clipboard('.copyText');
  clipboard.on('success', () => {
      message.success('复制成功！');
      clipboard.destroy();
  })
  clipboard.on('error', () => {
      // 不支持复制
      message.error('浏览器不支持自动复制，请手动复制!');
      clipboard.destroy();
  })
}
```