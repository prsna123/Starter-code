CREATE TABLE input.dim_customer (
	customer_id BIGINT NOT NULL,
	customer_name VARCHAR(100) NULL,
	local_customer_channel VARCHAR(150) NULL,
	global_customer_channel VARCHAR(150) NULL,
	[group] VARCHAR(150) NULL,
	geo_id INT NOT NULL,
	banner_name VARCHAR(100) NULL,
	customer_level NVARCHAR(255) NULL,
	CONSTRAINT PK_dim_customer PRIMARY KEY CLUSTERED (customer_id),
	CONSTRAINT FK_dim_customer_geo_id FOREIGN KEY (geo_id) REFERENCES dev_test.dim_geo (geo_id)
);