# CircleCi-Metrics [![CircleCI](https://circleci.com/gh/kunal-mandalia/circleci-metrics.svg?style=svg)](https://circleci.com/gh/kunal-mandalia/circleci-metrics)
What are the top causes of your build failing? Which tests commonly fail in CI? Let's answer those questions


## Get started

* `git clone https://github.com/kunal-mandalia/circleci-metrics.git`
* `cd circleci-metrics`
* `npm install`
* specify environment variables in `/src/config/development.json`
* `yarn dev` to get your build metrics, the summary of failed builds by Workflows, Jobs, Tests:

```JavaScript
{
  count: 3,
  workflows: {
    'build-test-deploy': {
      count: 3,
      jobs: {
        'test-e2e': {
          count: 2,
          buildsId: [100, 101],
          tests: {
            'Customer create customer': {
              count: 2,
              file: '/tests/e2e/customer.js'
            },
            'Customer update customer': {
              count: 1,
              file: '/tests/e2e/customer.js'
            }
          }
        },
        'test-unit': {
          count: 1,
          buildsId: [103],
          tests: {
            'Company create company': {
              count: 1,
              file: '/tests/unit/company.js'
            }
          }
        }
      }
    }
  }
}
```

## Environment variables

```JSON
{
  "USERNAME": "<USERNAME>", // e.g. your github account username
  "PROJECT": "<PROJECT>", // e.g. your github repo name
  "CIRCLECI_TOKEN": "<CIRCLECI_TOKEN>", // obtained from CircleCI
  "LIMIT": 20 // number of failed builds to analyse. Maximum of 100
}
```

## Run tests
* `npm run test`
