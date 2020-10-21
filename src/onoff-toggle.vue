<template>
  <label
    :class="labelClass"
    :style="labelStyle"
  >
    <input
      type="checkbox"
      :name="name"
      :checked="value"
      :disabled="disabled"
      @change="$emit('input', $event.target.checked)"
    />
    <div
      class="v-toggle_thumb"
      :style="thumbStyle"
    />
  </label>
</template>

<script>
const THEME_DEFAULT = 'default'
const THEME_IOS = 'ios'
const THEME_MATERIAL = 'material'
const THEMES = {
  [THEME_DEFAULT]: {
    size: {
      width: 75,
      height: 40
    },
    color: {
      on: '#f3a978',
      off: '#5a6676',
      thumb: '#ffffff'
    },
    margin: 6
  },
  [THEME_IOS]: {
    size: {
      width: 60,
      height: 36
    },
    color: {
      on: '#13bf11',
      off: '#f8f8f8',
      border: '#dddddd',
      thumb: '#ffffff'
    },
    margin: 2
  },
  [THEME_MATERIAL]: {
    size: {
      width: 34,
      height: 14
    },
    color: {
      on: 'rgba(25, 118, 210, 0.5)',
      off: '#9f9f9f',
      thumb: 'rgb(25, 118, 210)',
      disabled: 'rgba(0, 0, 0, 0.12)'
    },
    margin: -3
  }
}

import { px, semiOpaqueColor } from './utils'

export default {
  name: 'OnoffToggle',
  props: {
    value: { type: Boolean, default: false },
    theme: { type: String, default: THEME_DEFAULT },
    name: { type: String },
    disabled: { type: Boolean, default: false },
    onColor: { type: String },
    offColor: { type: String },
    thumbColor: { type: String },
    borderColor: { type: String },
    width: { type: [Number, String] },
    height: { type: [Number, String] },
    margin: { type: [Number, String] }
  },
  computed: {
    themeInfo() {
      return THEMES[this.theme] || THEMES[THEME_DEFAULT]
    },
    labelClass() {
      const classNames = [
        'v-toggle',
        'v-toggle-' + this.theme,
        this.value ? 'on' : 'off'
      ]

      if (this.disabled) {
        classNames.push('disabled')
      }

      return classNames
    },
    labelStyle() {
      const width = this.bodyWidth
      const height = this.bodyHeight
      const onColor = this.onColor || this.themeInfo.color.on
      const offColor = this.offColor || this.themeInfo.color.off
      const margin = Number(this.margin) || this.themeInfo.margin || 0
      const borderColor = this.borderColor || this.themeInfo.color.border
      const style = {
        width: px(width),
        height: px(height),
        borderRadius: px(height / 2),
        backgroundColor: this.value ? onColor : offColor
      }

      if (this.theme === THEME_IOS) {
        Object.assign(style, {
          backgroundColor: offColor,
          boxShadow: `inset 0 0 0 ${this.value ? height / 2 : 0}px ${onColor}, 0 0 0 ${margin}px ${this.value ? onColor : borderColor}`
        })
      } else if (this.theme === THEME_MATERIAL) {
        if (this.disabled) {
          Object.assign(style, {
            backgroundColor: THEMES[THEME_MATERIAL].color.disabled,
            opacity: 1
          })
        } else if (this.value && !this.onColor && this.thumbColor) {
          style.backgroundColor = semiOpaqueColor(this.thumbColor, 0.5)
        }
      }

      return style
    },
    thumbStyle() {
      const margin = Number(this.margin) || this.themeInfo.margin || 0
      const size = this.bodyHeight - (margin * 2)
      const color = this.thumbColor || this.themeInfo.color.thumb
      const left = this.value ? (this.bodyWidth - size - margin) : margin
      const borderColor = this.borderColor || this.themeInfo.color.border
      const style = {
        width: px(size),
        height: px(size),
        left: px(left),
        top: px(margin),
        borderRadius: px(size / 2),
        backgroundColor: color,
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)'
      }

      if (this.theme === THEME_IOS) {
        Object.assign(style, {
          width: px(this.bodyHeight),
          height: px(this.bodyHeight),
          left: this.value ? `calc(100% - ${this.bodyHeight}px)` : px(0),
          top: px(0),
          borderRadius: px(this.bodyHeight / 2),
          backgroundColor: color,
          boxShadow: this.value
            ? `0 0 0 ${margin}px transparent, 0 3px 3px rgba(0, 0, 0, 0.3)`
            : `0 3px 3px rgba(0, 0, 0, 0.2), 0 0 0 ${margin}px ${borderColor}`
        })
      } else if (this.theme === THEME_MATERIAL) {
        Object.assign(style, {
          backgroundColor: this.value ? color : '#ffffff',
          transition: 'left 0.15s',
          boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
        })
        if (this.disabled) {
          style.backgroundColor = '#bdbdbd'
        }
      }

      return style
    },
    bodyWidth() {
      return Number(this.width) || this.themeInfo.size.width
    },
    bodyHeight() {
      return Number(this.height) || this.themeInfo.size.height
    }
  }
}
</script>

<style scoped>
.v-toggle {
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
}
.v-toggle.disabled {
  opacity: 0.5;
  cursor: auto;
}
.v-toggle input {
  margin: 0;
  padding: 0;
  width: 0;
  height: 0;
  opacity: 0;
  outline: none;
}
.v-toggle_thumb {
  position: absolute;
  transition: all 0.3s;
}
</style>
