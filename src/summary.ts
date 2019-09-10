import {
  Build,
  BuildSummary,
  TestsByBuild,
  Test
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
          buildsId: [build_num],
          tests: {}
        }
      }
    } else {
      buildSummary.workflows[workflow_name] = {
        count: 1,
        jobs: {
          [job_name]: {
            count: 1,
            buildsId: [build_num],
            tests: {}
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

export function appendTestResults<T extends BuildSummary, U extends TestsByBuild>(buildSummary: T, testsByBuild: U): BuildSummary {
  const bs = Object.assign({}, buildSummary)
    Object.keys(testsByBuild).forEach(buildId => {
      Object.keys(bs.workflows).forEach(workflow => {
        Object.keys(bs.workflows[workflow].jobs).forEach(job => {
          if (bs.workflows[workflow].jobs[job].buildsId.includes(Number(buildId))) {
            (testsByBuild[buildId] as Test[]).forEach(test => {
              if (bs.workflows[workflow].jobs[job].tests[test.name]) {
                bs.workflows[workflow].jobs[job].tests[test.name].count++
              } else {
                bs.workflows[workflow].jobs[job].tests[test.name] = {
                  count: 1,
                  file: test.file
                }
              }
            })
          }
        })
      })
  })

  return bs;
}
