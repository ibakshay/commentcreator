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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const octokit_1 = __importDefault(require("./octokit"));
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
function getComment() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield octokit_1.default.issues.listComments({
                owner: github_1.context.repo.owner,
                repo: github_1.context.repo.repo,
                issue_number: github_1.context.issue.number
            });
            return response.data.find(comment => comment.body.match(/.*Greet Contributors Bot.*/));
        }
        catch (e) {
            core.setFailed('Error occured when getting  all the comments of the pull request: ' +
                e.message);
        }
    });
}
function commentContent(committers) {
    const dynmanicContent = core.getInput('content');
    let contributorsCount = 1;
    contributorsCount = committers.length;
    let is = contributorsCount > 1 ? 'are' : 'is';
    let contributor = contributorsCount > 1 ? 'contributors' : 'contributor';
    let content = `**Greet Contributors Bot** <br/>  ${dynmanicContent} <br/> <br/> `;
    if (contributorsCount == 1) {
        committers.forEach(committer => {
            content += `The amazing ${contributor} in this pull request is @${committer.name}`;
        });
        return content;
    }
    let content2 = `The **${contributorsCount}** amazing ${contributor} in this pull request ${is} `;
    content += content2;
    committers.forEach(committer => {
        content += `<br/>:point_right: @${committer.name}`;
    });
    return content;
}
function prComment(committers) {
    return __awaiter(this, void 0, void 0, function* () {
        const prComment = yield getComment();
        if (!prComment) {
            return octokit_1.default.issues.createComment({
                owner: github_1.context.repo.owner,
                repo: github_1.context.repo.repo,
                issue_number: github_1.context.issue.number,
                body: commentContent(committers)
            });
        }
        return octokit_1.default.issues.updateComment({
            owner: github_1.context.repo.owner,
            repo: github_1.context.repo.repo,
            comment_id: prComment.id,
            body: commentContent(committers)
        });
    });
}
exports.default = prComment;
