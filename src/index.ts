const global: any = globalThis;

import { myCircle } from './lib/myCircle';

global.myCircle = myCircle;

import { Text } from './lib/MObject/Text';

global.Text = Text;

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