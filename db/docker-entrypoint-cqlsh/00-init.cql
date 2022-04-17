CREATE KEYSPACE IF NOT EXISTS xmen WITH REPLICATION = {'class' : 'SimpleStrategy','replication_factor' : 1};

CREATE TABLE IF NOT EXISTS xmen.dna_matrix (dna_matrix TEXT, is_mutant BOOLEAN, created_at TIMESTAMP, PRIMARY KEY (dna_matrix, is_mutant));