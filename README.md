# Development of a Veterinary App Using Firebase

## Abstract
This project focuses on the development of a veterinary application utilizing Firebase as the backend service. The app allows user authentication, animal management, and the use of Firebase's Firestore for cloud-based CRUD operations. Built using Node.js version 20.16.0, the project complies with academic requirements for functionality and performance.

## 1. Introduction
The veterinary app aims to assist professionals in managing a list of animals with functionalities such as user authentication, animal registration, and the display of detailed information for each animal. Firebase's JavaScript SDK provides the necessary backend support for authentication and data handling.

## 2. App Structure
The application includes four key views:

### 2.1 Login View
Users can log in by providing their credentials. The app authenticates them using Firebase, displaying error messages for incorrect input or successful navigation to the main menu.

### 2.2 Sign Up View
New users can register by creating an account. Upon successful registration, the user is authenticated and redirected to the main menu, where error handling ensures proper credential validation.

### 2.3 Main Menu
The main menu features a list of animals, populated with data from Firebase Firestore. Each animal can be selected to view its detailed information. Additionally, users can add new animals through a dedicated interface.

### 2.4 New Animal View
This view allows users to input and submit new animal data (name, age, and picture URL) to Firebase Firestore. The data is then displayed in the main menu and can be accessed for further details.

## 3. Conclusion
This veterinary app leverages Firebase for seamless user management and data handling. Its structured interface facilitates ease of use for both end users and administrators in the context of animal care management.
