import anime from "animejs";

export let animationTimeline = anime.timeline({
    update: function(anim) {
      progressBar.value = animationTimeline.progress.toString();
    }
  }); //initilising a timeline
  
  let progressBar = document.createElement('input');
  progressBar.setAttribute('type', 'range');
  progressBar.setAttribute('min', `${0}`);
  progressBar.setAttribute('max', `${100}`);
  progressBar.setAttribute('value', `${0}`);
  progressBar.setAttribute('step', `${0.001}`);
  document.body.appendChild(progressBar);
  progressBar.oninput = function () {
    console.log(animationTimeline.duration * (progressBar.valueAsNumber / 100));
    
    animationTimeline.seek(animationTimeline.duration * (progressBar.valueAsNumber / 100));
    //animationTimeline.seek(parseInt(progressBar.value, 10));
    //animationTimeline.pause();
  }; 


//<input class="progress" step=".001" type="range" min="0" max="100" value="0">




// button.onclick = animationTimeline.pause;