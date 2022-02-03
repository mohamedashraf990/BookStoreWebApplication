# SimpleBookStoreWebApplication
## 1. Introduction

This project is a web application that is used as a simple book database. The website allows the users to lookup books abstracts, genres, authors, reviews... etc. Users should be allowed to create an account, add books to their “want to read” list



## 2.Technologies and Languages
1. HTML
2. CSS
3. JavaScript
4. Node.js
5. Express
6. Visual Studio Code (VSCode)
7. File System
8. Embedded JavaScript (EJS)

## 3. Components:

1. Users Login (Main Page):
*Registered users are be allowed to log in to their accounts using their stored username and password. If an unregistered user tries to log in an error message should be displayed.*
2. User Registration:
*Users are be allowed to create an account using a unique username and a password and the users’ information should be stored in a JSON file that represents a simple database. If the user tried to register using an already taken username, an error message should be displayed.*
3. Home Page:
*The home page is the first page that will be encountered by the users when they log in to their accounts. It contains several book genres and a button to view the user’s “want to read” list. When the user clicks on any book genre, they will be redirected to that genre’s page.*
4. Genre Page:
*The genre page contains all the books within this genre. When a user clicks on any book’s name, they will be redirected to that book’s page.*
5. Book Page:
*The book page contains an abstract for the book. The page will also contain an embedded video describing the book which can be streamed by the user. Finally, an “add to want to read” button will be added. The button adds this book to the user’s “want to read” list in the database.*
6. Want to Read List Page:
*The want to read list page contains the books that the user previously added using the “add to want to read list” button. A “view want to read list” button will be added to the home page that directs the user to their own want to read list page.*
7. Search:
*A search bar will be displayed in all pages except for the registration and login pages. The search will be done using books names only. The search result is either a “book not found” message if the book was not available in the database or a list of the books that contain the search keyword in their names. The search results will be clickable and they direct you to that specific book’s page.*

## 4. Deployment:

The Project is Deployed on Heroku and can be accessed through this link https://tranquil-refuge-77772.herokuapp.com/login
