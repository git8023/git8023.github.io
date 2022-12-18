import { RouteRecordRaw } from 'vue-router';
import { FormItemRule } from 'element-plus';
import { fns } from '@hyong8023/tool-box';

export namespace vms {

  export interface RouterRecordMeta {
    /**
     * 菜单标签名
     */
    menuLabel?: string;
    /** require(path) */
    icon?: any;
    /**
     * 是否侧边栏隐藏
     */
    hide?: boolean;
    /** 子路由平铺到当前层 */
    flat?: boolean;
  }

  export type RouterRecord = RouteRecordRaw & { meta?: RouterRecordMeta, children?: RouterRecord[] }

  export interface Menu {
    /** 菜单名 */
    text: string;
    /** 完整路由 */
    route: string;
    /** 子菜单 */
    children: Menus;
    /** 父菜单 */
    parent: Menu;
    /** 菜单是否可以作为路由导航 */
    routable: boolean;
  }

  export type Menus = Menu[];

  export type Enum = {
    /** 字面值 */
    literal: string;
    /** 值 */
    value: string | number;
    /** 描述 */
    description: string
  };

  export type EnumMapping<T> = Record<keyof T, Enum>;
  /**
   * 规则触发时机
   */
  type FormValidationRuleTrigger = 'blur' | 'change'

  /**
   * 表单校验规则
   */
  export type FormValidationRule<T> = {
    [P in keyof T]?: FormItemRule | FormItemRule[]
  }

  export type Dialog<T = any> = {
    visible?: boolean;
    loading?: boolean;
    form?: Partial<T>;
    rules?: vms.FormValidationRule<T>;
    clear: fns.Caller;
    [s: string]: any;
  }

  export interface ReferLink {
    href: string;
    title?: string;
  }
}
