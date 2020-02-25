import * as core from '@actions/core'
import { context } from '@actions/github'
import { GitHub } from '@actions/github'
import octokit from './octokit'
import { App } from "@octokit/app"
import { CommittersDetails } from './interface'
import getCommitters from './graphql'
import prComment from './prcomment'

async function run() {
  try {
    const PRIVATE_KEY = core.getInput('private_key')
    const APP_ID = 55339
    const app = new App({ id: APP_ID, privateKey: PRIVATE_KEY })
    const jwt = app.getSignedJsonWebToken();
    console.log(`The JSON web token is ${jwt}`)
    const committers = (await getCommitters()) as CommittersDetails[]
    await prComment(committers)

  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
