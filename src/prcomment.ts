import octokit from './octokit'
import * as core from '@actions/core'
import {context} from '@actions/github'
import {CommittersDetails} from './interface'

async function getComment() {
  try {
    const response = await octokit.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number
    })

    return response.data.find(comment =>
      comment.body.match(/.*Greet Contributors Bot.*/)
    )
  } catch (e) {
    core.setFailed(
      'Error occured when getting  all the comments of the pull request: ' +
        e.message
    )
  }
}

function commentContent(committers: CommittersDetails[]) {
  let contributorsCount = 1
  contributorsCount = committers.length
  let is = contributorsCount > 1 ? 'are' : 'is'
  let contributor = contributorsCount > 1 ? 'contributors' : 'contributor'
  let content = `**Greet Contributors Bot** <br/>Thank you for your contribution and  we truly value it. <br/> <br/>`
  let content2 = ` There ${is} **${contributorsCount}** ${contributor} in this pull request `
  content += content2

  committers.forEach(committer => {
    content += `<br/>:tada: @${committer.name}`
  })
  return content
}
export default async function prComment(committers: CommittersDetails[]) {
  const prComment = await getComment()
  if (!prComment) {
    await octokit.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      body: commentContent(committers)
    })
  }
}
