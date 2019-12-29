import * as core from '@actions/core'
import {context} from '@actions/github'
import {GitHub} from '@actions/github'
import octokit from './octokit'

import {CommittersDetails} from './interface'
import getCommitters from './graphql'

async function run() {
  try {
    const committers = (await getCommitters()) as CommittersDetails[]
    console.log(committers)
  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
