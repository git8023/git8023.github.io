import { laboratory } from '@/store/mod/laboratory';
import { openApiTransfer } from '@/store/mod/openApiTransfer';
import { sys } from '@/store/mod/sys';
import { Cast, Jsons, types, vuex } from '@hyong8023/tool-box';
import { createStore } from 'vuex';

type M = vuex.ModuleX<any, any>;

const mods: Array<M> = [
  sys, openApiTransfer, laboratory,
];

export default createStore({
  modules: mods.reduce((result, item) => {
    Jsons.computeIfAbsent(result, item.__name__, item);
    return result;
  }, Cast.as<types.RecordS<M>>()),
});
