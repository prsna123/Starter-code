CREATE TABLE dev_test.dim_intermediary_customer (
	intermediary_customer_id BIGINT NOT NULL,
	customer_name NVARCHAR(255) NULL,
	local_customer_channel NVARCHAR(150) NULL,
	global_customer_channel NVARCHAR(150) NULL,
	[group] NVARCHAR(150) NULL,
	CONSTRAINT PK_dim_intermediary_customer PRIMARY KEY CLUSTERED (intermediary_customer_id)
);