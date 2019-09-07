export type Workflows = {
  job_name: string,
  workflow_name: string,
}

export type Metric = {
  fail_reason: null | string,
  workflows: Workflows
}

export type MetricsSummaryReason = {
  [fail_reason: string]: number
}

export type MetricsJobSummary = {
  [job_name: string]: MetricsSummaryReason
}

export type MetricsSummary = {
  [workflow_name: string]: MetricsJobSummary
}