pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // ID you used in Jenkins
        IMAGE_NAME = "flyhii/vjthalearning_frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/fly-hii/VjthaLearning_Frontend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $IMAGE_NAME:latest .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    sh 'docker push $IMAGE_NAME:latest'
                }
            }
        }
    }

    post {
        success {
            echo "✅ Successfully built and pushed image to Docker Hub!"
        }
        failure {
            echo "❌ Build or push failed."
        }
    }
}
