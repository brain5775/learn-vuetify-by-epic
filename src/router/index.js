import { createRouter, createWebHistory } from "vue-router";
import jwtDecode from "jwt-decode";
import moment from "moment";
import axios from "axios";
import store from "@/store";
import { Buffer } from "buffer";
const routes = [
  {
    path: "/",
    name: "SignIn",
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: "/Observation",
    name: "Observation",
    component: () => import("@/views/Observation.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Patient",
    name: "Patient",
    component: () => import("@/views/Patient.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (token) {
    const exp = jwtDecode(token);
    if (moment(new Date(Date.now() - 1000 * (60 * 5))).unix() >= exp.exp) {
      const params = new URLSearchParams();
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", refreshToken);
      const response = await axios.post(store.state.tokenURL, params, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${store.state.nonProdId}:${store.state.clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      return true;
    } else {
      console.log(exp.exp);
      return true;
    }
  } else {
    return false;
  }
};

router.beforeEach(async (to, from, next) => {
  // console.log(isAuthenticated());
  if (await isAuthenticated()) {
    if (to.meta.requiresAuth) {
      next();
    } else {
      next({ name: "Patient" });
    }
  } else {
    if (to.meta.requiresAuth) {
      next({ name: "SignIn" });
    }
    next();
  }
});
// console.log();

export default router;
