# Vue OnOff Toggle

A simple, lightweight on/off toggle component made with Vue.js. Provides multiple themes with default configurations. You can also customize size, color and borders.

<p align="center">
  <img src="https://i.imgur.com/pVI4GIB.png">
</p>

## Installation
```bash
npm install vue-onoff-toggle --save
```
or with `yarn`,
```bash
yarn add vue-onoff-toggle
```


## Import in Vue.js
In your `main.js` file:

```javascript
import Vue from 'vue'
import OnoffToggle from 'vue-onoff-toggle'

Vue.use(OnoffToggle)
```

## Import in Nuxt.js
Create a new plugin in `plugins/vue-onoff-toggle.js`:

```javascript
import Vue from 'vue'
import OnoffToggle from 'vue-onoff-toggle'

Vue.use(OnoffToggle)
```

Add this new plugin to `nuxt.config.js`

```javascript
module.exports = {
  // ...
  plugins: [
    // ...
    '~plugins/vue-onoff-toggle'
  ]
}
```

## How to use
After importing the library, use `onoff-toggle` tag inside your vue template:
```html
<onoff-toggle v-model="checked" />

<onoff-toggle v-model="checked" theme="ios" />

<onoff-toggle v-model="checked" theme="material" />

<onoff-toggle
  v-model="checked"
  onColor="#008F13"
  :shadow="false"
/>

<onoff-toggle
  v-model="checked"
  theme="ios"
  onColor="#008F13"
/>

<onoff-toggle
  v-model="checked"
  theme="material"
  thumbColor="#008F13"
/>
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
      <td>Theme to use. "default", "ios" and "material" are available.</td>
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
      <td>Background color of the thumb. For "material" theme, if you don't specify onColor, it will be thumbColor with opacity 0.5 by default</td>
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
    <tr>
      <td>shadow</td>
      <td>Only works on default theme. When set to true, a glow effect will be added around the toggle.</td>
    </tr>
  </tbody>
</table>


## Browser Compatibility

* Chrome: 40+
* Firefox: 25+
* IE: 11+
