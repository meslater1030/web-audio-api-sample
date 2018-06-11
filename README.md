# Exploring the Native JavaScript Web Audio API


## Introduction
As browsers become more and more the de facto platform for software of all kinds an increasing number of technologies have become widespread across all browsers. Included in that is the native JavaScript Web Audio API. Everything you see here is possible using native JavaScript in modern web browsers. There is no audio library to import, there is no WebAssembly to use. This particular app is built using React just for the sake of simplicity.

When I talk about an audio API you may wonder what exactly that entails. Today we'll discuss how to manipulate audio using JavaScript as well as how to represent sound visually.

To get started:

```
git clone https://github.com/meslater1030/web-audio-api-sample.git
npm install
npm run start
```


## Setup basic video controls
What we see at first is just a video and some basic controls. As most of you probably already know, html5 gives you the option to include video controls provided by the browser by default. But if for whatever reason you can't or don't want to use those controls you have full access to the API necessary to create your own. In this case I've added a play/pause button, a seek bar and a volume bar. Nothing about this requires use of the web audio API, but we can certainly use it if we want to which is what I've done here.

```

```


## Change the volume using the audio context
## Visualize the audio coming from the video
## Add distortion
## Add panning
## Add oscillation
## Fix audio graph
## Development gotchas
## Conclusion