"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
const octokit_1 = require("./octokit");
const octokit_2 = __importDefault(require("./octokit"));
const graphql_1 = __importDefault(require("./graphql"));
const prcomment_1 = __importDefault(require("./prcomment"));
const { request } = require("@octokit/request");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield octokit_1.setInstallationAccessToken();
            // const PRIVATE_KEY = core.getInput('private_key')
            // const APP_ID = 55339
            // const app = new App({ id: APP_ID, privateKey: PRIVATE_KEY })
            // const jwt = app.getSignedJsonWebToken();
            // console.log(`The JSON web token is ${jwt}`)
            // const { data } = await request("GET /repos/:owner/:repo/installation", {
            //   owner: context.issue.owner,
            //   repo: context.issue.repo,
            //   headers: {
            //     authorization: `Bearer ${jwt}`,
            //     accept: "application/vnd.github.machine-man-preview+json"
            //   }
            // });
            // const installationId = data.id;
            // console.log(`Installation id for ${context.issue.repo} repo and owner ${context.issue.owner} is ${installationId}`)
            // const installationAccessToken = await app.getInstallationAccessToken({
            //   installationId
            // });
            // console.log(`Installation Access  token for ${context.issue.repo} repo and owner ${context.issue.owner} is ${installationAccessToken}`)
            yield octokit_2.default.issues.create({
                owner: github_1.context.repo.owner,
                repo: github_1.context.repo.repo,
                title: "first issue from octokit cla lite bot",
                body: "wohooooooooooooooooo it is working"
            });
            const committers = (yield graphql_1.default());
            yield prcomment_1.default(committers);
        }
        catch (error) {
            core.setFailed("error during fetching installation id" + error.message);
        }
    });
}
run();
