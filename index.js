const { selectedLanguage, jumpscares } = window.localStorage.getItem('save') || { selectedLanguage: 'Swedish', jumpscares: true };
let jumpscare = false;
let cancelJumpscareEnable = !jumpscares;
let currentLanguage = selectedLanguage;
let keysHeld = { Alt: false, End: false, Space: false }



// document.querySelector('html').classList.add('dark-theme')
document.querySelector('html').classList.add('light-theme')

const popUpObj = document.getElementById('popUp')
const swedish = document.getElementById('swedish');
if (currentLanguage == 'Swedish') swedish.play()
const english = document.getElementById('english')
if (currentLanguage == 'English') english.play()
const video = document.getElementById('video')
document.getElementById('theBody').addEventListener('keydown', e => {

    console.log(`${e.key} held`)

    if (e.key == 'Alt')
        keysHeld.Alt = true;
    else if (e.key == 'End')
        keysHeld.End = true;
    else if (e.code == 'Space')
        keysHeld.Space = true; 
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

    if (keysHeld.Alt && keysHeld.End) {
        if (cancelJumpscareEnable) {
            jumpscare = !jumpscare
            window.localStorage.setItem('save', { selectedLanguage: currentLanguage, jumpscares: jumpscare })
            popUp()
        } else {
            cancelJumpscareEnable = true;
            popUp()
        }
    }
    
    if (keysHeld.Space && e.code == 'Space') {
        if (currentLanguage == 'Swedish')
            if (swedish.paused)
                swedish.play()
            else 
                swedish.pause()
        else if (currentLanguage == 'English')
            if (english.paused)
                english.play()
            else
                english.pause()
    }

    if (e.key == 'Alt')
        keysHeld.Alt = false;
    else if (e.key == 'End')
        keysHeld.End = false;
    else if (e.key == 'Space')
        keysHeld.Space = false; 

    
});

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
    if (chance > 94) {
        if (!jumpscare)
            return;
        
        setTimeout(resetPlayer, 5000)
    }
}

const jumpscareEnable = () => {

    if (!cancelJumpscareEnable) {
        jumpscare = true;
        cancelJumpscareEnable = true;
    }
        
}

const languageReset = () => {

    let language = document.getElementById('selectLanguage')

    if (language.options[language.selectedIndex].value == 'Swedish') {
        english.pause()
        english.currentTime = 0
        swedish.play()
        currentLanguage = 'Swedish'
        window.localStorage.setItem('save', { selectedLanguage: currentLanguage, jumpscares: jumpscare })
    } else {
        swedish.pause()
        swedish.currentTime = 0
        english.play()
        currentLanguage = 'English'
        window.localStorage.setItem('save', { selectedLanguage: currentLanguage, jumpscares: jumpscare })
    }
        
}

setTimeout(jumpscareEnable, 120000)
setInterval(playVideo, 500)

document.getElementById('theBody').style.cursor = 'auto'