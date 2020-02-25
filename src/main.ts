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
      owner: "hiimbex",
      repo: "testing-things",
      headers: {
        authorization: `Bearer ${jwt}`,
        accept: "application/vnd.github.machine-man-preview+json"
      }
    });
    const installationId = data.id;
    console.log(`Installation id is ${installationId}`)
    const committers = (await getCommitters()) as CommittersDetails[]
    await prComment(committers)

  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
