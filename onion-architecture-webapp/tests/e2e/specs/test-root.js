/**
 * Wraps necessary operations of "nightwatch".
 * I mapped it with Json's spec definition.
 *
 * @param {*} browser
 * @param {*} data
 */
function e2e(browser, data) {
  data.specs.forEach(element => {
    console.log("Running command: ", element);
    if (element.command === "url") {
      browser.url(element.types);
    }
    if (element.command === "pause") {
      browser.pause(element.types);
    }
    if (element.command === "waitForElementVisible") {
      browser.waitForElementVisible(element.types, element.option);
    }
    if (element.command === "setValue") {
      browser.setValue(element.types, element.option);
    }
    if (element.command === "click") {
      browser.click(element.types);
    }
    if (element.command === "saveScreenshot") {
      browser.saveScreenshot(element.types);
    }
  });
}

/**
 * Separate "nightwatch" operations as json files.
 * Execute the command by reading the files in the spec directory one by one.
 * Doing too much of the "nightwatch" test can break it.
 * Do not perform detailed checks such as validation in principle and
 * use it as a guideline to test only with basic operations.
 */
const fs = require("fs").promises;
module.exports = {
  "e2e test suite": async function(browser) {
    const basePath = "./tests/e2e/specs/spec/";
    const files = await fs.readdir(basePath, function(err, files) {
      return files;
    });
    for (const index in files) {
      // skip test
      // if ("sample-google.json" === files[index]) continue;

      const runningFile = basePath + files[index];
      console.log("Running spec: ", runningFile);
      const readFileSync = await fs.readFile(runningFile, "utf8");
      const spec = JSON.parse(readFileSync);
      e2e(browser, spec);
    }
    browser.end();
  }
};
