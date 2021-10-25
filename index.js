const colorArr = ['#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#ff0000']
let colorNum = 0;
let changeColorInterval = 10;
let jumpscare = false;
let cancelJumpscareEnable = false;
const currentLanguage = 'Swedish';
let keysHeld = { Alt: false, End: false }

const popUpObj = document.getElementById('popUp')
const swedish = document.getElementById('swedish');
swedish.play()
const english = document.getElementById('english')
const video = document.getElementById('video')
document.getElementById('theBody').addEventListener('keydown', e => {

    console.log(`${e.key} held`)

    if (e.key == 'Alt')
        keysHeld.Alt = true;
    else if (e.key == 'End')
        keysHeld.End = true;
});

const popUp = async () => {

    if (jumpscare && !cancelJumpscareEnable)
        document.getElementById('jumpscare').innerHTML = `You've enabled jumpscares!`;
    else if (!jumpscare && !cancelJumpscareEnable)
        document.getElementById('jumpscare').innerHTML = `You've disabled jumpscares!`;
    

    if (jumpscare && cancelJumpscareEnable)
        document.getElementById('jumpscare').innerHTML = `You've enabled jumpscares!`;
    else if (!jumpscare && cancelJumpscareEnable)
        document.getElementById('jumpscare').innerHTML = `You've disabled jumpscares!`;

    const removePopUp = () => {

        document.getElementById('jumpscare').innerHTML = ``;
    }

    setTimeout(removePopUp, 10000)
}   

document.getElementById('theBody').addEventListener('keyup', async e => {

    console.log(`${e.key} released`)

    if (e.key == 'Alt')
        keysHeld.Alt = false;
    else if (e.key == 'End') {
        keysHeld.End = false;

        if (cancelJumpscareEnable) {
            if (jumpscare)
                jumpscare = false
            else
                jumpscare = true
            popUp()
        } else
            cancelJumpscareEnable = true;
            popUp()
    }
        

    
});

const changeColor = () => {
    //console.time('changeColor')
    if (colorNum > (colorArr.length - 1))
        colorNum = 0

    document.getElementById('theBody').style.backgroundColor = colorArr[colorNum]
    colorNum++
    //console.timeEnd('changeColor')
};

const playVideo = () => {
    //console.time('playVideo')

    let chance = Math.round(Math.random() * 100)

    //console.log(chance)

    if (chance > 94) {
        if (!jumpscare)
            return;

        if (currentLanguage == 'Swedish') {
            swedish.pause()
            swedish.currentTime = 0
        }
            
        else if (currentLanguage == 'English') {
            english.pause()
            english.currentTime = 0
        }

        video.style.display = 'inline'
        video.play()
    }

    const resetPlayer = () => {
        video.style.display = 'none'
        video.pause()
        if (currentLanguage == 'Swedish')
            swedish.play()
        else if (currentLanguage == 'English')
            english.play()
    }

    //console.timeEnd('playVideo')
    setTimeout(resetPlayer, 5000)
}

const jumpscareEnable = () => {

    if (cancelJumpscareEnable == false) {
        jumpscare = true;
        cancelJumpscareEnable = true;
    }
        
}

const languageReset = () => {

    let language = document.getElementById('chooseLanguage')

    if (language.value == 'Swedish') {
        english.pause()
        english.currentTime = 0
        swedish.play()
        currentLanguage = 'Swedish'
    } else {
        swedish.pause()
        swedish.currentTime = 0
        english.play()
        currentLanguage = 'English'
    }
        
}

setTimeout(jumpscareEnable, 120000)
setInterval(changeColor, 75)
setInterval(playVideo, 500)

document.getElementById('theBody').style.cursor = 'auto'