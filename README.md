# Singularix Web-BLE-client

## Intro

This is simple client for my smart-home control serivce.

## General

Right now this service implements conrol of room Led-light.


## How to build and run?
1. Make sure you have [Node.js](https://nodejs.org/en) installed on your machine and it is modern. Like > 20.0.0
2. Clone this repo
3. Install dependencies:  `npm i`
4. Run in dev mode: `npm run dev`
5. Build static files: `npm run build`

## How to deliver files to RaspberryPI

I'm using `scp` pattern for delivery. So you can check `.vscode/tasks.json` I think it can give you a clue how it works.