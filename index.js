// let GameName = "Guess The Word"
// document.title = GameName
// document.querySelector("h1").innerHTML = GameName
// document.querySelector("footer").innerHTML = `${GameName} اللعبه مصممه بواسطه `
let massegearea = document.querySelector(".message")
let numberoftries = 6;
let numberofletters = 6;
let currenttry = 1;
let numberofhints = 2
let wordtoguess =""
document.querySelector(".hint span").innerHTML = numberofhints
const gethintbutton = document.querySelector(".hint")
gethintbutton.addEventListener("click", gethint)
const words = ["مستشفى","مسرحية","محافظة","مغامرة","مناقشة"]
wordtoguess = words[Math.floor(Math.random() * words.length)].toLowerCase()
let help1 = document.querySelector(".help1")
function generateinput(){
    const inputscontainer = document.querySelector(".inputs")

    for (let i=1 ;i<=numberoftries; i++ ){
        const trydiv = document.createElement("div")
        trydiv.classList.add(`try-${i}`)
        trydiv.innerHTML = `<span>Try ${i}</span>`
        
        if(i !== 1 ){trydiv.classList.add("disabled-inputs")}

        for(let j =1; j<=numberofletters;j++ ){
            const input = document.createElement("input")
            input.type= "text"
            input.id = `guess-${i}-letter-${j}`
            input.setAttribute("maxlength","1")
            trydiv.appendChild(input)
        }

        inputscontainer.appendChild(trydiv)
    }
    inputscontainer.children[0].children[1].focus()

    const inputsindisableddiv = document.querySelectorAll(".disabled-inputs input")
    inputsindisableddiv.forEach((input) => (input.disabled = true))

    const inputs = document.querySelectorAll("input")
    inputs.forEach((input , index) => {
        input.addEventListener("input", function() {
            this.value = this.value.toUpperCase()

            const nextinput = inputs[index + 1 ];
            if (nextinput){nextinput.focus()}
        })
            input.addEventListener("keydown", function(event){
        const currentindex = Array.from(inputs).indexOf(event.target)
        if (event.key === "ArrowRight"){
            const nextinput = currentindex + 1
            if(nextinput < inputs.length){ inputs[nextinput].focus()}
        }
        if (event.key === "ArrowLeft"){
            const previnput = currentindex - 1
            if(previnput >= 0){inputs[previnput].focus()}
        }
    })
    })
console.log(wordtoguess)
}
const guessbutton = document.querySelector(".check")
guessbutton.addEventListener("click" , handleguesses)

function handleguesses(){
    let successguess = true
    for(let i = 1; i <= numberofletters;i++){
        const inputfield = document.querySelector(`#guess-${currenttry}-letter-${i}`)
        const letter = inputfield.value.toLowerCase()
        const actualletter = wordtoguess[i-1]

        if (letter === actualletter){
            inputfield.classList.add("yes-in-place")
        }else if (wordtoguess.includes(letter) && letter !== ""){
            inputfield.classList.add("not-in-place")
            successguess = false
        }else{
            inputfield.classList.add("no")
            successguess = false
        }
    }
    if(successguess){
        massegearea.innerHTML = `<bdi> انت فزت الكلمه هي </bdi> <span> ${wordtoguess} </span>`
        if(numberofhints === 2){
            massegearea.innerHTML = `<p> مبروك كسبت من دون استعمال محاولات </p> `
        }
        gethintbutton.disabled = true
        let alltries = document.querySelectorAll(".inputs > div")
        alltries.forEach((trydiv) => trydiv.classList.add("disabled-inputs"))
        guessbutton.disabled = true 
    }else{
        document.querySelector(`.try-${currenttry}`).classList.add("disabled-inputs")
        const currenttryinputs = document.querySelectorAll(`.try-${currenttry} input`)
        currenttryinputs.forEach((input) => (input.disabled = true))
        
        currenttry++

        
        const nexttryinputs = document.querySelectorAll(`.try-${currenttry} input`)
        nexttryinputs.forEach((input) => (input.disabled = false))
    
        let el = document.querySelector(`.try-${currenttry}`)
        if(el){document.querySelector(`.try-${currenttry}`).classList.remove("disabled-inputs")
            el.children[1].focus()
        }else{
            guessbutton.disabled = true
            gethintbutton.disabled = true
            massegearea.innerHTML = `<bdi> انت خسرت الكلمه هي </bdi> <span>${wordtoguess}</span>`
        }
        
    }
}

function gethint(){
    if(numberofhints > 0){
        numberofhints--
        document.querySelector(".hint span").innerHTML = numberofhints
    }
    if( numberofhints === 0 ){
        gethintbutton.disabled = true
    }

    const enabledinputs = document.querySelectorAll("input:not([disabled])")
    const emptyenabledinputs = Array.from(enabledinputs).filter((input) => input.value === "")

    if(emptyenabledinputs.length > 0 ){
        const randomindex = Math.floor(Math.random() * emptyenabledinputs.length)
        const randominput = emptyenabledinputs[randomindex]
        const indextofill = Array.from(enabledinputs).indexOf(randominput)
        if(indextofill !== -1){
            randominput.value = wordtoguess[indextofill].toUpperCase()
        }
    }
}

function handelbackspace(event){
    if(event.key === "Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])")
        const currentindex = Array.from(inputs).indexOf(document.activeElement)
        if (currentindex > 0){
            const currenttryinput = inputs[currentindex]
            const previnput = inputs[currentindex - 1]
            currenttryinput.value = ""
            previnput.value = ""
            previnput.focus()
        }
    }
}

if(wordtoguess === "مستشفى" ){
    help1.innerHTML = "مكان نتعالج فيه"
}else if(wordtoguess === "مسرحية"){
    help1.innerHTML = "مكان يقدم في العروض الفنيه"
}else if(wordtoguess === "محافظة"){
    help1.innerHTML = "مكان يحتوي علي مدن وقرى"
}else if(wordtoguess === "مغامرة"){
    help1.innerHTML = " رحلة غير مألوفة"
}else if(wordtoguess === "مناقشة"){
    help1.innerHTML = "عمليه تبادل الاراء والافكار بين شخص واخر"
}

document.addEventListener("keydown" , handelbackspace)

window.onload = function(){
    generateinput()
}