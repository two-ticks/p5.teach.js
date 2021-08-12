const global: any = globalThis;

import { createText, Text } from './lib/MObject/Text';

global.createText = createText;
global.Text = Text;

import { createTeX, TeX } from './lib/MObject/TeX';

global.createTeX = createTeX;
global.TeX = TeX;

import { add } from './lib/Scene/add';
global.add = add;

import { play } from './lib/Scene/play';
global.play = play;

import { Scene, overflow } from './lib/Scene/scene';
// global.Scene = Scene;
global.overflow = overflow;

global.p5.prototype.registerMethod('init', () => new Scene());

import {
  //sceneTime,
  createControls,
  clock,
  addDuration
  // pauseScene,
  // playScene,
  // restartScene
} from './lib/Scene/controls';
//global.sceneTime = sceneTime;
global.createControls = createControls;
global.clock = clock;
global.addDuration = addDuration;

// global.pauseScene = pauseScene;
// global.playScene = playScene;
// global.restartScene = restartScene;

import { beginGraph, endGraph, wrapRect } from './lib/Geometry/beginGraph';

global.beginGraph = beginGraph;
global.endGraph = endGraph;
wrapRect(global.p5);
// global.p5.prototype.rect = RECT;
//global.rect = RECT

import { transform } from './lib/Scene/transform';

global.transform = transform;

import { Graph2D, create2DGraph } from './lib/Geometry/graph';

global.Graph2D = Graph2D;
global.create2DGraph = create2DGraph;

import { GraphPolar2D, create2DPolarGraph } from './lib/Geometry/polar';

global.GraphPolar2D = GraphPolar2D;
global.create2DPolarGraph = create2DPolarGraph;

import {
  GraphParametric2D,
  create2DParametricGraph
} from './lib/Geometry/parametric';

global.GraphParametric2D = GraphParametric2D;
global.create2DParametricGraph = create2DParametricGraph;
