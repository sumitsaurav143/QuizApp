//-------------------Questions---------------
import {questions} from './questions.js'

//-------------main_js-----------------------

var scr = 0;
var tm = questions.length-1;
var sec=60;
/*
function createQuestion(ques,opts,ans)
{
    //Question Box
    const q_box=document.createElement("div");
    const newques=document.createElement("h3");
    newques.appendChild(document.createTextNode(ques));
    q_box.appendChild(newques);

    //Options Box
    const optioncontainer=document.createElement("div");
    
    for(const op of opts)
   {
    const opts_div=document.createElement("div");
    opts_div.textContent=op;
    opts_div.addEventListener('click',function(){
        opts_div.style.backgroundColor="green";
        if(op==correct_opt)
        alert("Correct: "+ op);
        else
        alert("Wrong: "+ op);
    })
    
    optioncontainer.appendChild(opts_div);
   }
   q_box.appendChild(optioncontainer);

   return q_box;
}*/

function Questions(id,ques, opts, ans)
{
    return{
        isCorrect(userChoice)
        {
            return opts[ans-1]===userChoice;
        },

        getOptionNode()
        {
            //Options Box
            const optioncontainer=document.createElement("div");
            for(const op of opts)
            {
            const opts_div=document.createElement("div");
            opts_div.addEventListener('click',()=>{
                opts_div.style.backgroundColor="green";
                document.getElementById(id).style.backgroundColor="green";
                if(this.isCorrect(op))
                scr+=10;
                //else
                //alert("Wrong: "+ op);
            })
            opts_div.textContent=op;
            optioncontainer.appendChild(opts_div);
            }
            return optioncontainer;
        },

        getQuestionNode()
        {
            //Question Box
            const q_box=document.createElement("div");
            const newques=document.createElement("h3");
            newques.appendChild(document.createTextNode(ques));
            q_box.appendChild(newques);
            
            const op_container=this.getOptionNode();
            q_box.appendChild(op_container);

            return q_box;
        }
    }
}




const appDiv=document.getElementById("app");

//total question
const total_ques= questions.length-1;

var count=0;

const q_new=Questions(questions[count].id,questions[count].ques,
    questions[count].opts,
    questions[count].ans);

appDiv.appendChild(q_new.getQuestionNode()); 

const prev=document.getElementById("prev");
const next=document.getElementById("next");

const rew=document.getElementById("review");
rew.addEventListener('click',function(){
    document.getElementById(count+1).style.backgroundColor="red";
})


prev.disabled=true;

//NEXT
next.addEventListener("click", function()
{
    count++; 
    const q_new=Questions(questions[count].id,
                          questions[count].ques,
                          questions[count].opts,
                          questions[count].ans);
    appDiv.firstElementChild.replaceWith(q_new.getQuestionNode()); 
    if(count>total_ques-1)
    {
        next.disabled=true;
    }    
    else{
        prev.disabled=false;
        next.disabled=false;
    }        
    if(count==total_ques)
    {
        document.getElementById("final").style.display="block";
    }         
})

//prev

prev.addEventListener("click", function()
{
    count--; 
    const q_new=Questions(questions[count].id,
                          questions[count].ques,
                          questions[count].opts,
                          questions[count].ans);
    appDiv.firstElementChild.replaceWith(q_new.getQuestionNode()); 
    if(count<1)
    {
        prev.disabled=true;
    } 
    else{
        next.disabled=false;
        prev.disabled=false;
    }                                     
})


//question panel box
const panel_que=document.getElementById("panelbox");

for(var x=1;x<=questions.length;x++)
   {
    const q_div=document.createElement("div");
    q_div.setAttribute('id',x);
    q_div.addEventListener('click', function(){
        const q_new=Questions(questions[q_div.innerText-1].
            id,questions[q_div.innerText-1].ques,
            questions[q_div.innerText-1].opts,
            questions[q_div.innerText-1].ans);
            count=Number(q_div.innerText-1);
appDiv.firstElementChild.replaceWith(q_new.getQuestionNode()); 
    })
    q_div.textContent=x;
    panel_que.appendChild(q_div);
   }



const start=document.getElementById("sub");

start.addEventListener('click', function()
{
    const startmin= setInterval(function(){
        tm--;
        sec=60;
    },60000);

    const starttime= setInterval(function(){
        sec--;
        document.getElementById("tiktik").innerHTML=tm+" Mins" + sec+" Sec";
    },1000);
    const nm=document.getElementById("name").value;
    document.getElementById("username").innerText=nm;
    document.getElementById("front").style.display="none";
    console.log(nm);
    next();
})

const final=document.getElementById("final");
final.addEventListener('click',()=>{
    document.getElementById("score").innerText=scr;
    document.getElementById("result").style.display="block";
    console.log(scr);
})








