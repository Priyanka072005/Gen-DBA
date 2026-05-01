CREATE DATABASE Gen_DBA;

USE Gen_DBA;

CREATE TABLE query_logs (
    query_id INT AUTO_INCREMENT PRIMARY KEY,
    query_text TEXT NOT NULL,
    execution_time FLOAT,
    frequency INT DEFAULT 1,
    database_name VARCHAR(100),
    user_name VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE execution_plans (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    query_id INT,
    cost FLOAT,
    rows_processed INT,
    scan_type VARCHAR(50),     
    join_type VARCHAR(50),
    execution_details TEXT,
    
    FOREIGN KEY (query_id) REFERENCES query_logs(query_id) ON DELETE CASCADE
);

CREATE TABLE optimizations (
    optimization_id INT AUTO_INCREMENT PRIMARY KEY,
    query_id INT,
    optimized_query TEXT,
    suggested_index TEXT,
    optimization_type VARCHAR(100),
    improvement_percentage FLOAT,
    
    FOREIGN KEY (query_id) REFERENCES query_logs(query_id) ON DELETE CASCADE
);

CREATE TABLE performance_metrics (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    query_id INT,
    
    original_cost FLOAT,
    optimized_cost FLOAT,
    
    original_execution_time FLOAT,
    optimized_execution_time FLOAT,
    
    cpu_usage FLOAT,
    memory_usage FLOAT,
    
    FOREIGN KEY (query_id) REFERENCES query_logs(query_id) ON DELETE CASCADE
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('Admin', 'Developer', 'Viewer') DEFAULT 'Viewer',
    email VARCHAR(150),
    last_login TIMESTAMP
);

CREATE TABLE audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    query_id INT,
    
    action_type ENUM('APPROVE', 'REJECT', 'EXECUTE'),
    status VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (query_id) REFERENCES query_logs(query_id)
);

CREATE TABLE risk_impact (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    query_id INT,
    
    impact_score FLOAT,
    risk_score FLOAT,
    
    priority_level ENUM('HIGH', 'MEDIUM', 'LOW'),
    
    FOREIGN KEY (query_id) REFERENCES query_logs(query_id) ON DELETE CASCADE
);


// Indexesfor speed

CREATE INDEX idx_execution_time ON query_logs(execution_time);
CREATE INDEX idx_query_id_plans ON execution_plans(query_id);




