// migrations/2_deploy.js
const PropHub = artifacts.require('PropHub');

module.exports = async function (deployer) {
  await deployer.deploy(PropHub);
};