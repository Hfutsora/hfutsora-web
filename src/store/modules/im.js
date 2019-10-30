import SDK from 'netease-nim-web-sdk';

// eslint-disable-next-line import/no-cycle
// import { getIMInfo } from '@/api/im';
import config from '@/config/im';

const im = {
  state: {
    nim: '',
    messageList: [],
    messageListLength: 0,
  },
  mutations: {
    SET_NIM: (state, nim) => {
      state.nim = nim;
    },
    UPDATE_MESSAGE_LIST_LENGTH: (state, messageList) => {
      state.messageListLength = messageList.length;
    },
    SET_MESSAGE_LIST: (state, messageList) => {
      state.messageList = messageList;
    },
    UPDATE_MESSAGE_LIST: (state, msg) => {
      state.messageList.push(msg);
    },
  },
  actions: {
    connect({ commit, state }) {
      if (state.nim) {
        return;
      }

      // console.log('config', config);

      const nim = SDK.getInstance({
        appKey: config.appKey,
        account: config.account,
        token: config.token,
        autoMarkRead: false,
        syncSessionUnread: true,
        needMsgReceipt: config.needMsgReceipt || false,
        onconnect: () => {
          console.log('SDK 连接成功');

          nim.getHistoryMsgs({
            scene: 'p2p',
            limit: 20,
            to: '13600000001',
            done: (error, history) => {
              console.log('获取云端历史', error, history);
              commit('SET_MESSAGE_LIST', history.msgs.reverse());
              commit('UPDATE_MESSAGE_LIST_LENGTH', state.messageList);
            },
          });
          // nim.clearServerHistoryMsgs({
          //   account: '13600000003',
          //   delRoam: true,
          //   done: () => {
          //     console.log('删除成功');
          //   },
          // });
        },
        ondisconnect: function onDisconnect(error) {
          console.log('SDK 连接断开', error);

          switch (error.code) {
            // 账号或者密码错误, 请跳转到登录页面并提示错误
            case 302:
              console.log('帐号或密码错误', 'login');
              break;
              // 被踢, 请提示错误后跳转到登录页面
            case 'kicked':
              console.log('kicked');
              break;
            default:
              break;
          }
        },
        onWillReconnect: function onWillReconnect(obj) {
          // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
          console.log('即将重连');
          console.log(obj.retryCount);
          console.log(obj.duration);
        },
        onroamingmsgs(msg) {
          console.log('---onroamingmsgs----', msg);
        },
        onofflinemsgs(msg) {
          console.log('---onofflinemsgs---', msg);
          nim.sendMsgReceipt({
            msg,
            done: (error, obj) => {
              console.log(`发送消息已读回执${!error ? '成功' : '失败'}`, error, obj);
            },
          });
        },
        onmsg: function onmag(msg) {
          console.log('收到消息', msg.scene, msg.type, msg);
          nim.setCurrSession(msg.sessionId);

          commit('UPDATE_MESSAGE_LIST', msg);
          commit('UPDATE_MESSAGE_LIST_LENGTH', state.messageList);

          nim.sendMsgReceipt({
            msg,
            done: (error, obj) => {
              console.log(`发送消息已读回执${!error ? '成功' : '失败'}`, error, obj);
            },
          });
        },
        onsessions: function onSessions(sessions) {
          console.log('收到会话列表', sessions);
          // data.sessions = nim.mergeSessions(data.sessions, sessions);
        },
        // onupdatesession: function onUpdateSession(session) {
        //   console.log('会话更新了', session);
        //   // data.sessions = nim.mergeSessions(data.sessions, session);
        // },
        onRoamingMsgs: function onRoamingMsgs(obj) {
          console.log('漫游消息', obj);
        },
        onOfflineMsgs: function onOfflineMsgs(obj) {
          console.log('离线消息', obj);
        },
        onerror: function onError(error) {
          console.log('网络连接状态异常', error);
        },
      });

      console.log('nim---', nim);

      commit('SET_NIM', nim);
    },
  },
};


export default im;
