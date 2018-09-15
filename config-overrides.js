const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = function override(config, env) {
    console.log("⚡⚡⚡ Overriding default Create React App Configuration! ⚡⚡⚡");
    config = rewireStyledComponents(config, env);
    return config;
};