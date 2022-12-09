# vue-devtools

<p align="center"><img width="720px" src="https://raw.githubusercontent.com/vuejs/vue-devtools/dev/media/screenshot-shadow.png" alt="screenshot"></p>

## Installation

- [Get the Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) / ([beta channel](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg))

- [Get the Firefox Addon](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) / ([beta channel](https://github.com/vuejs/vue-devtools/releases))

- [Get standalone Electron app (works with any environment!)](./packages/shell-electron/README.md)

### Important Usage Notes

1. If the page uses a production/minified build of Vue.js, devtools inspection is disabled by default so the Vue pane won't show up.

2. To make it work for pages opened via `file://` protocol, you need to check "Allow access to file URLs" for this extension in Chrome's extension management panel.

### Open component in editor

To enable this feature, follow [this guide](./docs/open-in-editor.md).

### Manual Installation

This is only necessary when you want to build the extension yourself from source to get not-yet-released features.

**Make sure you are using Node 6+ and NPM 3+**

1. Clone this repo
2. `yarn install`
3. `yarn run build`
4. Open Chrome extension page
5. Check "developer mode"
6. Click "load unpacked extension", and choose `shells/chrome`.
7. You can also use `yarn dev:chrome` to build & watch the unpacked extension.

### Development

1. Clone this repo
2. `yarn install`
3. `yarn run dev`
4. A plain shell with a test app will be available at `localhost:8100`.

### Testing as Firefox addon

 1. Install `web-ext`

	~~~~
	$ yarn global add web-ext
	~~~~

	Also, make sure `PATH` is set up. Something like this in `~/.bash_profile`:

	~~~~
	$ PATH=$PATH:$(yarn global bin)
	~~~~

 2. Build and run in Firefox

	~~~~
	$ yarn run build
	$ yarn run run:firefox
	~~~~

	When using Yarn, just replace `npm` with `yarn`.


### Force enable the devtools

```js
// Before you create app
Vue.config.devtools = process.env.NODE_ENV === 'development'

// After you create app
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor

// then had to add in ./store.js as well.
Vue.config.devtools = process.env.NODE_ENV === 'development'

```

### Common problems and how to fix

1. Fixing "Download the Vue Devtools for a better development experience" console message when working locally over `file://` protocol:
  1.1 - Google Chrome: Right click on vue-devtools icon and click "Manage Extensions" then search for vue-devtools on the extensions list. Check the "Allow access to file URLs" box.

2. How to use the devtools in IE/Edge/Safari or any other browser? [Get the standalone Electron app (works with any environment!)](./packages/shell-electron/README.md)


### License

[MIT](http://opensource.org/licenses/MIT)
