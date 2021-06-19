const global: any = globalThis;

import { createText, Text } from './lib/MObject/Text';

global.createText = createText;
global.Text = Text;

import { add } from './lib/Scene/add';
global.add = add;

import { play } from './lib/Scene/play';
global.play = play;

import { Scene } from './lib/Scene/scene';
global.Scene = Scene;
