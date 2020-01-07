import Vue from "vue";
import VueRouter from "vue-router";

const Dashboard = () => import("views/dashboard/Dashboard");
const Home = () => import("views/home/Home");
const Category = () => import("views/category/Category");
const Eat = () => import("views/eat/Eat");
const Cart = () => import("views/cart/Cart");
const Mine = () => import("views/mine/Mine");
const PersonInfo = () => import("views/mine/personInfo");
const EditNickName = () => import("views/mine/editNickName");
const MyOrder = () => import("views/mine/myOrder");
const CouponList = () => import("views/mine/couponList");
const Order = () => import("views/order");
const MyAddress = () => import("views/order/myAddress");
const AddAddress = () => import("views/order/myAddress/addAddress");
const OrderGoodsList = () => import("views/order/orderGoodsList");
const GoodsDetail = () => import("components/goodsDetail");

const Login = () => import("views/login/Login");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: {
      keepAlive: true
    }
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
        component: Cart,
        meta: {
          keepAlive: true
        }
      },
      {
        path: "mine",
        name: "mine",
        component: Mine,
        children: [
          {
            path: "personInfo",
            name: "personInfo",
            component: PersonInfo,
            children: [
              {
                path: "editNickName",
                name: "editNickName",
                component: EditNickName
              }
            ]
          },
          {
            path: "myOrder",
            name: "myOrder",
            component: MyOrder
          },
          {
            path: "couponList",
            name: "couponList",
            component: CouponList
          }
        ]
      }
    ]
  },
  {
    path: "/order",
    name: "order",
    component: Order,
    children: [
      {
        path: "myAddress",
        name: "myAddress",
        component: MyAddress,
        children: [
          {
            path: "addAddress",
            name: "addAddress",
            component: AddAddress
          }
        ]
      },
      {
        path: "orderGoodsList",
        name: "orderGoodsList",
        component: OrderGoodsList
      }
    ]
  },
  {
    path: "/goodsDetail",
    name: "goodsDetail",
    component: GoodsDetail
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
