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

## Exploring The Native JS Web Audio API

Hi! My name is Megan Slater and I'm the Lead Developer in Community Outreach for GenUI in Seattle. GenUI is a consulting firm. We work on lots of different kinds of projects. Last year, I helped make a screen recording app for ChromeOS. The app was written entirely in JavaScript. We had a terrible bug where our audio started creating lots of feedback. To fix it, I needed to learn about the Web Audio API.

The Web Audio API is supported natively by all modern browsers. There's no library you need to use. It's a way to manipulate audio in pretty much any way you want. For this demo, we'll be manipulating audio from a video.

I'm going to start by changing the volume of the video. If I only wanted to change volume, I wouldn't use the Web Audio API. You can change the volume on the video directly. But I will be adding audio effects later. So I'll set up the Web Audio API now.  

First, I create an Audio Context. The Audio Context gives me tools to manipulate audio. You only need one Audio Context per page. If you create too many Audio Contexts, you will get errors. On this computer, my maximum is six. In my app, I used Redux to ensure that there is only one Audio Context for the whole app.

Next, I select my video element. 

Next, I need to create what's called a source node. Almost any kind of audio can be a source. In this case, our source is from an html media element. That's our video element.

Next, I create a gain node. Does anyone here play the electric guitar? You know the 'gain' knob on your amp? That knob makes your guitar sound gritty - like Kurt Cobain. This is not like that. In JavaScript gain just refers to the volume. 

Now I need to connect my nodes. I connect the source node (our video) to the gain node. Then I connect the gain node to the default destination on the audio context. The default destination is whatever the user has set as default on their machine. It's probably the speakers but we don't know for sure. 

Once everything is connected, I can change the volume by setting the value of the gain node. Values can be between 0 and 1. 

What we just created is called an audio graph. This audio graph is very simple. We have three audio nodes. The source node is the video, the gain node is the volume and the destination node is the speakers. It's helpful to write out the audio graph. This lets you avoid logic mistakes for complex situations.

Next, I want to visualize my audio. I'll create a bar graph. Low frequencies are on the left. High frequencies are on the right. The height of the bar indicates the volume of that frequency.

To visualize audio, I need an audio node called an analyser node. First, I set up my audio graph. This is very similar to before. The only difference is that I create an analyser node and insert it between the source node and the gain node. Now my analyser node receives data about the source node audio. 

Next, I create a data array based on the frequency bin count of the analyser node. Then I poll for that data every 100 milliseconds. This gives me volume information for every frequency range. I can then render that information into the DOM.

My audio graph looks like this. I have my video as source. Then my analyser node which does not change the sound. Then my gain node. And finally connect to the destination.

I can change the information I get by changing the frequency bin count. So I see more or fewer frequency bins. I can also change the smoothing time constant. That will change the sensitivity of the analyser node.

Next, I want to add some distortion. There are lots of ways to do this. I'm going to use what's called a convolver node. The convolver node adds an audio buffer onto the existing sound. I have two audio buffers. One sounds like phasers. 'pew pew pew'. The second is the sound of a crowd in a concert hall.

The convolver takes a little more setup. First, I need to retrieve the second audio source as a buffer. When that buffer loads, I need to use the 'decodeAudioBuffer' method from the AudioContext to turn it into something I can use.

The next part looks more familiar by now. My audio graph looks just about the same. This time, I also create a convolver node. Then I set the buffer on that node to be the buffer I just retrieved. Now my audio graph is the video as source, the convolver effect, the volume control and the destination.

It's still a simple graph, but you can see that the order of the nodes matters. If I switched the convolver and gain nodes then the volume control would not apply to my convolver sound effect.

Next, I want to change the direction of the sound. I can do that with a panner node. This is a stereo panner node. It just pans from left to right. There is also a full panner node. That gives you lots of control of the sound. 

For instance, if I had a megaphone (I'll make a little megaphone out of a piece of paper here) then this (I'll point the megaphone up) sounds different than this (I'll point the megaphone down). And this (I'll make a very wide megaphone) sounds different than this (I'll make a very narrow megaphone). 

The code for the panner node will also look familiar. I set up my audio graph and include the panner node. Then I can set the value on the pan node. This will change the direction of the sound.

Finally, I want to make a little music. I can create tones with oscillation nodes. So I made a little synthesizer. The oscillator nodes are source nodes just like the video. I cannot filter audio through them. This time, our audio graph looks a little different. I need to combine my two source nodes. I can do this with a merger node.

First, I create my oscillator node and start it. Next, I create my merger node. Next, I connect both the video and the oscillator to the merger node. Then I connect the merger node to the gain node and so on. In our app we had tried to connect two sources directly to the destination. But the desintation node can only accept one input. This is an audio graph logic error. It's what had created our audio feedback.

If I want to change the note of the oscillator then I can change the frequency value on the oscillator.

I also created a sine wave visualizer using my analyzer node. It looks pretty great with these oscillator nodes as input.

I can change my primary input to be something else. Like my voice for instance. But be careful! If I use microphone input for my source and the default speakers as my destination and both of those things are close to each other in real life I will get feedback. So today I brought a microphone to use as my voice input. (make various sounds with effect using my voice and microphone).

These are just a few examples of what is possible using the Web Audio API. There are many more kinds of nodes. You are able to create just about any kind of sound you can imagine.

Here are a couple of other development tips. It's important to develop this kind of software without headphones. Otherwise, you might miss situations with potential for creating feedback. That will produce a nasty surprise for your users! Audio and Video files must be served over https. If using local files, start Chrome from the command line using `--allow-file-access-from-files`. If you fail to do this the Web Audio API will fail silently. You never need more than one `AudioContext` per page. You are prevented from creating more `AudioContext`s than the hardware of the machine in use will allow.

MDN has lots of great articles aout the Web Audio API. There is also an O'Reily book about the Web Audio API that is available for free online. I hope you learned something new today. Does anyone have any questions?