# Vue OnOff Toggle

A simple, lightweight on/off toggle component made with Vue.js. Provides multiple themes with default configurations. You can also customize size, color and borders.

## Installation
```bash
npm install vue-onoff-toggle --save
```
or with `yarn`,
```bash
yarn add vue-onoff-toggle
```

## How to use
```javascript
import OnoffToggle from 'vue-onoff-toggle'

new Vue({
  components: {
    OnoffToggle
  },
  data() {
    return {
      checked: false
    }
  }
})
```

```html
<onoff-toggle v-model="checked" />
```

## Props
<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>theme</td>
      <td>Theme to use. "default" and "ios" are available.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>Name to attach to checkbox input. Useful when the toggle is used inside a form.</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>Toggle is disabled</td>
    </tr>
    <tr>
      <td>onColor</td>
      <td>Background color of checked toggle</td>
    </tr>
    <tr>
      <td>offColor</td>
      <td>Background color of unchecked toggle</td>
    </tr>
    <tr>
      <td>thumbColor</td>
      <td>Background color of the thumb</td>
    </tr>
    <tr>
      <td>borderColor</td>
      <td>Color of the thumb's border. Only available for "ios" theme.</td>
    </tr>
    <tr>
      <td>width</td>
      <td>Width of the toggle</td>
    </tr>
    <tr>
      <td>height</td>
      <td>Height of the toggle</td>
    </tr>
    <tr>
      <td>margin</td>
      <td>Space around the thumb</td>
    </tr>
  </tbody>
</table>

## Browser Compatibility

* Chrome: 40+
* Firefox: 25+
* IE: 11+
