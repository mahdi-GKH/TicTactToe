var div_p1 = document.getElementById('p1');
var div_p2 = document.getElementById('p2');
var p1_score = document.getElementById('score_p1');
var p2_score = document.getElementById('score_p2'); 
var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var game_board = document.getElementById('board');
var scores_board = document.getElementById('scores');
var winner_page = document.getElementById('win');
var winner_text = document.getElementById('name_winner');
var resetScore = document.getElementById('reset_score');
var p1_name = document.getElementById('player1_name');
var p2_name = document.getElementById('player2_name');

var p1_color = localStorage.getItem('p1_color');
var p2_color = localStorage.getItem('p2_color');



 
var click = true;
var turn = 1;
var txt = 'X';
var color = p1_color;


//Sets names and scores and colors on the leaderboard 
p1_name.innerText = localStorage.getItem('p1_name');
p2_name.innerText = localStorage.getItem('p2_name');
p1_score.innerText = localStorage.getItem('p1_score');
p2_score.innerText = localStorage.getItem('p2_score');
p1.style.backgroundColor = p1_color;
p2.style.backgroundColor = p2_color;


let check_localStorage = function(){
    let lg = Object.keys(localStorage).length;
    if(lg == 0){
        document.getElementById('setting').classList.remove('d-none');
    }
}



// When this function is called, the styles and values of the variables are changed
function change_of_turn(){
        if (turn == 1){
            turn = 2;
            color = p2_color;
            txt = 'O';
            
            div_p1.style.cssText = `
                scale : 1;
                z-index: 0 ;
                box-shadow: none;
                background-color: ${p1_color};
            
            `;
            div_p2.style.cssText = `
                scale : 1.1;
                z-index: 1 ;
                box-shadow: 0px 0px 100px ${p2_color};
                background-color: ${p2_color};
            
            `;
            
        }else{
            turn = 1;
            color = p1_color;
            txt = 'X';
            div_p1.style.cssText = `
                scale : 1.1;
                z-index: 1 ;
                box-shadow: 0px 0px 100px ${p1_color};
                background-color: ${p1_color};
            
            `;
            div_p2.style.cssText = `
                scale : 1;
                z-index: 0 ;
                box-shadow: none;
                background-color: ${p2_color};
            
            `;
        }
    
    click = true;
}

// Clearing the game board
function clear(){
    for (let i=1 ;i<10;++i) {
        document.getElementById(`box${i}`).innerHTML = '';
        document.getElementById(`box${i}`).style.backgroundSize = '20000%';
    }
    
}

function draw(){
    let sta = true;
    for (let i=1 ;i<10;++i) {
        if(document.getElementById(`box${i}`).innerHTML == ''){ 
            sta = false;
            break; 
        }

    }
    if(sta){
        clear();
    }
    
}

// When the user plays their turn, this function will be called, check all the child divs and if the children are the same, declare the user the winner
function winner(){
    click = false;
    let ChangeOfTurn = true;
    for(let z = 1;z <= 8;z++){
        var box1 = document.getElementsByClassName(`ID${z}`)[0];
        var box2 = document.getElementsByClassName(`ID${z}`)[1];
        var box3 = document.getElementsByClassName(`ID${z}`)[2];

            if(box1.children.length == 1 && box2.children.length == 1 && box3.children.length == 1 || box1.children.length == 2 && box2.children.length == 2 && box3.children.length == 2){
                
                box1.style.cssText = `background-size: 100%;`;  
                box2.style.cssText = `background-size: 100%;`;  
                box3.style.cssText = `background-size: 100%;`;  
                 
                let old_score_p1 = Number(localStorage.getItem(`p${turn}_score`));
                
                localStorage.setItem(`p${turn}_score`,old_score_p1 +1);
                eval(`p${turn}_score`).innerHTML = localStorage.getItem(`p${turn}_score`);   
                
                setTimeout(clear,2500);
                setTimeout(change_of_turn,2500);
                ChangeOfTurn = false;  
                break;
                
            }
    }
    
    if(ChangeOfTurn == true){
        draw();
        change_of_turn();
    }
    
}



$(function(){

    $('.box').click(function(){
        if(click == true){
            var status = $(this)[0].children.length;
            if(status == 0){
                
                if(txt == 'X'){
                    
                    $(this).html(`
                        <div class="x_line1" style='background-color:${color} !important'></div>
                        <div class="x_line2" style='background-color:${color} !important'></div>
                    `);
                }else{
                    $(this).html(`<div class="o" style='border-color:${color} !important'></div>`);
                }
                
            }else{
                alert('you missed your turn');
                change_of_turn();
            }
            winner();

        }       
    })
})

change_of_turn();
check_localStorage();
resetScore.addEventListener('click',()=>{
    localStorage.setItem('p1_score',0);
    localStorage.setItem('p2_score',0);
    p1_score.innerText = localStorage.getItem('p1_score');
    p2_score.innerText = localStorage.getItem('p2_score');
})


$(function(){
    $('#saveBTN').click(function(){
        localStorage.setItem('p1_name', $('#p1_name') .val());
        localStorage.setItem('p2_name', $('#p2_name') .val());
        localStorage.setItem('p1_color',$('#p1_color').val());
        localStorage.setItem('p2_color',$('#p2_color').val());
        
        alert('save susses');
    });
    $('#closeBTN').click(function(){
        location.reload();
    });
    $('#settingBTN').click(function(){
        document.getElementById('setting').classList.remove('d-none');
    });
})