const global: any = globalThis;

import { myCircle } from './lib/myCircle';

global.myCircle = myCircle;

import { typeWriter } from './lib/typeWriter';

global.typeWriter = typeWriter;

import { animeJSWriter } from './lib/animeJSWriter';

global.animeJSWriter = animeJSWriter;

import { writeText } from './lib/writeText';

global.writeText = writeText;