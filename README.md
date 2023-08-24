# my-stock-ai-frontend

Frontend is deployed at production link - https://my-stock-ai-frontend.vercel.app/

### Testing:
- Cypress tests are ran by - npx cypress run or npx cypress open
- Run unit tests by npm run test 

### Building and Running:
- To run this project run - npm run start
- To build this project for production run - npm run build

### CI/CD
- Analysis pipeline run on PR's will test all the code, then use SonarQube to analyze the code
- I use vercel to deploy environments for all PRs and then promote when they are merged