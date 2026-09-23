
#!/bin/bash

# Define variables
PROJECT_DIR="/home/coder/project/workspace/question_generation_service/solutions/9c586973-fafe-4b5e-85c6-cc88f48e915a/springapp"
DATABASE_NAME="9c586973_fafe_4b5e_85c6_cc88f48e915a"

# Create Spring Boot project using Spring CLI
spring init \
  --type=maven-project \
  --language=java \
  --boot-version=3.4.0 \
  --packaging=jar \
  --java-version=17 \
  --groupId=com.examly \
  --artifactId=springapp \
  --name="Freelancer Project Management System" \
  --description="Spring Boot application for Freelancer Project Management System" \
  --package-name=com.examly.springapp \
  --dependencies=web,data-jpa,validation,mysql,lombok \
  --build=maven \
  ${PROJECT_DIR}

# Wait for project generation to complete
sleep 2

# Create MySQL database
mysql -u root -pexamly -e "CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};" 2>/dev/null || echo "Database creation failed, will use default"

# Configure application.properties
cat > "${PROJECT_DIR}/src/main/resources/application.properties" << EOL
spring.datasource.url=jdbc:mysql://localhost:3306/${DATABASE_NAME}?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=examly
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
EOL

# Update pom.xml with additional dependencies
sed -i '/<\/dependencies>/i \
        <dependency>\
            <groupId>org.springframework.boot</groupId>\
            <artifactId>spring-boot-starter-validation</artifactId>\
        </dependency>' "${PROJECT_DIR}/pom.xml"

# Create base package structure
mkdir -p "${PROJECT_DIR}/src/main/java/com/examly/springapp/model"
mkdir -p "${PROJECT_DIR}/src/main/java/com/examly/springapp/controller"
mkdir -p "${PROJECT_DIR}/src/main/java/com/examly/springapp/repository"
mkdir -p "${PROJECT_DIR}/src/main/java/com/examly/springapp/service"
mkdir -p "${PROJECT_DIR}/src/main/java/com/examly/springapp/exception"
