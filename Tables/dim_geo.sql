CREATE TABLE dev_test.dim_geo (
	geo_id INT NOT NULL,
	region NVARCHAR(255) NULL,
	operating_entity NVARCHAR(255) NULL,
	cluster NVARCHAR(255) NULL,
	country_code NVARCHAR(255) NULL,
	submarket NVARCHAR(255) NULL,
	CONSTRAINT PK_dim_geo PRIMARY KEY CLUSTERED (geo_id)
);