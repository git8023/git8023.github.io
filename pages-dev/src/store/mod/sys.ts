import { ActionTree, GetterTree, Module, MutationTree, } from 'vuex';
import { StoreTools, types } from '@hyong8023/tool-box';

function getDefaultState() {
  return { token: '', };
}

const state = getDefaultState();
type T = typeof state;

class UserStore implements Module<T, any> {
  namespaced = true;
  state = state;
  mutations: MutationTree<T> = { ...StoreTools.generateMutations(state) };
  actions: ActionTree<T, any> = { ...StoreTools.generateActions(state) };
  getters: GetterTree<T, any> = { ...StoreTools.generateGetters(state) };
}

export type User = T;
export type UserModKey = types.KeyOfOnly<User>;
export const user = new UserStore();


