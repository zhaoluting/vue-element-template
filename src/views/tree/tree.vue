<!--
 * @file: 数据保障导航栏菜单数据处理
 * @author: 赵璐婷
 * @createAt: 2017/10/30
 * @description: 导航栏菜单数据处理，获取权限菜单和当前选中项

  每个子集的必要属性
    - autoId：唯一标识符，要在每个元素上加上该ID
    - icon：'folder'或者'file'，用于判断是文件夹还是文件
    - depth：当前层级，从0开始计算
    - hierarchy：从顶层到当前元素的autoId数组，可以方便的知道父级autoId
    - index：从顶层到当前元素的索引数组，可以方便得通过localtionMenu找到相应元素
    - expand：当前目录是否展开
    - children：目录的子集
    - name：显示的名称

  函数集合：
    - (setMenus)初始化目录 （第一次加载）
    - (setMenuSelectKey)选中目录树（界面操作）
    - (openNextDepth)传入父级，获得目录子集（界面操作）
    - (findFile)从非目录树处获取文件信息，并搜索展示文件，若当前目录树中没有，则一层一层往上添加目录找
    - (reloadMenu)刷新整个目录树（界面操作）
    - (moveFile)移动文件或文件夹（界面操作）
    - (deleteFile)本地删除某个目录（只能为空）或 文件  （界面操作）
    - (addFile)添加某个文件（界面操作）
    - (renameFolder)更新文件夹，传入文件夹更新后的信息
    - (searchFile)搜索文件，在当前目录树中搜索已加载的文件或文件夹
    - (localtionMenu)定位目录树，传入索引
    - (scrollToMenu)使选中文件滚动到屏幕可见范围，传入文件key（需要在每个元素节点加入ID）
    - (getNewMenu)刷新目录树，传入旧目录树，保留原目录树展开状态
    - (refreshFolder)只刷新一级文件夹，传入父级ID（做到无感知）
    - (initMenus)初始化目录树(只获得一级目录)
    - (getNextDepth)通过父级获得子目录
    - (addStateFolder)添加某个文件夹，若文件夹未在当前目录加载出来，则不断往父级搜索(目录最多只能有三级，这里写的比较粗暴，还需要优化)
    - (addStateFile)添加某个文件，若文件未在当前目录加载出来，则不断往父级搜索(目录最多只能有三级，这里写的比较粗暴，还需要优化)
-->
<script>
import { getDirectoryTree } from '@/api/tree'

