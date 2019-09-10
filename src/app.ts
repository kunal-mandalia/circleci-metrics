import { getFailedProjectBuilds, getFailedTests } from './services/circleci'
import { getBuildSummary, appendTestResults, outputSummary } from './summary'

async function main() {
  try {
    const failedBuilds = await getFailedProjectBuilds()
    
    const failedTests = await getFailedTests(failedBuilds)
    console.info(failedTests)

    const buildSummary = getBuildSummary(failedBuilds)
    const buildSummaryWithTestResults = appendTestResults(buildSummary, failedTests)

    outputSummary(buildSummaryWithTestResults)
  } catch (error) {
    console.error(error)
  }
}

main()
