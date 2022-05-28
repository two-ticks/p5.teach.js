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
  callAt,
  addDuration
  // pauseScene,
  // playScene,
  // restartScene
} from './lib/Scene/controls';
//global.sceneTime = sceneTime;
global.createControls = createControls;
global.clock = clock;
global.callAt = callAt;
global.addDuration = addDuration;

// global.pauseScene = pauseScene;
// global.playScene = playScene;
// global.restartScene = restartScene;

import {
  beginGraph,
  controlPoint,
  endGraph,
  //SVGControlPointPosition,
  polyline
} from './lib/Geometry/Shape';

global.beginGraph = beginGraph;
global.polyline = polyline;
global.controlPoint = controlPoint;
//global.SVGControlPointPosition = SVGControlPointPosition;
global.endGraph = endGraph;

import { transform } from './lib/Scene/transform';

global.transform = transform;

import { Graph2D, create2DGraph, plot2D, axis } from './lib/Geometry/graph';

global.Graph2D = Graph2D;
global.plot2D = plot2D;
global.axis = axis;
global.create2DGraph = create2DGraph;

import {
  GraphPolar2D,
  create2DPolarGraph,
  polar2D
} from './lib/Geometry/polar';

global.GraphPolar2D = GraphPolar2D;
global.polar2D = polar2D;

global.create2DPolarGraph = create2DPolarGraph;

import {
  GraphParametric2D,
  create2DParametricGraph,
  parametric2D
} from './lib/Geometry/parametric';

global.GraphParametric2D = GraphParametric2D;
global.parametric2D = parametric2D;

global.create2DParametricGraph = create2DParametricGraph;

import { arrow } from './lib/Geometry/arrow';
global.arrow = arrow;

import { safeColor, colorPalette } from './lib/Scene/scene';
global.safeColor = safeColor;
global.colorPalette = colorPalette;

import { coordinateMode } from './lib/Scene/coordinateMode';
global.coordinateMode = coordinateMode;
