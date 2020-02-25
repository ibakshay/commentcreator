"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("@actions/github");
const main_1 = require("./main");
function test() {
    console.log("installation token in octokit file is " + main_1.installationAccessToken);
}
exports.test = test;
//octokit = new GitHub(installationAccessToken as string)
const octokit = new github_1.GitHub(main_1.installationAccessToken);
exports.octokit = octokit;
