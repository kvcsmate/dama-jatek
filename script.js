var table = document.createElement("table");
const button = document.querySelector("button");
button.className="hidden";
button.addEventListener("click",endturnhandler);
var board = new Array(8);
const selected = { x: -1, y: -1 };
var isSelected=false;
var gamestate = Math.floor(Math.random() * 2);
var canjump=false;
const djumppos=[];
const jumppos=[];
const steppos=[];
const jumpstart={x:-1,y:-1};
var possible_step=new Array(8);
const redcheckers=[];
const bluecheckers=[];
showturn();
for (var i = 0; i < 8; i++) 
{
    
    var tr = document.createElement('tr');
    tr.id=""+i;
    for (var j = 0; j < 8; j++) 
    {
        var td = document.createElement('td');
        td.id=i+""+j;
        if (i%2 == j%2) 
        {
            td.className = "white";
        } 
        else 
        {
            td.className = "black";   
        }
         td.addEventListener("click",clicked);
         td.addEventListener("mouseover",hover);
         td.addEventListener("mouseout",nothovered);
        tr.appendChild(td);    
    }
    table.appendChild(tr);
}
document.body.appendChild(table);



init();

function init()
{
    for(var i=0;i<board.length;i++)
    {
        board[i]=new Array(8);
        for(var j=0;j<board[i].length;j++)
        {
            if(i%2 == j%2)
            {
                board[i][j]=-2;
            }
            else board[i][j]=-1;
        }
    }


    for (var i = 0; i < 3; i++) 
    {
        for (var j = 0; j < 8; j++) 
        {
            if (i%2 != j%2) 
            {
                board[i][j]=0;
            }
        }
    }
    for (var i = 5; i < 8; i++) 
    {
        for (var j = 0; j < 8; j++) 
        {
            if (i%2 != j%2) 
            {
                board[i][j]=1;
            }
        }
    }
    render();
}
function render()
{
    clickanim();
    for (let  i = 0;i<8 ; i++) 
    {
       let row = table.rows[i];
       for (let j = 0;j<8; j++) 
       {
           let col = row.cells[j];
            col.innerHTML='';
            if (board[i][j]==0) 
            {
                let img = document.createElement('img');
                img.src = "red.png";
                col.appendChild(img); 
            } 
            else if (board[i][j]==1) 
            {
                let img = document.createElement('img');
                img.src = "blue.png";
                col.appendChild(img);
            }    
       }  
    } 
}
function hover()
{
    let x=this.cellIndex;
    let y =this.parentNode.rowIndex;
    if( this.className!="clicked")
    {
        this.className="hovered";
    } 
}
function nothovered()
{
    let x=this.cellIndex;
    let y =this.parentNode.rowIndex;
    possiblesteps(x,y);
    if(this.className!="clicked")
    {
        if(x%2==y%2)
        {
            this.className="white";
        }
        else
        {
            this.className="black";
        }

    }
    

    
    

}
function clicked() 
{
    console.log("click..");
    let x=this.cellIndex;
    let y =this.parentNode.rowIndex;
    //console.log(y+""+x+" gamestate:"+gamestate+"selected: "+board[y][x]+"irány kiválasztása:"+isSelected);
    if(board[y][x]>-2)
    {
        if(isSelected || (-7*gamestate+7)!=y)
        {
            step(x,y);
            //clickanim();
        }
    }
}
function jump(x,y)
{
    button.className="normal";
    console.log("jump");
    canjump=false;
    jumpstart.x=x;
    jumpstart.y=y;
    //table[y][x].className="clicked";
    row=table.rows[y];
    selected.x=x;
    selected.y=y;
    render();   
    djumppos.length=0;
    
    console.log(board[y][x]);
    if(board[y][x]>-2)
    {
        //clickanim();
        if(gamestate)
            {      
                        if(y>1)
                        {
                            if(x>1)
                            {
                                if(board[y-2][x-2]==-1 && board[y-1][x-1]==0)
                                {
                                    let y1=y-2;
                                    let x1=x-2;
                                    console.log("ugorható mező:"+y1+","+x1);
                                    let pos={y1,x1};
                                    djumppos.push(pos);
                                }
                            }
                            if(x<6)
                            {
                                if(board[y-2][x+2]==-1 && board[y-1][x+1]==0)
                                {
                                    let y1=y-2;
                                    let x1=x+2;
                                    console.log("ugorható mező:"+y1+","+x1);
                                    let pos={y1,x1};
                                    djumppos.push(pos);
                                }
                            }
                        }
            }
            else
            {
                if(y<6)
                {
                        if(x>1)
                        {
                            
                            if(board[y+2][x-2]==-1 && board[y+1][x-1]==1)
                            {
                                let y1=y+2;
                                let x1=x-2;
                                console.log("ugorható mező:"+y1+","+x1);
                                let pos={y1,x1};
                                djumppos.push(pos);
                            } 
                        }
                        if(x<6)
                        {
                           // console.log(y+","+x);
                            if(board[y+2][x+2]==-1 && board[y+1][x+1]==1)
                            {
                                let y1=y+2;
                                let x1=x+2;
                                console.log(y1+","+x1);
                                let pos={y1,x1};
                                djumppos.push(pos);
                            }
                        }   
                }
            }
        console.log(djumppos.length);
        if(djumppos.length>0)
        {
            canjump=true;
            render();
        }
        else
        {
            console.log("körátadás..");
            canjump=false;
            gamestate=1-gamestate;
            gameovercheck();
            render();
            showturn();
            isSelected=false;
            selected.x=-1;
            selected.y=-1;
        }      
    }
}
function step(x,y)
{
    console.log("step..");
    if(selected.x==x && selected.y==y)
    {
        
        isSelected=false;
        selected.x=-1;
        selected.y=-1;
        clickanim();
    }
    else if(canjump)
    {
        clickanim();
        possiblesteps(x,y);
        console.log("duplaugrás..");
        console.log(djumppos.length);
        for(item of djumppos)
        {
            console.log(item.y1+","+item.x1);
            if(y==item.y1 && x==item.x1)
            {
                board[jumpstart.y][jumpstart.x]=-1; 
                board[jumpstart.y+(item.y1-jumpstart.y)/2][jumpstart.x+(item.x1-jumpstart.x)/2]=-1;
                board[y][x]=gamestate;
                
                render();
                jump(x,y);
                
            }
        }
    }
    else 
    {
        possiblesteps(x,y);
        if(selected.x>=0 && selected.y>=0 && isSelected) 
        {
            if(board[selected.y][selected.x]==gamestate)
            {
                if(selected.y+gamestate*-2+1==y && selected.x+1==x)
                {

                    if(board[selected.y+gamestate*-2+1][selected.x+1]==-1)
                    {
                        //console.log("léptetés");
                        board[selected.y][selected.x]=-1; 
                        board[y][x]=gamestate;
                        isSelected=false;
                        selected.x=-1;
                        selected.y=-1;
                        gamestate= 1-gamestate;
                        render(); 
                        showturn();
                        gameovercheck();   
                    }
                }
                if(selected.y+gamestate*-2+1==y && selected.x-1==x)
                {
                    if(board[selected.y+gamestate*-2+1][selected.x-1]==-1)
                    {
                        //console.log("léptetés");
                        board[selected.y][selected.x]=-1; 
                        board[y][x]=gamestate;
                        isSelected=false;
                        selected.x=-1;
                        selected.y=-1;
                        gamestate= 1-gamestate;
                        possible_step.length=0;
                        render(); 
                        showturn();
                        gameovercheck();                        
                    }
                }
                if(selected.y+(gamestate*-2+1)*2==y && selected.x-2==x)
                {
                    if(board[selected.y+gamestate*-2+1][selected.x-1]==1-gamestate
                         && board[selected.y+(gamestate*-2+1)*2][selected.x-2]==-1)
                    {
                        //console.log("ugrás!");
                        board[selected.y][selected.x]=-1; 
                        board[selected.y+gamestate*-2+1][selected.x-1]=-1
                        board[y][x]=gamestate;
                        jump(x,y);
                     
                    }
                }
                if(selected.y+(gamestate*-2+1)*2==y && selected.x+2==x)
                {
                    if(board[selected.y+gamestate*-2+1][selected.x+1]==1-gamestate
                         && board[selected.y+(gamestate*-2+1)*2][selected.x+2]==-1)
                    {
                        //console.log("ugrás!");
                        board[selected.y][selected.x]=-1; 
                        board[selected.y+gamestate*-2+1][selected.x+1]=-1
                        board[y][x]=gamestate;
                        jump(x,y);
                    
                    }
                }
                /*else 
                {
                    isSelected=false;
                    selected.x=-1;
                    selected.y=-1;
                }*/

            }
        }
        else if(board[y][x]==gamestate)
        {
            isSelected=true;
            selected.x=x;
            selected.y=y;   
            //console.log("mit csinál ez a rész?????");
            if(0<= selected.y + gamestate*-2+1 && selected.y + gamestate*-2+1<=7 && 0<=selected.x-1)
            {
                if(board[selected.y+gamestate*-2+1][selected.x-1]==-1)
                {
                       // possible_step[selected.y+gamestate-2+1][selected.x-1]=1;
                }
            } 
        } 
    }   
}
function showturn()
{
    button.className="hidden";
    if(gamestate)
    {
        let str="KÉK JÖN";
        let result= str.fontcolor("blue");
        document.getElementById("turn").innerHTML=result;
        
    }
    else
    {
        let str="PIROS JÖN";
        let result= str.fontcolor("red");
        document.getElementById("turn").innerHTML=result;
        
    }
}
function gameovercheck()
{
        bluecheckers.length=0;
        redcheckers.length=0;
        let gameover=true;
        
        
        for(let i =0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                //console.log("feltöltés lefut");
                //console.log(""+i+j);
                if(board[i][j]==1)
                {
                   // console.log(""+i+j);
                    const checker= new Array(2);
                    checker[0]=i;
                    checker[1]=j;
                    bluecheckers.push(checker);
                }
                if(board[i][j]==0)
                {
                   // console.log(""+i+j);
                    const checker= new Array(2);
                    checker[0]=i;
                    checker[1]=j;
                    redcheckers.push(checker);
                }
            }
        }
     
        //console.log("gameovercheck...");
        
        for(let i=0;i<8;i++)
        {
            
            for(let j=0;j<8;j++)
            {
                if(board[i][j]==gamestate)
                {
                    gameover=false;
                }

            }
        }
        if(gamestate)
        {
            //console.log("kék lépések ellenőrzése..")
            let nomorestepsb=true;
            for(item of bluecheckers)
            {
                //console.log(""+item[0]+item[1]);
                if(item[0]>0)
                {
                    if(item[1]>0)
                    {
                       // console.log(""+(item[0]-1)+(item[1]-1)+":"+board[item[0]-1][item[1]-1]);
                        if(board[item[0]-1][item[1]-1]==-1)
                        {
                            
                            nomorestepsb=false;
                        }
                    }
                    if(item[1]<7)
                    {
                        if(board[item[0]-1][item[1]+1]==-1)
                        {
                            nomorestepsb=false;
                        }
                    }
                    if(item[0]>1)
                    {
                        if(item[1]>1)
                        {
                            if(board[item[0]-2][item[1]-2]==-1 && board[item[0]-1][item[1]-1]==0)
                            {
                                nomorestepsb=false;
                            }
                        }
                        if(item[1]<6)
                        {
                            if(board[item[0]-2][item[1]+2]==-1 && board[item[0]-1][item[1]+1]==0)
                            {
                                nomorestepsb=false;
                            }
                        }
                        
                    }
    
                }
            }
            if(nomorestepsb)
            {
                gameover=true;
            }
        }
        else
        {
                //console.log("piros lépések ellenőrzése...")
            let nomorestepsa=true;
            for(item of redcheckers)
            {
                //console.log("asd"+board[item[0]][item[1]]);
                if(item[0]<7)
                {
                    if(item[1]>0)
                    {
                        if(board[item[0]+1][item[1]-1]==-1)
                        {
                            nomorestepsa=false;
                        }
                    }
                    if(item[1]<7)
                    {
                        if(board[item[0]+1][item[1]+1]==-1)
                        {
                            nomorestepsa=false;
                        }
                    }
                    if(item[0]<6)
                    {
                        if(item[1]<6)
                        {
                            if(board[item[0]+2][item[1]+2]==-1 && board[item[0]+1][item[1]+1]==1)
                            {
                                nomorestepsa=false;
                            }
                        }
                        if(item[1]>1)
                        {
                            if(board[item[0]+2][item[1]-2]==-1 && board[item[0]+1][item[1]-1]==1)
                            {
                                nomorestepsa=false;
                            }
                        } 
                    }
                }
            }
            if(nomorestepsa)
            {
                gameover=true;
            }
        }
        if(gameover)
        {
            let str;
            if(gamestate)
            {
                str="piros";                
            }
            else
            {
                str="kék";
            }
            alert("Játék vége! a " +str+" játékos nyert!" );
            init();
        }
}
function clickanim()
{
    for (let i = 0;i<8 ; i++) 
    {
        let row = table.rows[i];
        for (let j = 0;j<8; j++) 
        {
            let col = row.cells[j];
            
            if (i%2 == j%2) 
            {
                
                col.className = "white";
                
            } 
            else 
            {
                col.className = "black"; 
                
            }
            if(i==selected.y&&j==selected.x)
            {
                col.className="clicked";
            }
        }  
    }
}
function endturnhandler()
{
            canjump=false;
            gamestate=1-gamestate;
            isSelected=false;
            selected.x=-1;
            selected.y=-1;
            gameovercheck();
            render();
            showturn();
            clickanim();
            this.className="hidden";
}
function possiblesteps(x,y)
{
    jumppos.length=0;
    steppos.length=0;
    if(x>-1&&y>-1)
    {

        if(gamestate)
            {      
                if(y>0)
                    {
                        if(x>0)
                        {
                            if(board[y-1][x-1]==-1)
                            {
                                let y1=y-1;
                                let x1=x-1;
                                
                                let pos={y1,x1};
                                steppos.push(pos);
                            }
                        }
                        if(x<7)
                        {
                            if(board[y-1][x+1]==-1)
                            {
                                let y1=y-1;
                                let x1=x+1;
                                let pos={y1,x1};
                                steppos.push(pos);
                            }
                        }
                    } 
                        if(y>1)
                        {
                            if(x>1)
                            {
                                if(board[y-2][x-2]==-1 && board[y-1][x-1]==0)
                                {
                                    let y1=y-2;
                                    let x1=x-2;
                                    console.log("ugorható mező:"+y1+","+x1);
                                    let pos={y1,x1};
                                    jumppos.push(pos);
                                }
                            }
                            if(x<6)
                            {
                                if(board[y-2][x+2]==-1 && board[y-1][x+1]==0)
                                {
                                    let y1=y-2;
                                    let x1=x+2;
                                    console.log("ugorható mező:"+y1+","+x1);
                                    let pos={y1,x1};
                                    jumppos.push(pos);
                                }
                            }
                        }
            }
            else
            {
                if(y<7)
                    {
                        if(x>0)
                        {
                            if(board[y+1][x-1]==-1)
                            {
                                let y1=y+1;
                                let x1=x-1;
                                
                                let pos={y1,x1};
                                steppos.push(pos);
                            }
                        }
                        if(x<7)
                        {
                            if(board[y+1][x+1]==-1)
                            {
                                let y1=y+1;
                                let x1=x+1;
                                let pos={y1,x1};
                                steppos.push(pos);
                            }
                        }
                    }
                if(y<6)
                {
                        if(x>1)
                        {
                            
                            if(board[y+2][x-2]==-1 && board[y+1][x-1]==1)
                            {
                                let y1=y+2;
                                let x1=x-2;
                                console.log("ugorható mező:"+y1+","+x1);
                                let pos={y1,x1};
                                jumppos.push(pos);
                            } 
                        }
                        if(x<6)
                        {
                           // console.log(y+","+x);
                            if(board[y+2][x+2]==-1 && board[y+1][x+1]==1)
                            {
                                let y1=y+2;
                                let x1=x+2;
                                console.log(y1+","+x1);
                                let pos={y1,x1};
                                jumppos.push(pos);
                            }
                        }   
                }
            }
            clickanim();
        if(gamestate==board[y][x])
        {   
            
            for(item of jumppos)
            {
                let row = table.rows[item.y1];
                let cos = row.cells[item.x1];
                cos.className="possible";
            }
            if(jumppos.length==0)
            {
                for(item of steppos)
                {
                    let row = table.rows[item.y1];
                    let cos = row.cells[item.x1];
                    cos.className="possible";
                }
            }
            
            
                let row = table.rows[y];
                let cos = row.cells[x];
                console.log("ez lefut");
                cos.className="clicked";
            
        }
    }
}