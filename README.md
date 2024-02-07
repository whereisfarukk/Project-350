## Why This Project 
$\textrm{\large Our project cuts the red tape of traditional hall allocation with a user-friendly website. Students browse }$<br>$\textrm{\large options, apply electronically,and track progress seamlessly. Benefits? Less stress, more choice, and }$<br>$\textrm{\large transparency for everyone. It's the future of campus housing allocation!, one click at a time!}$

## Feature 
$\textrm{\large There is only one admin i.e. provost,any one with the claim of student can create an acccount}$

## Teacher/Admin/Provost role
<ul>
<li>$\textrm{\large See Student details.}$</li>
<li>$\textrm{\large Applicants.}$</li>
<li>$\textrm{\large Choose applicants for viva and reject applicants.}$</li>
<li>$\textrm{\large Allocate room for students.}$</li>
<li>$\textrm{\large Receive Complains and Approve Leave Request.}$</li>
</ul>

## Student role
<ul>
<li>$\textrm{\large Apply for a seat.}$</li>
<li>$\textrm{\large See Applicantion status.}$</li>
<li>$\textrm{\large Send complain.}$</li>
</ul>

## Some Screenshots

#### Welcome page
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/landing_page.png)

#### Admin sign In
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/admin_sign_in.png)

#### Admin Home Page
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/admin_home_page.png)

#### New Students Applications
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/new_applications.png)

#### View Applied students details
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/view_details.png)

#### Students selected for viva
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/applicants_selected_for_viva.png)

#### Rejected Applicants
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/rejected_applicants.png)

#### Allocated students complains
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/admin_complain_page.png)

#### About the complains
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/complain_popup.png)

#### Allocated Student details
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/admitted_applicants.png)



#### student registration 
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/student_registration.png)

#### User Home page 
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/student_landing_page.png)

#### Form for application
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/form_1.png)
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/form_2.png)

#### Do complain
![image](https://github.com/whereisfarukk/Studymaterial/blob/main/RandomThings/project_350_Images/complainbox.png)

## Codebase Structure

```
Project-350
├── controller
│   ├── auth.js
│   └── userOperations.js
│ 
├── public
│   ├── images
│   │    └── images.png
│   ├── admin_complain_page.css
│   ├── admin_dash.css
│   ├── admin_dashboard_applicants.css
│   ├── application.css
│   ├── custom.css
│   ├── dbService.js
│   ├── index.js
│   ├── script.js
│   ├── script_admin.js
│   ├── script_application.js
│   └── style.css
│
├── routes
│   ├── auth.js  
│   └── pages.js
│
├── view
│   ├── admin_complain_page.ejs  
│   ├── admin_dashboard_accepted_applicants.ejs
│   ├── admin_dashboard_admitted_applicants.ejs 
│   ├── admin_dashboard_applicants.ejs
│   ├── admin_dashboard_rejected_applicants.ejs
│   ├── admin_dashboard_selected_applicants.ejs
│   ├── admin_dashboard_viewpayment.ejs
│   ├── application.ejs
│   ├── application_status.ejs
│   ├── assign_payment.ejs
│   ├── assign_room.ejs
│   ├── assign_viva.ejs
│   ├── complain.ejs
│   ├── complaints_details.ejs
│   ├── dashboard.ejs
│   ├── index.ejs
│   ├── leave_requests.ejs
│   ├── login_admin.ejs
│   ├── login_student.ejs
│   ├── room_details.ejs
│   └── userApplicationStatus.ejs
│   
├── .env
├── app.js
├── pakage-lock.json
└── package-lock.json

```


## Getting Started (How to Configure)
$\textrm{\large 1.First clone this repository.}$
```
git clone https://github.com/whereisfarukk/Project-350.git
```
$\textrm{\large 2.Install xampp and run.If not installed then go to }$[here](https://linux.how2shout.com/how-to-install-xampp-on-ubuntu-20-04-lts/)

$\textrm{\large 3.open the project in code editor}$

$\textrm{\large 4.Install node on your device}$
``` 
sudo apt install nodejs
```
$\textrm{\large 5.Install npm}$
```
sudo apt install npm
```
$\textrm{\large 6.Install dependencies}$
```
npm install
```
$\textrm{\large 7.Start the server}$
```
npm start
```

$\textrm{\large Now open }$[http://localhost:4000](http://localhost:4000) $\textrm{\large with your browser to see the result.}$



