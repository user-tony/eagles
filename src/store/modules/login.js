/**
 * login module
 */
import loginApi from 'api/login'
import {saveCookie, getCookie} from 'utils/authService'
export const SET_AUTH_TYPE = 'SET_AUTH_TYPE'
export const SET_CODE = 'SET_CODE'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_UID = 'SET_UID'
export const SET_EMAIL = 'SET_EMAIL'
export const SET_SETTING = 'SET_SETTING'
export const SET_STATUS = 'SET_STATUS'
export const SET_NAME = 'SET_NAME'
export const SET_AVATAR = 'SET_AVATAR'
export const SET_ROLES = 'SET_ROLES'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SET_INTRODUCTION = 'SET_INTRODUCTION'

export default {
  state: {
    user: '',
    status: '',
    email: '',
    code: '',
    uid: undefined,
    auth_type: '',
    token: getCookie('Access-Token'),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    [SET_AUTH_TYPE] (state, type) {
      state.auth_type = type;
    },
    [SET_CODE] (state, code) {
      state.code = code;
    },
    [SET_TOKEN] (state, token) {
      state.token = token;
    },
    [SET_UID] (state, uid) {
      state.uid = uid;
    },
    [SET_EMAIL] (state, email) {
      state.email = email;
    },
    [SET_INTRODUCTION] (state, introduction) {
      state.introduction = introduction;
    },
    [SET_SETTING] (state, setting) {
      state.setting = setting;
    },
    [SET_STATUS] (state, status) {
      state.status = status;
    },
    [SET_NAME] (state, name) {
      state.name = name;
    },
    [SET_AVATAR] (state, avatar) {
      state.avatar = avatar;
    },
    [SET_ROLES] (state, roles) {
      state.roles = roles;
    },
    [LOGIN_SUCCESS] () {
      console.log('login success')
    },
    [LOGOUT_USER] (state)  {
      state.user = '';
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi.login(userInfo).then(response => {
          const data = response.data;
          saveCookie('Access-Token', response.data.token);
          commit(SET_TOKEN, data.token);
          resolve();
        }).catch(error => {
          console.log("error",error);
          reject(error);
        });
      });
    },

    //  // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     loginApi.getInfo(state.token).then(response => {
    //       const data = response.data;
    //       commit('SET_ROLES', data.role);
    //       commit('SET_NAME', data.name);
    //       commit('SET_AVATAR', data.avatar);
    //       commit('SET_INTRODUCTION', data.introduction);
    //       resolve(response);
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },
    //
    // // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     loginApi.logout(state.token).then(() => {
    //       commit('SET_TOKEN', '');
    //       commit('SET_ROLES', []);
    //       Cookies.remove('X-Ivanka-Token');
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },
    //
    // // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '');
    //     Cookies.remove('X-Ivanka-Token');
    //     resolve();
    //   });
    // }
  }
}
