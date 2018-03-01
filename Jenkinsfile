pipeline {
	agent { dockerfile true }
  environment {
    MAIN_BRANCH = 'master'
    BUILD_NAME = 'kdmf'
  }
  stages {
		 stage('build') {
      steps {
        script {
					sh 'npm i'
          sh 'npm run build'
        }
      }
    }
    stage('test') {
      steps {
        script {
          // run the command to run tests with the sh command
          sh 'npm run test-coverage-headless'
        }
      }
      post {
        always {
          script {
            // if the testing command creates a test report, parse it with the junit command
            junit '**/test-results.xml'
          }
        }
      }
    }
    // Example used: https://github.com/JFrogDev/project-examples/blob/master/jenkins-pipeline-examples/declarative-example/Jenkinsfile
  }
  post {
    always {
      deleteDir()
    }
  }
}
