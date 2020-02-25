import { GitHub } from '@actions/github'
import * as core from '@actions/core'
import { context } from '@actions/github'
const pat = core.getInput('pat')
import { App } from "@octokit/app"
const { request } = require("@octokit/request");


export async function setInstallationAccessToken() {
    const PRIVATE_KEY = core.getInput('private_key')
    const APP_ID = 55339
    const app = new App({ id: APP_ID, privateKey: PRIVATE_KEY })
    const jwt = app.getSignedJsonWebToken();
    console.log(`The JSON web token is ${jwt}`)
    const { data } = await request("GET /repos/:owner/:repo/installation", {
        owner: context.issue.owner,
        repo: context.issue.repo,
        headers: {
            authorization: `Bearer ${jwt}`,
            accept: "application/vnd.github.machine-man-preview+json"
        }
    });
    const installationId = data.id;
    console.log(`Installation id for ${context.issue.repo} repo and owner ${context.issue.owner} is ${installationId}`)
    const installationAccessToken = await app.getInstallationAccessToken({
        installationId
    });
    console.log(`Installation Access  token for ${context.issue.repo} repo and owner ${context.issue.owner} is ${installationAccessToken}`)
    return installationAccessToken
}
//octokit = new GitHub(installationAccessToken as string)

const octokit = new GitHub(process.env.GITHUB_TOKEN as string)

export default octokit