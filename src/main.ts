import * as core from '@actions/core'
import {context} from '@actions/github'
import {GitHub} from '@actions/github'
import octokit from './octokit'

import {CommittersDetails} from './interface'
import getCommitters from './graphql'
import prComment from './prcomment'

async function run() {
  try {
    console.log(`the action is started`)
    const committers = (await getCommitters()) as CommittersDetails[]
    await prComment(committers)
    
  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
