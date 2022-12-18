<template>
  <div class="root-layout-header dc-text-center">
    <template v-for="item in menus" :key="item.href">
      <ReferLink :href="item.href" class="menu" @click="active=item"
                 :class="{active:item.href===active.href}">
        {{ item.text }}
      </ReferLink>
    </template>
  </div>
</template>

<script lang="ts">
import ReferLink from '@/components/menu/ReferLink.vue';
import { Cast, Storages } from '@hyong8023/tool-box';
import { shallowRef } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

@Options({
  components: { ReferLink },
  emits: [],
})
export default class LayoutHeader extends Vue {
  menus = [
    {
      href: '../tsc-in-browser/tsc-in-browser.html',
      text: 'TS in Browser',
    },
    {
      href: '../tool-box/doc/index.html',
      text: 'Tool-Box API',
    },
  ];
  active: any = Cast.anyO;

  @Watch('active')
  watch$active() {
    Storages.$local.save('active-menu', this.active);
  }

  mounted() {
    this.active = Storages.$local.remove('active-menu') || {};
    // document.onkeydown = function (e) {
    //   const evt: any = window.event || e;
    //   const code = evt.keyCode || evt.which;
    //   // 屏蔽F1---F12
    //   if (code > 111 && code < 124) {
    //     if (evt.preventDefault) {
    //       evt.preventDefault();
    //     } else {
    //       evt.keyCode = 0;
    //       evt.returnValue = false;
    //     }
    //   }
    // };
    // // 禁止鼠标右键菜单
    // document.oncontextmenu = function (e) {
    //   return false;
    // };
    // // 阻止后退的所有动作，包括 键盘、鼠标手势等产生的后退动作。
    // window.history.pushState(null, null as any, window.location.href);
    // window.addEventListener('popstate', () => {
    //   window.history.pushState(null, null as any, window.location.href);
    // });
  }
}
</script>

<style scoped lang="scss">
.root-layout-header {background:transparent;
  .menu {text-decoration:none; padding:.25rem; border-bottom:2px solid transparent; cursor:pointer;
    &:hover, &.active {border-bottom:2px solid #00aff4;}
  }
  .menu + .menu {margin-left:1rem;}
}
</style>
