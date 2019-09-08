import axios from 'axios'
import { config } from '../config'
import { Build } from '../types'

export function buildProjectEndpoint() {
  const username = config.get('USERNAME')
  const project = config.get('PROJECT')
  const circleToken = config.get('CIRCLECI_TOKEN')
  const limit = 50
  const buildStatus = 'failed'

  return `https://circleci.com/api/v1.1/project/github/${username}/${project}?circle-token=${circleToken}&limit=${limit}&offset=0&filter=${buildStatus}`
}

export function buildTestResultsEndpoint(build: number) {
  const username = config.get('USERNAME')
  const project = config.get('PROJECT')
  const circleToken = config.get('CIRCLECI_TOKEN')

  return `https://circleci.com/api/v1.1/project/github/${username}/${project}/${build}/tests?circle-token=${circleToken}`
}

export async function getFailedProjectBuilds(): Promise<Build[]> {
  const projectBuildsEndpoint = buildProjectEndpoint()
  const response = await axios.get(projectBuildsEndpoint)
  return response.data
}

export async function getTestResultsForBuild(build: number) {
  const testResultsEndpoint = buildTestResultsEndpoint(build)
  const response = await axios.get(testResultsEndpoint)
  return response.data
}