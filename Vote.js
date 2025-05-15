convs = 0
IsAdmin = localStorage.getItem("Admin")

buttons = document.querySelectorAll(".buttonchik")
ChoiseUsers = localStorage.getItem("IDchoice")
if(ChoiseUsers && !(IsAdmin=="true")){
    button = document.getElementById(ChoiseUsers) 
    button.classList.add("PurpleColor")
    BlockedALL()
} 
if (!IsAdmin){
    localStorage.setItem("Admin", false)
}
else{
    BlockedALL()
}


async function SendVote(Name){
    https = "https://servervote.onrender.com/add"
    try{
        post_response = await fetch(https,{ 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name: Name})})
    }catch{
    alert("Простите, в данный момент проблемы с сервером")
}
}


buttons.forEach(button => { 
    button.addEventListener("click", function(){
        button.classList.add("PurpleColor")
        Idishka = button.id
        localStorage.setItem("IDchoice",Idishka)
        Name = button.name
        SendVote(Name)
        BlockedALL()
        
    })
});


function BlockedALL(){
    buttons.forEach(button=>{
        if (!button.classList.contains("PurpleColor")){
        button.classList.add("GreyColor")}
    })
}



function BYEnter(){
    entrance = document.getElementById("Enter")
    entrance.style.display = "flex"
    entranc = document.getElementById("enterForm")
    entranc.style.display = "flex"
}



async function GOtoStatistics(){
    exit = document.getElementById("StaticGraf")
    entrance = document.getElementById("Statistics")
    exit.style.display = "none"
    entrance.style.display = "flex"
    data = await StatisticsGet()
    
    Percent = Object.values(data.Votes)
    console.log(data.Votes)
    names = ["ZlataSpan", "OksiSpan", "TimSpan", "FlynaSpan"]
    pinkesName = ["Pink4", "Pink3", "Pink2", "Pink1"]
    for (i=0; i<4; i++){
        pinkes = document.getElementById(pinkesName[i])
        Spanchik = document.getElementById(names[i])
        Spanchik.innerHTML = Percent[i] + "%"
        pinkes.style.width = Percent[i] + "%"
// 
    }
}

function GOtoSchedule(){
    exit = document.getElementById("StaticGraf")
    entrance = document.getElementById("Schedule")
    exit.style.display = "none"
    entrance.style.display = "flex"
    GraficSee()
}

function ExitSchedule(){
    exit = document.getElementById("Schedule")
    entrance = document.getElementById("StaticGraf")
    exit.style.display = "none"
    entrance.style.display = "flex"
}

function ExitStatistics(){
    exit = document.getElementById("Statistics")
    entrance = document.getElementById("StaticGraf")
    exit.style.display = "none"
    entrance.style.display = "flex"
}

function exitWindowEnter(){
    exit = document.getElementById("Enter")
    exit.style.display = "none"
}

async function EnterInStaticGraf(){     
    forma = document.getElementById("enterForm")
    NForma = new FormData(forma)
    Email = NForma.get("mail")
    PasswordPost = NForma.get("password")
    https = "https://servervote.onrender.com/login"
    post_response = await fetch(https,{ 
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ login: Email, password: PasswordPost})
    })
    if(post_response.ok){
        exit = document.getElementById("Enter")
        entrance = document.getElementById("StaticGraf")
        exit.style.display = "none"
        entrance.style.display = "flex"
        exits = document.getElementById("Container")
        exits.style.display = "none"
        if (IsAdmin=="false"){
            Names = document.getElementById(ChoiseUsers).name
            httpses = "https://servervote.onrender.com/deleteAdmin"
            posts_response = await fetch(httpses,{ 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: Names})
            })
            localStorage.setItem("Admin", true)    
            if(posts_response.ok){
                Answer = await posts_response.json()
                alert(Answer.warning)
            }
            else{
                console.log("проблемы с сервером")
            }
        }
        else{
            console.log(localStorage.getItem("Admin"), IsAdmin)
        }
    }
    else{
        alert("У вас неверный логин или пароль")
    }
}   


async function StatisticsGet(){
    https = "https://servervote.onrender.com/statistic"
    get_response = await fetch(https)
    data = await get_response.json()
    return data
}



async function GraficSee(){
    Data = await StatisticsGet()
    Percent = (Data.Votes)
    grafGet = document.getElementById("Grafic")
    conv = grafGet.getContext("2d")
    if (convs){
        convs.destroy()
    }
    convs = new Chart(conv,{ 
        type:"pie", 
        data: {
            labels: Object.keys(Percent),
            datasets: [{
                data: Object.values(Percent),
                backgroundColor: ['rgb(76, 60, 145)', 'rgb(235, 130, 130)',' rgb(97, 42, 122)', 'rgb(250, 73, 176)']
            }]
        }
    })
}