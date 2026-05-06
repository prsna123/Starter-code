CREATE TABLE dev_test.list_price (
	id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_list_price_id DEFAULT NEWSEQUENTIALID(),
	product_id BIGINT NOT NULL,
	geo_id INT NOT NULL,
	list_price_scenario_id VARCHAR(150) NOT NULL,
	start_date DATE NOT NULL,
	list_price_per_kgs FLOAT NOT NULL,
	CONSTRAINT PK_list_price PRIMARY KEY CLUSTERED (id),
	CONSTRAINT FK_list_price_product_id FOREIGN KEY (product_id) REFERENCES dev_test.dim_product (product_id),
	CONSTRAINT FK_list_price_geo_id FOREIGN KEY (geo_id) REFERENCES dev_test.dim_geo (geo_id),
	CONSTRAINT FK_list_price_scenario_id FOREIGN KEY (list_price_scenario_id) REFERENCES dev_test.scenario (scenario_id)
);