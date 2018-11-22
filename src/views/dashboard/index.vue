<template>
  <div class="dashboard-container">
    <div v-for="(item, index) in tagList" :key="index" class="single-tag" @click="jumpTo(index)">
      <img :src="item.logo" :alt="item.name" class="logo">
      <p class="name">{{ item.name }}</p>
      <p class="desc">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      // https://docschina.org/
      tagList: [
        {
          'name': 'Vue',
          'desc': '渐进式 JavaScript 框架',
          'link': 'https://vue.docschina.org/',
          'logo': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNjEuNzYgMjI2LjY5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMzMzMyAwIDAgLTEuMzMzMyAtNzYuMzExIDMxMy4zNCkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3OC4wNiAyMzUuMDEpIj48cGF0aCBkPSJtMCAwLTIyLjY2OS0zOS4yNjQtMjIuNjY5IDM5LjI2NGgtNzUuNDkxbDk4LjE2LTE3MC4wMiA5OC4xNiAxNzAuMDJ6IiBmaWxsPSIjNDFiODgzIi8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3OC4wNiAyMzUuMDEpIj48cGF0aCBkPSJtMCAwLTIyLjY2OS0zOS4yNjQtMjIuNjY5IDM5LjI2NGgtMzYuMjI3bDU4Ljg5Ni0xMDIuMDEgNTguODk2IDEwMi4wMXoiIGZpbGw9IiMzNDQ5NWUiLz48L2c+PC9nPjwvc3ZnPgo='
        },
        {
          'name': 'React',
          'desc': '创建大型的 JavaScript 应用程序',
          'link': 'https://react.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo-svg-color/react-16ed83.svg'
        },
        {
          'name': 'RxJS',
          'desc': 'RxJS 是 Reactive Extensions 的 JavaScript 实现，可以通过响应式和函数式编程模型组合异步数据流',
          'link': 'http://cn.rx.js.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo/rxjs-4b9b55.png'
        },
        {
          'name': 'webpack',
          'desc': '前端资源打包工具',
          'link': 'https://webpack.docschina.org/',
          'logo': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NzQgODc1LjciPjx0aXRsZT5pY29uPC90aXRsZT48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMzg3IDBsMzg3IDIxOC45djQzNy45TDM4NyA4NzUuNyAwIDY1Ni44VjIxOC45eiIvPjxwYXRoIGZpbGw9IiM4ZWQ2ZmIiIGQ9Ik03MDQuOSA2NDEuN0wzOTkuOCA4MTQuM1Y2NzkuOWwxOTAuMS0xMDQuNiAxMTUgNjYuNHptMjAuOS0xOC45VjI2MS45bC0xMTEuNiA2NC41djIzMmwxMTEuNiA2NC40ek02Ny45IDY0MS43TDM3MyA4MTQuM1Y2NzkuOUwxODIuOCA1NzUuMyA2Ny45IDY0MS43ek00NyA2MjIuOFYyNjEuOWwxMTEuNiA2NC41djIzMkw0NyA2MjIuOHptMTMuMS0zODQuM0wzNzMgNjEuNXYxMjkuOUwxNzIuNSAzMDEuN2wtMS42LjktMTEwLjgtNjQuMXptNjUyLjYgMGwtMzEyLjktMTc3djEyOS45bDIwMC41IDExMC4yIDEuNi45IDExMC44LTY0eiIvPjxwYXRoIGZpbGw9IiMxYzc4YzAiIGQ9Ik0zNzMgNjQ5LjNMMTg1LjQgNTQ2LjFWMzQxLjhMMzczIDQ1MC4xdjE5OS4yem0yNi44IDBsMTg3LjYtMTAzLjFWMzQxLjhMMzk5LjggNDUwLjF2MTk5LjJ6bS0xMy40LTIwN3pNMTk4LjEgMzE4LjJsMTg4LjMtMTAzLjUgMTg4LjMgMTAzLjUtMTg4LjMgMTA4LjctMTg4LjMtMTA4Ljd6Ii8+PC9zdmc+'
        },
        {
          'name': 'Parcel',
          'desc': '零配置打包工具',
          'link': 'https://parceljs.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo/parcel-61ddae.png'
        },
        {
          'name': 'Rollup',
          'desc': '新一代 JavaScript 模块打包器',
          'link': 'https://rollup.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo-svg-color/rollup-9739a0.svg'
        },
        {
          'name': 'Babel',
          'desc': '下一代 JavaScript',
          'link': 'https://babel.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo/babel-6e8c09.png'
        },
        {
          'name': 'Node.js',
          'desc': '基于 V8 引擎的 JS 运行环境',
          'link': 'http://nodejs.cn/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo-svg-color/node-a2d399.svg'
        },
        {
          'name': 'ECMAScript',
          'desc': 'ECMAScript 2018 标准',
          'link': 'https://ecma262.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo-svg-color/ecma-75c07d.svg'
        },
        {
          'name': 'Mobx',
          'desc': '简单、可扩展的状态管理',
          'link': 'https://cn.mobx.js.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo/mobx-1e58fc.png'
        },
        {
          'name': 'VuePress',
          'desc': '由 Vue 提供支持的静态站点生成器',
          'link': 'https://vuepress.docschina.org/',
          'logo': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNjEuNzYgMjI2LjY5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMzMzMyAwIDAgLTEuMzMzMyAtNzYuMzExIDMxMy4zNCkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3OC4wNiAyMzUuMDEpIj48cGF0aCBkPSJtMCAwLTIyLjY2OS0zOS4yNjQtMjIuNjY5IDM5LjI2NGgtNzUuNDkxbDk4LjE2LTE3MC4wMiA5OC4xNiAxNzAuMDJ6IiBmaWxsPSIjNDFiODgzIi8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3OC4wNiAyMzUuMDEpIj48cGF0aCBkPSJtMCAwLTIyLjY2OS0zOS4yNjQtMjIuNjY5IDM5LjI2NGgtMzYuMjI3bDU4Ljg5Ni0xMDIuMDEgNTguODk2IDEwMi4wMXoiIGZpbGw9IiMzNDQ5NWUiLz48L2c+PC9nPjwvc3ZnPgo='
        },
        {
          'name': 'Preact',
          'desc': 'React 的 3kb 轻量化方案，拥有同样的 ES6 API',
          'link': 'https://preactjs.com/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo/preact-a64caf.png'
        },
        {
          'name': 'React-Router',
          'desc': '官方维护的路由库',
          'link': 'https://react-router.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo-svg-color/react-router-d7396d.svg'
        },
        {
          'name': 'Koa',
          'desc': '新一代的 Web 后台框架',
          'link': 'https://koajs.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo-svg-color/koa-f64b48.svg'
        },
        {
          'name': 'RxJS 5 基本原理',
          'desc': '本书是 RxJS 的初中级书，适用于任何想要入门 RxJS 的开发者',
          'link': 'https://rxjs-cn.github.io/rxjs5-ultimate-cn/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo/rxjs-4b9b55.png'
        },
        {
          'name': '学习 RxJS 操作符',
          'desc': '通过每个操作符的清晰示例及解释来进行 RxJS 的学习',
          'link': 'https://rxjs-cn.github.io/learn-rxjs-operators/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo/rxjs-4b9b55.png'
        },
        {
          'name': 'React 模式',
          'desc': '本书介绍了使用 React 开发时的一些常用设计模式，其中包括的技术有组合(composition)、数据流、依赖管理等',
          'link': 'http://sangka-z.com/react-in-patterns-cn/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo-svg-color/react-16ed83.svg'
        },
        {
          'name': 'Threejs',
          'desc': 'JavaScript 3d 库',
          'link': 'https://threejs.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo/threejs-6c6680.png'
        },
        {
          'name': 'PostCSS',
          'desc': '通过 JavaScript 来转换 CSS，并且提供强大的插件生态系统',
          'link': 'http://postcss.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo-svg-color/postcss-856dd3.svg'
        },
        {
          'name': '印记中文周刊',
          'desc': '将 JavaScript Weekly 摘要部分翻译出来，帮助大家了解国外前沿技术信息',
          'link': 'http://weekly.docschina.org/',
          'logo': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHBhdGggZmlsbD0iI2Y2ZGYxYiIgZD0iTTAgMGg2NHY2NEgweiIvPjxwYXRoIGZpbGw9IiMwMTAxMDEiIGQ9Ik00MyA1MGMxLjMgMiAzIDMuNiA2IDMuNiAyLjQgMCA0LTEuMiA0LTMgMC0yLTEuNi0yLjctNC40LTRMNDcgNDZjLTQuMi0xLjgtNy00LTctOSAwLTQuNSAzLjMtOCA4LjctOCAzLjggMCA2LjYgMS40IDguNiA1bC00LjcgM2MtMS0yLTIuMi0yLjctNC0yLjdBMi42IDIuNiAwIDAgMCA0NiAzN2MwIDEuNyAxLjIgMi40IDMuNyAzLjVsMS41LjdjNSAyIDggNC40IDggOS40QzU5IDU2IDU0LjggNTkgNDkgNTlzLTktMi43LTExLTYuMnptLTIxLjIuNWMxIDEuNyAxLjggMyAzLjggM1MyOSA1MyAyOSA1MFYyOS40aDZWNTBjMCA2LjItMy44IDktOSA5YTkuMyA5LjMgMCAwIDEtOS01LjV6Ii8+PC9zdmc+'
        },
        {
          'name': 'markdown-it',
          'desc': 'Markdown 解析器。完全支持 CommonMark 规范，并且进行语法扩展、提供可编写插件和快速编译',
          'link': 'https://markdown-it.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo-svg-color/javascript2-e41bbc.svg'
        },
        {
          'name': 'localForage',
          'desc': '通过简单类似 localStorage API 的异步数据存储来改进你的 Web 应用程序的离线体验',
          'link': 'https://localforage.docschina.org/',
          'logo': 'https://cdn.docschina.org/img/assets/img/logo/lf-dda185.png'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
  },
  methods: {
    jumpTo(index) {
      window.open(this.tagList[index].link)
    },
    // 进入https://docschina.org/，运行以下代码
    getList() {
      var list = document.getElementsByClassName('category__content')[0].children
      var result = []
      for (var index = 0; index < list.length; index++) {
        result.push({
          name: list[index].getElementsByClassName('category__item-title')[0].innerText,
          desc: list[index].getElementsByClassName('category__item-sub')[0].innerText,
          link: list[index].getElementsByTagName('a')[0].href,
          logo: list[index].getElementsByTagName('img')[0].src
        })
      }
      console.log(result)
      // copy(result)
    }

  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  .dashboard-container {
    padding: 20px 10px;

    .single-tag::after {
      content: "";
      border-radius: 5px;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .single-tag:hover {
      transform: scale(1, 1);
    }
    .single-tag:hover::after {
      opacity: 1;
    }
    .single-tag {
      position: relative;
      float: left;
      width: 255px;
      text-align: center;
      border-radius: 5px;
      margin: 8px;
      padding: 25px 10px 10px 10px;
      cursor: pointer;
      border: 1px solid #eee;
      transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

      .logo {
        width: 60px;
        height: 60px;
      }

      .name {
        font-size: 18px;
        font-weight: 500;
      }

      .desc {
        color: #666;
        font-size: 12px;
        font-weight: 400;
        min-height: 50px;
        line-height: 16px;
      }
    }
  }
</style>
