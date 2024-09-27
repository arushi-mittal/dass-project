# ***DASS Project***
## ***Team: 29***
## Members: 
### Arushi Mittal (2019101120), Meghna Mishra (2019111030), Mihir Bani (2019113003), Samay Kothari (2019113017)
## Project Title: NeoEM
## Organization: AyushmanBhava
_____
### Running The Code:
#### Running the backend server
```bash
cd src/dev_MERN/backend
npm i
npm run server
```
#### Running the frontend code
```bash
cd src/dev_MERN/frontend
npm i
npm start
```
The backend server will be started on port 5000 and the frontend server on port 3000.
___
## Project Description

Project NeoEM is a road safety initiative using machine learning and artificial learning by AyushmanBhava. The project involves two parts: the machine learning model and the web application.

The web application involves the registration and logging in of two types of users: administrators and citizens.

Administrators are allowed to access a dashboard from where they can view and mark violations, with functionality for sorting and filtering. Citizens are allowed to upload videos with descriptions of the violation occuring in it.
Both are allowed to update their respective profiles. This application is intended to be used by law enforcement agencies to easily receive information about traffic violations and emergency vehicle obstruction and take the requisite legal action.

The machine learning model involves creation of files to extract images from videos and store them for annotation. This collected data is then annotated using the VGG Image Annotator (VIA) tool, involving labeling of individual characters and license plates. This information was then fed to the YoloV5 tool for generation of a machine learning model.

The annotated files and extraction python files can be found in `Annotated json files` and `Python scripts data preprocesing`.

Additionally, the initial requirements for the app were in Django, so `dev_code` contains the app in Django with functionality up to R1. The remainder was ported to MERN and implemented with the required functionality.

### Functionality

- **Welcome Page:**  
    The welcome page is the first page of the web application. This page allows the users to navigate to registration, login or dashbaord depending on whether they are logged in or not, and the user type, which can be administrator or citizen. 

- **Login Page:**   
    The Login Page uses secure json web tokens to log users in by hashing the data and checking with a MongoDB database. The username is always unique, and in case of non-existent username or incorrect passwords, an error message is used to alert the users.

- **Register Page:**  
    The Register Page uses information such as name, username, email and password in order to register a new user to the webiste. Additionally, the user type is also registered so they can register as a citizen or an administrator. This information is securely stored in a MongoDB database and can be used later while logging the user in or performing other actions such as updating profile, uploading videos and marking violations.

- **Admin related:** 
  - **Profile**: Functionality for editing and viewing the profile, with the option of changing fields such as name,phone number and address. 
  - **Records Dashboard**: allows the user to view the records stored in the database, and perform actions such as mark as a violation or bookmark the record to be viewed later. He/She can also filter, sort and search the records. 
  - **Bookmarked Dashboard**: Shows the records that have been bookmarked by the admin. From here, the admin can again mark/delete this record. The admin can also filter, sort and search the records.
  - **Violations Dashboard**: allows the user to view the records that have been marked as violations. 

- **Citizen related:**  
  - **Profile**: Page for editing and viewing the profile, with the option of changing fields such as name, phone numner and address.
  - **Upload Video**: section allows the user to upload a video file of a valid file format. 
  - **View Video**: section allows the user to access their uploaded videos to play or delete the video from the server.

### Technical summary
The app uses **MERN Stack** (MongoDB, Express API, React JS, Node JS) to implement all the functionality.  
The app also exists with the register, login and dashboard functionality using Django, however the other functions are not implemented in it due to change in technology stack from Django to MERN.
