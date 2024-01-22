// Constants.js
const prod = {
    url: {
        API_URL: 'https://jobquesttracker-api.azurewebsites.net',
    }
};
const dev = {
    url: {
        API_URL: 'http://localhost:5045'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev: prod;