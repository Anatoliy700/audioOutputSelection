'use strict';

const audioOutputSelection = {
  settings: {
    audioElem: '#remoteAudio',
    storageKey: 'audioout',
    selectId: 'audioOuts',
    parentForSelect: 'body',
    cssHref: 'https://anatoliy700.github.io/audioOutputSelection/css/audioOutputSelection.css',
  },
  audioOuts: [],
  audio: null,
  init(settings = {}) {
    Object.assign(this.settings, settings);
    this.getAudio();
    if (this.audio !== null) {
      this.getPermission();
      this.addStyleCss();
    } else {
      console.error(`Audio элемент "${this.settings.audioElem}" не найден`);
    }
  },  

  addStyleCss() {
    let elem = document.createElement('link');
    elem.href = this.settings.cssHref;
    elem.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(elem);
  },

  getAudio() {
    this.audio = document.querySelector(this.settings.audioElem);
  },

  getPermission() {
    navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        data: true
      }).then((e) => {
      this.getAudioDevices();

    }).catch((e) => {
      console.log(e);
    });
  },

  getAudioDevices() {
    navigator.mediaDevices.enumerateDevices().then(e => {
      e.forEach(device => {
        if (device.kind === 'audiooutput') {
          this.audioOuts.push({
            id: device.deviceId,
            label: device.label
          })
        }
      });
      this.renderSelect();
      let label = this.readStorage();
      if (label !== null) {
        let ind = this.selected(label);
        if (ind) {
          this.setDevice(this.audioOuts[ind]);
        }
      }
    })
  },

  renderSelect() {
    let devicesList = '';
    this.audioOuts.forEach((device, ind) => {
      devicesList += "<option value=" + ind + ">" + device.label + "</option>";
    });
    let select = document.createElement('select');
    select.setAttribute('id', this.settings.selectId);
    select.innerHTML = devicesList;
    let parent = document.querySelector(this.settings.parentForSelect);
    if (parent === null) {
      parent = document.querySelector('body');
    }
    parent.appendChild(select);
    select.addEventListener('change', e => {
      this.selectedHandler(e)
    });
  },

  selectedHandler(event) {
    this.setDevice(this.audioOuts[event.target.value]);
    this.saveStorage(this.audioOuts[event.target.value].label)
  },

  setDevice(device) {
    this.audio.setSinkId(device.id);
    console.log(`Set device: ${device.label}`);
  },

  selected(label) {
    let select = document.getElementById(this.settings.selectId);
    let ind = this.audioOuts.findIndex(el => {
      return el.label === label
    });
    if (ind > -1) {
      select.value = ind;
      return ind;
    }
    return false;
  },

  saveStorage(label) {
    localStorage.setItem(this.settings.storageKey, label);
  },

  readStorage() {
    return localStorage.getItem(this.settings.storageKey);
  }
};

// audioOutputSelection.init();
