import { getBuildSummary, appendTestResults } from './summary'
import { BuildSummary, TestsByBuild } from './types'
import * as builds from './__fixtures__/builds.json'

describe('summary', () => {
  describe('getBuildSummary', () => {
    it('should return an aggregated view of failed builds', () => {
      // arrange
      const buildSummary: BuildSummary = {
        count: 3,
        workflows: {
          'build-test-deploy': {
            count: 3,
            jobs: {
              'test-e2e': {
                count: 2,
                buildsId: [100, 101],
                tests: {}
              },
              'test-unit': {
                count: 1,
                buildsId: [103],
                tests: {}
              }
            }
          }
        }
      }

      // act
      const result = getBuildSummary(builds)

      // assert
      expect(result).toMatchObject(buildSummary)
    })
  })

  describe('appendTestResults', () => {
    it('should append test results to build summary', () => {
      // arrange
      const buildSummary: BuildSummary = {
        count: 3,
        workflows: {
          'build-test-deploy': {
            count: 3,
            jobs: {
              'test-e2e': {
                count: 2,
                buildsId: [100, 101],
                tests: {}
              },
              'test-unit': {
                count: 1,
                buildsId: [103],
                tests: {}
              }
            }
          }
        }
      }

      const testsByBuild : TestsByBuild = {
        100: [
          {
            name: 'Customer create customer',
            file: '/tests/e2e/customer.js',
            result: 'failure'
          },
          {
            name: 'Customer update customer',
            file: '/tests/e2e/customer.js',
            result: 'failure'
          }
        ],
        101: [
          {
            name: 'Customer create customer',
            file: '/tests/e2e/customer.js',
            result: 'failure'
          },
          {
            name: 'Company delete company',
            file: '/tests/e2e/company.js',
            result: 'success'
          }
        ],
        103: [
          {
            name: 'Company create company',
            file: '/tests/unit/company.js',
            result: 'failure'
          },
          {
            name: 'Company delete company',
            file: '/tests/unit/company.js',
            result: 'success'
          }
        ]
      }

      const expected : BuildSummary = {
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
      
      // act
      const result = appendTestResults(buildSummary, testsByBuild)

      // assert
      expect(result).toMatchObject(expected)
    })
  })
})
