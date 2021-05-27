import anime from "animejs";

export function animeJSWriter(...args: any[]) {
  //arguments : sentence, n, x, y, duration
  // TODO: implement this
  
  let div = createDiv(
    '<svg width="200" height="220" viewBox="0 0 1000 1000"> <path id="MJX-5-TEX-I-3C0" d="M132 -11Q98 -11 98 22V33L111 61Q186 219 220 334L228 358H196Q158 358 142 355T103 336Q92 329 81 318T62 297T53 285Q51 284 38 284Q19 284 19 294Q19 300 38 329T93 391T164 429Q171 431 389 431Q549 431 553 430Q573 423 573 402Q573 371 541 360Q535 358 472 358H408L405 341Q393 269 393 222Q393 170 402 129T421 65T431 37Q431 20 417 5T381 -10Q370 -10 363 -7T347 17T331 77Q330 86 330 121Q330 170 339 226T357 318T367 358H269L268 354Q268 351 249 275T206 114T175 17Q164 -11 132 -11Z"></path></svg>'
  );

  div.style("transform", "rotate(180deg)");
  div.id("anime-demo");
  div.position(10, 0);
  var pathEls = document.querySelectorAll("path");
  for (var i = 0; i < pathEls.length; i++) {
    var pathEl = pathEls[i];
    var offset :any = anime.setDashoffset(pathEl);
    pathEl.setAttribute("stroke-dashoffset", offset);
    //console.log(pathEl);
    anime({
      targets: pathEl,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutCubic",
      duration: 4000,
      //delay : i*500,
      begin: function (anim) {
        pathEl.setAttribute("stroke", "black");
        pathEl.setAttribute("fill", "none");
      },
      complete: function (anim) {
        pathEl.setAttribute("fill", "black");
      },
      autoplay: true,
      //loop : true,
    });
  }
    //noLoop()
  
}
