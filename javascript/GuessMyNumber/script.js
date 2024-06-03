'use strict';

let secret_number = Math.trunc(Math.random()*20)+1;
let score=15;
let High_Score=0;
document.querySelector('.check').addEventListener('click', ()=>
{
    const guess=Number(document.querySelector('.guess').value);
    if(!guess)
    {
        document.querySelector('.message').textContent='🚫No Secret_number!🚫'; 
    }
    else if(guess===secret_number)
    {
        document.querySelector('body').style.backgroundColor = '#02c909';
        document.querySelector('.number').style.width='30rem';
        document.querySelector('.number').textContent=secret_number;
        document.querySelector('.message').textContent='🎉🎊Correct Number🎊🎉'
        if(score>High_Score)
        {
            document.querySelector('.highscore').textContent=score;
            High_Score=score;
        }
    }
    else if(guess>secret_number)
    {
        score--;
        document.querySelector('.message').textContent='📈Too High!!!'
    }
    else if(guess<secret_number)
    {
        score--;
        document.querySelector('.message').textContent='📉Too Low!!!'
    }
    if(score<=0)
    {
        document.querySelector('body').style.backgroundColor = '#c90223';
        document.querySelector('.message').textContent='💔You Lost The Game💔'
    }
    document.querySelector('.score').textContent=score;
})

document.querySelector('.again').addEventListener('click',()=>
{
    score=15;
    secret_number = Math.trunc(Math.random()*20)+1;
    document.querySelector('.score').textContent=score;
    document.querySelector('.guess').value='';
    document.querySelector('.message').textContent='Start guessing...';
    document.querySelector('body').style.backgroundColor = '#020a7b';
    document.querySelector('.number').textContent='?';
    document.querySelector('.number').style.width='15rem';
})