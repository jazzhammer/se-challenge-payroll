# Wave Software Development Challenge

Applicants for the Full-stack Developer role at Wave must
complete the following challenge, and submit a solution prior to the onsite
interview.

The purpose of this exercise is to create something that we can work on
together during the onsite. We do this so that you get a chance to collaborate
with Wavers during the interview in a situation where you know something better
than us (it's your code, after all!)

There isn't a hard deadline for this exercise; take as long as you need to
complete it. However, in terms of total time spent actively working on the
challenge, we ask that you not spend more than a few hours, as we value your
time and are happy to leave things open to discussion in the on-site interview.

Please use whatever programming language and framework you feel the most
comfortable with.

Feel free to email [dev.careers@waveapps.com](dev.careers@waveapps.com) if you
have any questions.

## Project Description

Imagine that this is the early days of Wave's history, and that we are prototyping a new payroll system API. A front end (that hasn't been developed yet, but will likely be a single page application) is going to use our API to achieve two goals:

1. Upload a CSV file containing data on the number of hours worked per day per employee
1. Retrieve a report detailing how much each employee should be paid in each _pay period_

All employees are paid by the hour (there are no salaried employees.) Employees belong to one of two _job groups_ which determine their wages; job group A is paid $20/hr, and job group B is paid $30/hr.
Each employee is identified by a string called an "employee id" that is globally unique in our system.

Hours are tracked per employee, per day in comma-separated value files (CSV).
Each individual CSV file is known as a "time report", and will contain:

1. A header, denoting the columns in the sheet (`date`, `hours worked`,
   `employee id`, `job group`)
1. 0 or more data rows

In addition, the file name should be of the format `time-report-x.csv`,
where `x` is the ID of the time report represented as an integer. For example, `time-report-42.csv` would represent a report with an ID of `42`.

You can assume that:

1. Columns will always be in that order.
1. There will always be data in each column and the number of hours worked will always be greater than 0.
1. There will always be a well-formed header line.
1. There will always be a well-formed file name.

A sample input file named `time-report-42.csv` is included in this repo.

### What your API must do:

We've agreed to build an API with the following endpoints to serve HTTP requests:

1. An endpoint for uploading a file.

   - This file will conform to the CSV specifications outlined in the previous section.
   - Upon upload, the timekeeping information within the file must be stored to a database for archival purposes.
   - If an attempt is made to upload a file with the same report ID as a previously uploaded file, this upload should fail with an error message indicating that this is not allowed.

2. An endpoint for retrieving a payroll report structured in the following way:

   _NOTE:_ It is not the responsibility of the API to return HTML, as we will delegate the visual layout and redering to the front end. The expectation is that this API will only return JSON data.

   - Return a JSON object `payrollReport`.
   - `payrollReport` will have a single field, `employeeReports`, containing a list of objects with fields `employeeId`, `payPeriod`, and `amountPaid`.
   - The `payPeriod` field is an object containing a date interval that is roughly biweekly. Each month has two pay periods; the _first half_ is from the 1st to the 15th inclusive, and the _second half_ is from the 16th to the end of the month, inclusive. `payPeriod` will have two fields to represent this interval: `startDate` and `endDate`.
   - Each employee should have a single object in `employeeReports` for each pay period that they have recorded hours worked. The `amountPaid` field should contain the sum of the hours worked in that pay period multiplied by the hourly rate for their job group.
   - If an employee was not paid in a specific pay period, there should not be an object in `employeeReports` for that employee + pay period combination.
   - The report should be sorted in some sensical order (e.g. sorted by employee id and then pay period start.)
   - The report should be based on all _of the data_ across _all of the uploaded time reports_, for all time.

As an example, given the upload of a sample file with the following data:

| date       | hours worked | employee id | job group |
   | ---------- | ------------ | ----------- | --------- |
| 4/1/2023   | 10           | 1           | A         |
| 14/1/2023  | 5            | 1           | A         |
| 20/1/2023  | 3            | 2           | B         |
| 20/1/2023  | 4            | 1           | A         |

