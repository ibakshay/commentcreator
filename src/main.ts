import * as core from '@actions/core'
import {context} from '@actions/github'
import {GitHub} from '@actions/github'
import octokit from './octokit'

import {CommittersDetails} from './interface'
import getCommitters from './graphql'
import prComment from './prcomment'

async function run() {
  try {
    const committers = (await getCommitters()) as CommittersDetails[]
    await prComment(committers)

    console.log(committers, null, 2)
  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
