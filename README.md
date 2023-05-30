# Noticed

## Description

The goal of Noticed is to create an online hub for users within a local area to be able to communicate and gather. Noticed is a web-based progam designed to connect job seekers with job opportunities in local areas. Through a sleek UI (user interface) users are able to post jobs, which they may later view, edit or remove as needed. Job seekers are able to search through a list of jobs, or they may search by job category to narrow down their search results.

To help ensure user security and privacy, users must be signed in to perform many functions, such as posting or viewing jobs. If you are signed out, when you click on any page you don't have access to you we be redirected to the login page.

Noticed is still in the early stages of development but it has the potential to become the online community hub for the residents of any town it is implemented in. Noticed is designed and created for smaller communities, it strives to be a virtual replacement of the town noticeboard. This way local people will be helping you with your jobs, having an impact on the area which they live and breath, working with and for the people nearest to them. With no unnecassary commutes all over town.

screenshot:
![Screenshot (32)](https://github.com/Travisnicholson90/job-board/assets/123338043/3db499ce-8848-4051-8b96-3125a9599c92)

URL: https://noticed-job-board.herokuapp.com/

## License

[![License: MIT License](https://img.shields.io/badge/MIT-License-blue.svg)](https://opensource.org/licenses/MITLicense)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Installation

To install and run Noticed, follow these steps:

1. Ensure you have Node.js installed on your system. You can download it from https://nodejs.org.

2. Clone this repository to your local machine using the following command:
git clone https://github.com/Travisnicholson90/job-board 

3. Navigate to the project directory:
cd job-board

4. Install the required dependencies using npm:
npm install

## Usage

To get Noticed up and running, you must follow these steps:
1. The depoendencies must be installed, use this command to do so "npm install bcrypt connect-session-sequelize dayjs dotenv express express-handlebars express-session handlebars mysql2 node-cron nodemon path sequelize"
2. Next, sign into your mysql account in the CLI (command line interfafce), use the command "mysql -u root -p" and enter your password when prompted.
3. Create the job_board_db database with the command "source ./schema.sql".
4. Now quit mysql with the "quit" command.
5. Now you must seed your database, use this command "node seeds/seed.js"
6. Last thing is to get the website up and running with the command "node server.js"

Just proceed to the website (at http://localhost:3001) and enjoy Noticed!

Please note that these instructions assume you have already set up MySQL and have a MySQL account. Adjust the commands accordingly if needed.

## Contributing

To contribute to the future progess of Noticed and the future development of <town name>'s online community. We can start with some of the following:
1. Create webpages for each individual job, for users to read a more in-depth description and details of the job.
2. To provide a means for users to communicate together, e.g. comments, private messages.
3. To enable secure payments and to ensure user's get paid as they should.
4. To create an announcements & events page for the locals of <town name> to promote and discuss local events.
5. To create user pages, where they can put up details of themselves, profile pictures, include their resume's and cover letters.

## License

This project is licensed under the MIT License.

## Questions

For questions or concerns, please contact the developers via github or email: Travisnicholson90 at nicholson_travis@hotmail.com, voi-jankowski at wojtek.wacek.dola@gmail.com, TScarl at tscarlett@live.com.au or Corzah97 at corzah97.dev@gmail.com
