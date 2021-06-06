const global: any = globalThis;

import { Scene } from './lib/Scene/scene';

global.Scene = Scene;

import { Text, createText } from './lib/MObject/Text';

global.Text = Text;
global.createText = createText;

import { TeX } from './lib/MObject/TeX';

global.TeX = TeX;

import { shift } from './lib/Scene/shift';

global.shift = shift;

import { T_scale } from './lib/Scene/scale';

global.T_scale = T_scale;

import { play } from './lib/Scene/play';

global.play = play;

import { add } from './lib/Scene/add';

global.add = add;

import { transform } from './lib/Scene/transform';

global.transform = transform;
