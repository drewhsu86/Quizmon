# Quizmon

- [Overview](#overview)
- [MVP](#mvp)
  - [Goals](#goals)
  - [Libraries](#libraries)
  - [Client (Front End)](#client-front-end)
    - [Wireframes](#wireframes)
    - [Component Tree](#component-tree)
    - [Component Hierarchy](#component-hierarchy)
    - [Component Breakdown](#component-breakdown)
    - [Component Estimates](#component-estimates)
  - [Server (Back End)](#server-back-end)
    - [ERD Model](#erd-model)
- [Post-MVP](#post-mvp)
- [Code Showcase](#code-showcase)
- [Code Issues & Resolutions](#code-issues--resolutions)

<br>

## Overview

**Quizmon** is an app where users can create and share multiple choice questions. Ever wanted to quickly test yourself on a particular topic? Ever spend time studying and wanted to save your practice questions? Quizmon is a forum that changes the pace by having multiple choice questions instead of lengthy posts. While discussing topics at length can be great for learning, so can quickly iterating through the valuable knowledge nuggets that our peers are willing to share.

<br>

## MVP

#### Backend
  * Ruby on Rails RESTful API with routes to:
    * Sign up as a User
    * Sign in as a User 
    * Verify log in if valid JWT 
    * Create a multiple choice Question that is linked to User that created it
    * Edit or delete Question that a User had created 
    * View one Question based on id 
    * View list of Questions (all questions, or questions under a specific topic)
  * Postgresql database managed by ROR that has the following tables:
    * User 
    * Question - belongs to User, belongs to Topic 
    * Completed - belongs to User, belongs to Question 
    * Comment - belongs to User, belongs to Question 
    * Topic - finite but expandable list of topics, such as:
      * Javascript 
      * Ruby
      * Data structures and algorithms
      * etc. 

#### Frontend
  * React App that is hooked up to RESTful API routes 
    * With the pages shown in wireframes 
    * Built close to the structure shown in component hierarchy 
    * Allows sign in, sign up, and the 5 CRRUD operations w.r.t. the Questions database 
      * Lets users see their own Questions in their home, or dashboard, area 
      * Lets users create a multiple choice Question
      * Lets users edit and/or delete their own Questions
      * Lets anyone view a list of Questions in a browse page 
      * Lets anyone view one Question, and try to answer it, in a questions page with :id 
    * Lets a User have their Question completions saved so they know if they tried it (they may attempt Questions again) 
    * Lets any User comment on any Question, including its creator 
    * Lets anyone read all comments on the bottom of the Question's individual page 

<br>

## Goals/Post-MVP

The goals of this project are to create an app, and an atmosphere, where people feel motivated to help each other learn and give a platform to make questions that others can browse through. The MVP tries to meet these goals by providing the Questions themselves, as well as providing Comments and Completions to help other Users interact with the Questions other than by simply answering.

Here are some Post-MVP goals/features that would help enhance the user experience:

  * User can also set an img_url as a profile pic 
    * Would be displayed as a small square
    * Would need to explore how to set restrictions on image links or police those that link images in bad faith 
  * Users can police comments on their own questions 
    * Most basic implementation: Users can delete comments that are on their own questions 
    * Another implementation is hiding the comments (would need a field: 'hidden: boolean') 
  * Users can set their own questions to private (maybe it's a draft and not ready to show the world) 
    * A field: 'private: boolean' can be used 
  * A like system can be implemented using another thru table, similar to completed 
    * To make it a bit more complicated than completed, the like system would need to be able to toggle whether a User liked a Question (in case they changed their mind)
  * Users can edit or delete their past comments, and a new view can be added for them to view all their own comments

<br>

## Libraries

> Use this section to list all supporting libraries and dependencies, and their role in the project.

|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|      React       | Frontend Framework |
|   React Router   | URL Routes for React |
| Ruby on Rails    | Backend server/API framework |
|   Postgresql     | SQL database manager |
|  Bcrypt  | Backend password hashing |
|  CORS    | Backend cross-origin-resource-sharing compatibility | 

<br>

### Client (Front End)

#### Wireframes

[Adobe XD - Wireframes for Quizmon](./quizmon-mockups.xd)

#### Component Tree

[Draw.io - Quizmon Component Hierarchy](https://www.draw.io/#G1ZBsu3NufmAujOtJNN5jmgIDCL-xgoabz)

#### Component Hierarchy

``` structure

src
|__ components/
      |__ auth/
          |__ signin.js
          |__ signup.js
      |__ nav/
          |__ index.js
      |__ questions/
          |__ Browse.js
          |__ QuestionDetails.js
      |__ user/ 
          |__ home.js 
          |__ create.js
          |__ edit.js

|__ services/
      |__ apiConfig.js
      |__ users.js 
      |__ questions.js 
      |__ comments.js 
      |__ completes.js
|__ app.css
|__ app.js
|__ index.js
```

#### Component Estimates

  * React component estimates include basic CSS to match the MVP mockup 

| Task                | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------- | :------: | :------------: | :-----------: | :---------: |
| Ruby on Rails - Models Setup/Testing    |    H     |     3 hrs      |     TBD     |    TBD   |
| Ruby on Rails - Auth Setup/Testing |    H     |     6 hrs      |     TBD     |     TBD     |
| Ruby on Rails - Routes/Controllers Setup/Testing    |    H     |     3 hrs      |     TBD     |    TBD   |
| React - Setup and Route Creation |    H     |     3 hrs      |     TBD     |     TBD     |
| React - Api Config |    H     |     1 hrs      |     TBD     |     TBD     |
| React - Services: Backend JS Functions |    M     |     3 hrs      |     TBD     |     TBD     |
| React - Browse Page |    H     |     3 hrs      |     TBD     |     TBD     |
| React - Question View Page |    M     |     3 hrs      |     TBD     |     TBD     |
| React - Sign up/Sign in Pages |    M     |     3 hrs      |     TBD     |     TBD     |
| React - Nav bar |    H     |     6 hrs      |     TBD     |     TBD     |
| React - Home Page (logged in) |    H     |     5 hrs      |     TBD     |     TBD     |
| React - Question Create Page |    H     |     3 hrs      |     TBD     |     TBD     |
| React - Question Edit/Delete Page |    M     |     1 hrs      |     TBD     |     TBD     |
| TOTAL               |         |     40 hrs    |     TBD     |     TBD     |


<br>

### Server (Back End)

#### ERD Model

![Quizmon ERD](./quizmon-ERD.png)

<br>

***

## Code Showcase

> TBD

## Code Issues & Resolutions

> TBD
