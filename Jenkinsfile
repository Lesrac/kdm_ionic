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
						publishHTML (target: [
							allowMissing: false,
							alwaysLinkToLastBuild: false,
							keepAll: true,
							reportDir: 'coverage',
							reportFiles: 'index.html',
							reportName: "Coverage Report"
						])
            // if the testing command creates a test report, parse it with the junit command
            junit 'config/coverage/*.xml'
          }
        }
      }
    }
    stage('e2e') {
      steps {
        script {
          // run the command to run tests with the sh command
          sh 'npm run e2e'
        }
      }
      post {
        always {
            // if the testing command creates a test report, parse it with the junit command
            junit 'coverage/e2e/*.xml'
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
