# htx-onboardingsystem

Hi HTX Team, this project has used the MVC (Model-View-Controller) architecture with an API-based integration between the HR System (System A) and the Onboarding System (System B).

# Script to run in got cmd after cloning this git:
cd .ssh<br>
cd htx-onboardingsystem<br>
docker compose up -d<br>
docker exec -it htx-onboardingsystem-onboarding-database-1 mongosh<br>
rs.initiate()<br>
rs.status()<br>
exit<br>
docker exec -it htx-onboardingsystem-onboarding-app-1 sh<br>
npm install<br>
npm audit fix<br>
npm audit fix --force<br>
npm install axios<br>
npm install dotenv<br>
exit<br>
docker compose up -d --build<br>

When an employee account is created, I have chosen the 'employee issues (laptop, staff pass, welcome goody bag)'. This means in a positive scenario, there should be 1 employee record created and 3 tasks created, which are associated to that new employee account which was created.

As the requirement includes 'manage failures during the integration process', there will be a negative test scenario where the onboarding process is unsuccessful and no employee account and no tasks are created (rollback).

# Positive Test Scenario:
Go to 'http://localhost:3000/'

Input all the fields and click 'Create New Account' at the bottom:
![image](https://github.com/user-attachments/assets/2f112870-9fd5-4a7b-9aa1-d7b9662ab123)

If any of the fields were not filled in, it will pop a message:
![image](https://github.com/user-attachments/assets/2c9fb70e-d4ed-4776-8c3d-37174e63e51d)

You will see a 'success' screen:
![image](https://github.com/user-attachments/assets/07385d48-b1c5-466a-85b6-6c4594bd7cac)

In continuation from where it was left off in the git cmd, input the below:<br>
docker exec -it htx-onboardingsystem-onboarding-database-1 mongosh<br>
use onboardingapp<br>
db.employees.find().pretty();<br>

Check that 1 employee account record is created in the database:
![image](https://github.com/user-attachments/assets/c2aaefe0-9396-4bc4-aa64-f4c5cdf964ed)

Run this line in git cmd:<br>
db.onboardingtasks.find().pretty()<br>

Check that 3 task records associated to the new employee is created in the database:
![image](https://github.com/user-attachments/assets/7496bb3c-a871-488a-8be9-fe1383531392)


# Negative Test Scenario:
In continuation from where it was left off in the git cmd, run the below lines:<br>
exit<br>
docker compose watch<br>

In your physical device, open 'front.js' from the project:
![image](https://github.com/user-attachments/assets/95ec0b70-1eb8-4103-9451-252b4befe626)

Go to line 26 and make the changes as follows (introduce an error in the code):
![image](https://github.com/user-attachments/assets/a7f2eefe-d892-4d47-b998-64d9cdf5f101)

Save the'front.js' file.

Go to 'http://localhost:3000/' and refresh the webpage

Populate the fields and click 'Create New Account':
![image](https://github.com/user-attachments/assets/0bba4061-6204-430f-ad75-0005a2116aef)

Error page should be seen, this will be a clear indication to the user that the employee account creation operation has failed and the HR side can note down the timestamp of when the operation failed and request help from the relevant teams to check for the cause of error in the 'Logs' of the app in Docker:
![image](https://github.com/user-attachments/assets/3e27328b-ea5a-48f6-be6b-df5a7cd5a08f)

Where to go to to check for logs in Docker:
![image](https://github.com/user-attachments/assets/7d11d7ed-787d-4b1a-adbb-920bd5116da2)


In continuation from where it was left off in the git cmd, input the below:<br>
control c<br>
docker exec -it htx-onboardingsystem-onboarding-database-1 mongosh<br>
use onboardingapp<br>
db.employees.find().pretty();<br>

No employee record should be created:
![image](https://github.com/user-attachments/assets/a9552703-59cb-4ebf-8bfe-e58f43755051)

Run this line in git cmd:<br>
db.onboardingtasks.find().pretty()<br>

No task should be created for that employee:
![image](https://github.com/user-attachments/assets/9871555d-548a-4760-9627-eb7b5b1fe186)


