pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1" // Change if needed
        ECR_REPO = "177215708215.dkr.ecr.us-east-1.amazonaws.com/my-app" // Replace with your ECR repo
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        SERVICE_NAME = "my-app-service" // ECS service name
        CLUSTER_NAME = "my-app-clusterservice" // ECS cluster name
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-pat', // The GitHub PAT credentials ID you added in Jenkins
                    url: 'https://github.com/fly-hii/VjthaLearning_Frontend.git'
            }
        }

        stage('Login to ECR') {
            steps {
                script {
                    sh """
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t $ECR_REPO:$IMAGE_TAG .
                """
            }
        }

        stage('Push to ECR') {
            steps {
                sh """
                docker push $ECR_REPO:$IMAGE_TAG
                """
            }
        }

        stage('Deploy to ECS') {
            steps {
                sh """
                aws ecs update-service \
                    --cluster $CLUSTER_NAME \
                    --service $SERVICE_NAME \
                    --force-new-deployment \
                    --region $AWS_REGION
                """
            }
        }
    }
}
