const global: any = globalThis;

import { Scene } from './lib/Scene/scene';

global.Scene = Scene;

import { Text, createText } from './lib/MObject/Text';

global.Text = Text;
global.createText = createText;

import { TeX, createTeX } from './lib/MObject/TeX';

global.TeX = TeX;
global.createTeX = createTeX;

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

import { Graph2D, create2DGraph } from './lib/Geometry/graph';

global.Graph2D = Graph2D;
global.create2DGraph = create2DGraph;

import { GraphPolar2D, create2DPolarGraph } from './lib/Geometry/polar';

global.GraphPolar2D = GraphPolar2D;
global.create2DPolarGraph = create2DPolarGraph;
