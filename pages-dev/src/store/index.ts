import { sys } from '@/store/mod/sys';
import { createStore } from 'vuex';

export default createStore({
  modules: {
    [sys.__name__]: sys,
  },
});
