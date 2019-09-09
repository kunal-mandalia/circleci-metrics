export type Workflows = {
  job_name: string,
  workflow_name: string,
}

export type Build = {
  fail_reason: null | string,
  workflows: Workflows,
  build_num: number,
  has_artifacts: boolean,
}

export type ReasonSummary = {
[fail_reason: string]: number
}

export type JobSummary = {
  [job_name: string]: ReasonSummary
}

export type BuildSummary = {
  [workflow_name: string]: JobSummary
}

type Test = {
  name: string,
  file: string,
  result: 'success' | 'failure',
}

// export type FailedTests = {
//   workflow_name: string,
//   job_name: string,
//   build: number,
//   test_results?: TestResult[]
// }

export type BuildTests = {
  tests: Test[],
  exceptions: null | Array<string>
}
