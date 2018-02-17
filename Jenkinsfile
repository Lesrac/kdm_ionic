node {
	def app
	
  environment {
    MAIN_BRANCH = 'master'
    BUILD_NAME = 'kdmf'
  }
		stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */
        checkout scm
    }
    stage('build') {
      app = docker.build("kdmf")
    }
	
    stage('test') {
      steps {
        script {
          // run the command to run tests with the sh command
          sh 'npm run test-coverage'
        }
      }
      post {
        always {
          script {
            // if the testing command creates a test report, parse it with the junit command
            junit 'coverage/Icov.info'
          }
        }
      }
    }
    // Example used: https://github.com/JFrogDev/project-examples/blob/master/jenkins-pipeline-examples/declarative-example/Jenkinsfile
  post {
    always {
      deleteDir()
    }
  }
}