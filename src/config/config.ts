import { join } from "path";
import * as convict from 'convict'

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  'USERNAME': {
    doc: 'CircleCI username',
    format: String,
    default: null,
    env: 'USERNAME'
  },
  'PROJECT': {
    doc: 'CircleCI project',
    format: String,
    default: null,
    env: 'PROJECT'
  },
  'CIRCLECI_TOKEN': {
    doc: 'CircleCI API key / token',
    format: String,
    default: null,
    env: 'CIRCLECI_TOKEN',
    sensitive: true
  }
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(join(__dirname, `${env}.json`));

// Perform validation
config.validate({allowed: 'strict'});

export default config;