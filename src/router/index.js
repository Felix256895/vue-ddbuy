import Vue from "vue";
import VueRouter from "vue-router";

const Dashboard = () => import("views/dashboard/Dashboard");
const Home = () => import("views/home/Home");
const Category = () => import("views/category/Category");
const Eat = () => import("views/eat/Eat");
const Cart = () => import("views/cart/Cart");
const Mine = () => import("views/mine/Mine");

const Login = () => import("views/login/Login");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    children: [
      {
        path: "/dashboard",
        redirect: "/dashboard/home"
      },
      {
        path: "home",
        name: "home",
        component: Home,
        //是否数据缓存
        meta: {
          keepAlive: true
        }
      },
      {
        path: "category",
        name: "category",
        component: Category,
        meta: {
          keepAlive: true
        }
      },
      {
        path: "eat",
        name: "eat",
        component: Eat,
        //是否数据缓存
        meta: {
          keepAlive: true
        }
      },
      {
        path: "cart",
        name: "cart",
        component: Cart
      },
      {
        path: "mine",
        name: "mine",
        component: Mine
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  // 解决路由跳转页面没有置顶
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
