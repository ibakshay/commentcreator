import * as core from '@actions/core'
import { context } from '@actions/github'
const io = require('@actions/io')
import { GitHub } from '@actions/github'
import octokit from './octokit'




async function run() {
  try {
core.setFailed("testing the commit from action functionality")

  } catch (error) {
    core.setFailed(error.message)
  }

}
run()
