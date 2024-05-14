const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results", //dir location shouldn't be on the root location of the project 
  reportPath: "./",
  reportName:"Playwright Automation Report",
  pageTitle: "BookCart App Test Report-Ashfaq",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "124",
    },
    device: "Ashfaq",
    platform: {
      name: "ubuntu",
      version: "22.04",
    },
    // device: "ashfaq_PC",
    // platform: {
    //   name: "Windows",
    //   version: "10",
    // },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Book Cart Application" },
      { label: "Release", value: "1.2.3" },
    //   { label: "Cycle", value: "B11221.34321" },
    //   { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
    //   { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});