A request to the report endpoint should return the following JSON response:

   ```json
   {
     "payrollReport": {
       "employeeReports": [
         {
           "employeeId": "1",
           "payPeriod": {
             "startDate": "2023-01-01",
             "endDate": "2023-01-15"
           },
           "amountPaid": "$300.00"
         },
         {
           "employeeId": "1",
           "payPeriod": {
             "startDate": "2023-01-16",
             "endDate": "2023-01-31"
           },
           "amountPaid": "$80.00"
         },
         {
           "employeeId": "2",
           "payPeriod": {
             "startDate": "2023-01-16",
             "endDate": "2023-01-31"
           },
           "amountPaid": "$90.00"
         }
       ]
     }
   }
   ```

We consider ourselves to be language agnostic here at Wave, so feel free to use any combination of technologies you see fit to both meet the requirements and showcase your skills. We only ask that your submission:

- Is easy to set up
- Can run on either a Linux or Mac OS X developer machine
- Does not require any non open-source software
- Includes all the source code you write for the submission, including any models used for setting up your database

### Documentation:

Please commit the following to this `README.md`:

1. Instructions on how to build/run your application
1. Answers to the following questions:
   - How did you test that your implementation was correct?
   - If this application was destined for a production environment, what would you add or change?
   - What compromises did you have to make as a result of the time constraints of this challenge?

## Submission Instructions

1. Clone the repository.
1. Complete your project as described above within your local repository.
1. Ensure everything you want to commit is committed.
1. Create a git bundle: `git bundle create your_name.bundle --all`
1. Email the bundle file to [dev.careers@waveapps.com](dev.careers@waveapps.com) and CC the recruiter you have been in contact with.

## Evaluation

Evaluation of your submission will be based on the following criteria.

1. Did you follow the instructions for submission?
1. Did you complete the steps outlined in the _Documentation_ section?
1. Were models/entities and other components easily identifiable to the
   reviewer?
1. What design decisions did you make when designing your models/entities? Are
   they explained?
1. Did you separate any concerns in your application? Why or why not?
1. Does your solution use appropriate data types for the problem as described?


```
            ___.           .__              .__               
________ _\_ |__   _____ |__| ______ _____|__| ____   ____  
/  ___/  |  \ __ \ /     \|  |/  ___//  ___/  |/  _ \ /    \
\___ \|  |  / \_\ \  Y Y  \  |\___ \ \___ \|  (  <_> )   |  \
/____  >____/|___  /__|_|  /__/____  >____  >__|\____/|___|  /
\/          \/      \/        \/     \/               \/

```
# questions: 
- How did you test that your implementation was correct?
- If this application was destined for a production environment, what would you add or change?
- What compromises did you have to make as a result of the time constraints of this challenge?

# answers:
- **the implementation is tested in 2 ways:**
  1. using python module: pytest.  with python installed, python tests in folder: '\__test__' are executed.  these tests call the api endpoints to assert that the endpoints exist, accept standardized inputs, and return expected results.  eg. the call to retrieve the payroll report is expected to return the json in '__tests/e2e/api/csv/time-report-42.json'
  2. should the automated python tests fail, or the tester enjoys rummaging through sql, the file 'app/sql/report-all.sql' is available to allow inspection of the data at consecutive steps towards the final output. this will be useful if at some point the nature of the data changes and produces unexpected output. 


