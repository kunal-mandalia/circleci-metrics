import axios from 'axios'
import config from './config/config'
import {
  Metric,
  MetricsSummary
} from './types'

function buildQueryEndpoint() {
  const username = config.get('USERNAME')
  const project = config.get('PROJECT')
  const circleToken = config.get('CIRCLECI_TOKEN')
  const limit = 50
  const buildStatus = 'failed'

  return `https://circleci.com/api/v1.1/project/github/${username}/${project}?circle-token=${circleToken}&limit=${limit}&offset=0&filter=${buildStatus}`
}

async function getMetrics() {
  const endpoint = buildQueryEndpoint()
  const response = await axios.get(endpoint)
  return response
}

function aggregateMetrics<T extends Metric[]>(metrics: T): MetricsSummary {
  return metrics.reduce((acc, cur) => {
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

function outputSummary(summary: MetricsSummary) {
  console.info('')
  console.info('Summary of failed builds by Workflow, Job, Reason:')
  console.info(JSON.stringify(summary, null, 4))
  console.info('')
}

async function main() {
  try {
    const metrics = await getMetrics()
    const summary = aggregateMetrics(metrics.data)
    outputSummary(summary)
  } catch (error) {
    console.error(error)
  }
}

main()
