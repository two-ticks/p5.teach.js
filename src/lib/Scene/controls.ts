import anime from 'animejs';

export let animationTimeline = anime.timeline({}); //initilising a timeline

export function createControls() {
  let progressBar = document.createElement('input');
  progressBar.setAttribute('type', 'range');

  progressBar.setAttribute('min', `${0}`);
  progressBar.setAttribute('max', `${100}`);
  progressBar.setAttribute('value', `${0}`);
  progressBar.setAttribute('step', `${0.001}`);
  progressBar.setAttribute(
    'style',
    `appearance: none; width: 400px; height: 1px; background: #d3d3d3; display: block; margin-top: 10px; margin-bottom: 10px;`
  );
  document.body.appendChild(progressBar);
  progressBar.oninput = function () {
    //console.log(animationTimeline.duration * (progressBar.valueAsNumber / 100));
    animationTimeline.seek(
      animationTimeline.duration * (progressBar.valueAsNumber / 100)
    );
    //animationTimeline.seek(parseInt(progressBar.value, 10));
    //animationTimeline.pause();
  };

  //buttons
  let playButton = document.createElement('button');
  let pauseButton = document.createElement('button');
  let restartButton = document.createElement('button');
  playButton.onclick = animationTimeline.play;
  pauseButton.onclick = animationTimeline.pause;
  restartButton.onclick = animationTimeline.restart;

  playButton.innerText = 'play';
  pauseButton.innerText = 'pause';
  restartButton.innerText = 'restart';

  playButton.setAttribute(
    'style',
    'background-color: transparent; border: 1px solid #61C3FF; display: inline-block; align-items: flex-start; padding: 5px 10px;text-transform: uppercase; color : #61C3FF;'
  );
  pauseButton.setAttribute(
    'style',
    'background-color: transparent; border: 1px solid #61C3FF; margin: 0 0 0 -1px; display: inline-block; align-items: flex-start;padding: 5px 10px;text-transform: uppercase; color : #61C3FF;'
  );
  restartButton.setAttribute(
    'style',
    'background-color: transparent; border: 1px solid #61C3FF; margin: 0 0 0 -1px; display: inline-block; align-items: flex-start;padding: 5px 10px;text-transform: uppercase; color : #61C3FF;'
  );
  document.body.append(playButton, pauseButton, restartButton); //IE and Edge previous versions may not support
  animationTimeline.add({
    update: function (anim) {
      progressBar.value = animationTimeline.progress.toString();
      // console.log(
      //   animationTimeline.duration * (progressBar.valueAsNumber / 100)
      // );
    }
  });
}

export function playScene() {
  animationTimeline.play();
}

export function pauseScene() {
  animationTimeline.pause();
}

export function restartScene() {
  animationTimeline.restart();
}

//<input class="progress" step=".001" type="range" min="0" max="100" value="0">

// button.onclick = animationTimeline.pause;
