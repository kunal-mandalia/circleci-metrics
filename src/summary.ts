import {
  Build,
  BuildSummary
} from './types'

export function getBuildSummary<T extends Build[]>(builds: T): BuildSummary {
  return builds.reduce((acc, cur) => {
    const { workflow_name, job_name } = cur.workflows
    const { fail_reason } = cur
    if (acc[workflow_name]) {
      if (acc[workflow_name][job_name]) {
        acc[workflow_name][job_name][fail_reason] = acc[workflow_name][job_name][fail_reason] + 1
      } else {
        acc[workflow_name][job_name] = { [fail_reason]: 1 }
      }
    } else {
      acc[workflow_name] = {
        [job_name]: {
          [fail_reason]: 1
        }
      }
    }
    return acc
  }, {})
}

export function outputSummary(summary: BuildSummary) {
  console.info('')
  console.info('Summary of failed builds by Workflow, Job, Reason:')
  console.info(JSON.stringify(summary, null, 4))
  console.info('')
}
