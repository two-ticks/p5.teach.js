const global: any = globalThis;

import { myCircle } from './lib/myCircle';

global.myCircle = myCircle;

import { addText } from './lib/addText';

global.addText = addText;

import { addTeX } from './lib/addTeX';

global.addTeX = addTeX;
