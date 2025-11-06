pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')   // Jenkins credentials ID
        DOCKERHUB_USERNAME = 'flyhii'
        IMAGE_NAME = 'vjthalearning_frontend'
        EC2_HOST = 'ubuntu@13.233.109.77'                // 👉 Replace with actual EC2 public IP
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/fly-hii/VjthaLearning_Frontend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🧱 Building Docker Image..."
                sh '''
                docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo "🔐 Logging into Docker Hub..."
                sh '''
                echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin
                '''
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                echo "📤 Pushing image to Docker Hub..."
                sh '''
                docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "🚀 Deploying on EC2..."
                sh '''
                ssh -o StrictHostKeyChecking=no ${EC2_HOST} '
                    docker pull ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest &&
                    docker stop ${IMAGE_NAME} || true &&
                    docker rm ${IMAGE_NAME} || true &&
                    docker run -d -p 8080:8080 --name ${IMAGE_NAME} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest
                '
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
