# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn predeploy`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn predeploy` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Portfolio Chatbot Feature

This portfolio includes an AI-powered chatbot that can answer questions about Jimmy Wen's professional experience, technical skills, projects, and education.

### Features

- **Browser-side AI**: Runs entirely in the visitor's browser using WebGPU when available
- **Privacy-first**: No data is sent to external servers
- **Grounded responses**: Only answers based on the supplied knowledge base (resume content)
- **Source citations**: Responses include citations to knowledge base documents when practical
- **Offline capable**: Works after initial load without internet connection

### How to Use

1. Click the chatbot icon in the bottom-right corner of the screen
2. Ask questions about Jimmy's professional experience, skills, projects, or education
3. The chatbot will provide grounded answers with source citations when appropriate
4. For unsupported questions, the chatbot will indicate that the information is not available in the portfolio

### Example Questions

- "What technologies does Jimmy use?"
- "What did Jimmy build at Madhive?"
- "How much did Jimmy improve export latency?"
- "What testing experience does Jimmy have?"
- "Has Jimmy worked with Go?"

### Implementation Status

The chatbot feature is currently in **Increment 7: Performance Optimization & Deployment**. All core functionality is implemented and tested, including:

- Knowledge base structure (Increment 1 - COMPLETED)
- Retrieval system (Increment 2 - COMPLETED)
- Chatbot UI with mocked responses (Increment 3 - COMPLETED)
- Browser LLM integration (Increment 4 - COMPLETED)
- Source citation and evidence tracking (Increment 5 - COMPLETED)
- Comprehensive testing and evaluation framework (Increment 6 - COMPLETED)
- Performance optimization and deployment preparation (Increment 7 - IN PROGRESS)

All tests pass: 91 tests passing across test suites.
