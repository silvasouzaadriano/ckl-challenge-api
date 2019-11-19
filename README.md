<h1 align="center">
    Cheesecake Labs challenges
</h1>

<h4>
  The applicant must develop the responsive front-end of a news website according to the mockups and specs provided. The news content should come from a back-end REST API,also developed by the applicant. We encourage the applicant to use Linux or Mac for the challenge.
</h4>


  <h4>Requirements</h4>
  
1. All development should be done in a secondary (non-master) branch
2. The layout should precisely match the provided mockups
3. The website should be front-end rendered, using ReactJS
4. The news content should be provided by a REST API, developed in Python using Django + Django REST Framework (the content can be manually input in the database). <h4>Note that according to agreement with Natalia the API was developed in NodeJs</h4>
5. Both front-end and back-end should be deployed to an online environment
6. Push your code to the provided Github repository and create a Pull Request to the master branch adding "cheesecakelabs-challenges" user as a reviewer.

<h4>Extras</h4>

1. CSS animations and Loading transitions
2. Usage of containers
3. Dynamically loaded news: a background scraping task should periodically retrieve news from an online feed, such as TechCrunch
4. Integration with CI tools

<h4>Evaluation Criteria</h4>

1. Meaningful git commits and Pull Requests
2. System architecture
3. Responsive/fluid layout knowledge
4. CSS architecture principles
5. Organization (folder structure, class naming, etc)
6. Component modularity/reusability
7. Deadline

<h4>Deliverables: you should answer this email with the following links</h4>

1. Link to the live frontend webapp
2. API link


## How To Use

To clone and run this application, you'll need [Docker](https://docs.docker.com/),  [Git](https://git-scm.com), [Node.js v10.16.1](https://nodejs.org/en/) or higher + [Yarn v1.19.1](https://yarnpkg.com/lang/en/) or higher installed on your computer. 

<h4>Note that according to agreement with Natalia Ferreira, the API was developed in NodeJs</h4>

### Install Backend
```bash
# Clone this repository
$ git clone https://github.com/cheesecakelabs-challenges/adriano-souza-fullstack

# Go into the API repository
$ cd adriano-souza-fullstack/backend

# Install dependencies
$ yarn install

# Create Postgree Docker container
$ docker run --name cheesecakelabs_database -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=cheesecakelabs -p 5432:5432 -d postgres

# .env
$ Replace the .env.EXAMPLE to .env

# Run Migrates
$ yarn sequelize db:migrate

# Run Seeds
$ yarn seed

# Run the API
$ yarn dev

```

### Install Frontend
```bash

# Go into the front path
$ cd adriano-souza-fullstack/frontend

# Install dependencies
$ yarn install

# Run the Frontend
$ yarn start
```

### Comments

The seed step will create table content on database cheesecakelabs. Regarding to users table, will be created 50 fake users. In order to login to application you may have to use the e-mail as user name and the password for all records is equal to 123456

---

Made with ♥ by Adriano Souza :wave: [Get in touch!](https://www.linkedin.com/in/adriano-souza-9b1a1b11)


