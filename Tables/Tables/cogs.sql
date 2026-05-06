CREATE TABLE dev_test.cogs (
	id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_cogs_id DEFAULT NEWSEQUENTIALID(),
	product_id BIGINT NOT NULL,
	geo_id INT NOT NULL,
	cogs_scenario_id VARCHAR(150) NOT NULL,
	start_date DATE NOT NULL,
	cogs_per_kgs FLOAT NOT NULL,
	CONSTRAINT PK_cogs PRIMARY KEY CLUSTERED (id),
	CONSTRAINT FK_cogs_product_id FOREIGN KEY (product_id) REFERENCES dev_test.dim_product (product_id),
	CONSTRAINT FK_cogs_geo_id FOREIGN KEY (geo_id) REFERENCES dev_test.dim_geo (geo_id),
	CONSTRAINT FK_cogs_scenario_id FOREIGN KEY (cogs_scenario_id) REFERENCES dev_test.scenario (scenario_id)
);