import { moviesData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const terrifyingFilmsOnlyOption = document.getElementById('terrifying-films-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderMovie)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderMovie(){
    const movieObject = getSingleMovieObject()
    if (movieObject === undefined){
        memeModalInner.innerHTML =  `
        <p>No terrifying film with this vibe
        </p>
        `
    memeModal.style.display = 'flex'
    } else {
        memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${movieObject.image}"
        alt="${movieObject.alt}"
        >
        `
        memeModal.style.display = 'flex'
    }
}

function getSingleMovieObject(){
    const moviesArray = getMatchingMoviesArray()
    
    if(moviesArray.length === 1){
        return moviesArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * moviesArray.length)
        return moviesArray[randomNumber]
    }
}

function getMatchingMoviesArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isTerrifying = terrifyingFilmsOnlyOption.checked
        
        const matchingMoviesArray = moviesData.filter(function(movie){
            
            if(isTerrifying){
                return movie.emotionTags.includes(selectedEmotion) && movie.isTerrifying
            }
            else{
                return movie.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingMoviesArray 
    }  
}

function getEmotionsArray(movies){
    const emotionsArray = []    
    for (let movie of movies){
        for (let emotion of movie.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(movies){
        
    let radioItems = ``
    const emotions = getEmotionsArray(movies)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(moviesData)




