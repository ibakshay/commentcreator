"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
const io = require('@actions/io');
const octokit_1 = __importDefault(require("./octokit"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("action  started  ");
            const message = core.getInput('message');
            yield octokit_1.default.issues.createComment({
                owner: github_1.context.repo.owner,
                repo: github_1.context.repo.repo,
                issue_number: github_1.context.issue.number,
                body: message
            });
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
