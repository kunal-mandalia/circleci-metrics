export type Workflows = {
  job_name: string,
  workflow_name: string,
}

export type Build = {
  fail_reason: null | string,
  workflows: Workflows
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