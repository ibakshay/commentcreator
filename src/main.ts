import * as core from '@actions/core'
import { context } from '@actions/github'
import { GitHub } from '@actions/github'
import { setInstallationAccessToken } from './getInstallationToken'
//import octokit from './octokit'
import { CommittersDetails } from './interface'
import getCommitters from './graphql'
import prComment from './prcomment'
import { App } from "@octokit/app"
let installationAccessToken
async function run() {
  try {
    installationAccessToken = await setInstallationAccessToken()

    console.log(`InstallationAccessToken in main is ${installationAccessToken}`)
    const octokit = new GitHub(installationAccessToken as string)
    await octokit.issues.create({
      owner: context.repo.owner,
      repo: context.repo.repo,
      title: "first issue from octokit cla lite bot",
      body: "wohooooooooooooooooo it is working"
    })

    const committers = (await getCommitters(octokit)) as CommittersDetails[]
    await prComment(committers, octokit)

  } catch (error) {
    core.setFailed("error during fetching installation id" + error.message)
  }
}
run()
export { installationAccessToken }