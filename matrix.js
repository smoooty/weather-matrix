//Matrix style raining text

//Basic setup
$(document).ready(function(){
var s=window.screen;
var width = q.width=s.width;
var height = q.height;
var yPositions = Array(300).join(0).split('');
var ctx=q.getContext('2d');

//Draw the characters
 var draw = function () {
  ctx.fillStyle='rgba(0,0,0,.05)';
  ctx.fillRect(0,0,width,height);
  ctx.fillStyle='#0F0';
  ctx.font = '10pt Inconsolata';
  yPositions.map(function(y, index){
    text = String.fromCharCode(1e2+Math.random()*33);
    x = (index * 10)+10;
    q.getContext('2d').fillText(text, x, y);
 
//Rain descending
 if(y > 100 + Math.random()*1e4)
 {
   yPositions[index]=0;
 }
 else
 {
  yPositions[index] = y + 10;
 }
  });
};

//Start it up
RunMatrix();
function RunMatrix()
{
if(typeof Game_Interval != "undefined") clearInterval(Game_Interval);
 Game_Interval = setInterval(draw, 33);
}
})
