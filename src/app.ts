import { getFailedProjectBuilds } from './services/circleci'
import { getBuildSummary, outputSummary } from './summary'

async function main() {
  try {
    const failedBuilds = await getFailedProjectBuilds()
    const summary = getBuildSummary(failedBuilds)
    outputSummary(summary)
  } catch (error) {
    console.error(error)
  }
}

main()
