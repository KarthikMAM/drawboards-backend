const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('package', shell.task([
  'aws cloudformation',
  'package',
  '--template-file cloud.yml',
  '--s3-bucket karthik-lambda-repo',
  '--output-template ./cloud.dist.yml'
].join(' ')))

gulp.task('deploy', shell.task([
  'aws cloudformation',
  'deploy',
  '--template-file ./cloud.dist.yml',
  `--stack-name drawboards-${process.env.STAGE}`,
  `--parameter-overrides Stage=${process.env.STAGE}`,
  '--capabilities CAPABILITY_NAMED_IAM',
  '--no-fail-on-empty-changeset',
  `--region ${process.env.AWS_REGION}`
].join(' ')))

gulp.task('delete', shell.task([
  'aws cloudformation',
  'delete-stack',
  `--stack-name drawboards-${process.env.STAGE}`,
  `--region ${process.env.AWS_REGION}`
]))