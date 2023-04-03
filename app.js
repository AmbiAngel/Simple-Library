let myLibrary = [];
let defaultBook = new Book("Default Book", "George R. R. Martin", 694, false)
myLibrary.push(defaultBook)


let overlayElement = document.querySelector(".overlay")
let newBookButton = document.querySelector(".new-book-button")
let newBookForm = document.querySelector('.new-book-form')
let submitButton = document.querySelector('.submit-button')
let libraryContainer = document.querySelector('.library-container')

let titleInput = document.querySelector('.title')
let authorInput = document.querySelector('.author')
let numOfPagesInput = document.querySelector('.num-of-pages')
let readCheckInput = document.querySelector('.read-check')

const editButtonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>`

const deleteButtonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>`



libraryContainer.addEventListener('click', handleBookButtonClick)
newBookButton.addEventListener('click', toggleNewBookForm)
overlayElement.addEventListener('click', toggleNewBookForm)
newBookForm.addEventListener('submit', addBookToLibrary)


function handleBookButtonClick(e){
    // if(e.target.tagName === 'BUTTON' || e.target.parentElement.tagName === 'BUTTON' || e.target.parentElement.parentElement.tagName === 'BUTTON'){
    //     console.log(e.target.tagName);
    // }

    let reviewNode = e.target;
    
    while (reviewNode.tagName !== 'BUTTON') {
        if(reviewNode.tagName === 'BODY'){return}
        reviewNode = reviewNode.parentNode;
    }
    
    if (reviewNode.classList.contains('edit-button')){
        handleEditButton(reviewNode)
    }
    else if(reviewNode.classList.contains('delete-button')){
        handleDeleteButton(reviewNode)
    }
}

function handleEditButton(reviewNode){
    while (!reviewNode.classList.contains('book-container')) {
        reviewNode = reviewNode.parentNode;
    }
    console.log(reviewNode.getAttribute('number'));

}

function handleDeleteButton(reviewNode){
    while (!reviewNode.classList.contains('book-container')) {
        reviewNode = reviewNode.parentNode;
    }
    bookIndex = reviewNode.getAttribute('number');
    myLibrary.splice(bookIndex, 1)
    displayBooks()
}

function toggleNewBookForm(){
    newBookForm.classList.toggle('visibility-toggle')
    newBookForm.classList.toggle('z-index-2')
    overlayElement.classList.toggle('visibility-toggle')
    overlayElement.classList.toggle('z-index-1')
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayBooks(){
    removeAllChildNodes(libraryContainer)
    // reversedMyLibrary = [...myLibrary].reverse()
    myLibrary.forEach((bookObj, index) => {
        const bookContainerElement = document.createElement('div')
        bookContainerElement.classList.add('book-container')
        bookContainerElement.setAttribute('number', index)
        libraryContainer.appendChild(bookContainerElement)
        
        const buttonContainerElement = document.createElement('div')
        buttonContainerElement.classList.add('button-container')
        bookContainerElement.appendChild(buttonContainerElement)

        const editButtonElement = document.createElement('button')
        editButtonElement.innerHTML = editButtonSVG
        editButtonElement.classList.add('book-button', 'edit-button')
        buttonContainerElement.appendChild(editButtonElement)

        const deleteButtonElement = document.createElement('button')
        deleteButtonElement.innerHTML = deleteButtonSVG
        deleteButtonElement.classList.add('book-button', 'delete-button')
        buttonContainerElement.appendChild(deleteButtonElement)



        const titleElement = document.createElement('h2')
        titleElement.classList.add('book-title')
        titleElement.textContent = bookObj.title
        bookContainerElement.appendChild(titleElement)

        const authorElement = document.createElement('p')
        authorElement.textContent = `by ${bookObj.author}`
        bookContainerElement.appendChild(authorElement)

        const numOfPagesElement = document.createElement('p')
        numOfPagesElement.textContent = `${bookObj.numOfPages} Pages`
        bookContainerElement.appendChild(numOfPagesElement)

        const readCheckElement = document.createElement('p')
        if (bookObj.readCheck){ readCheckElement.textContent = 'Read'}
        else{ readCheckElement.textContent = 'Not Read'}
        bookContainerElement.appendChild(readCheckElement)

      })

}

function Book(title, author, numOfPages, readCheck) {
  // the constructor...
    this.title = title,
    this.author = author,
    this.numOfPages = numOfPages,
    this.readCheck = readCheck

}

Book.prototype.sayTitle = function(){
    console.log(this.title)
} 

function addBookToLibrary(e) {
    e.preventDefault()
    
    // console.log(e);
    // let formData = [...document.querySelector('.new-book-form').elements]
    // .filter(element => element.name !== 'submit' ) // this is not a form data...
    // .reduce((acc, input) => {
    //     if(input.type === 'checkbox'){
    //         return {...acc, [input.name]: input.checked}
    //     }
    //     else{
    //         return {...acc, [input.name]: input.value}
    //     }
    // }, {})
    let title = titleInput.value
    let author = authorInput.value
    let numOfPages = numOfPagesInput.value
    let readCheck = readCheckInput.checked

    newBook = new Book(title, author, numOfPages, readCheck)
    myLibrary.push(newBook);
    displayBooks()
}

displayBooks()