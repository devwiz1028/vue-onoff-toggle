# Vue Toggle Switch

A simple, lightweight switch component made with Vue.js. Provides multiple themes with default configurations. You can also customize size, color and borders.

## Installation
```bash
npm install vue-toggle-switch --save
```
or with `yarn`,
```bash
yarn add vue-toggle-switch
```

## How to use
```javascript
import ToggleSwitch from 'vue-toggle-switch'  

new Vue({
  components: {
    ToggleSwitch
  },
  data() {
    return {
      checked: false
    }
  }
})
```

```html
<toggle-switch v-model="checked" />
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
      <td>Name to attach to checkbox input. Useful when the switch is used inside a form.</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>Switch is disabled</td>
    </tr>
    <tr>
      <td>onColor</td>
      <td>Background color of checked switch</td>
    </tr>
    <tr>
      <td>offColor</td>
      <td>Background color of unchecked switch</td>
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
      <td>Width of the switch</td>
    </tr>
    <tr>
      <td>height</td>
      <td>Height of the switch</td>
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
