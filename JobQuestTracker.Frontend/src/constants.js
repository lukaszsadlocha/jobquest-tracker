// Constants.js
const prod = {
    url: {
        API_URL: 'https://api.jobquesttracker.azurewebsites.net',
    }
};
const dev = {
    url: {
        API_URL: 'https://localhost:7103'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev: prod;