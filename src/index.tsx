import { QuarkElement, property, customElement, state, createRef } from "quarkc"
import style from "./index.less?inline"

declare global {
  interface HTMLElementTagNameMap {
    "quarkc-collapse": MyComponent;
  }
}

@customElement({ tag: "quarkc-collapse", style })
class MyComponent extends QuarkElement {

  @property({ type: String })
  title = null

  @property({ type: String })
  content = null

  @property({ type: String })
  iconPosition = 'right'

  @state() // 默认展开内容
  isShowContent = true

  @state() // 默认不是自定义icon
  isCustomIcon = false
  
  slotRef = createRef()
  onSlotChange = () => {
    // 此处已获取到 slot 的 dom 实例。
    const { current } = this.slotRef
    console.log(current);
  }

  componentDidMount() {
    // 生命周期
    const children = Array.from(document.querySelector('quarkc-collapse').children)
    children.some(item => {
      if (item.getAttribute('slot') === 'icon') {
        this.isCustomIcon = true;
        return true
      }
    })
    console.log(this.isCustomIcon)
    console.log("dom loaded!")
    // ...
  }

  render() {
    return (
      // slot 在 Chrome 53, Opera 40, Safari 10，火狐 59 和 Edge 79 中支持。
      <>
        <div className="quarkcCollapseContainer">
          <div className="header" onClick={this._clickIcon}>
            <div className="header-left">
              {this.iconPosition === 'left' ? this._iconRender() : ''}
              {
                this.title
                ? <span>{this.title}</span>
                : <slot name="title"></slot>
              }
              { this.iconPosition === 'middle' ? this._iconRender() : '' }
            </div>
            <div className="header-right">
              {this.iconPosition === 'right' ? this._iconRender() : ''}
            </div>
          </div>
          {
            this.isShowContent
            ? <div className="content">
                <slot name="content"></slot>
              </div>
            : null
          }
        </div>
      </>
    );
  }

  _iconRender = () => {
    return (
      this.isCustomIcon ? <slot name="icon" ref={this.slotRef} onslotchange={this.onSlotChange} ></slot>
      : this.isShowContent
      ? this._iconDown()
      : this._iconUp()
    )
  }

  _clickIcon = () => {
    this.isShowContent = !this.isShowContent
  }
  
  _iconDown = () => {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99992 10.9335L3.33325 6.26683L4.26658 5.3335L7.99992 9.06683L11.7333 5.3335L12.6666 6.26683L7.99992 10.9335Z" fill="#8695A3"/>
      </svg>
    )
  }

  _iconUp = () => {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00008 5.33359L12.6667 10.0003L11.7334 10.9336L8.00008 7.20026L4.26675 10.9336L3.33342 10.0003L8.00008 5.33359Z" fill="#8695A3"/>
      </svg>
    )
  }

}

export default MyComponent;