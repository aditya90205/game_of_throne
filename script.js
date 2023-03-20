Score = 0;
cross = true;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');

audio.play();

document.onkeydown = function(e){
    // console.log("The key code is : ", e.keyCode);
    if(e.keyCode == 38){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
        dino.classList.remove('animateDino')
        },700)
    }

    if(e.keyCode==39){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 130) + "px";      
    }

    if(e.keyCode==37){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 130) + "px";      
    }
    
}

setInterval(()=>{
    dino = document.querySelector('.dino');
    obstacle = document.querySelector('.obstacle');
    gameOver = document.querySelector('.gameOver');
    
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offSetX = Math.abs(dx-ox);
    offSetY = Math.abs(dy-oy);
    // console.log(offSetX,offSetY)

    if(offSetX<195 && offSetY<54){
        audiogo.play();
        gameOver.style.visibility = "visible";
        obstacle.classList.remove('animateObst')   
        setTimeout(()=>{
            audiogo.pause();
            audio.pause();
        },1000) 
        
        var dino = document.querySelector('.dino');
        dino.style.bottom = "-445px"
    }
 

    else if(offSetX<230 && cross){
        Score += 1;
        updatedScore(Score);
        cross = false;

        setTimeout(()=>{
            cross = true;
        },1000);

        setTimeout(()=>{
           var  aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration')); 
           var newDur = aniDur - 0.1;
          console.log(newDur);
            obstacle.style.animationDuration = newDur + "s";

         if(newDur === 4.7){
            setInterval(()=>{
                obstacle.style.animationDuration = 4.7 + "s";
            },10)
         }
        },1000)
    }
},10);

function updatedScore(Score){
    scoreCount = document.querySelector('.scoreCount');
    scoreCount.innerHTML = "Your Score is: " + Score;
}