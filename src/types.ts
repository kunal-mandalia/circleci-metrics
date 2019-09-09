// circleci types
export type Workflows = {
  job_name: string,
  workflow_name: string,
}

export type Build = {
  failed: boolean,
  workflows: Workflows,
  build_num: number,
  has_artifacts: boolean,
}

export type Test = {
  name: string,
  file: string,
  result: 'success' | 'failure',
}

export type BuildTests = {
  tests: Test[],
  exceptions: null | Array<string>
}

// summarise aggregated data
export type BuildSummary = {
  count: number,
  workflows: Workflow
}

type Workflow = {
  [workflow_name: string]: {
    count: number,
    jobs: Job
  }
}

type Job = {
  [job_name: string]: {
    count: number,
    buildsId: number[],
    failedTests?: {
      count: number,
      tests: FailedTests
    }
  }
}

type FailedTests = {
  [test_name: string]: {
    count: number,
    filename: string
  }
}
