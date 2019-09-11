import axios, { AxiosResponse } from 'axios'
import { config } from '../config'
import { Build, BuildTests, TestsByBuild } from '../types'

export function buildProjectEndpoint() {
  const username = config.get('USERNAME')
  const project = config.get('PROJECT')
  const circleToken = config.get('CIRCLECI_TOKEN')
  const limit = config.get('LIMIT')
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

async function buildRequestForTestResults(build: number): Promise<AxiosResponse<BuildTests>> {
  const testResultsEndpoint = buildTestResultsEndpoint(build)
  return axios.get(testResultsEndpoint)
}

export async function getFailedTests(builds: Build[]): Promise<TestsByBuild> {
  const buildsId = builds
    .filter(build => build.has_artifacts === true)
    .map(build => build.build_num)

  const requests = buildsId
    .map(buildId => buildRequestForTestResults(buildId))

  const testResults = await Promise.all(requests)
  return testResults.reduce((testsByBuild, result, index) => {
    if (result.data.exceptions !== null) {
      testsByBuild[buildsId[index]] = result.data.tests
    }
    return testsByBuild
  }, {})
}