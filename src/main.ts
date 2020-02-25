import * as core from '@actions/core'
import { context } from '@actions/github'
import { GitHub } from '@actions/github'
import octokit from './octokit'
import { CommittersDetails } from './interface'
import getCommitters from './graphql'
import prComment from './prcomment'
import { App } from "@octokit/app"
const { request } = require("@octokit/request");

async function run() {
  try {
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

    const committers = (await getCommitters()) as CommittersDetails[]
    await prComment(committers)

  } catch (error) {
    core.setFailed("error during fetching installation id" + error.message)
  }
}
run()
