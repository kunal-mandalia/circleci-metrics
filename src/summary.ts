import {
  Test,
  Build,
  BuildSummary
} from './types'

export function getBuildSummary<T extends Build[]>(builds: T): BuildSummary {

  const summary = builds.reduce((buildSummary, build): BuildSummary => {
    const { build_num, failed } = build
    const { workflow_name, job_name } = build.workflows

    if (failed === false) return buildSummary

    buildSummary.count++

    if (buildSummary.workflows[workflow_name]) {
      if (buildSummary.workflows[workflow_name].jobs[job_name]) {
        buildSummary.workflows[workflow_name].count++
        buildSummary.workflows[workflow_name].jobs[job_name].count++
        buildSummary.workflows[workflow_name].jobs[job_name].buildsId.push(build_num)
      } else {
        buildSummary.workflows[workflow_name].count++
        buildSummary.workflows[workflow_name].jobs[job_name] = {
          count: 1,
          buildsId: [build_num]
        }
      }
    } else {
      buildSummary.workflows[workflow_name] = {
        count: 1,
        jobs: {
          [job_name]: {
            count: 1,
            buildsId: [build_num]
          }
        }
      }
    }
    return buildSummary

  }, { count: 0, workflows: {} })

  return summary
}

export function outputSummary(summary: BuildSummary) {
  console.info('')
  console.info('Summary of failed builds by Workflow, Job, Reason:')
  console.info(JSON.stringify(summary, null, 4))
  console.info('')
}

export function appendTestResults<T extends BuildSummary, U extends Test[]>(buildSummary: T, testResults: U) {

}