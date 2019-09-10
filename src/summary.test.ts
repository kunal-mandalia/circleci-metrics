import { getBuildSummary, appendTestResults } from './summary'
import { BuildSummary, TestsByBuild } from './types'
import * as builds from './__fixtures__/builds.json'
// import tests from './__fixtures__/tests.json'

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
                buildsId: [100, 101]
              },
              'test-unit': {
                count: 1,
                buildsId: [103]
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
            name: 'Company create company',
            file: '/tests/e2e/company.js',
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
      
      // act

      // assert

    })
  })
})
