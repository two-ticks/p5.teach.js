const global: any = globalThis;

import { myCircle } from './lib/myCircle';

global.myCircle = myCircle;

import { Text } from './lib/Text';

global.Text = Text;

import { TeX } from './lib/TeX';

global.TeX = TeX;

import { shift } from './lib/shift';

global.shift = shift;


import { T_scale } from './lib/scale';

global.T_scale = T_scale;

import { play } from './lib/play';

global.play = play;