const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
    maxWorkers: 3, // Reduce the number of workers to help avoid EMFILE errors
};

module.exports = mergeConfig(getDefaultConfig(__dirname), customConfig);
