#!/usr/bin/env groovy
def commit_id

pipeline {
  agent any
  parameters {
    choice(
      name: 'DEPLOY_ENV',
      description: 'dev OR prod. Prod will not deploy if branch is not main',
      choices: ['dev', 'prod'],
    )
    string(
      defaultValue: 'dev',
      description: 'Branch to build from',
      name: 'BRANCH'
    )
  }
  // Secrets/Environment Variables to Jenkins Credentials
  environment {
      CONTAINER_NAME            = 'typescript-template-dev'
      TYPESCRIPT_TEMPLATE_PORT  = credentials('TYPESCRIPT_TEMPLATE_PORT')
      API_KEY                   = 'test'
      ADMIN_USERNAME            = 'admin'
      ADMIN_PASSWORD            = 'password'
  }
  stages {
    stage('Preparation') {
      steps {
        checkout scm
        script {
          sh "git rev-parse --short HEAD > .git/commit-id"
          commit_id = readFile('.git/commit-id').trim()
        }
      }
    }
    stage('Docker Build and Publish') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
            def app = docker.build(
              "jamesgiesbrecht/typescript-template:${commit_id}",
              """--target prod \
              -f Dockerfile ."""
            ).push()
          }
          echo "Attempting to deploy branch ${BRANCH} to ${DEPLOY_ENV}"
        }
      }
    }
    // Customize deploy for other environments
    stage('Production Deploy') {
      when {
        allOf {
            environment name: 'BRANCH', value: 'main'
            environment name: 'DEPLOY_ENV', value: 'prod'
        }
      }
      // Conditionally customize environment variables
      environment {
        // TYPESCRIPT_TEMPLATE_PORT = credentials('TYPESCRIPT_TEMPLATE_PORT_PROD')
        CONTAINER_NAME = 'typesript-template-prod'
      }
      steps {
        echo {
          "Production environment variables set"
        }
      }
    }
    stage('Deploy') {
      steps {
        script {
          echo "Deploying ${BRANCH} to ${DEPLOY_ENV}..."

          sh "docker stop ${CONTAINER_NAME} || true"

          sh "docker rm ${CONTAINER_NAME} || true"

          sh """docker run \
                  -d \
                  --name='${CONTAINER_NAME}' \
                  --net='bridge' \
                  -e API_KEY'='${API_KEY}' \
                  -e ADMIN_USERNAME'='${ADMIN_USERNAME}' \
                  -e ADMIN_PASSWORD'='${ADMIN_PASSWORD}' \
                  -p '${TYPESCRIPT_TEMPLATE_PORT}:3000' \
                  'jamesgiesbrecht/typescript-template:${commit_id}'"""
        }
      }
    }
  }
}
