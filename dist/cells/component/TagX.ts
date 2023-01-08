/**
 * - connectedCallback：实例生成时触发
 * - disconnectedCallback：实例插入HTML文档时触发
 * - adoptedCallback：实例从HTML文档移除时触发
 * - attributeChangedCallback(attrName, oldVal, newVal)：实例的属性发生改变时（添加、移除、更新）触发
 */
class TagX extends HTMLElement {
  private _root!: ShadowRoot;

  constructor() {
    super();

    this._root = this.attachShadow({ mode: 'closed' });

    // 实现input
    const type = this.getAttribute('type');
    switch (type) {
      case 'input':
        this.createInput();
        break;
      default:
        console.log('暂未实现: ', type);
    }
  }

  createInput() {
    const input = document.createElement('input');
    input.setAttribute('placeholder', '转发按键事件');
    input.addEventListener('keydown', (ev) => {
      console.log('createInput.focus', ev);
      const customEvent = new CustomEvent('change', {
        detail: {
          origin: ev,
          data: input.value,
        },
        bubbles: true,
        cancelable: true,
      });
      this.dispatchEvent(customEvent);
    });

    this.appendContent(input);
  }

  private appendContent(tag: Node) {
    this._root.appendChild(tag);
  }

  // 组件被挂载
  connectedCallback() {
    console.log('Custom square element added to page.');
  }

  // 组件卸载
  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  // 组件移动到新文档
  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }

  // 属性变化
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.', name, oldValue, newValue);
  }
}

customElements.define('tag-x', TagX);