- **production imposes additional requirements**, not the least of which are security and performance: 
  
   - **security: CORS**. the api, implemented in next.js, is foretold to be accessible from the same domain.  this could be true, but hasn't been tested. if it **IS** accessible from other-than-same domain, we should probably install a more restricted cors policy.
   - **security: CSRF**. there is no authentication required to use the api's endpoints.  we should install an authentication module that produces tokens we can pass as bearer-tokens for every api call.
   - **performance:**. the current requirement is for the api to receive a source csv file with assumed structure.  in production, to provide a better user experience, we could consider vetting the file's structure, eg. is it really a csv file ? does it have the correct column headers in the correct order ? does it have rows ?
   - **performance:**. the report api call triggers a reporting generation process that runs synchronously. there are only 30+ items to be compiled currently, but the specification is to compile all data for all time. results of previous compilations are not stored.  with the implementation as-is, it won't be long before the report-api-call will take intolerably long to return, and then likely timeout before completion.  a few things should be done before this gets out of hand:
     - the requirement that specifies the prevention of upload of csv files with the same id suggests that we're trying to NOT overwrite the hours and jobGroup for any employee's id + interval. ie. hoursWorked is meant to be immutable once submitted. if this is true, it means we don't have to wait to compile payment amounts for an employeeId + payPeriod + jobGroup.
     we should consider instead calculating the amount for any employee + interval as soon as we have the final information for an employee + payPeriod.
     - any time we compile payroll amounts, we should store them in a table so no payPeriod needs to be recalculated repeatedly. 
       - early in the evolution of wave, it probably made sense to dump the entire payroll history, likely for the purpose of import to a payroll system that might have been equally unsophisticated. when we can do with exporting payroll data within a smaller interval, we should, by modifying our report generation api to receive start- and end-interval, and return just the payroll items that fall in this interval.  
       this will keep the blob smaller, and the api more responsive
   - **performance:**. it's 2023 and we like to deploy on kubernetes, spin up lambdas and other serverless processes so we can stack more hardware processes on services to make them run faster. we'll have to combine some of these at some point to keep performance at acceptable levels as demand for this service grows.
   - **functionality:**. at some point in the evolution of wave,  the developer won't be the one submitting hoursWorked to this api. this is the kind of work that should be delegated to payroll/hr personnel.  payroll/hr personnel typically don't know how to use postman or how to run a pything script to submit hours. so, we should provide a user interface for them accessible in either a browser or some kind of executable.  
  this front-end tool will allow the user to select a file from their device to upload to the api.  the same tool would support report generation.
  
- **compromises due to time constraints:**  the next logical steps in evolution of the product were compromised:  caching calculated amounts to disk, and security. 
      
```

___.         .__.__       .___                               
\_ |__  __ __|__|  |    __| _/   ____   _______ __ __  ____  
 | __ \|  |  \  |  |   / __ |   /    \  \_  __ \  |  \/    \ 
 | \_\ \  |  /  |  |__/ /_/ |  |   |  \  |  | \/  |  /   |  \
 |___  /____/|__|____/\____ |  |___|  /  |__|  |____/|___|  /
     \/                    \/       \/                    \/ 

```

# wavepay
at wave, we take payroll seriously.  
this system, "wavepay", allows anyone who knows how to POST to an endpoint to submit work hours 
and have them paid. 
it works best in organizations of self-governing, honest technologists that enjoy the flexibility 
of setting their own hourly wages. 

## introduction

wavepay's api is implemented with next.js.  
see the "getting started" section to build and run.  

## getting started
this getting-started guide assumes you have the following installed: 

- node v18, 
- python 3 
- pip 3

node is required for running the api and python is required for testing. 


1. install node dependencies: 

    `> npm install`

2. build and run api:

   `> prisma migrate dev`

   `> npm run dev`

3. install python dependencies: 

    `> pip install -r requirements.txt`

4. install python environment: 

    `> python -m venv .venv`

5. run e2e tests (ensure api is running): 

    `> . ./.venv/bin/activate`
    `> python -m pytest`

this runtime publishes an api at

    `http://localhost:3000/api`

## api endpoints: dev, prod:  

 - http://localhost:3000/api/csv
 
    supports POST of time-report csv files.


 - http://localhost:3000/api/report/all

    supports GET of all payroll data, as json.

## api endpoints: dev:  
    
 - http://localhost:3000/api/reseed
 
    supports POST in development, to reset database for test purposes.
