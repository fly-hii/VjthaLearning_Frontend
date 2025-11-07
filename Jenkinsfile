pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')       // Jenkins credentials ID for DockerHub
        DOCKERHUB_USERNAME = 'flyhii'
        IMAGE_NAME = 'vjthalearning_frontend'
        EC2_HOST = 'ubuntu@54.83.174.18'                         // ✅ EC2 public IP
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "📥 Checking out source code..."
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

                // Use Jenkins SSH credentials (ID = ec2-ssh-key)
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ${EC2_HOST} "
                        echo '✅ Connected to EC2 instance';
                        sudo docker pull ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest;
                        sudo docker stop ${IMAGE_NAME} || true;
                        sudo docker rm ${IMAGE_NAME} || true;
                        sudo docker run -d -p 8081:8081 --name ${IMAGE_NAME} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest;
                        sudo docker image prune -f;
                        echo '✅ Deployment Completed Successfully';
                    "
                    '''
                }
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
