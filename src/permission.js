// 做权限控制
import router from './router/index'
import useToken from './stores/token'
// 进度条插件
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

//  导航前置守卫
// 路由发生跳转 -就会执行 - 跳转前执行
// 参数 to:到哪里去 from:从哪里来  next:必须执行的一个函数

// 定义白名单 -- 不需要权限也能访问的页面
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
    // 开启进度条
    nprogress.start()
    const { token } = useToken()
    // 有token 说明登陆了
    if (token) {
        //  并且去的是登录页
        if (to.path === '/login') {
            // 跳转到主页
            next('/')
        } else {
            // 去的不是登录页 就放行
            next()
        }
    }else{
        // 没有token  ,, 是否去白名单页面
        if (whiteList.includes(to.path)) {
            // 去白名单页面 直接放行
            next()
        }else{
            // 不是白名单页面  跳转到登录页
            next('/login')
        }
    }
})

// 后置路由守卫
router.afterEach(()=>nprogress.done()) //关闭进度条
