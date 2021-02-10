import { Effect, ImmerReducer, Subscription } from 'umi';

export interface IUserInfo {
  name: string;
}

export interface IGlobalState {
  userInfo: IUserInfo;
}

export interface IGlobalModel {
  namespace: string;
  state: IGlobalState;
  effects: {
    getUserInfo: Effect;
  };
  reducers: {
    setUserInfo: ImmerReducer<IGlobalState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const globalModel: IGlobalModel = {
  namespace: 'global',
  state: {
    userInfo: {
      name: 'paddy',
    },
  },
  effects: {
    //call 外部函数 put 相当于 dispatch
    *getUserInfo({ payload }, { call, put }) {
      let result: any;
      yield call(() => {
        return new Promise((resolve: any, reject) => {
          setTimeout(() => {
            result = 'patrick';
            resolve();
          }, 3 * 1000);
        });
      }, payload);

      yield put({ type: 'setUserInfo', payload: { name: result } });
      return 'success';
    },
  },
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      console.log('setup something');
    },
  },
};

export default globalModel;
