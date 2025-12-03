## osu!mania Tournament Hub

#### Description:

This is a RESTful web application for organizing and conducting tournaments in the rhythm game osu!mania. It was created for my Bachelor's thesis (https://digikogu.taltech.ee/et/Item/073223ba-ec07-410c-b722-1001fc4438dd).

The project was intended to simplify the process of creating and managing tournaments in osu!, which has historically been very complicated.
It's main features include creating new tournaments, managing stages and mappools, registering players, teams and staff members, scheduling and conducting matches, displaying tournament statistics etc.

User authentication is handled via OAuth2, utilizing the osu! API (https://osu.ppy.sh/docs/index.html).

The project was developed between late 2023 and late 2024.

#### Used Technologies:

The backend was built using Java and Spring Boot, utilizing Spring Security, Hibernate, PostgreSQL, Gradle, Flyway etc.

The frontend was built using TypeScript and React, utilizing Material UI, React Router, Axios, Formik etc.

## Status
Not in active development. User authentication is longer functional as of December 2025 due to the loss of my osu! account.

## Screenshots

<img width="1903" height="1390" alt="homepage" src="https://github.com/user-attachments/assets/ebcfc7fe-7e8d-4ca4-8625-c2c3202bab8b" />
&nbsp;
<img width="1903" height="1529" alt="mappools" src="https://github.com/user-attachments/assets/c7dff957-bafc-478c-92bc-4579ed191032" />
&nbsp;
<img width="1903" height="1481" alt="schedule" src="https://github.com/user-attachments/assets/84092555-2c5b-49aa-b8e4-041eb76335e6" />
&nbsp;
<img width="1920" height="1195" alt="refsheet" src="https://github.com/user-attachments/assets/5b4f944f-45ee-40e0-8540-308b37f447c3" />

## Setup Instructions

#### Prerequisites:

Java 21, Node.js with npm, Docker Desktop, an IDE.

#### Backend:

1. Clone this repository.

2. Open the backend folder in IntelliJ Idea or another IDE.

3. Build the backend project:

```
.\gradlew build
```

4. Before running the application, setup the database:

```
docker-compose up 
```

5. Run the backend application.

#### Frontend:  

1. Open the tourneyhub folder in VSC or another IDE.

2. Install dependencies:

```
npm install
```

3. Start the application:

```
npm run start
```

4. To visit the application:

```
http://localhost:3000
```

Both the frontend and backend have to be running at the same time!
