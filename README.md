# Exploring the Native JavaScript Web Audio API


## Introduction
As browsers become more and more the de facto platform for software of all kinds an increasing number of technologies have become widespread across all browsers. Included in that is the native JavaScript Web Audio API. Everything you see here is possible using native JavaScript in [modern web browsers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). There is no audio library to import, there is no WebAssembly to use. This particular app is built using React just for the sake of having a nice display.

To get started:

```
git clone https://github.com/meslater1030/web-audio-api-sample.git
npm install
npm run start
```

## Description
This app contains some samples of what is possible using a few basic Web Audio API functionalities. Every sample comes with some example code, just click on the `<>` button next to that sample.

*Note:* Before trying out any functionality using microphone input (voice) be sure that your microphone is not located near your speakers. This will cause feedback. An easy workaround on your own device is to use headphones.

## Development Gotchas
* Audio and Video files must be served over https. If using local files, start Chrome from the command line using `--allow-file-access-from-files`. If you fail to do this the Web Audio API will fail silently.
* You never need more than one `AudioContext` per page. You are prevented from creating more `AudioContext`s than the hardware of the machine in use will allow.

## Resources
* [Web Audio API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
* [Web Audio API (O’ Reilly) by Bob Smus](http://chimera.labs.oreilly.com/books/1234000001552/index.html)
* Voice Change - O - Matic [demo](https://mdn.github.io/voice-change-o-matic/) [GitHub](https://github.com/mdn/voice-change-o-matic)
