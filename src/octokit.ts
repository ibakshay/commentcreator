import { GitHub } from '@actions/github'
import { App } from "@octokit/app"
import * as core from '@actions/core'
const pat = core.getInput('pat')
const octokit = new GitHub(pat as string)
//const octokit = new GitHub(process.env.GITHUB_TOKEN as string)

export default octokit