export default {
  data() {
    return {
      // 临时目录存储
      sideMenuData: [],
      // 目录结构
      menus: [],
      // 当前选中目录的唯一标识值
      menuSelectKey: '',
      // 展开整个目录树
      expandall: false,
      // 当前选中文件信息
      modifyDirectoryData: {},
      // 当前所在目录信息
      currentFolder: {},
      // 是否显示加载中
      spinning: false
    }
  },
  watch: {},

  methods: {
    // 初始化目录（第一次加载）
    async setMenus(rootDirectory) {
      this.spinning = true
      this.menus = []
      this.menus = await this.initMenus(rootDirectory)
      this.spinning = false
    },

    // 选中目录树（界面操作）
    setMenuSelectKey(key) {
      this.menuSelectKey = key
      this.scrollToMenu(key, 0)
    },

    // 传入父级，获得目录子集（界面操作）
    async openNextDepth(folder) {
      this.spinning = true
      const menu = this.localtionMenu(folder.index, this.menus)
      menu.children = await this.getNextDepth(menu)
      if (menu.children.length > 0) menu.expand = true
      this.spinning = false
    },

    // 从非目录树处获取文件信息，并搜索展示文件，若当前目录树中没有，则一层一层往上添加目录找
    async findFile(file) {
      this.currentFolder = {}
      // searchFile方法会将文件父级目录赋值给currentFolder
      await this.searchFile(this.menus[0].children, file.parentId, 'file')
      if (this.currentFolder.icon) await this.refreshFolder(file.parentId)
      else this.addStateFile(file)
    },

    // 刷新整个目录树
    async reloadMenu(rootDirectory) {
      this.spinning = true
      // 存储旧目录树
      this.sideMenuData = JSON.parse(JSON.stringify(this.menus))
      // 获取初始化的新目录树
      this.menus = await this.initMenus(rootDirectory)
      // 保留原目录树展开状态，获取新目录树
      await this.getNewMenu(this.sideMenuData[0].children, this.menus[0].children)
      this.sideMenuData = this.menus
      this.spinning = false
    },

    // 移动文件或文件夹（界面操作）
    moveFile(file) {
      this.deleteFile(file)
      if (file.icon === 'file') this.addFile(file)
      if (file.icon === 'folder') this.addFolder(file)
    },

    // 本地删除某个目录（只能为空）或 文件  （界面操作）
    deleteFile(data) {
      // 定位，获取父级目录
      const menu = this.localtionMenu(data.index.slice(0, data.index.length - 1), this.menus)
      if (menu.children && menu.children.length > 0) {
        // 删除操作
        menu.children.splice(data.index[data.index.length - 1], 1)
        // 整理剩余子集的index标识
        let index = 0
        for (const item of menu.children) {
          item.index[item.index.length - 1] = index
          index++
        }
      }
    },

    // 添加某个文件（界面操作）
    async addFile(file) {
      this.spinning = true
      await this.addStateFile(file)
      this.spinning = false
    },

    // 更新文件夹，传入文件夹更新后的信息
    renameFolder(folder) {
      let menu = null
      if (folder.index) {
        menu = this.localtionMenu(folder.index, this.menus)
      } else {
        this.searchFile(this.menus[0].children, folder.autoId, 'file')
        menu = this.currentFolder
      }
      menu.name = folder.name
      menu.creator = folder.creator
    },

    // 搜索文件，在当前目录树中搜索已加载的文件或文件夹
    async searchFile(menu, autoId, type) {
      if (menu.icon === type && menu.autoId === autoId) {
        this.currentFolder = menu
      } else {
        for (const name in menu) {
          if (typeof menu[name] === 'object') {
            this.searchFile(menu[name], autoId, type)
          }
        }
      }
    },

    // 定位目录树，传入索引
    localtionMenu(indexs, menus) {
      let menu = menus
      for (const i in indexs) {
        if (i < indexs.length - 1) menu = menu[indexs[i]].children
        else menu = menu[indexs[i]]
      }
      return menu
    },

    // 使选中文件滚动到屏幕可见范围，传入文件key（需要在每个元素节点加入ID）
    scrollToMenu(key, time) {
      time++
      const file = document.getElementById(key)
      if (file) {
        const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
        if (userAgent.indexOf('Chrome') > -1) {
          file.scrollIntoView({
            behavior: 'smooth', // 默认 auto
            block: 'center', // 默认 center
            inline: 'nearest' // 默认 nearest
          })
        } else if (userAgent.indexOf('Safari') > -1) {
          file.scrollIntoViewIfNeeded(true)
        } // 判断是否Safari浏览器
      } else if (!file && time < 10) {
        // 若文件未加载出来，给予缓冲时间
        setTimeout(() => {
          this.scrollToMenu(key, time)
        }, 600)
      }
    },

    // 刷新目录树，传入旧目录树，保留原目录树展开状态
    async getNewMenu(oldMenu, newMenu) {
      const menus = newMenu
      if (oldMenu.icon) {
        if (oldMenu.children && oldMenu.children.length > 0) {
          menus.children = await this.getNextDepth(oldMenu)
          menus.expand = oldMenu.expand
          this.getNewMenu(oldMenu.children, menus.children)
        }
      } else {
        for (const index in menus) {
          for (const oldIndex in oldMenu) {
            if (menus[index].autoId === oldMenu[oldIndex].autoId && menus[index].icon === oldMenu[oldIndex].icon) {
              this.getNewMenu(oldMenu[oldIndex], menus[index])
            }
          }
        }
      }
    },

    // 只刷新一级文件夹，传入父级ID（做到无感知）
    async refreshFolder(parentId) {
      this.currentFolder = {}
      // 定位父级目录
      if (parentId === this.menus[0].autoId) this.currentFolder = this.menus[0]
      else await this.searchFile(this.menus[0].children, parentId, 'folder')
      // 通过父级获得子目录
      const children = await this.getNextDepth(this.currentFolder)
      let folderCount = 0
      let find = false
      // 获取当前目录下文件夹个数
      for (const i of this.currentFolder.children) {
        if (i.icon === 'folder') folderCount++
      }
      const childrenList = []
      // 遍历新目录，将原本不存在的子集加入旧目录
      children.forEach((element) => {
        find = false
        childrenList.push(element.autoId)
        // 遍历目录，判断是否存在当前子集
        for (const item of this.currentFolder.children) {
          if (element.autoId === item.autoId && element.icon === item.icon) {
            find = true
          }
        }
        if (!find && element.icon === 'folder') {
          folderCount++
          this.currentFolder.children.unshift(element)
        } else if (!find && element.icon === 'file') {
          this.currentFolder.children.splice(folderCount, 0, element)
        }
      })
      // 遍历旧目录，将现在已不存在的子集删除
      let count = this.currentFolder.children.length
      while (count--) {
        if (childrenList.indexOf(this.currentFolder.children[count].autoId) < 0) this.currentFolder.children.splice(count, 1)
      }
      // 整理当前目录的索引
      this.currentFolder.children.forEach((el, i) => {
        el.index[el.depth] = i
      })
    },

    // 初始化目录树(只获得一级目录)
    async initMenus(rootDirectory) {
      let sideMenuData = []
      if (rootDirectory !== '' && rootDirectory.length !== 0) {
        sideMenuData = [rootDirectory]
        sideMenuData[0].autoId = sideMenuData[0].rootDirId
        sideMenuData[0].icon = 'folder'
        sideMenuData[0].depth = 0
        sideMenuData[0].hierarchy = []
        sideMenuData[0].index = [0]
        sideMenuData[0].name = '任务开发'
        sideMenuData[0].expand = true
        sideMenuData[0].children = await this.getNextDepth(sideMenuData[0])
      }
      return sideMenuData
    },

    // 通过父级获得子目录
    async getNextDepth(folder) {
      const search = []
      let index = 0
      const hierarchy = JSON.parse(JSON.stringify(folder.hierarchy))
      hierarchy.push(folder.autoId)
      await getDirectoryTree({ parentId: folder.autoId }).then((res) => {
        if (res.data.children.length === 0 && res.data.jobList.length === 0) this.$message({ message: `${folder.name}下为空`, type: 'warning' })
        res.data.children.forEach((element) => {
          const temp = element
          temp.icon = 'folder'
          temp.children = []
          temp.hierarchy = hierarchy
          temp.index = [...folder.index, index]
          temp.expand = true
          // 生成目录结构
          search.push(temp)
          index++
        })
        res.data.jobList.forEach((element) => {
          const job = element
          job.redirect = job.autoId
          job.icon = 'file'
          job.parentId = res.data.parent.autoId
          job.depth = folder.depth + 1
          job.hierarchy = hierarchy
          job.index = [...folder.index, index]
          // 生成目录结构
          search.push(job)
          index++
        })
      })
      return search
    },

    // 添加某个文件夹，若文件夹未在当前目录加载出来，则不断往父级搜索(目录最多只能有三级，这里写的比较粗暴，还需要优化)
    async addStateFolder(folder) {
      const menu = this.menus[0]
      let find = false
      folder.icon = 'folder'
      folder.children = []
      folder.expand = true
      if (folder.depth === 2) {
        for (const index in menu.children) {
          if (menu.children[index].autoId === folder.parentId) {
            folder.hierarchy = [...menu.children[index].hierarchy, menu.children[index].autoId]
            folder.index = [...menu.children[index].index, 0]
            find = true
          }
        }
        if (find) {
          menu.children[folder.index[1]].children = await this.getNextDepth(menu.children[folder.index[1]])
        } else {
          let parent = []
          await getDirectoryTree({ parentId: folder.parentId }).then((res) => {
            parent = res.data.parent
            parent.hierarchy = [menu.autoId]
            parent.index = [0, 0]
            parent.icon = 'folder'
            parent.children = []
            parent.expand = true
            menu.children.unshift(parent)
            menu.children.forEach((el, i) => {
              el.index[el.depth] = i
            })
          })
          menu.children[0].children = await this.getNextDepth(parent)
        }
      } else {
        folder.hierarchy = [menu.autoId]
        folder.index = [0, 0]
        menu.children.unshift(folder)
        menu.children.forEach((el, i) => {
          el.index[el.depth] = i
        })
      }
    },

    // 添加某个文件，若文件未在当前目录加载出来，则不断往父级搜索(目录最多只能有三级，这里写的比较粗暴，还需要优化)
    async addStateFile(file) {
      const menu = this.menus[0]
      if (file.depth === 1) {
        this.refreshFolder(file.parentId)
      } else if (file.depth === 2) {
        for (const index in menu.children) {
          if (menu.children[index].autoId === file.parentId) {
            this.refreshFolder(file.parentId)
          }
        }
      } else if (file.depth === 3) {
        this.currentFolder = {}
        await this.searchFile(this.menus[0].children, file.parentId, 'folder')
        if (this.currentFolder.children !== undefined) this.refreshFolder(file.parentId)
        else {
          await getDirectoryTree({ parentId: file.parentId }).then((res) => {
            file.pParentId = res.data.parent.parentId
          })
          await this.refreshFolder(file.pParentId)
          await this.refreshFolder(file.parentId)
        }
      } else {
        await getDirectoryTree({ parentId: file.parentId }).then((res) => {
          file.depth = res.data.parent.depth + 1
          this.addStateFile(file)
        })
      }
    }
  }
}
</script>

