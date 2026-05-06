CREATE TABLE dev_test.ssp_calendar (
	id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_ssp_calendar_id DEFAULT NEWSEQUENTIALID(),
	customer_id BIGINT NOT NULL,
	intermediary_customer_id BIGINT NULL,
	product_id BIGINT NOT NULL,
	geo_id INT NOT NULL,
	ssp_calendar_scenario_id UNIQUEIDENTIFIER NOT NULL,
	start_date DATE NOT NULL,
	standard_shelf_price FLOAT NOT NULL,

	CONSTRAINT PK_ssp_calendar PRIMARY KEY CLUSTERED (id),
	CONSTRAINT FK_ssp_calendar_customer_id FOREIGN KEY (customer_id) REFERENCES dev_test.dim_customer (customer_id),
	CONSTRAINT FK_ssp_calendar_intermediary_customer_id FOREIGN KEY (intermediary_customer_id) REFERENCES dev_test.dim_intermediary_customer (intermediary_customer_id),
	CONSTRAINT FK_ssp_calendar_product_id FOREIGN KEY (product_id) REFERENCES dev_test.dim_product (product_id),
	CONSTRAINT FK_ssp_calendar_geo_id FOREIGN KEY (geo_id) REFERENCES dev_test.dim_geo (geo_id),
	CONSTRAINT FK_ssp_calendar_scenario_id FOREIGN KEY (ssp_calendar_scenario_id) REFERENCES dev_test.scenario (scenario_id)
);